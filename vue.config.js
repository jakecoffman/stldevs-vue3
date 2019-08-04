module.exports = {
    devServer: {
        proxy: {
            '^/stldevs-api': {
                target: 'https://stldevs.com',
                ws: true,
                changeOrigin: true
            }
        }
    },
    runtimeCompiler: true
}
