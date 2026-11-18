import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SEO({
  title = 'CHEXY HUB — Check Your Style | Premium Checkered Fashion',
  description = 'Discover premium checkered fashion for Men, Women, Kids and Matching Family Collections. Check your style with CHEXY HUB.',
  image = 'https://images.unsplash.com/photo-1610886886310-be2828d6afd5?auto=format&fit=crop&w=1200&q=80',
  url = 'https://chexyhub.com',
}) {
  const fullTitle = title.includes('CHEXY HUB') ? title : `${title} | CHEXY HUB`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
