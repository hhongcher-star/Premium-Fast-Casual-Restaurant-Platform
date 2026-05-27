import Nav from "./Nav";
import Footer from "./Footer";
import FloatingCartButton from "@/components/common/FloatingCartButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#14110f]">
      <Nav />
      <main>{children}</main>
      <FloatingCartButton />
      <Footer />
    </div>
  );
}
