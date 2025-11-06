-- Enable INSERT, UPDATE, DELETE operations for colleges table
CREATE POLICY "Public can insert colleges" 
ON public.colleges 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can update colleges" 
ON public.colleges 
FOR UPDATE 
USING (true);

CREATE POLICY "Public can delete colleges" 
ON public.colleges 
FOR DELETE 
USING (true);

-- Enable INSERT, UPDATE, DELETE operations for programs table
CREATE POLICY "Public can insert programs" 
ON public.programs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can update programs" 
ON public.programs 
FOR UPDATE 
USING (true);

CREATE POLICY "Public can delete programs" 
ON public.programs 
FOR DELETE 
USING (true);

-- Enable INSERT, UPDATE, DELETE operations for cutoffs table
CREATE POLICY "Public can insert cutoffs" 
ON public.cutoffs 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can update cutoffs" 
ON public.cutoffs 
FOR UPDATE 
USING (true);

CREATE POLICY "Public can delete cutoffs" 
ON public.cutoffs 
FOR DELETE 
USING (true);