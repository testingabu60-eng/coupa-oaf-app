import React, { createContext, useReducer, useMemo } from "react";
import { createNoopClient } from "./noopClient";
// import { initOAFInstance } from "@coupa/open-assistant-framework-client"; // when you’re ready

export const OafContext = createContext(null);

export const OafProvider = ({ children, host, iframeId, clientId, config }) => {
  // ...your reducer & state (unchanged)

  const mergedConfig = useMemo(() => {
    const q = new URLSearchParams(location.search);
    return {
      host: host || (config && config.host) || q.get("host") || q.get("coupaHost") || q.get("tenant") || "https://ey-in-demo.coupacloud.com",
      iframeId: iframeId || (config && config.iframeId) || q.get("iframeId") || q.get("clientId") || q.get("iframe_id") || q.get("id") || "69",
      clientId: clientId || (config && config.clientId) || q.get("clientId") || "69",
    };
  }, [host, iframeId, clientId, config]);

  // If you enable the real initializer later, keep the fallback
  // const client = useMemo(() => initOAFInstance(mergedConfig) ?? createNoopClient(mergedConfig), [mergedConfig]);
  const client = useMemo(() => createNoopClient(mergedConfig), [mergedConfig]);

  const value = useMemo(() => ({ state, dispatch, client, config: mergedConfig }), [state, client, mergedConfig]);
  return <OafContext.Provider value={value}>{children}</OafContext.Provider>;
};