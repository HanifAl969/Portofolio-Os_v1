import type { Metadata } from "next";
import "./globals.css";
import "./tokens.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: {
    default: "Hanif Al - DevOps Engineer & Security Portfolio",
    template: "%s | Hanif Al Portfolio"
  },
  description: "Interactive portfolio showcasing DevOps engineering, cloud infrastructure, CI/CD pipelines, Kubernetes, Docker, Terraform, and cybersecurity projects. Experienced in AWS, Azure, GCP.",
  keywords: [
    "DevOps Engineer",
    "Cloud Infrastructure", 
    "Kubernetes",
    "Docker",
    "Terraform",
    "CI/CD",
    "AWS",
    "Azure",
    "GCP",
    "Cybersecurity",
    "Network Engineering",
    "Infrastructure as Code",
    "Container Orchestration",
    "Jenkins",
    "GitHub Actions",
    "Security Automation"
  ],
  authors: [{ name: "Hanif Al", url: "https://yourdomain.com" }],
  creator: "Hanif Al",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "Hanif Al Portfolio",
    title: "Hanif Al - DevOps Engineer & Security Portfolio",
    description: "Interactive portfolio showcasing DevOps, cloud infrastructure, and cybersecurity projects",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hanif Al - DevOps Engineer Portfolio"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanif Al - DevOps Engineer & Security Portfolio",
    description: "Interactive portfolio showcasing DevOps, cloud infrastructure, and cybersecurity projects",
    images: ["/og-image.png"],
    creator: "@yourhandle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0e14" />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
