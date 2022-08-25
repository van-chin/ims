import { defineConfig } from 'vite-plugin-windicss';

export default defineConfig({
    theme: {
        screens: {
            xs: '480px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            xxl: '1600px',
        },
    },
})

