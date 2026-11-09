import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta-sans',
  subsets: ['latin'],
  display: 'swap',
});
const metaDescription =
  'Organize your work, manage tasks, and track progress using Kanban, our task management application.';
const siteUrl = 'https://kanbanweb.vercel.app/';

export const metadata: Metadata = {
  title: 'Kanban',
  description: metaDescription,
  keywords: [
    'Kanban',
    'Task Management',
    'Project Management',
    'Task Tracking',
    'Boards',
  ],
  authors: [{ name: 'Elmar Chavez' }],
  creator: 'Elmar Chavez',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      {
        url: '/icons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    siteName: 'Kanban',
    locale: 'en_US',
    title: 'Kanban',
    type: 'website',
    description: metaDescription,
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}imgs/site-preview-meta-dark_1200x630.webp`,
        width: 1200,
        height: 630,
        alt: 'Kanban Web App Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kanban',
    description: metaDescription,
    images: [`${siteUrl}imgs/site-preview-meta-dark_1200x630.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#20212c' },
  ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col transition-colors">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
