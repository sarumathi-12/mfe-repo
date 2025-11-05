const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'mfe',
  filename: 'debtEntry.js',

  exposes: {
    './Component': './src/app/app.component.ts',
    './DebtModule': './src/app/debt/debt.module.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
