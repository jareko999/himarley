/** @type {import('tailwindcss').Config['content']} */
export const content = [
  './components/**/*.{js,vue,ts}',
  './layouts/*.vue',
  './pages/*.vue',
  './pages/**/*.vue',
  './app.vue',
  './error.vue',
];

/** @type {import('tailwindcss').Config['theme']} */
export const theme = {
  extend: {
    colors: {
      primary: '#4f46e5',
      'primary-hover': '#4338ca'
    },
    spacing: {
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '24px',
      6: '32px',
    },
    maxWidth: {
      containerWide: '1300px',
      container: '1200px',
      article: '900px',
      form: '500px',
    },
    width: {
      container: '1200px',
    },
    gridTemplateColumns: {
      // Complex site-specific column configuration
      products: 'repeat(auto-fill, minmax(300px, 1fr))',
      cart: 'repeat(auto-fill, minmax(380px, 1fr))',
      product: 'repeat(auto-fill, minmax(500px, 1fr))',
      thumbnails: 'repeat(auto-fill, minmax(80px, 1fr))',
    },
    gridTemplateRows: {
      thumbnails: 'repeat(auto-fill, minmax(80px, 1fr))',
    },
  },
  fontSize: {
    xs: ['12px', '16px'],
    sm: ['16px'],
    base: ['16px', '24px'],
    lg: ['20px', '28px'],
    xl: ['24px', '32px'],
    '2xl': ['32px', '40px'],
    '3xl': ['40px', '56px'],
  },
};

/** @type {import('tailwindcss').Config['plugins']} */
export const plugins = [
  require('@tailwindcss/typography'),
];