import "./globals.css";
import Navbar from "@/components/Navbar";
import AppInitializer from "@/components/AppInitializer";

export const metadata = {
  title: "Myntra Clone | Fashion eCommerce",
  description: "Experience the best of fashion with Myntra Clone.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen pt-20">
        <AppInitializer>
          <Navbar />
          <main>
            {children}
          </main>
        </AppInitializer>
      </body>
    </html>
  );
}

