import { getTrendingColleges } from "./collegeApi";

export const fetchTrendingColleges = async () => {
  const colleges = await getTrendingColleges();
  return colleges.map(college => ({
    id: college.college_id,
    name: college.college_name,
  }));
};
