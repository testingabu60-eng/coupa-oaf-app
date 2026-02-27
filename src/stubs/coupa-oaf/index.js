// src/stubs/coupa-oaf/index.js
// Minimal stub so the UI can run in the browser / on Vercel

export function initOAFInstance(config = {}) {
  const events = {
    on: () => {},
    off: () => {},
    emit: () => {},
  };

  return {
    // window + movement
    setSize: async (_size) => {},
    moveToLocation: async (_pos) => {},
    moveAndResize: async (_top, _left, _height, _width, _resetToDock) => {},

    // navigation
    navigateToPath: async (_path) => {},

    // page context
    getPageContext: async () => ({}),

    // forms
    readForm: async (_readMeta) => ({}),
    writeForm: async (_writeData) => ({}),

    // subscriptions
    listenToDataLocation: async (_subscriptionData) => {},
    listenToOafEvents: async (_subscriptionData) => {},

    // enterprise namespace
    enterprise: {
      openEasyForm: async (_formId) => {},
      launchUiButtonClickProcess: async (_processId) => {},
    },

    // events emitter (for consumers)
    events,

    // helpers
    getElementMeta: async (_formStructure) => ({}),
  };
}