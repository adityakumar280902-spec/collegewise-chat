import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ComparePage = () => {
  const location = useLocation();
  const { colleges: initialColleges } = location.state || { colleges: [] };
  
  const [colleges, setColleges] = useState(initialColleges);

  if (!colleges || colleges.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">No colleges to compare</h1>
        <p className="text-muted-foreground mb-8">Please select some colleges from the search results to compare them.</p>
        <Link to="/">
          <Button>Back to Search</Button>
        </Link>
      </div>
    );
  }

  const attributes = [
    { key: 'nirfRank', label: 'NIRF Rank', lowerIsBetter: true },
    { key: 'fees', label: 'Fees', lowerIsBetter: true },
    { key: 'avgPackage', label: 'Average Package', lowerIsBetter: false },
    { key: 'placement', label: 'Placement', lowerIsBetter: false },
  ];

  const getNumericValue = (value: any) => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') {
      return parseFloat(value.replace(/[^\d.]/g, ''));
    }
    return 0;
  };

  const findBestCollegeForAttribute = (attribute: any) => {
    if(colleges.length === 0) return -1;
    let bestCollege = colleges[0];
    for (let i = 1; i < colleges.length; i++) {
      const currentValue = getNumericValue(colleges[i][attribute.key]);
      const bestValue = getNumericValue(bestCollege[attribute.key]);

      if (attribute.lowerIsBetter) {
        if (currentValue < bestValue) {
          bestCollege = colleges[i];
        }
      } else {
        if (currentValue > bestValue) {
          bestCollege = colleges[i];
        }
      }
    }
    return bestCollege.id;
  };

  const removeCollege = (id: number) => {
    setColleges(colleges.filter((c:any) => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/search">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">College Comparison</h1>
          </div>
        </div>
      </header>

      {/* Comparison Table */}
      <div className="container mx-auto px-4 py-8">
        <div className={`grid grid-cols-${colleges.length + 1} gap-4`}>

          {/* Attribute Headers */}
          <div className="space-y-4">
            <Card className="p-4 bg-card border-border font-semibold flex items-center h-48"></Card>
            {attributes.map((attr) => (
              <Card key={attr.key} className="p-4 bg-card border-border font-semibold flex items-center h-24">
                {attr.label}
              </Card>
            ))}
          </div>

          {/* College Columns */}
          {colleges.map((college:any) => {
            return (
              <div key={college.id} className="space-y-4">
                <Card className="p-4 bg-card border-border text-center relative h-48">
                  <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => removeCollege(college.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                  <Avatar className="mx-auto mb-4 h-16 w-16">
                    <AvatarImage src={college.logo} />
                    <AvatarFallback><GraduationCap /></AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold">{college.name}</h3>
                  <p className="text-sm text-muted-foreground">{college.location}</p>
                </Card>
                {attributes.map((attr) => {
                  const bestId = findBestCollegeForAttribute(attr);
                  return (
                    <Card
                      key={`${college.id}-${attr.key}`}
                      className={`p-4 flex items-center justify-center text-center text-lg font-semibold h-24 ${
                        college.id === bestId ? 'bg-primary/10 border-primary/20' : 'bg-card border-border'
                      }`}>
                       <span className={college.id === bestId ? 'text-primary' : ''}>
                          {college[attr.key]}
                       </span>
                    </Card>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
