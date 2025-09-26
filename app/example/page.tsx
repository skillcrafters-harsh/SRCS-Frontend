import ExamplePage from "@/components/example-page";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Example() {
  return (
    <>
      <Navigation />
      <main className="w-full px-6 lg:px-8 py-8">
        <ExamplePage />
      </main>
      <Footer />
    </>
  );
}
