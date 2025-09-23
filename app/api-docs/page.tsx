import ApiDocsPage from "@/components/api-docs-page";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function ApiDocs() {
  return (
    <>
      <Navigation />
      <main className="w-full px-6 lg:px-8 py-8">
        <ApiDocsPage />
      </main>
      <Footer />
    </>
  );
}