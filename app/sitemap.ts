import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { WORKS } from '@/lib/works';
import { DISCOVERY_SERVICES } from '@/lib/discovery-services';
import { INDUSTRIES } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/toronto-marketing', '/affordable-marketing-toronto', '/about-joseph', '/privacy-policy', '/case-studies', '/service-areas', ...DISCOVERY_SERVICES.map(p => `/${p.slug}`), ...INDUSTRIES.map(p => `/services/${p.slug}`), ...WORKS.map(w => `/works/${w.slug}`)];
  // No synthetic lastmod that claims every unchanged page was just updated.
  return paths.map(path => ({ url: `${SITE_URL}${path}` }));
}
