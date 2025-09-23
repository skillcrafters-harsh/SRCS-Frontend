import HomePage from "@/components/home-page";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Home() {
  return <>
    <Navigation />
      <main className="w-full">
        <HomePage />
      </main>
      <Footer />
  </>
}