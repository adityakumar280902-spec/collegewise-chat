import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { College, createCollege, updateCollege } from "@/lib/collegeApi";

const formSchema = z.object({
    college_name: z.string().min(1, "College name is required"),
    type: z.string().nullable(),
    nirf_rank: z.preprocess(
        (val) => (val === "" ? null : Number(val)),
        z.number().nullable().refine((val) => val === null || !isNaN(val), { message: "Must be a number" })
    ),
    state: z.string().nullable(),
    city: z.string().nullable(),
    avg_placement: z.preprocess(
        (val) => (val === "" ? null : Number(val)),
        z.number().nullable().refine((val) => val === null || !isNaN(val), { message: "Must be a number" })
    ),
    median_placement: z.preprocess(
        (val) => (val === "" ? null : Number(val)),
        z.number().nullable().refine((val) => val === null || !isNaN(val), { message: "Must be a number" })
    ),
    image_logo: z.string().nullable(),
});

interface CollegeFormProps {
    college?: College | null;
    onSuccess: () => void;
}

const CollegeForm = ({ college, onSuccess }: CollegeFormProps) => {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: college
            ? {
                  college_name: college.college_name,
                  type: college.type ?? null,
                  nirf_rank: college.nirf_rank ?? null,
                  state: college.state ?? null,
                  city: college.city ?? null,
                  avg_placement: college.avg_placement ?? null,
                  median_placement: college.median_placement ?? null,
                  image_logo: college.image_logo ?? null,
              }
            : {
                  college_name: "",
                  type: null,
                  nirf_rank: null,
                  state: null,
                  city: null,
                  avg_placement: null,
                  median_placement: null,
                  image_logo: null,
              },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (college) {
                await updateCollege(college.college_id, values as Partial<College>);
            } else {
                await createCollege(values as any);
            }
            toast({
                title: "Success",
                description: college ? "College updated successfully" : "College created successfully",
            });
            onSuccess();
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to save college. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="college_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>College Name</FormLabel>
                            <FormControl>
                                <Input placeholder="IIT Bombay" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value ?? undefined}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Government">Government</SelectItem>
                                    <SelectItem value="Private">Private</SelectItem>
                                    <SelectItem value="Deemed">Deemed</SelectItem>
                                    <SelectItem value="Autonomous">Autonomous</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nirf_rank"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>NIRF Rank</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="1" {...field} value={field.value ?? ""} onChange={e => field.onChange(e.target.value === "" ? null : parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="Maharashtra" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="Mumbai" {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="avg_placement"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Average Placement (%)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="90" {...field} value={field.value ?? ""} onChange={e => field.onChange(e.target.value === "" ? null : parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="median_placement"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Median Placement (LPA)</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="25" {...field} value={field.value ?? ""} onChange={e => field.onChange(e.target.value === "" ? null : parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image_logo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Logo URL</FormLabel>
                            <FormControl>
                                <Input placeholder="https://example.com/logo.png" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{college ? "Update" : "Create"} College</Button>
            </form>
        </Form>
    );
};

export default CollegeForm;
