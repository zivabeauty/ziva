import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

/** Storefront shell — navbar, footer and the intro loader. The admin console lives outside this group. */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Loader />
      <Navbar />
      <main className="flex-grow flex flex-col pt-[102px] lg:pt-[142px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
