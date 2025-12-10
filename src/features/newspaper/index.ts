/**
 * Newspaper Feature Module Index
 * Exports all newspaper-related components, hooks, and services
 */

// Types
export * from './types';

// Services
export { newspaperService } from './services/newspaperService';

// Hooks
export {
  useFeaturedArticles,
  useHeroArticle,
  useBreakingNews,
  useTrendingArticles,
  useNewsletterSubscribe,
  useNewsletterUnsubscribe,
} from './hooks/useNewspaper';

// Components
export { HeroArticle, HeroArticleSkeleton } from './components/HeroArticle';
export { BreakingNewsTicker } from './components/BreakingNewsTicker';
export { TrendingCarousel } from './components/TrendingCarousel';
export { NewsletterCTA } from './components/NewsletterCTA';
