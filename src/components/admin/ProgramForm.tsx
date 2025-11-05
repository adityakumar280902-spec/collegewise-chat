import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Program, createProgram, updateProgram } from "@/lib/collegeApi";

const formSchema = z.object({
    college_id: z.preprocess(
        (val) => (val === "" ? 0 : Number(val)),
        z.number().min(1, "College ID is required").refine((val) => !isNaN(val), { message: "Must be a number" })
    ),
    program_name: z.string().min(1, "Program name is required"),
    annual_fee: z.preprocess(
        (val) => (val === "" ? null : Number(val)),
        z.number().nullable().refine((val) => val === null || !isNaN(val), { message: "Must be a number" })
    ),
    hostel_available: z.boolean(),
});

interface ProgramFormProps {
    program?: Program | null;
    onSuccess: () => void;
}

const ProgramForm = ({ program, onSuccess }: ProgramFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: program
            ? {
                  college_id: program.college_id,
                  program_name: program.program_name,
                  annual_fee: program.annual_fee ?? null,
                  hostel_available: program.hostel_available,
              }
            : {
                  college_id: 0,
                  program_name: "",
                  annual_fee: null,
                  hostel_available: false,
              },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (program) {
                await updateProgram(program.program_id, values as Partial<Program>);
            } else {
                await createProgram(values as any);
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
                    name="college_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>College ID</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="1" {...field} value={field.value === 0 ? "" : field.value} onChange={e => field.onChange(e.target.value === "" ? 0 : parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="program_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Program Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Computer Science" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="annual_fee"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Annual Fee</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="100000" {...field} value={field.value ?? ""} onChange={e => field.onChange(e.target.value === "" ? null : parseInt(e.target.value))} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="hostel_available"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Hostel Available
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
                <Button type="submit">{program ? "Update" : "Create"} Program</Button>
            </form>
        </Form>
    );
};

export default ProgramForm;
