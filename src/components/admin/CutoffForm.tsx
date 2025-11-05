import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Cutoff, createCutoff, updateCutoff } from "@/lib/collegeApi";

const formSchema = z.object({
    program_id: z.preprocess(
        (val) => (val === "" ? 0 : Number(val)),
        z.number().min(1, "Program ID is required").refine((val) => !isNaN(val), { message: "Must be a number" })
    ),
    exam_type: z.string().min(1, "Exam type is required"),
    year: z.preprocess(
        (val) => (val === "" ? 0 : Number(val)),
        z.number().min(1, "Year is required").refine((val) => !isNaN(val), { message: "Must be a number" })
    ),
    category: z.string().min(1, "Category is required"),
    closing_rank: z.preprocess(
        (val) => (val === "" ? 0 : Number(val)),
        z.number().min(1, "Closing rank is required").refine((val) => !isNaN(val), { message: "Must be a number" })
    ),
    opening_rank: z.preprocess(
        (val) => (val === "" ? 0 : Number(val)),
        z.number().min(1, "Opening rank is required").refine((val) => !isNaN(val), { message: "Must be a number" })
    ),
});

interface CutoffFormProps {
    cutoff?: Cutoff | null;
    onSuccess: () => void;
}

const CutoffForm = ({ cutoff, onSuccess }: CutoffFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: cutoff
            ? {
                  program_id: cutoff.program_id,
                  exam_type: cutoff.exam_type,
                  year: cutoff.year,
                  category: cutoff.category,
                  closing_rank: cutoff.closing_rank,
                  opening_rank: cutoff.opening_rank,
              }
            : {
                  program_id: 0,
                  exam_type: "",
                  year: new Date().getFullYear(),
                  category: "",
                  closing_rank: 0,
                  opening_rank: 0,
              },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (cutoff) {
                await updateCutoff(cutoff.cutoff_id, values as Partial<Cutoff>);
            } else {
                await createCutoff(values as any);
            }
            onSuccess();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="program_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Program ID</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="1" {...field} value={field.value === 0 ? "" : field.value} onChange={e => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="exam_type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Exam Type</FormLabel>
                            <FormControl>
                                <Input placeholder="JEE_ADV" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Year</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="2023" {...field} value={field.value === 0 ? "" : field.value} onChange={e => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="OPEN" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="opening_rank"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Opening Rank</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="1" {...field} value={field.value === 0 ? "" : field.value} onChange={e => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="closing_rank"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Closing Rank</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="100" {...field} value={field.value === 0 ? "" : field.value} onChange={e => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">{cutoff ? "Update" : "Create"} Cutoff</Button>
            </form>
        </Form>
    );
};

export default CutoffForm;
