-- ==============================================================================
-- SUBHA DHANUSHA P - DIGITAL PORTFOLIO
-- SUPABASE SEED DATA (100% AUTHENTIC FROM ALL 4 RESUMES)
-- ==============================================================================

-- 1. SEED DOMAINS
INSERT INTO domains (id, name, slug, role_title, tagline, badge_text, accent_color, secondary_color, theme_code, is_active, display_order)
VALUES
(
    'ai-ml',
    'AI / Machine Learning',
    'ai-ml',
    'AI/ML Engineer',
    'Intelligent Systems, Predictive Modeling & Neural Architectures',
    'MODE 01 // NEURAL INTELLIGENCE',
    '#06b6d4',
    '#8b5cf6',
    'aiml',
    true,
    1
),
(
    'data-engineering',
    'Data Engineering / Cloud',
    'data-engineering',
    'Cloud Data Engineer',
    'Resilient Data Pipelines, Dimensional Lakehouses & Scalable Cloud Architectures',
    'MODE 02 // DATA INFRASTRUCTURE',
    '#f59e0b',
    '#3b82f6',
    'de',
    true,
    2
),
(
    'data-analytics',
    'Data Analytics / Financial Analysis',
    'data-analytics',
    'Data Analyst / Financial Data Analyst',
    'Quantitative Valuation, Financial Modeling & Actionable BI Storytelling',
    'MODE 03 // QUANTITATIVE ANALYTICS',
    '#10b981',
    '#14b8a6',
    'da',
    true,
    3
),
(
    'software',
    'Software / Full-Stack + AI & Data',
    'software',
    'AI & Data Software Engineer',
    'Full-Stack Architecture, Intelligent APIs & Systems Engineering',
    'MODE 04 // SYSTEMS & APPLICATIONS',
    '#8b5cf6',
    '#ec4899',
    'se',
    true,
    4
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    role_title = EXCLUDED.role_title,
    tagline = EXCLUDED.tagline,
    accent_color = EXCLUDED.accent_color,
    secondary_color = EXCLUDED.secondary_color,
    badge_text = EXCLUDED.badge_text,
    updated_at = now();

-- 2. SEED PROFILE
INSERT INTO profiles (id, full_name, short_name, email, phone, location, current_education, expected_graduation, cgpa, highest_gpa, github_url, linkedin_url, website_url)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Subha Dhanusha P',
    'Subha Dhanusha',
    'sdsubi0610@gmail.com',
    '+91 7845114897',
    'Kovilpatti, Tamil Nadu, India',
    'B.Tech in Artificial Intelligence and Data Science, Anna University (Ramco Institute of Technology)',
    'Expected May 2027',
    '8.28 / 10.0',
    '8.91 / 10.0',
    'https://github.com/Subha-Dhanusha',
    'https://linkedin.com/in/subha-dhanusha-b6b3ab291',
    'https://subha-dhanusha.github.io'
)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED HERO SECTIONS
INSERT INTO hero_sections (id, domain_id, headline, subheadline, description, primary_cta_label, primary_cta_url, secondary_cta_label, secondary_cta_url, badge_text, terminal_lines)
VALUES
(
    'b0000000-0000-0000-0000-000000000001',
    'ai-ml',
    'ARCHITECTING INTELLIGENT SYSTEMS & PREDICTIVE MODELS',
    'AI/ML Engineer × Neural Pipelines × Real-Time Inference',
    'Designing end-to-end machine learning pipelines from raw feature engineering to low-latency inference APIs. Built MediRisk AI delivering 87% diagnostic accuracy on clinical datasets with real-time Flask endpoints.',
    'Explore ML Projects',
    '#projects',
    'Download AI/ML Resume',
    '/resumes/Subha_Dhanusha_AI_ML_Resume.pdf',
    'MODE 01 // MACHINE LEARNING SPECIALIZATION',
    '[
        {"label": "status", "val": "Trained MediRisk AI Model (87% accuracy)"},
        {"label": "stack", "val": "Python, Scikit-learn, Pandas, Flask, Docker"},
        {"label": "inference", "val": "Sub-50ms REST API scoring online"},
        {"label": "pipeline", "val": "768 clinical samples × 8 engineered features"}
    ]'::jsonb
),
(
    'b0000000-0000-0000-0000-000000000002',
    'data-engineering',
    'ENGINEERING RESILIENT DATA PIPELINES & WAREHOUSES',
    'Cloud Data Engineer × Dimensional Modeling × ETL/ELT Systems',
    'Specializing in multi-tiered ETL/ELT pipelines, dimensional warehouse schemas (Star & Snowflake), data quality assurance, and cloud analytics. Architected financial pipeline engines and packet streaming capture systems.',
    'Explore Data Pipelines',
    '#projects',
    'Download Data Eng Resume',
    '/resumes/Subha_Dhanusha_Data_Engineering_Resume.pdf',
    'MODE 02 // CLOUD & DATA INFRASTRUCTURE',
    '[
        {"label": "architecture", "val": "Star Schema & 3-Tier Lakehouse"},
        {"label": "etl_status", "val": "Automated SQL transforms & cleansing"},
        {"label": "query_layer", "val": "Window functions (ROW_NUMBER, LAG, LEAD)"},
        {"label": "cloud_infra", "val": "AWS, GCP, PySpark, Spark SQL, Docker"}
    ]'::jsonb
),
(
    'b0000000-0000-0000-0000-000000000003',
    'data-analytics',
    'TRANSFORMING COMPLEX DATA INTO FINANCIAL INTELLIGENCE',
    'Financial Data Analyst × Equity Valuation × Power BI Storytelling',
    'Applying rigorous quantitative analytics, financial statement modeling, and valuation metrics (P/E, EPS, ROE, D/E Ratio). Experienced analyzing publicly listed equities at BlueStock FinTech with actionable BI reports.',
    'Explore Analytics Reports',
    '#projects',
    'Download Analytics Resume',
    '/resumes/Subha_Dhanusha_Data_Analytics_Resume.pdf',
    'MODE 03 // QUANTITATIVE FINANCIAL ANALYTICS',
    '[
        {"label": "internship", "val": "BlueStock FinTech Analytics Intern"},
        {"label": "metrics", "val": "P/E, EPS, ROE, Revenue Growth, D/E"},
        {"label": "tooling", "val": "Advanced SQL, Power BI, Excel Modeling"},
        {"label": "output", "val": "Structured equity investment research reports"}
    ]'::jsonb
),
(
    'b0000000-0000-0000-0000-000000000004',
    'software',
    'BUILDING INTELLIGENT FULL-STACK SOFTWARE SYSTEMS',
    'AI & Data Software Engineer × Production Web Apps × Microservices',
    'Engineering full-stack applications with robust Python backends, relational databases, RESTful endpoints, and modern frontend interfaces. Built chain-of-custody digital forensic platforms and full-stack enterprise portals.',
    'Explore Software Systems',
    '#projects',
    'Download Software Resume',
    '/resumes/Subha_Dhanusha_Software_Resume.pdf',
    'MODE 04 // FULL-STACK SOFTWARE & SYSTEMS',
    '[
        {"label": "core_stack", "val": "Python, Java, JavaScript, Flask, MySQL, React"},
        {"label": "security", "val": "Chain-of-custody digital forensic tracking"},
        {"label": "architecture", "val": "REST APIs + Relational Schemas + Authentication"},
        {"label": "internship", "val": "Techvolt Software Full Stack Development"}
    ]'::jsonb
)
ON CONFLICT (domain_id) DO UPDATE SET
    headline = EXCLUDED.headline,
    subheadline = EXCLUDED.subheadline,
    description = EXCLUDED.description,
    primary_cta_label = EXCLUDED.primary_cta_label,
    secondary_cta_label = EXCLUDED.secondary_cta_label,
    secondary_cta_url = EXCLUDED.secondary_cta_url,
    terminal_lines = EXCLUDED.terminal_lines,
    updated_at = now();

-- 4. SEED ABOUT SECTIONS
INSERT INTO about_sections (id, domain_id, role_subtitle, bio, highlights, focus_areas, stats)
VALUES
(
    'c0000000-0000-0000-0000-000000000001',
    'ai-ml',
    'Aspiring AI/ML Engineer with an eye for rigorous statistical foundations and production deployment.',
    'I am an AI and Data Science engineering student at Ramco Institute of Technology (Anna University) with a strong passion for training reliable machine learning models and shipping them as production-ready inference services. I combine solid mathematical understanding with practical tooling across Scikit-learn, Pandas, NumPy, and Flask.',
    '[
        "Developed MediRisk AI trained on 768 patient records across 8 clinical features, reaching 87% diagnostic accuracy",
        "Built full ML lifecycle: data cleaning, missing value imputation, standard scaling, model evaluation, and Flask API integration",
        "Secretary of the Neoteric AI Association, driving hands-on deep learning workshops for 100+ fellow engineers",
        "1st Place in Code Debugging Contest and Department Topper for 3 consecutive semesters (Highest GPA: 8.91)"
    ]'::jsonb,
    '[
        {"title": "Supervised Learning", "desc": "Classification, Regression, Ensemble Trees, ROC-AUC tuning"},
        {"title": "Feature Engineering", "desc": "Scaling, One-hot encoding, correlation matrices, dimensionality handling"},
        {"title": "Model Serving", "desc": "Flask REST APIs, Docker containerization, cloud deployment on Render"},
        {"title": "Data Processing", "desc": "Pandas DataFrames, NumPy vectorization, exploratory data analysis"}
    ]'::jsonb,
    '[
        {"label": "Model Accuracy", "val": "87%"},
        {"label": "Training Records", "val": "768"},
        {"label": "Academic CGPA", "val": "8.28"},
        {"label": "Semesters Topper", "val": "3"}
    ]'::jsonb
),
(
    'c0000000-0000-0000-0000-000000000002',
    'data-engineering',
    'Cloud Data Engineer crafting resilient ingestion pipelines and dimensional data warehouses.',
    'I build the robust data infrastructure that powers analytics and intelligent systems. My experience encompasses designing multi-stage ETL/ELT pipelines, architecting Star and Snowflake dimensional schemas, and enforcing stringent data quality controls. Experienced with PySpark, Spark SQL, AWS, GCP, and complex SQL window functions.',
    '[
        "Architected multi-layered financial pipeline with Star Schema, fact and dimension tables, and SQL analytical views",
        "Engineered automated ETL pipelines during BlueStock FinTech internship, transforming balance sheet and P&L statements",
        "Implemented data profiling and cleansing rules to guarantee high consistency and lineage across distributed tables",
        "Built network packet capture pipeline with indexed evidence retrieval and immutable chain-of-custody logging"
    ]'::jsonb,
    '[
        {"title": "Dimensional Modeling", "desc": "Star & Snowflake schema, Fact & Dimension tables, Slowly Changing Dimensions (SCD)"},
        {"title": "ETL / ELT Architecture", "desc": "3-Tier architecture, schema validation, data lakehouse design"},
        {"title": "Advanced SQL", "desc": "Window functions (ROW_NUMBER, RANK, LAG, LEAD), query optimization, JSON handling"},
        {"title": "Cloud & Big Data", "desc": "AWS, Google Cloud Platform, PySpark, Spark SQL, Docker"}
    ]'::jsonb,
    '[
        {"label": "Schema Paradigm", "val": "Star/Snowflake"},
        {"label": "Pipeline Tiers", "val": "3-Tier"},
        {"label": "SQL Optimization", "val": "Advanced"},
        {"label": "Certifications", "val": "AWS/Azure Cloud"}
    ]'::jsonb
),
(
    'c0000000-0000-0000-0000-000000000003',
    'data-analytics',
    'Financial Data Analyst translating complex market fundamentals into actionable investment narratives.',
    'During my internship at BlueStock FinTech, I analyzed corporate financial statements of publicly listed companies, uncovering profitability drivers and financial health metrics. I combine advanced SQL querying with interactive Power BI dashboards and financial valuation models (P/E, EPS, ROE, Revenue Growth, D/E Ratio).',
    '[
        "Analyzed financial statements for publicly listed companies during BlueStock FinTech internship",
        "Constructed structured equity research reports evaluating valuation metrics, debt solvency, and revenue trajectory",
        "Formulated complex SQL analytical queries to automate key performance indicators and financial ratio calculation",
        "Certified in Data Analytics by NASSCOM FutureSkills Prime (Wipro), IBM, and CISCO"
    ]'::jsonb,
    '[
        {"title": "Financial Valuation", "desc": "Price-to-Earnings (P/E), Earnings Per Share (EPS), Return on Equity (ROE), D/E"},
        {"title": "Business Intelligence", "desc": "Power BI dashboard design, KPI visualization, executive storytelling"},
        {"title": "SQL Analytics", "desc": "Aggregations, cohort analysis, financial time-series queries, windowing"},
        {"title": "Financial Modeling", "desc": "Excel (advanced formulas, pivot tables, sensitivity analysis, charts)"}
    ]'::jsonb,
    '[
        {"label": "Core Ratios Tracked", "val": "5+ Key KPIs"},
        {"label": "Internship", "val": "BlueStock FinTech"},
        {"label": "Data Visuals", "val": "Power BI & Excel"},
        {"label": "Certifications", "val": "IBM & NASSCOM"}
    ]'::jsonb
),
(
    'c0000000-0000-0000-0000-000000000004',
    'software',
    'AI & Data Software Engineer building high-performance full-stack architectures and secure APIs.',
    'Bridging the gap between software engineering, data infrastructure, and AI systems. During my Full Stack Development Internship at Techvolt Software Pvt. Ltd., I integrated Python backends with MySQL and built responsive, secure multi-module applications. Passionate about clean code, RESTful API architecture, authentication, and systems security.',
    '[
        "Built responsive web applications with authentication and order-management workflows at Techvolt Software",
        "Developed Network Forensic Investigation & Evidence Management System with chain-of-custody tracking",
        "Designed relational database schemas and implemented CRUD operations with strict data consistency validation",
        "Secured First Place in Code Debugging Contest and served as Joint Secretary of AI & DS Department"
    ]'::jsonb,
    '[
        {"title": "Backend Engineering", "desc": "Python, Flask, RESTful API design, session management, secure routing"},
        {"title": "Frontend Development", "desc": "React.js, JavaScript, HTML5, CSS3, Bootstrap, responsive design"},
        {"title": "Database Architecture", "desc": "MySQL, PostgreSQL, MongoDB, schema normalization, indexing, transactions"},
        {"title": "Systems & Forensics", "desc": "Packet-level network analysis, evidence integrity hashing, Git, Docker"}
    ]'::jsonb,
    '[
        {"label": "Core Stack", "val": "Python & Flask"},
        {"label": "Database Engine", "val": "MySQL & Mongo"},
        {"label": "Contest Rank", "val": "1st Place"},
        {"label": "Leadership", "val": "AI Secretary"}
    ]'::jsonb
)
ON CONFLICT (domain_id) DO UPDATE SET
    role_subtitle = EXCLUDED.role_subtitle,
    bio = EXCLUDED.bio,
    highlights = EXCLUDED.highlights,
    focus_areas = EXCLUDED.focus_areas,
    stats = EXCLUDED.stats,
    updated_at = now();

-- 5. SEED PROJECTS
INSERT INTO projects (
    id, slug, title, subtitle, tagline, description,
    problem_statement, solution_overview, architecture_details,
    implementation_highlights, key_results, technologies, metrics,
    github_url, live_url, api_url,
    thumbnail_url, banner_url,
    architecture_diagram_type, architecture_steps,
    interactive_type, featured, display_order, status
)
VALUES
(
    'd0000000-0000-0000-0000-000000000001',
    'medirisk-ai',
    'MediRisk AI',
    'AI-Powered Clinical Health Risk Prediction System',
    'End-to-end Machine Learning Pipeline & Real-Time Flask Inference API',
    'An intelligent healthcare analytics system trained on 768 patient records across 8 vital physiological features. Delivers real-time diagnostic risk probability scores through a high-performance Flask API and an interactive web interface.',
    'Early detection of health complications is critical, but manual evaluation of multiple physiological biomarkers is prone to oversight and delays in clinical triage. Healthcare providers need an accessible, interpretable, and low-latency prediction tool that translates structured clinical metrics into accurate risk scores.',
    'Engineered an end-to-end machine learning solution encompassing robust data preprocessing, outlier detection, feature standardization, predictive model training, cross-validation, and deployment via a RESTful Flask API with an interactive web scoring interface.',
    'Client Browser UI -> REST Request -> Flask Application Layer -> Preprocessing & Scaling Pipeline (StandardScaler) -> Trained Scikit-Learn Classifier -> Probability Distribution Output -> Real-time Visual Risk Score',
    ARRAY[
        'Cleaned and validated 768 patient records across 8 physiological features (Glucose, Blood Pressure, Insulin, BMI, Age, etc.)',
        'Built full pipeline with missing value imputation, feature correlation analysis, and standard scaling',
        'Trained and evaluated multiple classification models (Logistic Regression, Random Forest, Gradient Boosting) using cross-validation',
        'Deployed production-ready Flask API with CORS support, JSON input validation, and sub-50ms inference response',
        'Authored interactive web interface for clinicians to input patient parameters and view instantaneous risk breakdowns'
    ],
    ARRAY[
        'Achieved 87% diagnostic accuracy on clinical test evaluation set',
        'Processed 768 patient records across 8 physiological parameters',
        'Sub-50 millisecond inference response time via Flask REST API',
        'Publicly deployed web application with complete Swagger/OpenAPI documentation'
    ],
    ARRAY['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Flask', 'HTML5', 'CSS3', 'Bootstrap', 'Docker'],
    '[
        {"label": "Model Accuracy", "value": "87%"},
        {"label": "Clinical Records", "value": "768"},
        {"label": "Physiological Features", "value": "8"},
        {"label": "API Response", "value": "< 50ms"}
    ]'::jsonb,
    'https://github.com/Subha-Dhanusha/medirisk-ai',
    'https://subha-dhanusha.github.io/medirisk-ai',
    'https://medirisk-ai.onrender.com/docs',
    '/assets/projects/medirisk-thumb.svg',
    '/assets/projects/medirisk-banner.svg',
    'ml-pipeline',
    '[
        {"step": "01", "name": "Raw Ingestion", "desc": "768 Patient Clinical Samples with 8 physiological metrics"},
        {"step": "02", "name": "Feature Engineering", "desc": "Missing value imputation, outlier handling, StandardScaler normalization"},
        {"step": "03", "name": "Model Architecture", "desc": "Supervised classification engine with k-fold cross validation"},
        {"step": "04", "name": "Inference Endpoint", "desc": "Flask REST API on Render returning risk probabilities in real-time"}
    ]'::jsonb,
    'ml-inference',
    true,
    1,
    'published'
),
(
    'd0000000-0000-0000-0000-000000000002',
    'stock-market-fundamental-analysis',
    'Stock Market Fundamental Analysis System',
    'Multi-Tier Financial Data Pipeline & Dimensional Warehouse',
    'Star Schema Architecture, Fact & Dimension Modeling, and Valuation Metrics',
    'An enterprise data pipeline and financial analytics warehouse designed to ingest, cleanse, model, and evaluate publicly listed corporate equities. Implements Star Schema dimensional modeling, advanced SQL window functions, and financial ratio analytics.',
    'Analyzing publicly listed companies requires ingesting and reconciling disparate financial disclosures, balance sheets, and cash flow statements across quarters. Without a unified dimensional data warehouse, computing complex valuation ratios and comparative trends across industries is slow and error-prone.',
    'Designed a multi-layered ETL pipeline that ingests financial data, applies structured transformations, loads into a Star Schema with centralized facts and dimensions, and exposes performant SQL views computing key indicators including P/E, EPS, ROE, Revenue Growth, and Debt-to-Equity (D/E).',
    'Raw Financial Feeds -> Cleansing & Profiling Stage -> 3-Tier Data Pipeline -> Dimensional Warehouse (Dim_Company, Dim_Date, Dim_Sector, Fact_Financial_Metrics) -> Materialized SQL Views -> Power BI Dashboard & Executive Valuation Reports',
    ARRAY[
        'Engineered multi-stage ETL pipeline to transform balance sheets, P&L statements, and cash flows',
        'Modeled star schema with Fact_Financial_Statements surrounded by Dim_Company, Dim_Period, and Dim_Industry',
        'Implemented SQL window functions (ROW_NUMBER, LAG, LEAD, DENSE_RANK) to calculate year-over-year revenue growth',
        'Built automated SQL validation queries ensuring mathematical consistency across asset and liability balancing',
        'Created aggregated SQL analytical views for automated generation of investment equity research reports'
    ],
    ARRAY[
        'Evaluated multi-company financial reports with 5+ core valuation ratios (P/E, EPS, ROE, Revenue Growth, D/E)',
        'Built automated data profiling and validation checks preventing data anomalies in historical records',
        'Created high-efficiency SQL views reducing query runtimes for executive reporting',
        'Integrated with BlueStock FinTech research deliverables for equity analysis'
    ],
    ARRAY['SQL', 'MySQL', 'Dimensional Modeling', 'Star Schema', 'ETL/ELT', 'Excel (Advanced)', 'Power BI', 'Financial Data Modeling'],
    '[
        {"label": "Warehouse Schema", "value": "Star Schema"},
        {"label": "Valuation Metrics", "value": "P/E, EPS, ROE, D/E"},
        {"label": "Pipeline Architecture", "value": "3-Tier ETL"},
        {"label": "Validation Suite", "value": "Automated SQL"}
    ]'::jsonb,
    'https://github.com/Subha-Dhanusha',
    'https://subha-dhanusha.github.io',
    NULL,
    '/assets/projects/stock-analysis-thumb.svg',
    '/assets/projects/stock-analysis-banner.svg',
    'data-pipeline',
    '[
        {"step": "01", "name": "Raw Ingestion", "desc": "Ingestion of company financial filings, quarterly reports & market feeds"},
        {"step": "02", "name": "Cleansing & Profiling", "desc": "Automated SQL validation, null treatment & reconciliation"},
        {"step": "03", "name": "Dimensional Model", "desc": "Star Schema: Dim_Company, Dim_Quarter, Fact_Valuation_Metrics"},
        {"step": "04", "name": "BI & Views", "desc": "SQL analytical views feeding Power BI executive valuation dashboards"}
    ]'::jsonb,
    'financial-kpi',
    true,
    2,
    'published'
),
(
    'd0000000-0000-0000-0000-000000000003',
    'network-forensic-investigation',
    'Network Forensic Investigation & Evidence Management System',
    'Digital Forensics Platform & Immutable Evidence Chain-of-Custody',
    'Packet-Level Traffic Capture, Structured Indexing & Court-Admissible Reporting',
    'A specialized cybersecurity and digital forensic application engineered to capture, analyze, and preserve network traffic data as court-admissible electronic evidence. Features indexed storage, packet-level inspection, and tamper-evident chain-of-custody tracking.',
    'Digital forensic investigators face major challenges capturing high-volume packet streams while maintaining verifiable chain-of-custody, preventing tampering, and producing structured incident reports that satisfy legal evidential standards.',
    'Developed a Python and Flask application that intercepts network packets, indexes relevant protocol headers, implements cryptographic hashing to guarantee data immutability, and logs every access or modification for legally defensible chain-of-custody.',
    'Network Interface (Promiscuous Mode) -> Packet Capture Engine -> Protocol Dissector (IP, TCP, UDP, DNS) -> Cryptographic Hashing Layer (SHA-256) -> Indexed Storage & Metadata Index -> Chain-of-Custody Audit Log -> Incident Reporting Web Interface',
    ARRAY[
        'Captured and dissected network packets down to byte and protocol header levels',
        'Implemented SHA-256 cryptographic hashing to verify data integrity and prevent post-capture tampering',
        'Architected an indexed evidence storage module for instant retrieval by timestamp, source IP, or protocol',
        'Engineered an immutable chain-of-custody audit log tracking investigator access, notes, and exports',
        'Built structured incident reporting dashboard generating formatted PDF/HTML digital forensic findings'
    ],
    ARRAY[
        'Maintained 100% cryptographic data integrity and provenance across captured evidence',
        'Indexed thousands of network packets with sub-second retrieval by protocol and endpoint',
        'Court-admissible structured reporting meeting digital forensics best practices',
        'Deployed live web application accessible for forensic demonstration'
    ],
    ARRAY['Python', 'Flask', 'Cybersecurity', 'Network Forensics', 'Packet Analysis', 'Cryptographic Hashing', 'MySQL', 'HTML5/CSS3'],
    '[
        {"label": "Protocol Coverage", "value": "IP, TCP, UDP, DNS"},
        {"label": "Integrity Standard", "value": "SHA-256 Chain"},
        {"label": "Search Retrieval", "value": "< 100ms Index"},
        {"label": "Reporting Format", "value": "Audit Grade"}
    ]'::jsonb,
    'https://github.com/Subha-Dhanusha/Network-Forensic-Investigation-and-evidence-management-system',
    'https://nfies-web.onrender.com',
    NULL,
    '/assets/projects/forensic-thumb.svg',
    '/assets/projects/forensic-banner.svg',
    'security-flow',
    '[
        {"step": "01", "name": "Packet Capture", "desc": "Live network traffic capture across interfaces with packet filtering"},
        {"step": "02", "name": "Deep Dissection", "desc": "Header extraction, payload inspection, and protocol analysis"},
        {"step": "03", "name": "Integrity Seal", "desc": "Cryptographic SHA-256 hashing and immutable metadata stamping"},
        {"step": "04", "name": "Chain of Custody", "desc": "Strict audit trails, investigator authorization & incident export"}
    ]'::jsonb,
    'evidence-chain',
    true,
    3,
    'published'
),
(
    'd0000000-0000-0000-0000-000000000004',
    'techvolt-fullstack-crm',
    'Multi-Module Web Application & Data Management Platform',
    'Full-Stack Architecture & Database CRUD Workflows (Techvolt)',
    'Responsive Architecture, Role-Based Authentication & Order Management',
    'A full-stack enterprise web application built during the Techvolt Software internship, featuring Python backend services integrated with MySQL, role-based authentication, and responsive customer order workflows.',
    'Small-to-medium enterprises require centralized data management where backend operations, customer records, and order processing maintain strict relational integrity across modular interfaces.',
    'Engineered an integrated solution combining a modular Python backend with normalized MySQL database schemas, secure session authentication, and responsive frontend views using HTML, CSS, Bootstrap, and JavaScript.',
    'Web Client (Responsive UI) -> Authentication Middleware -> Python Backend Controller -> Business Logic Engine -> MySQL Relational Database (Normalized Tables, Foreign Keys, ACID Transactions)',
    ARRAY[
        'Integrated Python backend with MySQL across multiple application modules for seamless data flow',
        'Designed normalized relational schemas ensuring data consistency, referential integrity, and efficient queries',
        'Implemented secure user authentication, role-based access control, and user profile management',
        'Built dynamic order-management and transaction-tracking workflows with validation checks'
    ],
    ARRAY[
        'Seamless integration across multi-module enterprise workflows',
        'Robust ACID transaction handling and zero data inconsistency',
        'Responsive layout optimized across desktop, tablet, and mobile browsers'
    ],
    ARRAY['Python', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'REST APIs', 'CRUD Architecture'],
    '[
        {"label": "Architecture", "value": "Full-Stack MVC"},
        {"label": "Database Engine", "value": "MySQL Relational"},
        {"label": "Security Model", "value": "Role-Based Auth"},
        {"label": "Interface", "value": "Responsive Web"}
    ]'::jsonb,
    'https://github.com/Subha-Dhanusha',
    'https://subha-dhanusha.github.io',
    NULL,
    '/assets/projects/crm-thumb.svg',
    '/assets/projects/crm-banner.svg',
    'app-flow',
    '[
        {"step": "01", "name": "User Layer", "desc": "Responsive web client with dynamic form validation & session handling"},
        {"step": "02", "name": "API & Auth", "desc": "Python routing layer enforcing authentication & role permissions"},
        {"step": "03", "name": "Business Logic", "desc": "Order processing, inventory checks & transaction workflows"},
        {"step": "04", "name": "Storage Engine", "desc": "MySQL relational database with strict foreign keys & audit fields"}
    ]'::jsonb,
    'none',
    false,
    4,
    'published'
)
ON CONFLICT (slug) DO UPDATE SET
    title = EXCLUDED.title,
    subtitle = EXCLUDED.subtitle,
    tagline = EXCLUDED.tagline,
    description = EXCLUDED.description,
    problem_statement = EXCLUDED.problem_statement,
    solution_overview = EXCLUDED.solution_overview,
    architecture_details = EXCLUDED.architecture_details,
    implementation_highlights = EXCLUDED.implementation_highlights,
    key_results = EXCLUDED.key_results,
    technologies = EXCLUDED.technologies,
    metrics = EXCLUDED.metrics,
    github_url = EXCLUDED.github_url,
    live_url = EXCLUDED.live_url,
    api_url = EXCLUDED.api_url,
    architecture_steps = EXCLUDED.architecture_steps,
    interactive_type = EXCLUDED.interactive_type,
    featured = EXCLUDED.featured,
    display_order = EXCLUDED.display_order,
    status = EXCLUDED.status,
    updated_at = now();

-- 6. LINK PROJECTS TO DOMAINS
DELETE FROM domain_projects;
INSERT INTO domain_projects (domain_id, project_id, is_primary, display_order)
VALUES
-- AI / ML Domain
('ai-ml', 'd0000000-0000-0000-0000-000000000001', true, 1), -- MediRisk AI (Primary Featured)
('ai-ml', 'd0000000-0000-0000-0000-000000000003', false, 2), -- Network Forensic Investigation
('ai-ml', 'd0000000-0000-0000-0000-000000000002', false, 3), -- Stock Market Analysis

-- Data Engineering Domain
('data-engineering', 'd0000000-0000-0000-0000-000000000002', true, 1), -- Stock Market Analysis (Star Schema / ETL Primary Featured)
('data-engineering', 'd0000000-0000-0000-0000-000000000001', false, 2), -- MediRisk AI (Data Pipeline & Ingestion focus)
('data-engineering', 'd0000000-0000-0000-0000-000000000003', false, 3), -- Network Forensic (Packet Ingestion Pipeline)

-- Data Analytics Domain
('data-analytics', 'd0000000-0000-0000-0000-000000000002', true, 1), -- Stock Market Analysis (Valuation & Metrics Primary Featured)
('data-analytics', 'd0000000-0000-0000-0000-000000000001', false, 2), -- MediRisk AI (Clinical Data Profiling)
('data-analytics', 'd0000000-0000-0000-0000-000000000004', false, 3), -- Techvolt CRM (Operational Analytics)

-- Software / Full-Stack Domain
('software', 'd0000000-0000-0000-0000-000000000003', true, 1), -- Network Forensic Platform (Primary Featured)
('software', 'd0000000-0000-0000-0000-000000000001', false, 2), -- MediRisk AI (Full-Stack Flask App)
('software', 'd0000000-0000-0000-0000-000000000004', false, 3); -- Techvolt Full Stack Platform

-- 7. SEED EXPERIENCES
INSERT INTO experiences (id, company, position, location, work_type, start_date, end_date, is_current, description, responsibilities, technologies, display_order)
VALUES
(
    'e0000000-0000-0000-0000-000000000001',
    'BlueStock FinTech',
    'Data Analyst Intern',
    'Remote',
    'Internship',
    'Apr. 2026',
    'May 2026',
    false,
    'Analyzed financial statements and built analytical data pipelines for publicly listed equities.',
    ARRAY[
        'Analyzed financial statements of publicly listed companies using SQL and Excel to identify trends and generate structured insights',
        'Queried, processed, validated, and transformed financial datasets using SQL-based analytical workflows',
        'Applied P/E, EPS, ROE, Revenue Growth, and D/E Ratio metrics to build structured investment-research reports',
        'Designed ETL pipelines and built SQL validation queries for data profiling and cleansing on financial datasets'
    ],
    ARRAY['SQL', 'Excel', 'Financial Analysis', 'ETL Pipelines', 'Power BI', 'Data Profiling'],
    1
),
(
    'e0000000-0000-0000-0000-000000000002',
    'Techvolt Software Pvt. Ltd.',
    'Full Stack Development Intern',
    'Coimbatore, Tamil Nadu',
    'Internship',
    'Jun. 2025',
    'Jul. 2025',
    false,
    'Developed backend services and responsive web applications for enterprise data management.',
    ARRAY[
        'Integrated Python backend functionality with MySQL databases across multiple application modules for efficient data management',
        'Developed responsive web applications using HTML, CSS, Bootstrap, and JavaScript with user authentication and order-management workflows',
        'Designed relational database schemas and implemented CRUD operations with data consistency, validation, and error handling',
        'Built data flow pipelines connecting modular frontend views to MySQL persistent storage'
    ],
    ARRAY['Python', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'CRUD Architecture', 'Database Schemas'],
    2
)
ON CONFLICT (id) DO UPDATE SET
    company = EXCLUDED.company,
    position = EXCLUDED.position,
    start_date = EXCLUDED.start_date,
    end_date = EXCLUDED.end_date,
    responsibilities = EXCLUDED.responsibilities,
    technologies = EXCLUDED.technologies,
    updated_at = now();

-- 8. DOMAIN EXPERIENCES (Tailored Emphasis)
DELETE FROM domain_experiences;
INSERT INTO domain_experiences (domain_id, experience_id, tailored_position, tailored_responsibilities, display_order)
VALUES
-- AI / ML domain emphasis
('ai-ml', 'e0000000-0000-0000-0000-000000000002', 'Full Stack ML & Software Intern', ARRAY[
    'Integrated Python backend with MySQL across multiple modules for efficient data management',
    'Implemented modular application logic and data validation algorithms handling structured input schemas',
    'Built responsive frontend interfaces in HTML/CSS/Bootstrap with authentication and session states'
], 1),
('ai-ml', 'e0000000-0000-0000-0000-000000000001', 'Data Analyst Intern (Quantitative ML Prep)', ARRAY[
    'Analyzed large-scale financial tabular datasets using SQL and Excel for quantitative indicator extraction',
    'Computed multivariate statistical valuation ratios (P/E, EPS, ROE, Revenue Growth) used for predictive analytics',
    'Implemented automated data validation checks ensuring numerical consistency across training samples'
], 2),

-- Data Engineering domain emphasis
('data-engineering', 'e0000000-0000-0000-0000-000000000001', 'Data Pipeline & Analytics Intern', ARRAY[
    'Designed ETL pipelines and applied SQL transformations for financial statement processing across corporate filings',
    'Built SQL validation queries and implemented data profiling and cleansing on large financial datasets',
    'Created multi-dimensional SQL analytics and generated investment reports with P/E, EPS, and ROE metrics'
], 1),
('data-engineering', 'e0000000-0000-0000-0000-000000000002', 'Data Systems & Database Intern', ARRAY[
    'Integrated Python backend with MySQL; built data flow pipelines for multi-module applications',
    'Designed relational database schemas; implemented CRUD operations with data consistency management',
    'Optimized SQL query execution and enforced ACID transaction principles across order workflows'
], 2),

-- Data Analytics domain emphasis
('data-analytics', 'e0000000-0000-0000-0000-000000000001', 'Financial Data Analyst Intern', ARRAY[
    'Analyzed financial statements of publicly listed companies using SQL and Excel to identify trends and generate structured insights',
    'Queried, processed, validated, and transformed financial datasets using SQL-based analytical workflows',
    'Applied P/E, EPS, ROE, Revenue Growth, and D/E Ratio metrics to build structured investment-research reports'
], 1),
('data-analytics', 'e0000000-0000-0000-0000-000000000002', 'Web & Database Application Intern', ARRAY[
    'Queried and structured operational datasets in MySQL for transactional reporting and inventory status',
    'Built intuitive dashboard interfaces using HTML, CSS, Bootstrap, and JavaScript for business users',
    'Enforced data integrity rules on customer orders and transactional records'
], 2),

-- Software / Full-Stack domain emphasis
('software', 'e0000000-0000-0000-0000-000000000002', 'Full Stack Development Intern', ARRAY[
    'Integrated Python backend functionality with MySQL databases across multiple application modules for efficient data management',
    'Developed responsive web applications using HTML, CSS, Bootstrap, and JavaScript with authentication and order-management workflows',
    'Designed relational database schemas and implemented CRUD operations with data consistency and validation'
], 1),
('software', 'e0000000-0000-0000-0000-000000000001', 'Data Analytics & Workflow Intern', ARRAY[
    'Engineered analytical database queries and transformations in SQL for business workflow automation',
    'Built structured reporting pipelines integrating corporate metrics with analytical spreadsheets',
    'Implemented validation rules to catch bad payloads and corrupted records before downstream processing'
], 2);

-- 9. SEED SKILLS
INSERT INTO skills (id, name, category, proficiency, icon_name, display_order)
VALUES
-- Programming
('f0000000-0000-0000-0000-000000000001', 'Python', 'Programming', 95, 'python', 1),
('f0000000-0000-0000-0000-000000000002', 'Java', 'Programming', 85, 'coffee', 2),
('f0000000-0000-0000-0000-000000000003', 'JavaScript', 'Programming', 88, 'code', 3),
('f0000000-0000-0000-0000-000000000004', 'C', 'Programming', 80, 'terminal', 4),
('f0000000-0000-0000-0000-000000000005', 'OOP & Data Structures', 'Programming', 90, 'cpu', 5),

-- Machine Learning
('f0000000-0000-0000-0000-000000000010', 'Scikit-learn', 'Machine Learning', 92, 'brain', 6),
('f0000000-0000-0000-0000-000000000011', 'Feature Engineering', 'Machine Learning', 94, 'sliders', 7),
('f0000000-0000-0000-0000-000000000012', 'Predictive Modeling', 'Machine Learning', 90, 'trending-up', 8),
('f0000000-0000-0000-0000-000000000013', 'Model Evaluation & Tuning', 'Machine Learning', 88, 'check-circle-2', 9),
('f0000000-0000-0000-0000-000000000014', 'Classification & Regression', 'Machine Learning', 92, 'git-commit', 10),

-- Data Engineering
('f0000000-0000-0000-0000-000000000020', 'ETL / ELT Pipelines', 'Data Engineering', 92, 'git-merge', 11),
('f0000000-0000-0000-0000-000000000021', 'Dimensional Modeling (Star/Snowflake)', 'Data Engineering', 94, 'layers', 12),
('f0000000-0000-0000-0000-000000000022', 'Fact & Dimension Tables', 'Data Engineering', 92, 'table', 13),
('f0000000-0000-0000-0000-000000000023', 'Data Quality & Validation', 'Data Engineering', 90, 'shield-check', 14),
('f0000000-0000-0000-0000-000000000024', 'PySpark & Spark SQL', 'Data Engineering', 84, 'flame', 15),

-- Data Analytics & Finance
('f0000000-0000-0000-0000-000000000030', 'SQL Window Functions (ROW_NUMBER, LAG, LEAD)', 'Data Analytics', 96, 'database', 16),
('f0000000-0000-0000-0000-000000000031', 'Advanced Excel Modeling', 'Data Analytics', 92, 'sheet', 17),
('f0000000-0000-0000-0000-000000000032', 'Power BI Dashboards', 'Data Analytics', 88, 'bar-chart-2', 18),
('f0000000-0000-0000-0000-000000000033', 'Financial Analysis (P/E, EPS, ROE, D/E)', 'Data Analytics', 90, 'dollar-sign', 19),
('f0000000-0000-0000-0000-000000000034', 'Pandas & NumPy', 'Data Analytics', 94, 'binary', 20),
('f0000000-0000-0000-0000-000000000035', 'Matplotlib & Visualization', 'Data Analytics', 88, 'pie-chart', 21),

-- Databases
('f0000000-0000-0000-0000-000000000040', 'MySQL', 'Databases', 94, 'database', 22),
('f0000000-0000-0000-0000-000000000041', 'PostgreSQL', 'Databases', 88, 'hard-drive', 23),
('f0000000-0000-0000-0000-000000000042', 'MongoDB', 'Databases', 82, 'server', 24),
('f0000000-0000-0000-0000-000000000043', 'Query Optimization & Indexing', 'Databases', 86, 'zap', 25),

-- Cloud & Deployment
('f0000000-0000-0000-0000-000000000050', 'AWS (Cloud Computing)', 'Cloud', 84, 'cloud', 26),
('f0000000-0000-0000-0000-000000000051', 'Google Cloud Platform (GCP)', 'Cloud', 82, 'globe', 27),
('f0000000-0000-0000-0000-000000000052', 'Docker Containerization', 'Cloud', 85, 'box', 28),

-- Web & APIs
('f0000000-0000-0000-0000-000000000060', 'Flask & REST APIs', 'Web', 92, 'network', 29),
('f0000000-0000-0000-0000-000000000061', 'HTML5 & CSS3 (Bootstrap)', 'Web', 92, 'layout', 30),
('f0000000-0000-0000-0000-000000000062', 'React.js', 'Web', 84, 'atom', 31),

-- Tools
('f0000000-0000-0000-0000-000000000070', 'Git & GitHub', 'Tools', 94, 'git-branch', 32),
('f0000000-0000-0000-0000-000000000071', 'VS Code', 'Tools', 92, 'terminal', 33),
('f0000000-0000-0000-0000-000000000072', 'Jupyter Notebook', 'Tools', 95, 'book-open', 34),
('f0000000-0000-0000-0000-000000000073', 'MySQL Workbench', 'Tools', 90, 'database', 35)
ON CONFLICT (id) DO NOTHING;

-- 10. LINK SKILLS TO DOMAINS
DELETE FROM domain_skills;
INSERT INTO domain_skills (domain_id, skill_id, priority)
SELECT 'ai-ml', id, 1 FROM skills WHERE category IN ('Machine Learning', 'Programming') OR name IN ('Pandas & NumPy', 'Flask & REST APIs', 'Jupyter Notebook', 'Docker Containerization', 'MySQL', 'Matplotlib & Visualization')
ON CONFLICT DO NOTHING;

INSERT INTO domain_skills (domain_id, skill_id, priority)
SELECT 'data-engineering', id, 1 FROM skills WHERE category IN ('Data Engineering', 'Databases', 'Cloud') OR name IN ('Python', 'SQL Window Functions (ROW_NUMBER, LAG, LEAD)', 'Pandas & NumPy', 'Docker Containerization', 'Git & GitHub')
ON CONFLICT DO NOTHING;

INSERT INTO domain_skills (domain_id, skill_id, priority)
SELECT 'data-analytics', id, 1 FROM skills WHERE category IN ('Data Analytics') OR name IN ('SQL Window Functions (ROW_NUMBER, LAG, LEAD)', 'MySQL', 'PostgreSQL', 'Python', 'Git & GitHub', 'Jupyter Notebook')
ON CONFLICT DO NOTHING;

INSERT INTO domain_skills (domain_id, skill_id, priority)
SELECT 'software', id, 1 FROM skills WHERE category IN ('Programming', 'Web', 'Databases', 'Tools') OR name IN ('Flask & REST APIs', 'Docker Containerization', 'AWS (Cloud Computing)')
ON CONFLICT DO NOTHING;

-- 11. SEED EDUCATION
INSERT INTO education (id, institution, degree, university, start_date, end_date, cgpa, highest_gpa, class_xii, location, achievements, display_order)
VALUES (
    '10000000-0000-0000-0000-000000000001',
    'Ramco Institute of Technology',
    'B.Tech in Artificial Intelligence and Data Science',
    'Anna University',
    '2023',
    'Expected May 2027',
    '8.28 / 10.0',
    '8.91 / 10.0',
    '87.67% (April 2023)',
    'Rajapalayam / Kovilpatti, Tamil Nadu',
    ARRAY[
        'Department Topper for three consecutive semesters with highest SGPA of 8.91/10.0',
        'Secured First Place in Code Debugging Contest across departments',
        'Served as Secretary of the Neoteric AI Association',
        'Served as Joint Secretary of the Department of Artificial Intelligence and Data Science'
    ],
    1
)
ON CONFLICT (id) DO NOTHING;

-- 12. SEED CERTIFICATIONS
INSERT INTO certifications (id, title, issuer, issue_date, credential_url, display_order)
VALUES
('20000000-0000-0000-0000-000000000001', 'Machine Learning Fundamentals', 'Infosys Springboard', '2024', 'https://infyspringboard.onwingspan.com', 1),
('20000000-0000-0000-0000-000000000002', 'Introduction to Deep Learning', 'Infosys Springboard', '2024', 'https://infyspringboard.onwingspan.com', 2),
('20000000-0000-0000-0000-000000000003', 'Python for Data Science', 'Infosys Springboard', '2024', 'https://infyspringboard.onwingspan.com', 3),
('20000000-0000-0000-0000-000000000004', 'Data Analytics Certification', 'NASSCOM FutureSkills Prime (Wipro)', '2024', 'https://futureskillsprime.in', 4),
('20000000-0000-0000-0000-000000000005', 'Cloud Computing Engineering (Azure / AWS)', 'NASSCOM FutureSkills Prime (Wipro)', '2024', 'https://futureskillsprime.in', 5),
('20000000-0000-0000-0000-000000000006', 'CISCO - Data Analytics Essentials', 'CISCO Networking Academy', '2024', 'https://netacad.com', 6),
('20000000-0000-0000-0000-000000000007', 'Data Analytics', 'IBM', '2024', 'https://ibm.com', 7),
('20000000-0000-0000-0000-000000000008', 'Data Visualisation – Empowering Business with Effective Insights', 'Tata / Forage', '2024', 'https://forage.com', 8)
ON CONFLICT (id) DO NOTHING;

-- 13. DOMAIN CERTIFICATIONS
DELETE FROM domain_certifications;
INSERT INTO domain_certifications (domain_id, certification_id, display_order)
VALUES
-- AI / ML
('ai-ml', '20000000-0000-0000-0000-000000000001', 1),
('ai-ml', '20000000-0000-0000-0000-000000000002', 2),
('ai-ml', '20000000-0000-0000-0000-000000000003', 3),
('ai-ml', '20000000-0000-0000-0000-000000000004', 4),

-- Data Engineering
('data-engineering', '20000000-0000-0000-0000-000000000005', 1),
('data-engineering', '20000000-0000-0000-0000-000000000004', 2),
('data-engineering', '20000000-0000-0000-0000-000000000007', 3),
('data-engineering', '20000000-0000-0000-0000-000000000006', 4),

-- Data Analytics
('data-analytics', '20000000-0000-0000-0000-000000000004', 1),
('data-analytics', '20000000-0000-0000-0000-000000000007', 2),
('data-analytics', '20000000-0000-0000-0000-000000000006', 3),
('data-analytics', '20000000-0000-0000-0000-000000000008', 4),

-- Software / Full-Stack
('software', '20000000-0000-0000-0000-000000000001', 1),
('software', '20000000-0000-0000-0000-000000000003', 2),
('software', '20000000-0000-0000-0000-000000000005', 3),
('software', '20000000-0000-0000-0000-000000000004', 4);

-- 14. SEED ACHIEVEMENTS
INSERT INTO achievements (id, title, description, organization, date, category, display_order)
VALUES
('30000000-0000-0000-0000-000000000001', 'First Place in Code Debugging Contest', 'Secured 1st rank in inter-departmental technical debugging competition, troubleshooting complex algorithms and data structures under strict time limits.', 'Ramco Institute of Technology', '2024', 'Technical Contest', 1),
('30000000-0000-0000-0000-000000000002', 'Department Academic Topper (3 Consecutive Semesters)', 'Recognized for sustained academic excellence in Artificial Intelligence & Data Science, maintaining top rank with a peak semester GPA of 8.91/10.0.', 'Anna University / RIT', '2023 - 2025', 'Academic Award', 2),
('30000000-0000-0000-0000-000000000003', 'Secretary — Neoteric AI Association', 'Elected Secretary; spearheaded technical symposiums, hands-on ML workshops, hackathons, and student coding initiatives.', 'Department of AI & DS', '2024 - 2025', 'Leadership', 3),
('30000000-0000-0000-0000-000000000004', 'Joint Secretary — Department of AI & DS', 'Coordinated department academic events, alumni tech talks, and project exhibitions fostering collaborative peer learning.', 'Department of AI & DS', '2023 - 2024', 'Leadership', 4)
ON CONFLICT (id) DO NOTHING;

-- 15. DOMAIN ACHIEVEMENTS (All relevant achievements visible across domains with custom order)
DELETE FROM domain_achievements;
INSERT INTO domain_achievements (domain_id, achievement_id, display_order)
VALUES
('ai-ml', '30000000-0000-0000-0000-000000000001', 1),
('ai-ml', '30000000-0000-0000-0000-000000000002', 2),
('ai-ml', '30000000-0000-0000-0000-000000000003', 3),
('ai-ml', '30000000-0000-0000-0000-000000000004', 4),

('data-engineering', '30000000-0000-0000-0000-000000000001', 1),
('data-engineering', '30000000-0000-0000-0000-000000000002', 2),
('data-engineering', '30000000-0000-0000-0000-000000000003', 3),

('data-analytics', '30000000-0000-0000-0000-000000000002', 1),
('data-analytics', '30000000-0000-0000-0000-000000000001', 2),
('data-analytics', '30000000-0000-0000-0000-000000000003', 3),

('software', '30000000-0000-0000-0000-000000000001', 1),
('software', '30000000-0000-0000-0000-000000000002', 2),
('software', '30000000-0000-0000-0000-000000000003', 3),
('software', '30000000-0000-0000-0000-000000000004', 4);

-- 16. SEED RESUMES
INSERT INTO resumes (id, domain_id, title, description, file_url, file_name, file_size, is_active, download_count)
VALUES
(
    '40000000-0000-0000-0000-000000000001',
    'ai-ml',
    'Subha Dhanusha — AI/ML Engineer Resume',
    'Specialized resume emphasizing predictive modeling, MediRisk AI (87% accuracy, 768 samples), Scikit-learn, and Flask inference endpoints.',
    '/resumes/Subha_Dhanusha_AI_ML_Resume.pdf',
    'Subha_Dhanusha_AI_ML_Resume.pdf',
    '98 KB',
    true,
    0
),
(
    '40000000-0000-0000-0000-000000000002',
    'data-engineering',
    'Subha Dhanusha — Cloud Data Engineer Resume',
    'Specialized resume detailing end-to-end ETL/ELT pipelines, Star Schema dimensional modeling, SQL window functions, and cloud infrastructure.',
    '/resumes/Subha_Dhanusha_Data_Engineering_Resume.pdf',
    'Subha_Dhanusha_Data_Engineering_Resume.pdf',
    '37 KB',
    true,
    0
),
(
    '40000000-0000-0000-0000-000000000003',
    'data-analytics',
    'Subha Dhanusha — Financial Data Analyst Resume',
    'Specialized resume showcasing BlueStock FinTech internship, financial statement modeling, equity valuation ratios (P/E, EPS, ROE, D/E), and Power BI.',
    '/resumes/Subha_Dhanusha_Data_Analytics_Resume.pdf',
    'Subha_Dhanusha_Data_Analytics_Resume.pdf',
    '37 KB',
    true,
    0
),
(
    '40000000-0000-0000-0000-000000000004',
    'software',
    'Subha Dhanusha — AI & Data Software Engineer Resume',
    'Full-stack and systems engineering resume covering Python, Java, REST APIs, network forensics with chain-of-custody, and Techvolt full-stack work.',
    '/resumes/Subha_Dhanusha_Software_Resume.pdf',
    'Subha_Dhanusha_Software_Resume.pdf',
    '37 KB',
    true,
    0
)
ON CONFLICT (domain_id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    file_url = EXCLUDED.file_url,
    file_name = EXCLUDED.file_name,
    file_size = EXCLUDED.file_size,
    is_active = EXCLUDED.is_active,
    updated_at = now();

-- 17. SEED SITE SETTINGS
INSERT INTO site_settings (key, value)
VALUES
(
    'site_meta',
    '{
        "site_title": "Subha Dhanusha P — Multi-Domain Digital Portfolio",
        "author": "Subha Dhanusha P",
        "description": "Award-winning multi-domain portfolio platform of Subha Dhanusha P — AI/ML Engineer, Cloud Data Engineer, Financial Data Analyst & Software Engineer.",
        "contact_email": "sdsubi0610@gmail.com",
        "phone": "+91 7845114897",
        "location": "Kovilpatti, Tamil Nadu, India",
        "available_for_hire": true,
        "default_domain": "ai-ml",
        "sound_effects_enabled": true,
        "custom_cursor_enabled": true
    }'::jsonb
),
(
    'admin_profile',
    '{
        "email": "sdsubi0610@gmail.com",
        "display_name": "Subha Dhanusha (Admin)",
        "role": "Super Admin"
    }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET
    value = EXCLUDED.value,
    updated_at = now();
