// src/features/oaf/safeEvents.js

/**
 * Safely attach an event handler if the client supports events.
 * Returns a disposer function you can call to unsubscribe (no-op if nothing was attached).
 *
 * Usage:
 *   const dispose = safeListen(client, "oaf:push", handler);
 *   // later in cleanup:
 *   dispose();
 */
export function safeListen(client, event, handler) {
  const on =
    client && (typeof client.on === "function"
      ? client.on.bind(client)
      : typeof client.addListener === "function"
      ? client.addListener.bind(client)
      : null);

  const off =
    client && (typeof client.off === "function"
      ? client.off.bind(client)
      : typeof client.removeListener === "function"
      ? client.removeListener.bind(client)
      : null);

  if (!on) {
    // Couldn't attach (client missing or doesn't support events)
    return () => {};
  }

  on(event, handler);

  // Return a no-throw disposer even if "off" isn't available
  return () => {
    if (off) {
      try {
        off(event, handler);
      } catch {
        // swallow to keep teardown safe
      }
    }
  };
}

/**
 * Backwards-compatible helpers in case you prefer the old API
 * They return true when a listener was attached/removed, false otherwise.
 */
export function safeOn(client, event, handler) {
  const disposer = safeListen(client, event, handler);
  // we attached only if disposer actually unsubscribes something
  const attached = disposer.toString().includes("off(") || disposer.toString().includes("removeListener(");
  // but the above string check is not ideal across bundlers; return true if client had any on/addListener
  return !!(
    client &&
    (typeof client.on === "function" || typeof client.addListener === "function")
  );
}

export function safeOff(client, event, handler) {
  const off =
    client && (typeof client.off === "function"
      ? client.off.bind(client)
      : typeof client.removeListener === "function"
      ? client.removeListener.bind(client)
      : null);

  if (!off) return false;
  try {
    off(event, handler);
    return true;
  } catch {
    return false;
  }
}