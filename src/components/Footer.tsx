import Link from "next/link";

const footerLinks = {
  Product: [
    { name: "Features", href: "/features" },
    { name: "Product Tour", href: "/demo" },
    { name: "Pricing", href: "/pricing" },
    { name: "CRM", href: "/features#crm" },
    { name: "Inventory", href: "/features#inventory" },
    { name: "Sales", href: "/features#sales" },
  ],
  Company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  Support: [
    { name: "Book a Free Demo", href: "/contact?interest=Product Demo" },
    { name: "Help & Support", href: "/contact?interest=Support" },
    { name: "Sign In", href: "https://app.usebizflow.com" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <img
                src="/logo-dark.png"
                alt="useBizflow"
                width={2040}
                height={600}
                loading="lazy"
                decoding="async"
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-slate-400 max-w-xs">
              The all-in-one business management platform for growing companies. CRM, Inventory, Sales, and more.
            </p>
            <a
              href="mailto:support@usebizflow.com"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              support@usebizflow.com
            </a>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-3">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} BizFlow by Finscape Innovation. All rights reserved.
          </p>
          <a
            href="mailto:support@usebizflow.com"
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            support@usebizflow.com
          </a>
        </div>
      </div>
    </footer>
  );
}
