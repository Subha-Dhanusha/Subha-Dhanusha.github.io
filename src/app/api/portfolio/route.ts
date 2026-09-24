import { NextRequest, NextResponse } from 'next/server';
import { getPortfolioData, getDomainBundle } from '@/lib/data/portfolio-service';
import { DomainId } from '@/types/portfolio';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain') as DomainId | null;

    if (domain && ['ai-ml', 'data-engineering', 'data-analytics', 'software'].includes(domain)) {
      const data = await getDomainBundle(domain);
      return NextResponse.json(data);
    }

    const fullData = await getPortfolioData();
    return NextResponse.json(fullData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch portfolio data' }, { status: 500 });
  }
}
