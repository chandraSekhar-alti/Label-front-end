import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'LabelFlow — Enterprise Labeling Platform',
  description: 'Modern enterprise labeling and compliance platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
