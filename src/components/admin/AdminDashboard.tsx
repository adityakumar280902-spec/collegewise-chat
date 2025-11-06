import { useState, useEffect } from "react";
import { College, Program, Cutoff, getColleges, getPrograms, getCutoffs, deleteCollege, deleteProgram, deleteCutoff } from "@/lib/collegeApi";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CollegeForm from "./CollegeForm";
import ProgramForm from "./ProgramForm";
import CutoffForm from "./CutoffForm";
import DataSeeder from "./DataSeeder";

const AdminDashboard = () => {
    const { toast } = useToast();
    const [colleges, setColleges] = useState<College[]>([]);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [cutoffs, setCutoffs] = useState<Cutoff[]>([]);

    const [editingCollege, setEditingCollege] = useState<College | null>(null);
    const [editingProgram, setEditingProgram] = useState<Program | null>(null);
    const [editingCutoff, setEditingCutoff] = useState<Cutoff | null>(null);

    const [showCollegeForm, setShowCollegeForm] = useState(false);
    const [showProgramForm, setShowProgramForm] = useState(false);
    const [showCutoffForm, setShowCutoffForm] = useState(false);

    const fetchData = async () => {
        setColleges(await getColleges());
        setPrograms(await getPrograms());
        setCutoffs(await getCutoffs());
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSuccess = () => {
        fetchData();
        setShowCollegeForm(false);
        setShowProgramForm(false);
        setShowCutoffForm(false);
        setEditingCollege(null);
        setEditingProgram(null);
        setEditingCutoff(null);
        toast({
            title: "Success",
            description: "Operation completed successfully",
        });
    };

    const handleDelete = async (type: 'college' | 'program' | 'cutoff', id: number) => {
        try {
            if (type === 'college') await deleteCollege(id);
            if (type === 'program') await deleteProgram(id);
            if (type === 'cutoff') await deleteCutoff(id);
            fetchData();
            toast({
                title: "Deleted",
                description: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`,
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="space-y-8">
            <DataSeeder />
            
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Colleges</h2>
                    <Button onClick={() => { setEditingCollege(null); setShowCollegeForm(true); }}>Add College</Button>
                </div>
                {showCollegeForm && <CollegeForm college={editingCollege} onSuccess={handleSuccess} />}
                <div className="space-y-2">
                    {colleges.map(c => (
                        <div key={c.college_id} className="flex justify-between items-center p-2 border rounded">
                            <span>{c.college_name}</span>
                            <div>
                                <Button variant="outline" size="sm" onClick={() => { setEditingCollege(c); setShowCollegeForm(true); }}>Edit</Button>
                                <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete('college', c.college_id)}>Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Programs</h2>
                    <Button onClick={() => { setEditingProgram(null); setShowProgramForm(true); }}>Add Program</Button>
                </div>
                {showProgramForm && <ProgramForm program={editingProgram} onSuccess={handleSuccess} />}
                <div className="space-y-2">
                    {programs.map(p => (
                        <div key={p.program_id} className="flex justify-between items-center p-2 border rounded">
                            <span>{p.program_name} (College ID: {p.college_id})</span>
                            <div>
                                <Button variant="outline" size="sm" onClick={() => { setEditingProgram(p); setShowProgramForm(true); }}>Edit</Button>
                                <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete('program', p.program_id)}>Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Cutoffs</h2>
                    <Button onClick={() => { setEditingCutoff(null); setShowCutoffForm(true); }}>Add Cutoff</Button>
                </div>
                {showCutoffForm && <CutoffForm cutoff={editingCutoff} onSuccess={handleSuccess} />}
                <div className="space-y-2">
                    {cutoffs.map(cu => (
                        <div key={cu.cutoff_id} className="flex justify-between items-center p-2 border rounded">
                            <span>{cu.exam_type} - {cu.year} - {cu.category} (Program ID: {cu.program_id})</span>
                            <div>
                                <Button variant="outline" size="sm" onClick={() => { setEditingCutoff(cu); setShowCutoffForm(true); }}>Edit</Button>
                                <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete('cutoff', cu.cutoff_id)}>Delete</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
