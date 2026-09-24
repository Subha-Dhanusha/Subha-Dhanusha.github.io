import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://subha-dhanusha.github.io';

  const routes = [
    '',
    '/ai-ml',
    '/data-engineering',
    '/data-analytics',
    '/software',
    '/projects',
    '/projects/medirisk-ai',
    '/projects/stock-market-fundamental-analysis',
    '/projects/network-forensic-investigation',
    '/projects/techvolt-fullstack-crm',
    '/about',
    '/contact',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/projects') ? 0.9 : 0.8,
  }));
}
