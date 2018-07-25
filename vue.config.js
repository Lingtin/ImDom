module.exports = {
// options...
    // baseUrl:process.env.NODE_ENV === 'production'?"/app/":'/',
    // devServer: {
    //     proxy: {
    //       '/api': {
    //         target: 'https://chat.ximiyun.cn/',
    //         ws: true,
    //         changeOrigin: true
    //       }
    //     }
    //   }
    devServer: {
        https: true,
        hot: true
    }
}