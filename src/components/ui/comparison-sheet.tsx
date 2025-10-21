
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./button";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
import { Link } from "react-router-dom";
import { Badge } from "./badge";

export const ComparisonSheet = ({
  selectedColleges,
  setSelectedColleges,
}: any) => {
  const avgStats =
    selectedColleges.length > 0
      ? selectedColleges.reduce(
          (acc: any, curr: any) => {
            const fees = parseInt(curr.fees.replace(/[^0-9]/g, "")) || 0;
            const avgPackage = parseInt(curr.avgPackage.replace(/[^0-9]/g, "")) || 0;
            return {
              fees: acc.fees + fees,
              avgPackage: acc.avgPackage + avgPackage,
              nirfRank: acc.nirfRank + curr.nirfRank,
            };
          },
          { fees: 0, avgPackage: 0, nirfRank: 0 }
        )
      : { fees: 0, avgPackage: 0, nirfRank: 0 };

  return (
    <Sheet>
      {selectedColleges.length > 0 && (
        <SheetTrigger asChild>
          <Button className="fixed bottom-5 right-5 shadow-lg shadow-primary/30 glow-primary">
            Compare ({selectedColleges.length})
          </Button>
        </SheetTrigger>
      )}
      <SheetContent className="w-full md:w-[450px]">
        <SheetHeader>
          <SheetTitle>Comparing {selectedColleges.length} Colleges</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-4 h-full pb-24 overflow-y-auto">
          {selectedColleges.map((college: any) => (
            <div
              key={college.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={college.logo} />
                  <AvatarFallback>
                    <GraduationCap />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{college.name}</h3>
                  <p className="text-sm text-muted-foreground">{college.location}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setSelectedColleges(
                    selectedColleges.filter((c: any) => c.id !== college.id)
                  )
                }
              >
                Remove
              </Button>
            </div>
          ))}
          {selectedColleges.length > 0 && (
            <>
              <Separator />
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold">Average Stats</h3>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Fees</p>
                  <p className="font-semibold">
                    {(avgStats.fees / selectedColleges.length).toLocaleString(
                      "en-IN",
                      {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }
                    )}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">Package</p>
                  <p className="font-semibold">
                    {(
                      avgStats.avgPackage / selectedColleges.length
                    ).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    })}
                    LPA
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-muted-foreground">NIRF Rank</p>
                  <Badge variant="outline">
                    #
                    {Math.round(avgStats.nirfRank / selectedColleges.length)}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </div>
        {selectedColleges.length > 0 && (
          <div className="absolute bottom-5 right-5 left-5">
            <Link to="/compare" state={{ colleges: selectedColleges }}>
              <Button className="w-full glow-primary">
                Compare Colleges <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
