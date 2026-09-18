import DiscoveryService from '@/components/DiscoveryService';
import { DISCOVERY_SERVICES } from '@/lib/discovery-services';
import { pageMetadata } from '@/lib/seo';
const service = DISCOVERY_SERVICES[1];
export const metadata = pageMetadata(service.title + ' | Joseph The Great', service.intro + ' CAD $700–$1,000/month depending on scope; ad spend separate.', '/instagram-reels-toronto');
export default function Page() { return <DiscoveryService service={service} />; }
