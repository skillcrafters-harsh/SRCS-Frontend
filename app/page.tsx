"use client";
import HomePage from "@/components/home-page";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Home() {
  const handleNavigate = (tab: string) => {
    // Handle navigation logic here
    // console.log("Navigate to:", tab);
  };

  return (
    <>
      <Navigation />
      <main className="w-full">
        <HomePage onNavigate={handleNavigate} />
      </main>
      <Footer />
    </>
  );
}
