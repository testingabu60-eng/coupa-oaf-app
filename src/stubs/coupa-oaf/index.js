# Create/overwrite the stub file
Set-Content -Path src/stubs/coupa-oaf/index.js -Value @"
// src/stubs/coupa-oaf/index.js
export function initOAFInstance(config = {}) {
  const events = { on: () => {}, off: () => {}, emit: () => {} };

  return {
    setSize: async (_size) => {},
    moveToLocation: async (_pos) => {},
    moveAndResize: async (_t, _l, _h, _w, _r) => {},
    navigateToPath: async (_path) => {},
    getPageContext: async () => ({}),
    readForm: async (_read) => ({}),
    writeForm: async (_write) => ({}),
    listenToDataLocation: async (_sub) => {},
    listenToOafEvents: async (_sub) => {},
    enterprise: {
      openEasyForm: async (_formId) => {},
      launchUiButtonClickProcess: async (_processId) => {},
    },
    events,
    getElementMeta: async (_formStructure) => ({}),
  };
}
"@