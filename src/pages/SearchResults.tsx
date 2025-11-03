import { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowLeft, Plus, TrendingUp, MapPin, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComparisonSheet } from "@/components/ui/comparison-sheet";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { searchCollegesByRank, searchCollegesByName } from "@/lib/api";

const SearchResults = () => {
  const location = useLocation();
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const { toast } = useToast();
  
  const examType = searchParams.get("examType");
  const rank = searchParams.get("rank");
  const query = searchParams.get("query");

  const [selectedColleges, setSelectedColleges] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch colleges based on search parameters
  const { data: colleges, isLoading } = useQuery({
    queryKey: ["searchColleges", examType, rank, query],
    queryFn: async () => {
      if (rank && examType) {
        return await searchCollegesByRank(examType, parseInt(rank, 10));
      } else if (query) {
        return await searchCollegesByName(query);
      }
      return [];
    },
    enabled: !!(rank && examType) || !!query,
  });

  const filteredColleges = colleges || [];

  const toggleCollege = (college: any) => {
    if (selectedColleges.find((c) => c.id === college.id)) {
      setSelectedColleges(selectedColleges.filter((c) => c.id !== college.id));
      toast({
        title: `${college.name} removed from comparison.`,
      });
    } else {
      if (selectedColleges.length < 4) {
        setSelectedColleges([...selectedColleges, college]);
        toast({
          title: `${college.name} added to comparison.`,
        });
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

            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Card key={i} className="p-6 bg-card border-border">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-muted animate-pulse" />
                      <div className="flex-1 space-y-3">
                        <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
                        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
                        <div className="grid grid-cols-4 gap-4">
                          {[...Array(4)].map((_, j) => (
                            <div key={j} className="h-10 bg-muted rounded animate-pulse" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredColleges.length === 0 ? (
              <Card className="p-12 text-center bg-card border-border">
                <GraduationCap className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No colleges found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters
                </p>
              </Card>
            ) : (
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
            )}
          </div>
        </div>
      </div>
      <ComparisonSheet selectedColleges={selectedColleges} setSelectedColleges={setSelectedColleges} />
    </div>
  );
};

export default SearchResults;
