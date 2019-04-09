module.exports = {
    css: {
        loaderOptions: {
            stylus: {
                
            }
        }
    },
    baseUrl: process.env.NODE_ENV === 'production'
    ? '/mujianan/'
    : '/',
    outputDir: 'mujianan'
}