import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/** Storefront shell — navbar and footer. The admin console lives outside this group. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col pt-[102px] lg:pt-[142px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
