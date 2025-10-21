import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, MapPin, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const mockCollegeDetails = [
  {
    id: 1,
    name: "IIT Bombay",
    location: "Mumbai, Maharashtra",
    logo: GraduationCap,
    nirfRank: 3,
    closingRank: 67,
    fees: "₹2.5L/year",
    placement: "98%",
    avgPackage: "₹22L",
    hostel: "Available",
    campus: "550 acres"
  },
  {
    id: 2,
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    logo: GraduationCap,
    nirfRank: 25,
    closingRank: 8500,
    fees: "₹5.3L/year",
    placement: "95%",
    avgPackage: "₹18L",
    hostel: "Available",
    campus: "328 acres"
  },
  {
    id: 3,
    name: "NIT Trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    logo: GraduationCap,
    nirfRank: 9,
    closingRank: 12000,
    fees: "₹1.8L/year",
    placement: "92%",
    avgPackage: "₹15L",
    hostel: "Available",
    campus: "800 acres"
  }
];

const Compare = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/search">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold">College Comparison</h1>
                <p className="text-sm text-muted-foreground">
                  Side-by-side comparison of {mockCollegeDetails.length} colleges
                </p>
              </div>
            </div>
            <Link to="/seniors">
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                Talk to Seniors
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Comparison Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockCollegeDetails.map((college) => (
            <Card key={college.id} className="bg-card border-border overflow-hidden card-hover">
              {/* College Header */}
              <div className="p-6 border-b border-border bg-primary/5">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <college.logo className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{college.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {college.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison Metrics */}
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">NIRF Rank</span>
                  <span className="font-semibold">#{college.nirfRank}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Closing Rank</span>
                  <span className="font-semibold text-primary">{college.closingRank}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Annual Fees</span>
                  <span className="font-semibold">{college.fees}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Placement Rate</span>
                  <span className="font-semibold">{college.placement}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Avg Package</span>
                  <span className="font-semibold text-secondary">{college.avgPackage}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Hostel</span>
                  <span className="font-semibold">{college.hostel}</span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-sm text-muted-foreground">Campus Size</span>
                  <span className="font-semibold">{college.campus}</span>
                </div>

                <Button className="w-full mt-4 gap-2 glow-primary">
                  <TrendingUp className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary Section */}
        <Card className="mt-8 p-6 bg-card border-border">
          <h3 className="text-lg font-semibold mb-4">Quick Comparison Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Best Value for Money</p>
              <p className="font-semibold text-primary">NIT Trichy</p>
              <p className="text-xs text-muted-foreground">Lowest fees with excellent placement</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Highest Package</p>
              <p className="font-semibold text-secondary">IIT Bombay</p>
              <p className="text-xs text-muted-foreground">₹22L average package</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Best Campus</p>
              <p className="font-semibold text-primary">NIT Trichy</p>
              <p className="text-xs text-muted-foreground">800 acres of green campus</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Compare;
