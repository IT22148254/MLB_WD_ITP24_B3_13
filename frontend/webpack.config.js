module.exports = {
    // other webpack configuration options...
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
        },
      ],
    },
  };
  