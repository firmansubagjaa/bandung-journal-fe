import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/seo/SEO";
import { Home, Search, ArrowLeft } from "lucide-react";

export function NotFoundPage() {
  return (
    <main 
      role="main" 
      className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12"
      aria-label="Page not found"
    >
      <SEO 
        title="Page Not Found" 
        description="Oops! The page you're looking for doesn't exist. Let's get you back on track."
        noindex={true}
      />
      
      {/* Large 404 */}
      <h1 
        className="font-black text-swiss-blue dark:text-blue-400 mb-4 leading-none"
        style={{ fontSize: 'clamp(6rem, 20vw, 12rem)' }}
        aria-label="Error 404"
      >
        404
      </h1>
      
      {/* Headline */}
      <h2 
        className="font-black uppercase tracking-tight mb-4 dark:text-white"
        style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)' }}
      >
        Oops! Page Not Found
      </h2>
      
      {/* Friendly message */}
      <p className="text-base md:text-xl text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Looks like this page took a detour. Don't worry, it happens to the best of us!
      </p>
      
      {/* Action buttons - Touch friendly */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link to="/">
          <Button 
            className="bg-swiss-blue hover:bg-blue-800 text-white font-bold rounded-none min-h-[48px] px-8 text-base md:text-lg flex items-center gap-2"
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            Back to Home
          </Button>
        </Link>
        
        <Link to="/search">
          <Button 
            variant="outline"
            className="border-2 border-black dark:border-gray-600 font-bold rounded-none min-h-[48px] px-8 text-base md:text-lg flex items-center gap-2 dark:text-white"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
            Search Articles
          </Button>
        </Link>
      </div>
      
      {/* Browser back button hint */}
      <button 
        onClick={() => window.history.back()}
        className="mt-8 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-swiss-blue focus:ring-offset-2 rounded px-2 py-1"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Or go back to previous page
      </button>
    </main>
  );
}
