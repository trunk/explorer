import './scss/theme-dark.scss';
import '../app/styles.css';

import { ClusterModal } from '@components/ClusterModal';
import { MessageBanner } from '@components/MessageBanner';
import { Navbar } from '@components/Navbar';
import { ClusterProvider } from '@providers/cluster';
import { ScrollAnchorProvider } from '@providers/scroll-anchor';
import type { Viewport } from 'next';
import dynamic from 'next/dynamic';
import { Rubik } from 'next/font/google';
import { Metadata } from 'next/types';
const SearchBar = dynamic(() => import('@components/SearchBar'), {
    ssr: false,
});

export const metadata: Metadata = {
    description: 'Inspect transactions, accounts, blocks, and more on the Trunk SVM',
    manifest: '/manifest.json',
    title: 'Explorer | Trunk',
};

export const viewport: Viewport = {
    initialScale: 1,
    maximumScale: 1,
    width: 'device-width',
};

const rubikFont = Rubik({
    display: 'swap',
    subsets: ['latin'],
    variable: '--explorer-default-font',
    weight: ['300', '400', '700'],
});

export default function RootLayout({
    analytics,
    children,
}: {
    analytics?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${rubikFont.variable}`}>
            <head>
                <meta property="og:title" content="explorer | trunk" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://explorer.trunk.com" />
                <meta property="og:image" content="https://explorer.trunk.com/opengraph-image.png" />
                <link rel="icon" href="/favicon.png" type="image/png" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            </head>
            <body className="min-h-screen" style={{ backgroundColor: '#F7F7F7' }}>
                <ScrollAnchorProvider>
                    <ClusterProvider>
                        <ClusterModal />
                        <div className="main-content pb-4">
                            <Navbar>
                                <SearchBar />
                            </Navbar>
                            <MessageBanner />
                            <div className="container my-3 d-lg-none">
                                <SearchBar />
                            </div>
                            {/* <div className="container my-3 d-lg-none">
                                <ClusterStatusButton />
                            </div> */}
                            {children}
                        </div>
                    </ClusterProvider>
                </ScrollAnchorProvider>
                {analytics}
            </body>
        </html>
    );
}
