// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
    login: path.resolve(__dirname, 'src/scripts/login.js'),
    register: path.resolve(__dirname, 'src/scripts/login.js'),
    lupapassword: path.resolve(__dirname, 'src/scripts/login.js'),
    homepage: path.resolve(__dirname, 'src/scripts/homepage.js'),
    kategoritantangan: path.resolve(__dirname, 'src/scripts/kategoritantangan.js'),
    detailtantangan: path.resolve(__dirname, 'src/scripts/detailtantangan.js'),
    edukasi: path.resolve(__dirname, 'src/scripts/edukasi.js'),
    detailartikel: path.resolve(__dirname, 'src/scripts/edukasi.js'),
    uploadgambar: path.resolve(__dirname, 'src/scripts/uploadgambar.js'),
    uploadberhasil: path.resolve(__dirname, 'src/scripts/uploadberhasil.js'),
    reward: path.resolve(__dirname, 'src/scripts/reward.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: path.resolve(__dirname, 'src/templates/login.html'),
      chunks: ['login'],
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: path.resolve(__dirname, 'src/templates/register.html'),
      chunks: ['register'],
    }),
    new HtmlWebpackPlugin({
      filename: 'homepage.html',
      template: path.resolve(__dirname, 'src/templates/homepage.html'),
      chunks: ['homepage'],
    }),
    new HtmlWebpackPlugin({
      filename: 'lupapassword.html',
      template: path.resolve(__dirname, 'src/templates/lupapassword.html'),
      chunks: ['lupapassword'],
    }),
    new HtmlWebpackPlugin({
      filename: 'kategoritantangan.html',
      template: path.resolve(__dirname, 'src/templates/kategoritantangan.html'),
      chunks: ['kategoritantangan'],
    }),
    new HtmlWebpackPlugin({
      filename: 'detailtantangan.html',
      template: path.resolve(__dirname, 'src/templates/detailtantangan.html'),
      chunks: ['detailtantangan'],
    }),
    new HtmlWebpackPlugin({
      filename: 'edukasi.html',
      template: path.resolve(__dirname, 'src/templates/edukasi.html'),
      chunks: ['edukasi'],
    }),
    new HtmlWebpackPlugin({
      filename: 'detailartikel.html',
      template: path.resolve(__dirname, 'src/templates/detailartikel.html'),
      chunks: ['detailartikel'],
    }),
    new HtmlWebpackPlugin({
      filename: 'uploadgambar.html',
      template: path.resolve(__dirname, 'src/templates/uploadgambar.html'),
      chunks: ['uploadgambar'],
    }),
    new HtmlWebpackPlugin({
      filename: 'uploadberhasil.html',
      template: path.resolve(__dirname, 'src/templates/uploadberhasil.html'),
      chunks: ['uploadberhasil'],
    }),
    new HtmlWebpackPlugin({
      filename: 'reward.html',
      template: path.resolve(__dirname, 'src/templates/reward.html'),
      chunks: ['reward'],
    }),


    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,  // Ganti 3000 dengan port yang Anda inginkan
  },
};
