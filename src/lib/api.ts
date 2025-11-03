import { supabase } from "@/integrations/supabase/client";

export const fetchTrendingColleges = async () => {
  const { data, error } = await supabase
    .from("colleges")
    .select(`
      college_id,
      college_name,
      state,
      city,
      type,
      nirf_rank,
      avg_placement,
      median_placement
    `)
    .order('nirf_rank', { ascending: true, nullsFirst: false })
    .limit(6);

  if (error) {
    console.error("Error fetching trending colleges:", error);
    return [];
  }

  return data?.map(college => ({
    id: college.college_id,
    name: college.college_name,
    location: `${college.city}, ${college.state}`,
    nirfRank: college.nirf_rank,
    avgPackage: college.avg_placement ? `₹${college.avg_placement}L` : 'N/A',
    type: college.type,
  })) || [];
};

export const searchCollegesByRank = async (examType: string, rank: number) => {
  // Convert exam type format from kebab-case to SCREAMING_SNAKE_CASE
  const formattedExamType = examType.toUpperCase().replace(/-/g, '_');
  
  const { data, error } = await supabase
    .from("cutoffs")
    .select(`
      cutoff_id,
      closing_rank,
      opening_rank,
      category,
      year,
      program_id,
      programs (
        program_id,
        program_name,
        annual_fee,
        hostel_available,
        college_id,
        colleges (
          college_id,
          college_name,
          state,
          city,
          type,
          nirf_rank,
          avg_placement,
          median_placement
        )
      )
    `)
    .eq('exam_type', formattedExamType)
    .gte('closing_rank', rank)
    .order('closing_rank', { ascending: true });

  if (error) {
    console.error("Error searching colleges:", error);
    return [];
  }

  // Transform data to match the expected format
  return data?.map(cutoff => {
    const program = cutoff.programs;
    const college = program?.colleges;
    
    // Calculate probability based on rank difference
    const rankDiff = cutoff.closing_rank - rank;
    let probability = "Low";
    if (rankDiff < 5000) probability = "High";
    else if (rankDiff < 15000) probability = "Medium";

    return {
      id: college?.college_id,
      name: college?.college_name,
      location: `${college?.city}, ${college?.state}`,
      nirfRank: college?.nirf_rank,
      closingRank: cutoff.closing_rank,
      fees: program?.annual_fee ? `₹${(program.annual_fee / 100000).toFixed(1)}L/year` : 'N/A',
      placement: "N/A", // This would need separate calculation
      avgPackage: college?.avg_placement ? `₹${college.avg_placement}L` : 'N/A',
      probability,
      type: college?.type,
      programName: program?.program_name,
    };
  }) || [];
};

export const searchCollegesByName = async (query: string) => {
  const { data, error } = await supabase
    .from("colleges")
    .select(`
      college_id,
      college_name,
      state,
      city,
      type,
      nirf_rank,
      avg_placement,
      median_placement
    `)
    .ilike('college_name', `%${query}%`)
    .limit(50);

  if (error) {
    console.error("Error searching colleges by name:", error);
    return [];
  }

  return data?.map(college => ({
    id: college.college_id,
    name: college.college_name,
    location: `${college.city}, ${college.state}`,
    nirfRank: college.nirf_rank,
    closingRank: 'N/A',
    fees: 'N/A',
    placement: 'N/A',
    avgPackage: college.avg_placement ? `₹${college.avg_placement}L` : 'N/A',
    probability: "Medium",
    type: college.type,
  })) || [];
};
