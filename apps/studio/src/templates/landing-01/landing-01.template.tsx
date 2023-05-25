import { CMSProvider } from "@/components/cms-provider/cms-provider";
import { CallToAction } from "./components/call-to-action";
import { FeatureActions } from "./components/feature-actions";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { Hero } from "./components/hero";
import { Pricing } from "./components/pricing";
import { SeparatorHero, SeparatorPricing } from "./components/separators";
export { default as landing01State } from './default-state.json';

export function Landing01Template({
  id
}: {
  id: string;
}) {
  return (
    <main className="leading-normal tracking-normal text-white gradient">
      <CMSProvider id={id}>
        <Header />
        <Hero />

        <SeparatorHero />

        <Features />
        <FeatureActions />
        <Pricing />

        <SeparatorPricing />
        
        <CallToAction />
        <Footer />
      </CMSProvider>
    </main>
  )
}