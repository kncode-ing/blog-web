// import jquery from 'jquery'; 

const webpack = require('webpack')

module.exports = {
  configureWebpack:{
    plugins:[
    new webpack.ProvidePlugin({
      $              : "jquery",
      jQuery         : "jquery",
      "window.jQuery": "jquery",
      "root.jQuery"  : "jquery",
      // Semantic-UI
      semantic     : 'semantic-ui-css',
      Semantic     : 'semantic-ui-css',
      'semantic-ui': 'semantic-ui-css'
    }),
    ]
  }
}