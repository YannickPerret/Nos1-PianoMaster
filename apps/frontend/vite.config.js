import { join } from 'path';
import { createHTML } from '@vitejs/html';
import dotenv from 'dotenv-vite';
import postcss from 'rollup-plugin-postcss';

const config = {
  entry: './src/main.js',

  output: {
    dir: join(__dirname, 'dist'),
    assetModuleFilename: 'images/[name][ext]',
    publicUrl: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.png', '.jpg', '.mp4', '.gif'],
    alias: {
      '@': join('./src'),
      '@css': join('./src/style'),
      '@images': join('./src/images'),
      '@videos': join('./src/videos'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: '@vitejs/babel-plugin-vue',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-loader',
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(mp4|webm|ogv|avi|ogg)$/i,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    createHTML({
      template: './src/index.html',
      title: 'Piano Master - Stocker, découvrez et jouez de la musique facilement!',
      minify: false,
    }),
    dotenv({
      path: './.env',
    }),
    postcss(),
  ],
};

export default config;
