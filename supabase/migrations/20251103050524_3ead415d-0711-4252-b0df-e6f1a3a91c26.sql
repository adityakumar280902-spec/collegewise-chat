-- Create colleges table
CREATE TABLE colleges (
    college_id SERIAL PRIMARY KEY,
    college_name VARCHAR(255) NOT NULL,
    type VARCHAR(50) CHECK (type IN ('Government', 'Private', 'Deemed', 'Autonomous')),
    nirf_rank INT,
    state VARCHAR(100),
    city VARCHAR(100),
    website VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(20),
    avg_placement DECIMAL(10,2),
    median_placement DECIMAL(10,2),
    image_logo TEXT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create programs table
CREATE TABLE programs (
    program_id SERIAL PRIMARY KEY,
    college_id INT REFERENCES colleges(college_id) ON DELETE CASCADE,
    program_name VARCHAR(255) NOT NULL,
    degree_level VARCHAR(50),
    seats_total INT,
    duration_years INT,
    annual_fee DECIMAL(12,2),
    hostel_available BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create cutoffs table
CREATE TABLE cutoffs (
    cutoff_id SERIAL PRIMARY KEY,
    program_id INT REFERENCES programs(program_id) ON DELETE CASCADE,
    exam_type VARCHAR(50) CHECK (exam_type IN ('JEE_MAIN', 'JEE_ADVANCED', 'COMEDK', 'WBJEE', 'NEET', 'CUET', 'KCET')),
    year INT,
    category VARCHAR(50) CHECK (category IN ('GEN', 'OBC', 'SC', 'ST', 'EWS')),
    opening_rank INT,
    closing_rank INT,
    percentile DECIMAL(6,3),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create comparisons table
CREATE TABLE comparisons (
    comparison_id SERIAL PRIMARY KEY,
    session_id VARCHAR(100) NOT NULL,
    college_ids TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create senior_profiles table
CREATE TABLE senior_profiles (
    senior_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    college_id INT REFERENCES colleges(college_id) ON DELETE CASCADE,
    program_name VARCHAR(255),
    passing_year INT,
    contact_link VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    description TEXT
);

-- Create chat_messages table
CREATE TABLE chat_messages (
    message_id SERIAL PRIMARY KEY,
    college_id INT REFERENCES colleges(college_id) ON DELETE CASCADE,
    senior_id INT REFERENCES senior_profiles(senior_id),
    sender_name VARCHAR(255),
    message TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX idx_cutoffs_exam_rank ON cutoffs(exam_type, closing_rank);
CREATE INDEX idx_programs_college ON programs(college_id);
CREATE INDEX idx_chat_college ON chat_messages(college_id);
CREATE INDEX idx_cutoffs_program ON cutoffs(program_id);
CREATE INDEX idx_senior_college ON senior_profiles(college_id);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cutoffs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE senior_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no authentication required)
CREATE POLICY "Public can view colleges" ON colleges FOR SELECT USING (true);
CREATE POLICY "Public can view programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Public can view cutoffs" ON cutoffs FOR SELECT USING (true);
CREATE POLICY "Public can view senior profiles" ON senior_profiles FOR SELECT USING (true);
CREATE POLICY "Public can view chat messages" ON chat_messages FOR SELECT USING (true);

-- Allow public to insert comparisons and chat messages
CREATE POLICY "Public can insert comparisons" ON comparisons FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can view own comparisons" ON comparisons FOR SELECT USING (true);
CREATE POLICY "Public can insert chat messages" ON chat_messages FOR INSERT WITH CHECK (true);