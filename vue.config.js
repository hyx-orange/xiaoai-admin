module.exports = {
    devServer: {
        host: '127.0.0.1',
        proxy: {
            '/api': {
                ws: false,
                target: 'http://localhost:7070',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },

}