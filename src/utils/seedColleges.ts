import { supabase } from "@/integrations/supabase/client";

interface CollegeSeed {
  college_name: string;
  type: string;
  nirf_rank: number;
  state: string;
  city: string;
  avg_placement: number;
  median_placement: number;
  description: string;
  website: string;
  programs: ProgramSeed[];
}

interface ProgramSeed {
  program_name: string;
  annual_fee: number;
  hostel_available: boolean;
  degree_level: string;
  duration_years: number;
  cutoffs: CutoffSeed[];
}

interface CutoffSeed {
  exam_type: string;
  year: number;
  category: string;
  opening_rank: number;
  closing_rank: number;
}

const collegesData: CollegeSeed[] = [
  {
    college_name: "IIT Bombay", type: "IIT", nirf_rank: 3, state: "Maharashtra", city: "Mumbai",
    avg_placement: 96, median_placement: 21, description: "Indian Institute of Technology Bombay is a public technical university. It is the second oldest IIT and is recognized as an Institute of Eminence.",
    website: "https://www.iitb.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1, closing_rank: 68 },
        { exam_type: "JEE_ADVANCED", year: 2024, category: "OBC-NCL", opening_rank: 1, closing_rank: 26 },
        { exam_type: "JEE_ADVANCED", year: 2024, category: "SC", opening_rank: 1, closing_rank: 14 },
        { exam_type: "JEE_ADVANCED", year: 2024, category: "ST", opening_rank: 1, closing_rank: 8 },
        { exam_type: "JEE_ADVANCED", year: 2023, category: "General", opening_rank: 1, closing_rank: 72 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 69, closing_rank: 338 },
        { exam_type: "JEE_ADVANCED", year: 2024, category: "OBC-NCL", opening_rank: 27, closing_rank: 132 },
        { exam_type: "JEE_ADVANCED", year: 2023, category: "General", opening_rank: 73, closing_rank: 348 },
      ]},
      { program_name: "Mechanical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 610, closing_rank: 2150 },
        { exam_type: "JEE_ADVANCED", year: 2023, category: "General", opening_rank: 650, closing_rank: 2200 },
      ]},
      { program_name: "Chemical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1200, closing_rank: 3100 },
      ]},
      { program_name: "Aerospace Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 400, closing_rank: 1800 },
      ]},
    ],
  },
  {
    college_name: "IIT Delhi", type: "IIT", nirf_rank: 2, state: "Delhi", city: "New Delhi",
    avg_placement: 94, median_placement: 18, description: "Indian Institute of Technology Delhi is a public technical university located in Hauz Khas, New Delhi.",
    website: "https://www.iitd.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1, closing_rank: 73 },
        { exam_type: "JEE_ADVANCED", year: 2024, category: "OBC-NCL", opening_rank: 1, closing_rank: 30 },
        { exam_type: "JEE_ADVANCED", year: 2023, category: "General", opening_rank: 1, closing_rank: 80 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 74, closing_rank: 400 },
        { exam_type: "JEE_ADVANCED", year: 2023, category: "General", opening_rank: 81, closing_rank: 420 },
      ]},
      { program_name: "Mechanical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 700, closing_rank: 2500 },
      ]},
      { program_name: "Mathematics and Computing", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 50, closing_rank: 195 },
      ]},
      { program_name: "Engineering Physics", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 500, closing_rank: 1650 },
      ]},
    ],
  },
  {
    college_name: "IIT Madras", type: "IIT", nirf_rank: 1, state: "Tamil Nadu", city: "Chennai",
    avg_placement: 95, median_placement: 22, description: "Indian Institute of Technology Madras is a public technical university and has been consistently ranked first in NIRF rankings.",
    website: "https://www.iitm.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1, closing_rank: 80 },
        { exam_type: "JEE_ADVANCED", year: 2024, category: "OBC-NCL", opening_rank: 1, closing_rank: 35 },
        { exam_type: "JEE_ADVANCED", year: 2023, category: "General", opening_rank: 1, closing_rank: 85 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 81, closing_rank: 450 },
      ]},
      { program_name: "Mechanical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 800, closing_rank: 2800 },
      ]},
      { program_name: "Data Science", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 30, closing_rank: 150 },
      ]},
      { program_name: "Civil Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 2500, closing_rank: 5200 },
      ]},
    ],
  },
  {
    college_name: "IIT Kanpur", type: "IIT", nirf_rank: 4, state: "Uttar Pradesh", city: "Kanpur",
    avg_placement: 93, median_placement: 19, description: "IIT Kanpur is known for its strong focus on research and development in science and engineering.",
    website: "https://www.iitk.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1, closing_rank: 100 },
        { exam_type: "JEE_ADVANCED", year: 2023, category: "General", opening_rank: 1, closing_rank: 110 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 101, closing_rank: 600 },
      ]},
      { program_name: "Mechanical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 900, closing_rank: 3000 },
      ]},
    ],
  },
  {
    college_name: "IIT Kharagpur", type: "IIT", nirf_rank: 5, state: "West Bengal", city: "Kharagpur",
    avg_placement: 92, median_placement: 17, description: "India's oldest IIT, established in 1951. Known for diverse academic programs and strong alumni network.",
    website: "https://www.iitkgp.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1, closing_rank: 180 },
        { exam_type: "JEE_ADVANCED", year: 2024, category: "OBC-NCL", opening_rank: 1, closing_rank: 65 },
      ]},
      { program_name: "Electronics and Electrical Communication Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 200, closing_rank: 800 },
      ]},
      { program_name: "Mechanical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1100, closing_rank: 3500 },
      ]},
      { program_name: "Civil Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 3200, closing_rank: 6500 },
      ]},
    ],
  },
  {
    college_name: "IIT Roorkee", type: "IIT", nirf_rank: 6, state: "Uttarakhand", city: "Roorkee",
    avg_placement: 91, median_placement: 16, description: "Asia's oldest technical institution, established in 1847. Strong in civil and mechanical engineering.",
    website: "https://www.iitr.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 50, closing_rank: 800 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 900, closing_rank: 2500 },
      ]},
      { program_name: "Civil Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 4000, closing_rank: 7500 },
      ]},
    ],
  },
  {
    college_name: "IIT Guwahati", type: "IIT", nirf_rank: 7, state: "Assam", city: "Guwahati",
    avg_placement: 90, median_placement: 15, description: "Leading IIT in Northeast India with a beautiful campus on the banks of Brahmaputra.",
    website: "https://www.iitg.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 100, closing_rank: 1100 },
      ]},
      { program_name: "Electronics and Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1200, closing_rank: 3200 },
      ]},
      { program_name: "Mechanical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 2500, closing_rank: 5500 },
      ]},
    ],
  },
  {
    college_name: "IIT Hyderabad", type: "IIT", nirf_rank: 8, state: "Telangana", city: "Hyderabad",
    avg_placement: 89, median_placement: 16, description: "Fastest growing new-generation IIT known for interdisciplinary research.",
    website: "https://www.iith.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 200, closing_rank: 1500 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1600, closing_rank: 4000 },
      ]},
      { program_name: "Artificial Intelligence", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 150, closing_rank: 900 },
      ]},
    ],
  },
  {
    college_name: "NIT Trichy", type: "NIT", nirf_rank: 9, state: "Tamil Nadu", city: "Tiruchirappalli",
    avg_placement: 88, median_placement: 12, description: "Premier NIT, consistently ranked as the best NIT in India.",
    website: "https://www.nitt.edu",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 2500, closing_rank: 7500 },
        { exam_type: "JEE_MAIN", year: 2024, category: "OBC-NCL", opening_rank: 800, closing_rank: 2500 },
        { exam_type: "JEE_MAIN", year: 2023, category: "General", opening_rank: 2800, closing_rank: 8000 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 5000, closing_rank: 12000 },
      ]},
      { program_name: "Electrical and Electronics Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 8000, closing_rank: 16000 },
      ]},
      { program_name: "Mechanical Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 10000, closing_rank: 22000 },
      ]},
    ],
  },
  {
    college_name: "NIT Surathkal", type: "NIT", nirf_rank: 10, state: "Karnataka", city: "Mangalore",
    avg_placement: 87, median_placement: 11, description: "National Institute of Technology Karnataka, one of the top NITs in India.",
    website: "https://www.nitk.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 3000, closing_rank: 8500 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 6000, closing_rank: 14000 },
      ]},
      { program_name: "Information Technology", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 5000, closing_rank: 11000 },
      ]},
    ],
  },
  {
    college_name: "IIIT Hyderabad", type: "IIIT", nirf_rank: 11, state: "Telangana", city: "Hyderabad",
    avg_placement: 95, median_placement: 20, description: "Premier research-led IT institution with exceptional placement records.",
    website: "https://www.iiit.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 350000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 1500, closing_rank: 5000 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 350000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 4000, closing_rank: 9000 },
      ]},
    ],
  },
  {
    college_name: "IIT Indore", type: "IIT", nirf_rank: 12, state: "Madhya Pradesh", city: "Indore",
    avg_placement: 86, median_placement: 14, description: "A rapidly advancing new-generation IIT.",
    website: "https://www.iiti.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 400, closing_rank: 2500 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 2600, closing_rank: 5500 },
      ]},
    ],
  },
  {
    college_name: "IIT BHU Varanasi", type: "IIT", nirf_rank: 13, state: "Uttar Pradesh", city: "Varanasi",
    avg_placement: 85, median_placement: 13, description: "IIT BHU is a constituent institute of Banaras Hindu University with historic legacy.",
    website: "https://www.iitbhu.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 200, closing_rank: 1800 },
      ]},
      { program_name: "Electronics Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1900, closing_rank: 4200 },
      ]},
      { program_name: "Mechanical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 3500, closing_rank: 6800 },
      ]},
    ],
  },
  {
    college_name: "IIT Gandhinagar", type: "IIT", nirf_rank: 14, state: "Gujarat", city: "Gandhinagar",
    avg_placement: 84, median_placement: 13, description: "Known for liberal education and interdisciplinary approach.",
    website: "https://www.iitgn.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 500, closing_rank: 3000 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 3100, closing_rank: 6000 },
      ]},
    ],
  },
  {
    college_name: "NIT Rourkela", type: "NIT", nirf_rank: 15, state: "Odisha", city: "Rourkela",
    avg_placement: 83, median_placement: 10, description: "One of the leading NITs in Eastern India.",
    website: "https://www.nitrkl.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 5000, closing_rank: 14000 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 10000, closing_rank: 22000 },
      ]},
    ],
  },
  {
    college_name: "IIT Ropar", type: "IIT", nirf_rank: 16, state: "Punjab", city: "Rupnagar",
    avg_placement: 82, median_placement: 12, description: "Emerging IIT in North India with modern infrastructure.",
    website: "https://www.iitrpr.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 600, closing_rank: 3500 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 3600, closing_rank: 7000 },
      ]},
    ],
  },
  {
    college_name: "IIIT Bangalore", type: "IIIT", nirf_rank: 17, state: "Karnataka", city: "Bangalore",
    avg_placement: 93, median_placement: 18, description: "Research-focused IT institute with excellent industry connections.",
    website: "https://www.iiitb.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 400000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 2000, closing_rank: 6000 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 400000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 5000, closing_rank: 10000 },
      ]},
    ],
  },
  {
    college_name: "NIT Warangal", type: "NIT", nirf_rank: 18, state: "Telangana", city: "Warangal",
    avg_placement: 81, median_placement: 10, description: "One of the first NITs, strong in engineering education.",
    website: "https://www.nitw.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 4000, closing_rank: 10000 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 7000, closing_rank: 16000 },
      ]},
      { program_name: "Mechanical Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 14000, closing_rank: 28000 },
      ]},
    ],
  },
  {
    college_name: "IIT Bhubaneswar", type: "IIT", nirf_rank: 19, state: "Odisha", city: "Bhubaneswar",
    avg_placement: 80, median_placement: 11, description: "Growing IIT in Eastern India with expanding research output.",
    website: "https://www.iitbbs.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 800, closing_rank: 4500 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 4600, closing_rank: 8000 },
      ]},
    ],
  },
  {
    college_name: "IIT Jodhpur", type: "IIT", nirf_rank: 20, state: "Rajasthan", city: "Jodhpur",
    avg_placement: 79, median_placement: 11, description: "IIT in Rajasthan's desert region with growing academic reputation.",
    website: "https://www.iitj.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 700, closing_rank: 4200 },
      ]},
      { program_name: "Artificial Intelligence and Data Science", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 600, closing_rank: 3800 },
      ]},
    ],
  },
  {
    college_name: "NIT Calicut", type: "NIT", nirf_rank: 21, state: "Kerala", city: "Kozhikode",
    avg_placement: 78, median_placement: 9, description: "Premier NIT in Kerala with strong academic programs.",
    website: "https://www.nitc.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 6000, closing_rank: 15000 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 10000, closing_rank: 24000 },
      ]},
    ],
  },
  {
    college_name: "IIT Patna", type: "IIT", nirf_rank: 22, state: "Bihar", city: "Patna",
    avg_placement: 77, median_placement: 10, description: "IIT serving Bihar region with growing research capabilities.",
    website: "https://www.iitp.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 900, closing_rank: 5000 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 5100, closing_rank: 9000 },
      ]},
    ],
  },
  {
    college_name: "IIT Mandi", type: "IIT", nirf_rank: 23, state: "Himachal Pradesh", city: "Mandi",
    avg_placement: 76, median_placement: 10, description: "Himalayan IIT with focus on innovation and technology.",
    website: "https://www.iitmandi.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1000, closing_rank: 5500 },
      ]},
      { program_name: "Data Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 900, closing_rank: 5000 },
      ]},
    ],
  },
  {
    college_name: "DTU Delhi", type: "State", nirf_rank: 24, state: "Delhi", city: "New Delhi",
    avg_placement: 85, median_placement: 10, description: "Delhi Technological University, formerly DCE, is a premier state technical university.",
    website: "https://www.dtu.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 176000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 1500, closing_rank: 5500 },
      ]},
      { program_name: "Information Technology", annual_fee: 176000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 3000, closing_rank: 8000 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 176000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 4000, closing_rank: 11000 },
      ]},
    ],
  },
  {
    college_name: "BITS Pilani", type: "Deemed", nirf_rank: 25, state: "Rajasthan", city: "Pilani",
    avg_placement: 92, median_placement: 15, description: "Birla Institute of Technology and Science - leading private deemed university with BITSAT entrance.",
    website: "https://www.bits-pilani.ac.in",
    programs: [
      { program_name: "Computer Science", annual_fee: 502800, hostel_available: true, degree_level: "B.E.", duration_years: 4, cutoffs: [
        { exam_type: "BITSAT", year: 2024, category: "General", opening_rank: 1, closing_rank: 50 },
      ]},
      { program_name: "Electronics and Instrumentation", annual_fee: 502800, hostel_available: true, degree_level: "B.E.", duration_years: 4, cutoffs: [
        { exam_type: "BITSAT", year: 2024, category: "General", opening_rank: 51, closing_rank: 150 },
      ]},
      { program_name: "Electrical and Electronics", annual_fee: 502800, hostel_available: true, degree_level: "B.E.", duration_years: 4, cutoffs: [
        { exam_type: "BITSAT", year: 2024, category: "General", opening_rank: 100, closing_rank: 200 },
      ]},
    ],
  },
  {
    college_name: "NIT Durgapur", type: "NIT", nirf_rank: 26, state: "West Bengal", city: "Durgapur",
    avg_placement: 75, median_placement: 8, description: "Leading NIT in West Bengal.",
    website: "https://www.nitdgp.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 8000, closing_rank: 20000 },
      ]},
      { program_name: "Information Technology", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 10000, closing_rank: 25000 },
      ]},
    ],
  },
  {
    college_name: "VNIT Nagpur", type: "NIT", nirf_rank: 27, state: "Maharashtra", city: "Nagpur",
    avg_placement: 74, median_placement: 8, description: "Visvesvaraya National Institute of Technology, historic NIT in Central India.",
    website: "https://vnit.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 7000, closing_rank: 18000 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 12000, closing_rank: 27000 },
      ]},
    ],
  },
  {
    college_name: "MNIT Jaipur", type: "NIT", nirf_rank: 28, state: "Rajasthan", city: "Jaipur",
    avg_placement: 73, median_placement: 8, description: "Malviya National Institute of Technology, premier NIT in Rajasthan.",
    website: "https://www.mnit.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 6000, closing_rank: 16000 },
      ]},
      { program_name: "Information Technology", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 8000, closing_rank: 20000 },
      ]},
    ],
  },
  {
    college_name: "IIT Tirupati", type: "IIT", nirf_rank: 29, state: "Andhra Pradesh", city: "Tirupati",
    avg_placement: 72, median_placement: 9, description: "New-generation IIT in Andhra Pradesh.",
    website: "https://www.iittp.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1500, closing_rank: 6000 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 6100, closing_rank: 10000 },
      ]},
    ],
  },
  {
    college_name: "IIT Palakkad", type: "IIT", nirf_rank: 30, state: "Kerala", city: "Palakkad",
    avg_placement: 71, median_placement: 9, description: "Newest IIT in Kerala with growing programs.",
    website: "https://www.iitpkd.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 1800, closing_rank: 6500 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 6600, closing_rank: 10500 },
      ]},
    ],
  },
  {
    college_name: "College of Engineering Guindy (Anna University)", type: "Government", nirf_rank: 31, state: "Tamil Nadu", city: "Chennai",
    avg_placement: 82, median_placement: 9, description: "One of India's oldest engineering colleges, part of Anna University.",
    website: "https://www.annauniv.edu",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 55000, hostel_available: true, degree_level: "B.E.", duration_years: 4, cutoffs: [
        { exam_type: "TNEA", year: 2024, category: "General", opening_rank: 1, closing_rank: 500 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 55000, hostel_available: true, degree_level: "B.E.", duration_years: 4, cutoffs: [
        { exam_type: "TNEA", year: 2024, category: "General", opening_rank: 300, closing_rank: 1200 },
      ]},
    ],
  },
  {
    college_name: "Jadavpur University", type: "Government", nirf_rank: 32, state: "West Bengal", city: "Kolkata",
    avg_placement: 80, median_placement: 8, description: "Premier state university with strong engineering faculty.",
    website: "https://www.jaduniv.edu.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 25000, hostel_available: true, degree_level: "B.E.", duration_years: 4, cutoffs: [
        { exam_type: "WBJEE", year: 2024, category: "General", opening_rank: 1, closing_rank: 400 },
      ]},
      { program_name: "Electronics and Telecommunication Engineering", annual_fee: 25000, hostel_available: true, degree_level: "B.E.", duration_years: 4, cutoffs: [
        { exam_type: "WBJEE", year: 2024, category: "General", opening_rank: 200, closing_rank: 1000 },
      ]},
    ],
  },
  {
    college_name: "MNNIT Allahabad", type: "NIT", nirf_rank: 33, state: "Uttar Pradesh", city: "Prayagraj",
    avg_placement: 70, median_placement: 7, description: "Motilal Nehru NIT, one of the historic NITs.",
    website: "https://www.mnnit.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 8000, closing_rank: 20000 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 14000, closing_rank: 30000 },
      ]},
    ],
  },
  {
    college_name: "IIIT Delhi", type: "IIIT", nirf_rank: 34, state: "Delhi", city: "New Delhi",
    avg_placement: 88, median_placement: 14, description: "Indraprastha Institute of Information Technology - premier IT institute in Delhi.",
    website: "https://www.iiitd.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 340000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 3000, closing_rank: 9000 },
      ]},
      { program_name: "Computer Science and Applied Mathematics", annual_fee: 340000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 4000, closing_rank: 11000 },
      ]},
      { program_name: "Computer Science and Artificial Intelligence", annual_fee: 340000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 2500, closing_rank: 7500 },
      ]},
    ],
  },
  {
    college_name: "NIT Kurukshetra", type: "NIT", nirf_rank: 35, state: "Haryana", city: "Kurukshetra",
    avg_placement: 69, median_placement: 7, description: "Leading NIT in Haryana with long academic tradition.",
    website: "https://www.nitkkr.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 9000, closing_rank: 22000 },
      ]},
      { program_name: "Information Technology", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 12000, closing_rank: 28000 },
      ]},
    ],
  },
  {
    college_name: "IIT Bhilai", type: "IIT", nirf_rank: 36, state: "Chhattisgarh", city: "Bhilai",
    avg_placement: 68, median_placement: 8, description: "One of the newest IITs, established in 2016.",
    website: "https://www.iitbhilai.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 2000, closing_rank: 7000 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 7100, closing_rank: 11000 },
      ]},
    ],
  },
  {
    college_name: "NIT Silchar", type: "NIT", nirf_rank: 37, state: "Assam", city: "Silchar",
    avg_placement: 67, median_placement: 7, description: "NIT in Northeast India.",
    website: "https://www.nits.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 12000, closing_rank: 30000 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 18000, closing_rank: 40000 },
      ]},
    ],
  },
  {
    college_name: "PSG College of Technology", type: "Autonomous", nirf_rank: 38, state: "Tamil Nadu", city: "Coimbatore",
    avg_placement: 78, median_placement: 7, description: "Leading autonomous engineering college in Tamil Nadu.",
    website: "https://www.psgtech.edu",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 125000, hostel_available: true, degree_level: "B.E.", duration_years: 4, cutoffs: [
        { exam_type: "TNEA", year: 2024, category: "General", opening_rank: 100, closing_rank: 800 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 125000, hostel_available: true, degree_level: "B.E.", duration_years: 4, cutoffs: [
        { exam_type: "TNEA", year: 2024, category: "General", opening_rank: 500, closing_rank: 2000 },
      ]},
    ],
  },
  {
    college_name: "IIT Goa", type: "IIT", nirf_rank: 39, state: "Goa", city: "Ponda",
    avg_placement: 66, median_placement: 8, description: "Coastal IIT established in 2016.",
    website: "https://www.iitgoa.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 2200, closing_rank: 7500 },
      ]},
      { program_name: "Electrical Engineering", annual_fee: 224900, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_ADVANCED", year: 2024, category: "General", opening_rank: 7600, closing_rank: 11500 },
      ]},
    ],
  },
  {
    college_name: "SVNIT Surat", type: "NIT", nirf_rank: 40, state: "Gujarat", city: "Surat",
    avg_placement: 65, median_placement: 6, description: "Sardar Vallabhbhai National Institute of Technology.",
    website: "https://www.svnit.ac.in",
    programs: [
      { program_name: "Computer Science and Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 10000, closing_rank: 25000 },
      ]},
      { program_name: "Electronics and Communication Engineering", annual_fee: 150000, hostel_available: true, degree_level: "B.Tech", duration_years: 4, cutoffs: [
        { exam_type: "JEE_MAIN", year: 2024, category: "General", opening_rank: 16000, closing_rank: 35000 },
      ]},
    ],
  },
];

export const seedColleges = async () => {
  const results: any[] = [];

  for (const collegeData of collegesData) {
    try {
      // Insert college
      const { data: college, error: collegeError } = await supabase
        .from("colleges")
        .insert({
          college_name: collegeData.college_name,
          type: collegeData.type,
          nirf_rank: collegeData.nirf_rank,
          state: collegeData.state,
          city: collegeData.city,
          avg_placement: collegeData.avg_placement,
          median_placement: collegeData.median_placement,
          description: collegeData.description,
          website: collegeData.website,
        })
        .select()
        .single();

      if (collegeError) {
        console.error(`Failed to add college ${collegeData.college_name}:`, collegeError);
        continue;
      }

      console.log(`Added college: ${college.college_name}`);

      // Insert programs and cutoffs
      for (const programData of collegeData.programs) {
        const { data: program, error: programError } = await supabase
          .from("programs")
          .insert({
            college_id: college.college_id,
            program_name: programData.program_name,
            annual_fee: programData.annual_fee,
            hostel_available: programData.hostel_available,
            degree_level: programData.degree_level,
            duration_years: programData.duration_years,
          })
          .select()
          .single();

        if (programError) {
          console.error(`Failed to add program ${programData.program_name}:`, programError);
          continue;
        }

        console.log(`  Added program: ${program.program_name}`);

        // Insert cutoffs for this program
        for (const cutoffData of programData.cutoffs) {
          const { error: cutoffError } = await supabase
            .from("cutoffs")
            .insert({
              program_id: program.program_id,
              exam_type: cutoffData.exam_type,
              year: cutoffData.year,
              category: cutoffData.category,
              opening_rank: cutoffData.opening_rank,
              closing_rank: cutoffData.closing_rank,
            });

          if (cutoffError) {
            console.error(`Failed to add cutoff:`, cutoffError);
          }
        }
      }

      results.push(college);
    } catch (error) {
      console.error(`Error processing ${collegeData.college_name}:`, error);
    }
  }

  return results;
};
