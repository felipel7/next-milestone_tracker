import { Container, Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './Navbar';
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './api/auth/Provider';
import './globals.css';
import './theme-config.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Milestone Tracker App',
  description: 'Track and manage project milestones with ease.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <QueryClientProvider>
          <AuthProvider>
            <Theme
              accentColor="indigo"
              appearance="light"
              grayColor="mauve"
              panelBackground="solid"
            >
              <Navbar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
