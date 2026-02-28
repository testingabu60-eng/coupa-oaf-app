// src/features/oaf/noopClient.js
export function createNoopClient(config = {}) {
  const noop = () => {};
  return {
    config,
    on: noop,       // <- listeners won't crash
    off: noop,
    sendEvent: noop,
    emit: noop,
    destroy: noop
  };
}