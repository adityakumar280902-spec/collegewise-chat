
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
      ? selectedColleges.reduce((acc: any, curr: any) => {
          return {
            fees: acc.fees + parseInt(curr.fees.replace(/[^0-9]/g, "")),
            avgPackage:
              acc.avgPackage +
              parseInt(curr.avgPackage.replace(/[^0-9]/g, "")),
            nirfRank: acc.nirfRank + curr.nirfRank,
          };
        })
      : { fees: 0, avgPackage: 0, nirfRank: 0 };

  const onCompare = () => {
    window.location.href = `/compare?colleges=${selectedColleges
      .map((c: any) => c.id)
      .join(",")}`;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="fixed bottom-5 right-5 shadow-lg shadow-primary/30">
          Compare ({selectedColleges.length})
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-[450px]">
        <SheetHeader>
          <SheetTitle>Comparing {selectedColleges.length} Colleges</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4 mt-4">
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
                  <p className="text-sm text-gray-500">{college.location}</p>
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
          <Separator />
          <div className="flex flex-col space-y-2">
            <h3 className="font-semibold">Average Stats</h3>
            <div className="flex justify-between">
              <p>Fees</p>
              <p>
                {(avgStats.fees / selectedColleges.length).toLocaleString(
                  "en-IN",
                  {
                    style: "currency",
                    currency: "INR",
                  }
                )}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Package</p>
              <p>
                {(
                  avgStats.avgPackage / selectedColleges.length
                ).toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </p>
            </div>
            <div className="flex justify-between">
              <p>NIRF Rank</p>
              <Badge variant="outline">
                #
                {Math.round(avgStats.nirfRank / selectedColleges.length)}
              </Badge>
            </div>
          </div>
          <Separator />
        </div>
        <div className="absolute bottom-5 right-5 left-5">
          <Link to={{
            pathname: "/compare",
            state: { colleges: selectedColleges }
          }}>
            <Button className="w-full" onClick={onCompare}>
              Compare Colleges <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
