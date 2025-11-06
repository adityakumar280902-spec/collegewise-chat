import { useNavigate } from "react-router-dom";
import { Search, TrendingUp, Users, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { fetchTrendingColleges } from "@/lib/api";

const Index = () => {
  const navigate = useNavigate();

  const { data: trendingColleges, isLoading } = useQuery({
    queryKey: ["trendingColleges"],
    queryFn: fetchTrendingColleges,
  });

  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const examType = formData.get("examType");
    const rank = formData.get("rank");
    if (examType && rank) {
      navigate(`/search?examType=${examType}&rank=${rank}`);
    }
  };

  const features = [
    {
      icon: Search,
      title: "Rank-Based Search",
      description: "Find colleges that match your JEE, NEET, or other exam ranks instantly"
    },
    {
      icon: TrendingUp,
      title: "Compare Colleges",
      description: "Side-by-side comparison of fees, placements, and facilities"
    },
    {
      icon: Users,
      title: "Talk to Seniors",
      description: "Connect with current students and alumni for real insights"
    }
  ];

  const exams = [
    { value: "jee-main", label: "JEE Main" },
    { value: "jee-advanced", label: "JEE Advanced" },
    { value: "neet", label: "NEET" },
    { value: "comedk", label: "COMEDK" },
    { value: "wbjee", label: "WBJEE" },
    { value: "kcet", label: "KCET" },
    { value: "cuet", label: "CUET" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              India's Most Transparent College Discovery Platform
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect
            <br />
            <span className="text-primary">College Match</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover colleges based on your rank, compare side-by-side, and connect with seniors
            for real insights. All in one place.
          </p>

          {/* Search Card */}
          <Card className="p-8 bg-card border-border glow-primary">
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select name="examType">
                  <SelectTrigger className="bg-background border-border h-14 text-lg">
                    <SelectValue placeholder="Select Exam Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {exams.map((exam) => (
                      <SelectItem key={exam.value} value={exam.value}>
                        {exam.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Input
                  type="number"
                  name="rank"
                  placeholder="Enter Your Rank"
                  className="bg-background border-border h-14 text-lg"
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg gap-2 glow-primary"
              >
                <Search className="h-5 w-5" />
                Find Colleges
              </Button>
            </form>
          </Card>

          {/* Trending Colleges */}
          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-4">Trending Searches:</p>
            {isLoading ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 w-32 bg-muted/50 rounded-full animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 justify-center">
                {trendingColleges?.slice(0, 8).map((college) => (
                  <button
                    key={college.id}
                    className="px-4 py-2 rounded-full bg-muted hover:bg-muted/80 text-sm transition-colors"
                    onClick={() => navigate(`/search?query=${college.name}`)}
                  >
                    {college.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Choose Right
            </h2>
            <p className="text-xl text-muted-foreground">
              Make informed decisions with comprehensive data and real student insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="p-6 bg-card border-border card-hover text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Find Your Dream College?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students making informed decisions
            </p>
            <Button
              size="lg"
              className="h-14 px-8 text-lg gap-2 glow-primary"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <Search className="h-5 w-5" />
              Start Exploring
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 CollegeMatch. Helping students find their perfect college.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;