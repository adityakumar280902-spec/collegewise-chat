import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, GraduationCap, MapPin, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useMemo } from "react";

const Compare = () => {
  const location = useLocation();
  const { colleges: collegeDetails } = location.state || { colleges: [] };

  const summary = useMemo(() => {
    if (!collegeDetails || collegeDetails.length === 0) {
      return {
        bestValue: null,
        highestPackage: null,
        bestCampus: null,
      };
    }

    const bestValue = collegeDetails.reduce((prev, curr) => {
      const prevFees = parseInt(prev.fees.replace(/[^\d.]/g, ''));
      const currFees = parseInt(curr.fees.replace(/[^\d.]/g, ''));
      return prevFees < currFees ? prev : curr;
    });

    const highestPackage = collegeDetails.reduce((prev, curr) => {
      const prevPackage = parseInt(prev.avgPackage.replace(/[^\d.]/g, ''));
      const currPackage = parseInt(curr.avgPackage.replace(/[^\d.]/g, ''));
      return prevPackage > currPackage ? prev : curr;
    });

    const bestCampus = collegeDetails.reduce((prev, curr) => {
      const prevCampus = parseInt(prev.campus.replace(/[^\d.]/g, ''));
      const currCampus = parseInt(curr.campus.replace(/[^\d.]/g, ''));
      return prevCampus > currCampus ? prev : curr;
    });

    return { bestValue, highestPackage, bestCampus };
  }, [collegeDetails]);

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
                  Side-by-side comparison of {collegeDetails.length} colleges
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
          {collegeDetails.map((college) => (
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
        {summary.bestValue && summary.highestPackage && summary.bestCampus && (
          <Card className="mt-8 p-6 bg-card border-border">
            <h3 className="text-lg font-semibold mb-4">Quick Comparison Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Best Value for Money</p>
                <p className="font-semibold text-primary">{summary.bestValue.name}</p>
                <p className="text-xs text-muted-foreground">Lowest fees with excellent placement</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Highest Package</p>
                <p className="font-semibold text-secondary">{summary.highestPackage.name}</p>
                <p className="text-xs text-muted-foreground">{summary.highestPackage.avgPackage} average package</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Best Campus</p>
                <p className="font-semibold text-primary">{summary.bestCampus.name}</p>
                <p className="text-xs text-muted-foreground">{summary.bestCampus.campus} of green campus</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Compare;
