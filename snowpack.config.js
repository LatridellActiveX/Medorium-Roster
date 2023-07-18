module.exports = {
    mount: {
        public: {url: '/', static: true},
        src: {url: '/dist'}
    },
    plugins: [
        '@snowpack/plugin-react-refresh',
        '@snowpack/plugin-dotenv',
        '@snowpack/plugin-babel'
    ],
    babel: {
        presets: ['@babel/preset-react']
    },
    devOptions: {
        proxy: 'http://localhost:8080',
    }
};