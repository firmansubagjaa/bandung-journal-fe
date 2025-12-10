import { Helmet } from 'react-helmet-async';

interface ArticleData {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  authorUrl?: string;
  tags?: string[];
  section?: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
  type?: 'website' | 'article' | 'profile';
  article?: ArticleData;
  noindex?: boolean;
}

const SITE_NAME = 'Bandung Journal';
const DEFAULT_DESCRIPTION = 'Bandung Journal - Your trusted source for news, culture, and lifestyle in West Java. Discover stories that matter.';
const DEFAULT_IMAGE = '/og-image.jpg'; // Default social sharing image
const SITE_URL = 'https://bandung-journal.com'; // Update with actual domain

export function SEO({ 
  title, 
  description = DEFAULT_DESCRIPTION, 
  image = DEFAULT_IMAGE,
  url,
  keywords,
  type = 'website',
  article,
  noindex = false,
}: SEOProps) {
  const siteTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const canonicalUrl = url ? `${SITE_URL}${url}` : undefined;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  // Generate JSON-LD structured data for articles
  const articleJsonLd = article && type === 'article' ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    author: {
      '@type': 'Person',
      name: article.author,
      url: article.authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: article.tags?.join(', '),
    articleSection: article.section,
  } : null;

  // Generate WebSite structured data for homepage
  const websiteJsonLd = type === 'website' && !url ? {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    description: description,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  } : null;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Article specific OG tags */}
      {article?.publishedTime && (
        <meta property="article:published_time" content={article.publishedTime} />
      )}
      {article?.modifiedTime && (
        <meta property="article:modified_time" content={article.modifiedTime} />
      )}
      {article?.author && (
        <meta property="article:author" content={article.author} />
      )}
      {article?.tags?.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}
      {article?.section && (
        <meta property="article:section" content={article.section} />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@BandungJournal" />
      <meta name="twitter:creator" content="@BandungJournal" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* JSON-LD Structured Data */}
      {articleJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd)}
        </script>
      )}
      {websiteJsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(websiteJsonLd)}
        </script>
      )}
    </Helmet>
  );
}
