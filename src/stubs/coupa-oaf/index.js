// src/stubs/coupa-oaf/index.js
// Minimal no-op stub so the app can build & run without the real OAF client.

export const initOAFInstance = (config = {}) => {
  return {
    config,
    sendEvent: async () => {}, // no-op
    on: () => {},              // no-op
    off: () => {},             // no-op
    destroy: () => {},         // no-op
  };
};

export class OAFClient {
  constructor(config = {}) {
    this.config = config;
  }
  async sendEvent() {}
  on() {}
  off() {}
  destroy() {}
}

// Provide default export as well for compatibility
const defaultExport = { initOAFInstance, OAFClient };
export default defaultExport;