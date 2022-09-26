'use strict'

const webpack = require('webpack')
const webpackdevs = require('webpack-dev-server')
const config = require('./webpack.config')

new webpackdevs(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true }
}).listen(8070, (err) =>{
    if (err) {console.log({message: 'Deu ruim', error: err.message})}
    console.log('Listening on port http://localhost:8070')
})