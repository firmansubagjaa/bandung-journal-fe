/**
 * TabFilter Component
 * Category/filter tabs for filtering content
 * Based on reference Image 1 & 2 - category tabs
 */

import { cn } from '@/lib/utils';

interface TabItem {
  label: string;
  value: string;
}

interface TabFilterProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
}

export function TabFilter({ tabs, activeTab, onTabChange, className }: TabFilterProps) {
  return (
    <nav 
      className={cn("flex flex-wrap gap-2", className)}
      role="tablist"
      aria-label="Content filters"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onTabChange(tab.value)}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white focus-visible:ring-offset-2",
              isActive
                ? "bg-black dark:bg-white text-white dark:text-black"
                : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}

// Preset tab configurations
export const CATEGORY_TABS: TabItem[] = [
  { label: 'All', value: '' },
  { label: 'Trending', value: 'trending' },
  { label: 'Politics', value: 'politics' },
  { label: 'Business', value: 'business' },
  { label: 'Culture', value: 'culture' },
  { label: 'Lifestyle', value: 'lifestyle' },
];

export const ARTICLE_FILTER_TABS: TabItem[] = [
  { label: 'All', value: '' },
  { label: 'Trending', value: 'trending' },
  { label: 'International', value: 'international' },
  { label: 'Politics', value: 'politics' },
  { label: 'Business', value: 'business' },
];

export default TabFilter;
