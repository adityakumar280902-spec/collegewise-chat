import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { seedColleges } from "@/utils/seedColleges";
import { useToast } from "@/hooks/use-toast";

const DataSeeder = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const results = await seedColleges();
      toast({
        title: "Success!",
        description: `Added ${results.length} colleges to the database`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to seed colleges. Check console for details.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Database Seeder</CardTitle>
        <CardDescription>
          Populate the database with top 40 engineering colleges in India
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleSeed} disabled={isSeeding}>
          {isSeeding ? "Seeding..." : "Seed Top 40 Colleges"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataSeeder;
