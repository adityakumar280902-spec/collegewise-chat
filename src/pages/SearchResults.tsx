import { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowLeft, Plus, TrendingUp, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComparisonSheet } from "@/components/ui/comparison-sheet";
import { useToast } from "@/hooks/use-toast";

const mockColleges = [
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
];

const SearchResults = () => {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const { toast } = useToast();
  
  const examType = searchParams.get("examType");
  const rank = searchParams.get("rank");
  const query = searchParams.get("query");

  const [selectedColleges, setSelectedColleges] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredColleges = useMemo(() => {
    return mockColleges.filter(college => {
      if (rank) {
        return college.closingRank >= parseInt(rank, 10);
      }
      if (query) {
        return college.name.toLowerCase().includes(query.toLowerCase());
      }
      return true; // Show all if no query or rank
    });
  }, [rank, query]);

  const toggleCollege = (college: any) => {
    if (selectedColleges.find((c) => c.id === college.id)) {
      setSelectedColleges(selectedColleges.filter((c) => c.id !== college.id));
    } else {
      if (selectedColleges.length < 4) {
        setSelectedColleges([...selectedColleges, college]);
      } else {
        toast({
          title: "Maximum of 4 colleges can be compared at a time.",
          variant: "destructive",
        });
      }
    }
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case "High":
        return "bg-primary/20 text-primary border-primary/30";
      case "Medium":
        return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
      default:
        return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-2">
              <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for colleges, branches, or locations..."
                  className="pl-10 bg-card border-border"
                  defaultValue={query || ""}
                />
              </div>
               {selectedColleges.length > 0 ? (
                <Link to={{ pathname: "/compare"}} state={{ colleges: selectedColleges }}>
                  <Button className="gap-2 glow-primary">
                    Compare {selectedColleges.length} Colleges
                    <TrendingUp className="h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex-shrink-0"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="w-64 flex-shrink-0">
              <Card className="p-6 bg-card border-border sticky top-24">
                <h3 className="font-semibold mb-4">Filters</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      College Type
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Government</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">Private</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Location
                    </label>
                    <Input placeholder="Enter city or state" className="bg-background" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      Fee Range
                    </label>
                    <Input placeholder="Max fees per year" className="bg-background" />
                  </div>
                </div>
              </Card>
            </aside>
          )}

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-1">
                  {query ? `Results for "${query}"` : `Colleges for ${examType || ''} Rank ${rank || ''}`}
                </h2>
                <p className="text-muted-foreground">
                  Found {filteredColleges.length} colleges matching your criteria
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {filteredColleges.map((college) => (
                <Card
                  key={college.id}
                  className={`p-6 bg-card border-border card-hover cursor-pointer ${
                    selectedColleges.find((c) => c.id === college.id)
                      ? 'border-primary shadow-lg'
                      : ''
                  }`}
                  onClick={() => toggleCollege(college)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                          <GraduationCap className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{college.name}</h3>
                            <Badge variant="outline" className={getProbabilityColor(college.probability)}>
                              {college.probability} Chance
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {college.location}
                            </span>
                            <span>NIRF Rank: #{college.nirfRank}</span>
                            <span>{college.type}</span>
                          </div>
                          <div className="grid grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-muted-foreground">Closing Rank</p>
                              <p className="font-semibold text-primary">{college.closingRank}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Fees</p>
                              <p className="font-semibold">{college.fees}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Placement</p>
                              <p className="font-semibold">{college.placement}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">Avg Package</p>
                              <p className="font-semibold text-secondary">{college.avgPackage}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant={selectedColleges.find((c) => c.id === college.id) ? "default" : "outline"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCollege(college);
                      }}
                    >
                      <Plus className={`h-5 w-5 transition-transform ${selectedColleges.find((c) => c.id === college.id) ? 'rotate-45' : ''}`} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ComparisonSheet selectedColleges={selectedColleges} setSelectedColleges={setSelectedColleges} />
    </div>
  );
};

export default SearchResults;
