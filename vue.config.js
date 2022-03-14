const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  // ...
  publicPath: '/',
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to render.
        routes: ['/', '/home', '/shopData', '/homeData', '/otherData', '/user', '/register'],

        // html文件压缩
        minify: {
          minifyCSS: true, // css压缩
          removeComments: true // 移除注释
        },
        renderer: new Renderer({
          // Optional - The name of the property to add to the window object with the contents of `inject`.
          injectProperty: '__PRERENDER_INJECTED',
          // Optional - Any values you'd like your app to have access to via `window.injectProperty`.
          inject: {},
          // 在 main.js 中 new Vue({ mounted () {document.dispatchEvent(new Event('render-event'))}})，两者的事件名称要对应上。
          // renderAfterDocumentEvent: 'render-event'
          renderer: new PrerenderSPAPlugin.PuppeteerRenderer({ // 这样写renderAfterTime生效了
            renderAfterTime: 5000
          })
        })
      })
    ]
  }
}
