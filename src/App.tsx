import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { AuthProvider } from "@/features/auth/context/AuthContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";

import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { VerifyEmailPage } from "@/pages/VerifyEmailPage";
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "@/pages/ResetPasswordPage";

import { HomePage } from "@/pages/HomePage";
import { ArticlesPage } from "@/pages/ArticlesPage";
import { ArticleDetailPage } from "@/pages/ArticleDetailPage";
import { CategoriesPage } from "@/pages/CategoriesPage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { SearchPage } from "@/pages/SearchPage";
import { BookmarksPage } from "@/pages/BookmarksPage";
import { CategoryDetailPage } from "@/pages/CategoryDetailPage";

import { ProfilePage } from "@/pages/ProfilePage";
import { TermsPage } from "@/pages/TermsPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { TagsPage } from "@/pages/TagsPage";
import { TagDetailPage } from "@/pages/TagDetailPage";
import { AuthorProfilePage } from "@/pages/AuthorProfilePage";

import { HelmetProvider } from 'react-helmet-async';
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ThemeProvider } from "@/context/ThemeContext";

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/articles" element={<ArticlesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/articles/:slug" element={<ArticleDetailPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/categories/:id" element={<CategoryDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/tags" element={<TagsPage />} />
              <Route path="/tags/:slug" element={<TagDetailPage />} />
              <Route path="/authors/:id" element={<AuthorProfilePage />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
