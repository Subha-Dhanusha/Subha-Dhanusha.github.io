import { NextRequest, NextResponse } from 'next/server';
import { incrementResumeDownload, getPortfolioData } from '@/lib/data/portfolio-service';
import { DomainId } from '@/types/portfolio';

export async function GET(
  req: NextRequest,
  { params }: { params: { domain: string } }
) {
  try {
    const domain = params.domain as DomainId;
    const portfolio = await getPortfolioData();
    const resume = portfolio.resumes[domain] || portfolio.resumes['ai-ml'];

    // Track download metric
    await incrementResumeDownload(domain);

    const fileUrl = resume?.file_url || '/resumes/Subha_Dhanusha_AI_ML_Resume.pdf';
    return NextResponse.redirect(new URL(fileUrl, req.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/resumes/Subha_Dhanusha_AI_ML_Resume.pdf', req.url));
  }
}
