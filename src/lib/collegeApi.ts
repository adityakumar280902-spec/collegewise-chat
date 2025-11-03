import { supabase } from "@/integrations/supabase/client";

export interface College {
  college_id: number;
  college_name: string;
  type: string;
  nirf_rank: number | null;
  state: string;
  city: string;
  avg_placement: number | null;
  median_placement: number | null;
  image_logo: string | null;
}

export interface Program {
  program_id: number;
  college_id: number;
  program_name: string;
  annual_fee: number | null;
  hostel_available: boolean;
}

export interface Cutoff {
  cutoff_id: number;
  program_id: number;
  exam_type: string;
  year: number;
  category: string;
  closing_rank: number;
  opening_rank: number;
}

export interface CollegeWithDetails extends College {
  programs: Program[];
  cutoffs: Cutoff[];
  closingRank?: number;
  fees?: string;
  placement?: string;
  avgPackage?: string;
  probability?: string;
}

const calculateProbability = (userRank: number, closingRank: number): string => {
  const difference = closingRank - userRank;
  if (difference > 5000) return "High";
  if (difference > 1000) return "Medium";
  return "Low";
};

export const searchCollegesByRank = async (
  examType: string,
  rank: number
): Promise<CollegeWithDetails[]> => {
  // Normalize exam type to match database format
  const normalizedExam = examType.toUpperCase().replace(/-/g, '_');
  
  // Fetch cutoffs that match the exam and are within reach
  const { data: cutoffs, error: cutoffsError } = await supabase
    .from('cutoffs')
    .select(`
      *,
      programs (
        *,
        colleges (*)
      )
    `)
    .eq('exam_type', normalizedExam)
    .gte('closing_rank', rank)
    .order('closing_rank', { ascending: true })
    .limit(50);

  if (cutoffsError) {
    console.error('Error fetching cutoffs:', cutoffsError);
    return [];
  }

  if (!cutoffs) return [];

  // Group by college and aggregate data
  const collegeMap = new Map<number, CollegeWithDetails>();

  cutoffs.forEach((cutoff: any) => {
    const program = cutoff.programs;
    const college = program?.colleges;

    if (!college) return;

    if (!collegeMap.has(college.college_id)) {
      collegeMap.set(college.college_id, {
        ...college,
        programs: [],
        cutoffs: [],
        closingRank: cutoff.closing_rank,
        fees: program.annual_fee ? `₹${(program.annual_fee / 100000).toFixed(1)}L/year` : 'N/A',
        placement: college.avg_placement ? `${college.avg_placement}%` : 'N/A',
        avgPackage: college.median_placement ? `₹${college.median_placement}L` : 'N/A',
        probability: calculateProbability(rank, cutoff.closing_rank),
      });
    }

    const collegeData = collegeMap.get(college.college_id)!;
    
    // Keep the best (lowest) closing rank
    if (cutoff.closing_rank < (collegeData.closingRank || Infinity)) {
      collegeData.closingRank = cutoff.closing_rank;
      collegeData.probability = calculateProbability(rank, cutoff.closing_rank);
    }

    collegeData.cutoffs.push(cutoff);
    if (!collegeData.programs.find(p => p.program_id === program.program_id)) {
      collegeData.programs.push(program);
    }
  });

  return Array.from(collegeMap.values());
};

export const searchCollegesByName = async (query: string): Promise<CollegeWithDetails[]> => {
  const { data: colleges, error } = await supabase
    .from('colleges')
    .select(`
      *,
      programs (
        *,
        cutoffs (*)
      )
    `)
    .ilike('college_name', `%${query}%`)
    .limit(20);

  if (error) {
    console.error('Error fetching colleges:', error);
    return [];
  }

  if (!colleges) return [];

  return colleges.map((college: any) => {
    const programs = college.programs || [];
    const allCutoffs = programs.flatMap((p: any) => p.cutoffs || []);
    const lowestClosingRank = allCutoffs.length > 0
      ? Math.min(...allCutoffs.map((c: any) => c.closing_rank))
      : null;

    return {
      ...college,
      programs,
      cutoffs: allCutoffs,
      closingRank: lowestClosingRank,
      fees: programs[0]?.annual_fee ? `₹${(programs[0].annual_fee / 100000).toFixed(1)}L/year` : 'N/A',
      placement: college.avg_placement ? `${college.avg_placement}%` : 'N/A',
      avgPackage: college.median_placement ? `₹${college.median_placement}L` : 'N/A',
      probability: 'Medium',
    };
  });
};

export const getTrendingColleges = async (): Promise<CollegeWithDetails[]> => {
  const { data: colleges, error } = await supabase
    .from('colleges')
    .select(`
      *,
      programs (
        *,
        cutoffs (*)
      )
    `)
    .order('nirf_rank', { ascending: true, nullsFirst: false })
    .limit(6);

  if (error) {
    console.error('Error fetching trending colleges:', error);
    return [];
  }

  if (!colleges) return [];

  return colleges.map((college: any) => {
    const programs = college.programs || [];
    const allCutoffs = programs.flatMap((p: any) => p.cutoffs || []);
    
    return {
      ...college,
      programs,
      cutoffs: allCutoffs,
      closingRank: allCutoffs.length > 0 ? Math.min(...allCutoffs.map((c: any) => c.closing_rank)) : null,
      fees: programs[0]?.annual_fee ? `₹${(programs[0].annual_fee / 100000).toFixed(1)}L/year` : 'N/A',
      placement: college.avg_placement ? `${college.avg_placement}%` : 'N/A',
      avgPackage: college.median_placement ? `₹${college.median_placement}L` : 'N/A',
    };
  });
};
