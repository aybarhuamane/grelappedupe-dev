import { HeaderSection, MainSection } from "@/modules/dashboard";
import { FooterPage } from "@/modules/home/Landing/footer-page";

export default function Page() {
  return (
    <main className="w-full">
      <HeaderSection />
      <MainSection />
      <FooterPage />
    </main>
  );
}
