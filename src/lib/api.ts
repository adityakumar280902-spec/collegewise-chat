import { GraduationCap } from "lucide-react";

export const fetchTrendingColleges = async () => {
  // In a real application, you would fetch this data from an API
  return Promise.resolve([
    {
      id: 1,
      name: "IIT Bombay",
      location: "Mumbai, Maharashtra",
      nirfRank: 3,
      closingRank: 67,
      fees: "₹2.5L/year",
      placement: "98%",
      avgPackage: "₹22L",
      probability: "High",
      type: "Government",
      logo: GraduationCap
    },
    {
      id: 2,
      name: "BITS Pilani",
      location: "Pilani, Rajasthan",
      nirfRank: 25,
      closingRank: 8500,
      fees: "₹5.3L/year",
      placement: "95%",
      avgPackage: "₹18L",
      probability: "Medium",
      type: "Private",
      logo: GraduationCap
    },
    {
      id: 3,
      name: "NIT Trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      nirfRank: 9,
      closingRank: 12000,
      fees: "₹1.8L/year",
      placement: "92%",
      avgPackage: "₹15L",
      probability: "High",
      type: "Government",
      logo: GraduationCap
    },
    {
      id: 4,
      name: "IIIT Hyderabad",
      location: "Hyderabad, Telangana",
      nirfRank: 32,
      closingRank: 15000,
      fees: "₹3.2L/year",
      placement: "94%",
      avgPackage: "₹19L",
      probability: "Medium",
      type: "Government",
      logo: GraduationCap
    },
    {
      id: 5,
      name: "VIT Vellore",
      location: "Vellore, Tamil Nadu",
      nirfRank: 11,
      closingRank: 25000,
      fees: "₹4.8L/year",
      placement: "90%",
      avgPackage: "₹12L",
      probability: "Low",
      type: "Private",
      logo: GraduationCap
    },
    {
      id: 6,
      name: "AIIMS Delhi",
      location: "New Delhi, Delhi",
      nirfRank: 1,
      closingRank: 50,
      fees: "₹1,628/year",
      placement: "100%",
      avgPackage: "₹25L",
      probability: "High",
      type: "Government",
      logo: GraduationCap
    }
  ]);
};
