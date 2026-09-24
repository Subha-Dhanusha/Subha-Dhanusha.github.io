import type { Metadata } from 'next';
import './globals.css';
import { DomainProvider } from '@/context/DomainContext';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import CustomCursor from '@/components/ui/CustomCursor';
import ParticleCanvas from '@/components/ui/ParticleCanvas';

export const metadata: Metadata = {
  metadataBase: new URL('https://subha-dhanusha.github.io'),
  title: 'Subha Dhanusha P — Digital Portfolio | AI × Data × Engineering',
  description: 'Award-winning multi-domain engineering portfolio of Subha Dhanusha P. Seamlessly explore four professional lenses: AI/ML Engineering, Cloud Data Engineering, Financial Analytics, and Full-Stack Software Systems.',
  authors: [{ name: 'Subha Dhanusha P', url: 'https://subha-dhanusha.github.io' }],
  keywords: [
    'Subha Dhanusha P',
    'AI Engineer',
    'Machine Learning',
    'Cloud Data Engineer',
    'Financial Data Analyst',
    'Software Engineer',
    'MediRisk AI',
    'Stock Fundamental Analysis',
    'Anna University',
    'Ramco Institute of Technology',
  ],
  openGraph: {
    title: 'Subha Dhanusha P — Multi-Domain Digital Portfolio',
    description: 'AI × Data × Engineering Portfolio. Switch across four specialized professional identities.',
    url: 'https://subha-dhanusha.github.io',
    siteName: 'Subha Dhanusha — Digital Portfolio',
    images: [
      {
        url: '/assets/og-cover.svg',
        width: 1200,
        height: 630,
        alt: 'Subha Dhanusha Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subha Dhanusha P — Multi-Domain Digital Portfolio',
    description: 'AI × Data × Engineering Portfolio. Switch across four specialized professional identities.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* JSON-LD Structured Data for Person Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Subha Dhanusha P',
              url: 'https://subha-dhanusha.github.io',
              sameAs: [
                'https://github.com/Subha-Dhanusha',
                'https://linkedin.com/in/subha-dhanusha-b6b3ab291',
              ],
              jobTitle: 'AI/ML & Cloud Data Engineer',
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Ramco Institute of Technology, Anna University',
              },
              knowsAbout: [
                'Machine Learning',
                'Data Engineering',
                'Financial Analysis',
                'Python',
                'SQL',
                'Flask',
                'PySpark',
                'Docker',
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-white">
        <AdminAuthProvider>
          <DomainProvider initialDomain="ai-ml">
            <CustomCursor />
            <ParticleCanvas />
            <div className="relative z-10 flex min-h-screen flex-col">
              {children}
            </div>
          </DomainProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
