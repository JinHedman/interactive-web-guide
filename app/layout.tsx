import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Programming Guide",
    template: "%s | Programming Guide",
  },
  description: "An interactive HTML, CSS, and JavaScript learning guide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Inline script to apply saved theme + sidebar state before paint —
            sets attributes on <html> while the document is still parsing, so the
            UI renders in its persisted state with no flash and no hydration
            mismatch (CSS keys off these attributes; React reads them on mount). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('guide:theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
                if (localStorage.getItem('guide:sidebar-collapsed') === 'true') {
                  document.documentElement.setAttribute('data-sidebar-collapsed', 'true');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
