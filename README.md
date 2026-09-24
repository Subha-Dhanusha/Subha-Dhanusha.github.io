# Subha Dhanusha — Multi-Domain Digital Portfolio Platform
### Award-Winning Creative Engineering Portfolio & Headless CMS

> **Subha Dhanusha P** — B.Tech in Artificial Intelligence & Data Science, Anna University (Ramco Institute of Technology)  
> Live Platform: [https://subha-dhanusha.github.io](https://subha-dhanusha.github.io)

---

## Overview

A unified personal portfolio platform architected to present **4 distinct professional engineering identities** through a single responsive system. Rather than four disconnected templates, the platform dynamically morphs its editorial typography, technical case studies, narrative pillars, interactive playgrounds, skill graphs, and resume downloads via client-side state transitions powered by a resilient Supabase PostgreSQL backend.

---

## 4 Professional Domains

| Mode | Domain Identifier | Professional Title | Featured Case Study | Key Focus Areas |
| :--- | :--- | :--- | :--- | :--- |
| **01** | `ai-ml` | **AI/ML Engineer** | **MediRisk AI** | Predictive Modeling, Clinical ML Pipelines, Scikit-learn, Flask REST APIs, 87% Accuracy, 768 Records |
| **02** | `data-engineering` | **Cloud Data Engineer** | **Stock Market Fundamental Analysis** | Multi-Layer ETL/ELT, Star & Snowflake Schema, Fact/Dimension Tables, PySpark, AWS/GCP, Dimensional Lakehouses |
| **03** | `data-analytics` | **Data Analyst / Financial Analyst** | **BlueStock FinTech Analytics** | Corporate Valuation, P/E, EPS, ROE, D/E Ratio, Revenue Trajectory, Power BI Dashboards, SQL Window Functions |
| **04** | `software` | **AI & Data Software Engineer** | **Network Forensic Investigation & Evidence System** | Full-Stack Architecture, Packet-Level Capture, SHA-256 Chain-of-Custody, Techvolt CRM, Flask, MySQL, React |

---

## Technical Highlights

* **Resilient Dual-Mode Data Layer:** Seamlessly queries live Supabase PostgreSQL tables with built-in circuit breaking and automated fallback to local persistent cache (`scratch/portfolio_live_data.json`).
* **Interactive Engineering Playgrounds:**
  * *MediRisk AI Clinical Risk Calculator:* Interactive biomarker sliders evaluating clinical risk probabilities in real time.
  * *Stock Valuation KPI Screening Model:* Live equity valuation calculator for P/E, EPS, ROE, and D/E ratios.
  * *Digital Forensic SHA-256 Hasher:* Interactive evidence hasher and immutable chain-of-custody logging simulator.
* **Procedural Sound Synthesizer:** Zero-dependency Web Audio API procedural audio synthesizer generating tactile hover clicks, domain transition swooshes, and modal chimes with global mute toggle.
* **Dynamic Headless Admin CMS (`/admin`):**
  * Full CRUD for Domains, Hero sections, About narratives, Projects, Experience, Skills, Education, Certifications, Achievements, Resumes, and Inquiries.
  * Dynamic **"+ Add New Domain"** feature supporting custom identities, color pickers, and automated Supabase synchronization.
* **Automated Domain-Mapped Resume System:** Dynamic endpoint `/api/resumes/download/[domain]` automatically serves the active domain's authentic PDF resume.

---

## Tech Stack

* **Framework:** Next.js 14 (App Router, Server & Client Components)
* **Language:** TypeScript (Strict mode)
* **Styling & Design:** Tailwind CSS, Custom CSS Tokens, Glassmorphism, CSS Grain
* **Database & Auth:** Supabase (PostgreSQL, Row Level Security policies, Auth)
* **Sound Engine:** Native Web Audio API (Zero audio asset overhead)
* **Icons & Animation:** Lucide Icons, Framer Motion

---

## Project Structure

```
├── public/
│   ├── assets/           # SVG illustrations, project banners & thumbnails
│   └── resumes/          # 4 authentic domain-mapped PDF resumes
├── src/
│   ├── app/              # Next.js App Router (Public routes, API & /admin CMS)
│   ├── components/
│   │   ├── admin/        # Admin CMS modules (Domains, Projects, Messages, etc.)
│   │   ├── portfolio/    # Client portfolio wrapper & domain route views
│   │   └── ui/           # Custom cursor, particle canvas, dock switcher, cards
│   ├── context/          # DomainContext & AdminAuthContext
│   ├── lib/
│   │   ├── data/         # Portfolio service & resilient dual-mode data provider
│   │   ├── supabase/     # Supabase client & server instances
│   │   └── utils/        # Procedural sound synthesizer
│   └── types/            # Strict TypeScript data models
├── supabase/
│   ├── schema.sql        # Full PostgreSQL normalized DDL & RLS security policies
│   └── seed.sql          # Authentic portfolio seed records
└── .env.example          # Environment variables template
```

---

## Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Subha-Dhanusha/Subha-Dhanusha.github.io.git
cd Subha-Dhanusha.github.io
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project URL, Anon Key, and Service Role Key.

### 3. Initialize Supabase Database
1. Open your Supabase SQL Editor.
2. Execute `supabase/schema.sql` to generate tables and Row Level Security policies.
3. Execute `supabase/seed.sql` to populate initial authentic data.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## License
MIT License © 2026 Subha Dhanusha P.
