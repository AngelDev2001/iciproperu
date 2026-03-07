import { Hero } from '@/sections/Hero';
import { Categories } from '@/sections/Categories';
import { CertificateVerifier } from '@/sections/CertificateVerifier';
import { AboutPreview } from '@/sections/AboutPreview';
import { Newsletter } from '@/sections/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <CertificateVerifier />
      <AboutPreview />
      <Newsletter />
    </>
  );
}
