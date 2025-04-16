const { join } = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'production', // voeg deze toe om de warning weg te halen
  externals: [nodeExternals()],
  entry: './apps/data-api/src/main.ts',
  output: {
    path: join(__dirname, '../../dist/apps/data-api'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@project/backend-dto': join(__dirname, '../../libs/backend/dto/src/index.ts'),
      '@project/libs/shared/api': join(__dirname, '../../libs/shared/api/src/index.ts'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
