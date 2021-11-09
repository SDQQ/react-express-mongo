const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const {
  config
} = require('process')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const filename = ext => isDev ? `[name].${ext}` : `[name].[fullhash].${ext}`


module.exports = {
  context: path.resolve(__dirname, 'src'), // от какой папки отталкиваться webpack
  mode: 'development',
  entry: {
    main: './js/index.jsx', //точка входа
  },
  output: {
    filename: filename('js'), //В name подставится название точки входа и хэш в contenthash 
    path: path.resolve(__dirname, 'dist'), //куда сохранять выходные данные 
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.json', '.png','.jsx'], // Говорим с какими форматами работать по умолчанию (В импортах не надо писать расширение)
    alias: {
      '@img': path.resolve(__dirname, 'src/img'),
    }
  },
  optimization: {
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`,
    },
    minimize: true,
    minimizer: [new TerserPlugin(),new CssMinimizerPlugin()],
    // runtimeChunk: true
    splitChunks: {
      // include all types of chunks
      chunks: 'all',

    },
  },
  devtool: isDev ?'eval-source-map':'eval',//карты
  devServer: {
    port: 4200, //создание локального сервера
    hot: isDev,
    historyApiFallback: true, 
    compress: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'React and node', 
      template: './index.html',//показываем где лежит html файл
      
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from:'img/**/*', to:'' },
     
      ],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ],
  module: { // Работа с импортируемыми модулями (import './getData')
    rules: [{
        test: /\.css$/,
        use:[MiniCssExtractPlugin.loader, 'css-loader'],

      },
      {
        test: /\.s[ac]ss$/,
        use:[ // Creates `style` nodes from JS strings
        // "style-loader",
        // Translates CSS into CommonJS
        MiniCssExtractPlugin.loader,

        "css-loader",
        // Compiles Sass to CSS
        "sass-loader",]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env',
              '@babel/preset-react',{
              'plugins': ['@babel/plugin-proposal-class-properties']}]
          }
        }
      },
    ]
  }
}