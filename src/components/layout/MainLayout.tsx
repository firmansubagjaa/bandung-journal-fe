import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />
      <main 
        id="main-content" 
        className="flex-1 container mx-auto px-4 md:px-6 py-8 dark:bg-gray-950" 
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
