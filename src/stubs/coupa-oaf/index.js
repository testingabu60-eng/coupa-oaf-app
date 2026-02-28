export const initOAFInstance = (config = {}) => {
  return {
    config,
    sendEvent: async () => {},
    on: () => {},
    off: () => {},
    destroy: () => {},
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

export default { initOAFInstance, OAFClient };