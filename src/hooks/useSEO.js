import { useEffect, useRef } from 'react';

const BASE_TITLE = 'CS Construction & Projects | Building Contractor & Plumber Cape Town';
const BASE_DESCRIPTION = 'CS Construction & Projects — trusted building contractor and plumber in Cape Town. Expert home renovations, new builds, extensions, tiling, roofing, waterproofing & 24/7 emergency plumbing. Free quotes. Call 071 727 0094.';

/**
 * useSEO — Dynamically sets per-page SEO metadata and injects JSON-LD schema.
 * Call this at the top of any page-level component.
 *
 * @param {Object} options
 * @param {string} [options.title]       - Browser tab <title> (site name appended automatically)
 * @param {string} [options.description] - Meta description (aim for 150–160 chars)
 * @param {Object|Array} [options.schema] - JSON-LD schema object or @graph array
 */
export default function useSEO({ title, description, schema } = {}) {
  const schemaRef = useRef(null);

  useEffect(() => {
    const SITE = 'CS Construction & Projects';

    // 1. Update <title>
    if (title) {
      document.title = title.includes(SITE) ? title : `${title} | ${SITE}`;
    }

    // 2. Update/create <meta name="description">
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      // Also update og:description for social previews
      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
    }

    // 3. Inject JSON-LD schema <script> tag
    if (schema) {
      const existing = document.getElementById('page-schema');
      if (existing) existing.remove();

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'page-schema';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      schemaRef.current = script;
    }

    // Cleanup on unmount: restore base meta
    return () => {
      document.title = BASE_TITLE;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute('content', BASE_DESCRIPTION);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', BASE_DESCRIPTION);
      if (schemaRef.current) {
        schemaRef.current.remove();
        schemaRef.current = null;
      }
    };
  }, [title, description]); // eslint-disable-line react-hooks/exhaustive-deps
}
