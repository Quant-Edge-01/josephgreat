import type { Metadata } from 'next';
import { EMAIL, IG_URL, PRICE_FLOOR, PRICE_CEILING, SITE_URL } from './site';

export const organizationId = `${SITE_URL}/#organization`;
export const personId = `${SITE_URL}/about-joseph#person`;
export const toronto = { '@type': 'City', name: 'Toronto', containedInPlace: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' } };
export const serviceArea = [toronto, { '@type': 'Place', name: 'Greater Toronto Area, Ontario, Canada' }];

export function pageMetadata(title: string, description: string, path: string, image = '/joseph.jpg'): Metadata {
  return {
    title, description, alternates: { canonical: path },
    openGraph: { title, description, url: path, type: 'website', siteName: 'Joseph The Great', locale: 'en_CA', images: [{ url: image, alt: 'Joseph The Great — Toronto creative marketing studio' }] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export const organizationSchema = {
  '@context': 'https://schema.org', '@type': 'Organization', '@id': organizationId,
  name: 'Joseph The Great', url: SITE_URL, email: EMAIL,
  description: 'Independent creative marketing studio in Toronto offering reels, Meta ads and websites for small businesses.',
  areaServed: serviceArea, sameAs: [IG_URL], founder: { '@id': personId },
};

export function webPageSchema(name: string, description: string, path: string, type = 'WebPage') {
  return { '@context': 'https://schema.org', '@type': type, '@id': `${SITE_URL}${path}#webpage`, url: `${SITE_URL}${path}`, name, description, inLanguage: 'en-CA', publisher: { '@id': organizationId } };
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.name, item: `${SITE_URL}${item.path}` })) };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org', '@type': 'Service', '@id': `${SITE_URL}${path}#service`,
    name, description, url: `${SITE_URL}${path}`, serviceType: 'Short-form content, Meta ads and website services',
    provider: { '@id': organizationId }, areaServed: serviceArea,
    offers: { '@type': 'Offer', url: `${SITE_URL}/affordable-marketing-toronto`,
      description: 'CAD $700–$1,000 per month depending on agreed scope. Ad spend is separate. A full website and every service are not automatically included.',
      priceSpecification: { '@type': 'UnitPriceSpecification', minPrice: PRICE_FLOOR, maxPrice: PRICE_CEILING, priceCurrency: 'CAD', unitText: 'month' },
    },
  };
}
