import { createCollege } from "@/lib/collegeApi";

export const seedColleges = async () => {
  const colleges = [
    { college_name: 'IIT Madras - Indian Institute of Technology', type: 'IIT', nirf_rank: 1, state: 'Tamil Nadu', city: 'Chennai', avg_placement: 95, median_placement: 22, description: 'Premier autonomous engineering and research institution' },
    { college_name: 'IIT Delhi - Indian Institute of Technology', type: 'IIT', nirf_rank: 2, state: 'Delhi', city: 'New Delhi', avg_placement: 94, median_placement: 18, description: 'Leading technical and research university' },
    { college_name: 'IIT Bombay - Indian Institute of Technology', type: 'IIT', nirf_rank: 3, state: 'Maharashtra', city: 'Mumbai', avg_placement: 96, median_placement: 21, description: 'Top-ranked engineering institute' },
    { college_name: 'IIT Kanpur - Indian Institute of Technology', type: 'IIT', nirf_rank: 4, state: 'Uttar Pradesh', city: 'Kanpur', avg_placement: 93, median_placement: 19, description: 'Premier institute of national importance' },
    { college_name: 'IIT Kharagpur - Indian Institute of Technology', type: 'IIT', nirf_rank: 5, state: 'West Bengal', city: 'Kharagpur', avg_placement: 92, median_placement: 17, description: 'Oldest IIT in India' },
    { college_name: 'IIT Roorkee - Indian Institute of Technology', type: 'IIT', nirf_rank: 6, state: 'Uttarakhand', city: 'Roorkee', avg_placement: 91, median_placement: 16, description: 'Asia\'s oldest technical institution' },
    { college_name: 'IIT Guwahati - Indian Institute of Technology', type: 'IIT', nirf_rank: 7, state: 'Assam', city: 'Guwahati', avg_placement: 90, median_placement: 15, description: 'Leading institute in Northeast India' },
    { college_name: 'IIT Hyderabad - Indian Institute of Technology', type: 'IIT', nirf_rank: 8, state: 'Telangana', city: 'Hyderabad', avg_placement: 89, median_placement: 16, description: 'Fast-growing new generation IIT' },
    { college_name: 'NIT Trichy - National Institute of Technology', type: 'NIT', nirf_rank: 9, state: 'Tamil Nadu', city: 'Tiruchirappalli', avg_placement: 88, median_placement: 12, description: 'Premier NIT of India' },
    { college_name: 'NIT Karnataka - National Institute of Technology Surathkal', type: 'NIT', nirf_rank: 10, state: 'Karnataka', city: 'Mangalore', avg_placement: 87, median_placement: 11, description: 'Leading NIT in South India' },
    { college_name: 'IIIT Hyderabad - International Institute of Information Technology', type: 'IIIT', nirf_rank: 11, state: 'Telangana', city: 'Hyderabad', avg_placement: 95, median_placement: 20, description: 'Premier research-led IT institution' },
    { college_name: 'IIT Indore - Indian Institute of Technology', type: 'IIT', nirf_rank: 12, state: 'Madhya Pradesh', city: 'Indore', avg_placement: 86, median_placement: 14, description: 'Rapidly advancing IIT' },
    { college_name: 'IIT BHU - Indian Institute of Technology (Banaras Hindu University)', type: 'IIT', nirf_rank: 13, state: 'Uttar Pradesh', city: 'Varanasi', avg_placement: 85, median_placement: 13, description: 'Historic technical institute' },
    { college_name: 'IIT Gandhinagar - Indian Institute of Technology', type: 'IIT', nirf_rank: 14, state: 'Gujarat', city: 'Gandhinagar', avg_placement: 84, median_placement: 13, description: 'New generation IIT' },
    { college_name: 'NIT Rourkela - National Institute of Technology', type: 'NIT', nirf_rank: 15, state: 'Odisha', city: 'Rourkela', avg_placement: 83, median_placement: 10, description: 'Leading NIT in Eastern India' },
    { college_name: 'IIT Ropar - Indian Institute of Technology', type: 'IIT', nirf_rank: 16, state: 'Punjab', city: 'Rupnagar', avg_placement: 82, median_placement: 12, description: 'Emerging IIT in North India' },
    { college_name: 'IIIT Bangalore - International Institute of Information Technology', type: 'IIIT', nirf_rank: 17, state: 'Karnataka', city: 'Bangalore', avg_placement: 93, median_placement: 18, description: 'Research-focused IT institute' },
    { college_name: 'NIT Warangal - National Institute of Technology', type: 'NIT', nirf_rank: 18, state: 'Telangana', city: 'Warangal', avg_placement: 81, median_placement: 10, description: 'Top NIT in Telangana' },
    { college_name: 'IIT Bhubaneswar - Indian Institute of Technology', type: 'IIT', nirf_rank: 19, state: 'Odisha', city: 'Bhubaneswar', avg_placement: 80, median_placement: 11, description: 'Growing IIT in Eastern India' },
    { college_name: 'IIT Jodhpur - Indian Institute of Technology', type: 'IIT', nirf_rank: 20, state: 'Rajasthan', city: 'Jodhpur', avg_placement: 79, median_placement: 11, description: 'IIT in desert region' },
    { college_name: 'NIT Calicut - National Institute of Technology', type: 'NIT', nirf_rank: 21, state: 'Kerala', city: 'Kozhikode', avg_placement: 78, median_placement: 9, description: 'Premier NIT in Kerala' },
    { college_name: 'IIT Patna - Indian Institute of Technology', type: 'IIT', nirf_rank: 22, state: 'Bihar', city: 'Patna', avg_placement: 77, median_placement: 10, description: 'IIT serving Bihar region' },
    { college_name: 'IIT Mandi - Indian Institute of Technology', type: 'IIT', nirf_rank: 23, state: 'Himachal Pradesh', city: 'Mandi', avg_placement: 76, median_placement: 10, description: 'Himalayan IIT' },
    { college_name: 'DTU - Delhi Technological University', type: 'Deemed', nirf_rank: 24, state: 'Delhi', city: 'New Delhi', avg_placement: 85, median_placement: 10, description: 'Premier state university' },
    { college_name: 'BITS Pilani - Birla Institute of Technology and Science', type: 'Deemed', nirf_rank: 25, state: 'Rajasthan', city: 'Pilani', avg_placement: 92, median_placement: 15, description: 'Leading private deemed university' },
    { college_name: 'NIT Durgapur - National Institute of Technology', type: 'NIT', nirf_rank: 26, state: 'West Bengal', city: 'Durgapur', avg_placement: 75, median_placement: 8, description: 'Leading NIT in West Bengal' },
    { college_name: 'VNIT Nagpur - Visvesvaraya National Institute of Technology', type: 'NIT', nirf_rank: 27, state: 'Maharashtra', city: 'Nagpur', avg_placement: 74, median_placement: 8, description: 'Historic NIT in Central India' },
    { college_name: 'NIT Jaipur - Malviya National Institute of Technology', type: 'NIT', nirf_rank: 28, state: 'Rajasthan', city: 'Jaipur', avg_placement: 73, median_placement: 8, description: 'Premier NIT in Rajasthan' },
    { college_name: 'IIT Tirupati - Indian Institute of Technology', type: 'IIT', nirf_rank: 29, state: 'Andhra Pradesh', city: 'Tirupati', avg_placement: 72, median_placement: 9, description: 'New generation IIT' },
    { college_name: 'IIT Palakkad - Indian Institute of Technology', type: 'IIT', nirf_rank: 30, state: 'Kerala', city: 'Palakkad', avg_placement: 71, median_placement: 9, description: 'Newest IIT in Kerala' },
    { college_name: 'Anna University - College of Engineering Guindy', type: 'Government', nirf_rank: 31, state: 'Tamil Nadu', city: 'Chennai', avg_placement: 82, median_placement: 9, description: 'Historic state engineering college' },
    { college_name: 'Jadavpur University - Faculty of Engineering', type: 'Government', nirf_rank: 32, state: 'West Bengal', city: 'Kolkata', avg_placement: 80, median_placement: 8, description: 'Premier state university' },
    { college_name: 'NIT Allahabad - Motilal Nehru National Institute of Technology', type: 'NIT', nirf_rank: 33, state: 'Uttar Pradesh', city: 'Prayagraj', avg_placement: 70, median_placement: 7, description: 'Historic NIT' },
    { college_name: 'IIIT Delhi - Indraprastha Institute of Information Technology', type: 'IIIT', nirf_rank: 34, state: 'Delhi', city: 'New Delhi', avg_placement: 88, median_placement: 14, description: 'Premier IT institute in Delhi' },
    { college_name: 'NIT Kurukshetra - National Institute of Technology', type: 'NIT', nirf_rank: 35, state: 'Haryana', city: 'Kurukshetra', avg_placement: 69, median_placement: 7, description: 'Leading NIT in Haryana' },
    { college_name: 'IIT Bhilai - Indian Institute of Technology', type: 'IIT', nirf_rank: 36, state: 'Chhattisgarh', city: 'Bhilai', avg_placement: 68, median_placement: 8, description: 'Newest IIT' },
    { college_name: 'NIT Silchar - National Institute of Technology', type: 'NIT', nirf_rank: 37, state: 'Assam', city: 'Silchar', avg_placement: 67, median_placement: 7, description: 'NIT in Northeast' },
    { college_name: 'PSG College of Technology', type: 'Autonomous', nirf_rank: 38, state: 'Tamil Nadu', city: 'Coimbatore', avg_placement: 78, median_placement: 7, description: 'Leading autonomous college' },
    { college_name: 'IIT Goa - Indian Institute of Technology', type: 'IIT', nirf_rank: 39, state: 'Goa', city: 'Ponda', avg_placement: 66, median_placement: 8, description: 'Coastal IIT' },
    { college_name: 'NIT Surat - Sardar Vallabhbhai National Institute of Technology', type: 'NIT', nirf_rank: 40, state: 'Gujarat', city: 'Surat', avg_placement: 65, median_placement: 6, description: 'NIT in Gujarat' },
  ];

  const results = [];
  for (const college of colleges) {
    try {
      const result = await createCollege(college as any);
      results.push(result);
      console.log(`Added: ${college.college_name}`);
    } catch (error) {
      console.error(`Failed to add ${college.college_name}:`, error);
    }
  }
  
  return results;
};
