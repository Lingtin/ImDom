module.exports = {
// options...
    // baseUrl:process.env.NODE_ENV === 'production'?"/app/":'/',
    // devServer: {
    //     proxy: {
    //       '/api': {
    //         target: 'https://chat.ximiyun.cn/chat/',
    //         ws: true,
    //         changeOrigin: true
    //       }
    //     }
    //   }
    // devServer: {
    //     https: true,
    //     hot: true
    // }
    css: {
    loaderOptions: {
        css: {
        // 这里的选项会传递给 css-loader
        },
        postcss: {
        // 这里的选项会传递给 postcss-loader
        }
    }
    }
}