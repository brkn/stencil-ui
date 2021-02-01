import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'stencil-ui',
  plugins: [sass()],
  outputTargets: [
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
      dir: 'docs',
    },
    {
      /**
       * This is for building an app with stencil.
       *
       * Eventhough we dont need an app, this is useful to build out and test the components
       * throughout development.
       */
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    browserArgs: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--headless',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-software-rasterizer',
      '--mute-audio',
      '--remote-debugging-port=0',
      '--window-size=1440,900',
    ],
  },
};
