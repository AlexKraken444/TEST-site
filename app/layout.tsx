import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TEST — игра про русскую школу',
  description: 'Просто игра про русскую школу. Без какого-либо сюжета, верно?',
  openGraph: {
    title: 'TEST — игра про русскую школу',
    description: 'Обычная школа. Обычный день. Наверное.',
    images: ['/test-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
