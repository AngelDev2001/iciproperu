import { Hero } from '@/sections/Hero';
import { Info } from '@/sections/Info';
import { CertificateVerification } from '@/sections/CertificateVerification';
import { Newsletter } from '@/sections/Newsletter';
import { BannerCarousel } from '@/sections/BannerCarrousel';

export default function Home() {
  return (
    <div>
      <Hero />
      <BannerCarousel />
      <Info />
      <CertificateVerification />
      <Newsletter />
    </div>
  );
}
