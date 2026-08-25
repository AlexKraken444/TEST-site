import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TEST — a game about a Russian school',
  description: 'Just a game about a Russian school. With no story whatsoever, right?',
  openGraph: {
    title: 'TEST — a game about a Russian school',
    description: 'Everything makes sense. Nothing makes sense.',
    images: ['/test-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
