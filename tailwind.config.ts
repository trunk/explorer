import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['./app/**/*.{ts,tsx}', './app/*.{ts,tsx}'],
    plugins: [],
    theme: {
        extend: {
            boxShadow: {
                // border for active states from Dashkit
                active: '0 0 0 0.15rem #33a382',
            },
            colors: {
                secondary: '#F7F7F7',
            },
            gridTemplateColumns: {
                // Grid template for TokenExtensions
                '12-ext': 'repeat(12, minmax(0, 1fr))',
            },
        },
        screens: {
            desktop: '1200px',
            laptop: '992px',
            lg: '1200px',
            'max-sm': '767px',
            'max-xs': '575px',
            md: '992px',
            mobile: '576px',
            sm: '768px',
            tablet: '768px',
            xl: '1400px',
            xs: '576px',
        },
    },
};

export default config;
