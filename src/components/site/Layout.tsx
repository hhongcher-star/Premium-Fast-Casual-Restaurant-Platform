import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pb-12">{children}</main>
      <Footer />
    </div>
  );
}
