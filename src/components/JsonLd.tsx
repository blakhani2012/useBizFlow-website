/**
 * schema.org structured data (JSON-LD).
 *
 * Rendered as a plain <script type="application/ld+json"> so it is present in
 * the prerendered HTML of every route — crawlers never execute our JS bundle.
 */

const SITE_URL = "https://usebizflow.com";

type JsonLdProps = {
  id: string;
  data: Record<string, unknown>;
};

export default function JsonLd({ id, data }: JsonLdProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // JSON.stringify output is escaped so a "</script>" sequence in any value
      // cannot break out of the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * Site-wide graph: the company that publishes the site (Finscape Innovation),
 * the website itself, and the product (BizFlow).
 */
export const siteStructuredData: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Finscape Innovation",
      legalName: "Finscape Innovation",
      url: SITE_URL,
      email: "support@usebizflow.com",
      description:
        "Finscape Innovation builds BizFlow, an all-in-one business management platform for manufacturers, traders and service businesses.",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-light.png`,
        width: 2040,
        height: 600,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "support@usebizflow.com",
          url: `${SITE_URL}/contact`,
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
        {
          "@type": "ContactPoint",
          contactType: "customer support",
          email: "support@usebizflow.com",
          areaServed: "IN",
          availableLanguage: ["English", "Hindi", "Gujarati"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "BizFlow",
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#software`,
      name: "BizFlow",
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "ERP and CRM",
      operatingSystem: "Web, Android, iOS",
      inLanguage: "en-IN",
      description:
        "BizFlow is an all-in-one business management platform — CRM, sales and GST invoicing, purchases, live inventory, production control and quality, projects, tasks and documents — for growing businesses in India.",
      featureList: [
        "CRM with lead scoring and follow-ups",
        "Sales orders, quotations and GST invoicing",
        "Purchase requests, approvals and vendor bills",
        "Live inventory and stock control",
        "Production control and quality management",
        "Projects and task boards",
        "Built-in document drive",
      ],
      screenshot: `${SITE_URL}/og/home.png`,
      softwareHelp: `${SITE_URL}/features`,
      publisher: { "@id": `${SITE_URL}/#organization` },
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: {
        "@type": "Country",
        name: "India",
      },
    },
  ],
};
