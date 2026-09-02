import React, { useEffect } from 'react';

export const SEO = ({
  title = 'जयगुरुदेव — Jaigurudev Sanstha | Official Spiritual Platform',
  description = 'Official spiritual portal of Jaigurudev Sanstha. Daily Satsang updates, Ashram Adhesh, spiritual teachings, audio/video discourses, and events.',
  keywords = 'Jaigurudev, Satsang, Mathura Ashram, Surat Shabd Yoga, Shakahar, Bhajan, Adhesh',
  ogImage = '/logo.svg',
  canonicalUrl,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // 2. Update Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Update Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', keywords);

    // 4. Update OpenGraph Tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: canonicalUrl || window.location.href },
    ];

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // 5. Inject Structured JSON-LD Data for Search Engines
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Jaigurudev Sanstha',
      alternateName: 'जयगुरुदेव धर्म प्रचारक संस्था',
      url: 'https://jaigurudev.org',
      logo: 'https://jaigurudev.org/logo.svg',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9876543210',
        contactType: 'Office Helpline',
        areaServed: 'IN',
        availableLanguage: ['Hindi', 'English'],
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jaigurudev Ashram, NH-19',
        addressLocality: 'Mathura',
        addressRegion: 'Uttar Pradesh',
        postalCode: '281001',
        addressCountry: 'IN',
      },
    };

    let scriptTag = document.getElementById('json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.text = JSON.stringify(schemaData);
  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
};

export default SEO;
