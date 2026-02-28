// src/features/oaf/OafContext.jsx
import React, { createContext, useReducer, useMemo } from "react";
import { DISPATCH_ACTIONS, LAYOUT_POSITIONS, LAYOUT_STATES } from "./oafConstants";
import { createNoopClient } from "./noopClient";
// When you wire the real Coupa client later, keep the fallback:
// import { initOAFInstance } from "@coupa/open-assistant-framework-client";

export const OafContext = createContext(null);

/** Initial UI state kept in context */
const INITIAL = {
  currLayoutPosition: LAYOUT_POSITIONS.DOCKED_RIGHT,
  currLayoutState: LAYOUT_STATES.DEFAULT,
  prevLayoutState: null,
  response: null,
  error: null,
};

function oafReducer(oaf, action) {
  switch (action.type) {
    case DISPATCH_ACTIONS.SET_RESPONSE:
      return { ...oaf, response: action.payload, error: null };
    case DISPATCH_ACTIONS.SET_LAYOUT_POSITION:
      return { ...oaf, currLayoutPosition: action.payload };
    case DISPATCH_ACTIONS.SET_ERROR:
      return { ...oaf, error: action.payload, response: null };
    case DISPATCH_ACTIONS.SET_LAYOUT_STATE:
      return {
        ...oaf,
        prevLayoutState: oaf.currLayoutState,
        currLayoutState: action.payload,
      };
    default:
      return oaf;
  }
}

/**
 * Provider that ALWAYS supplies a client with .on/.off so consumers never crash.
 * It also normalizes host / iframeId / clientId the same way across the app.
 */
export const OafProvider = ({ children, host, iframeId, clientId, config }) => {
  // Use a name that cannot collide with any outer "state" symbol
  const [oaf, dispatch] = useReducer(oafReducer, INITIAL);

  // Normalize Coupa bootstrap parameters
  const mergedConfig = useMemo(() => {
    const q = new URLSearchParams(window.location.search);

    const resolvedHost =
      host ||
      (config && config.host) ||
      q.get("host") ||
      q.get("coupaHost") ||
      q.get("tenant") ||
      "https://ey-in-demo.coupacloud.com";

    const resolvedIframeId =
      iframeId ||
      (config && config.iframeId) ||
      q.get("iframeId") ||
      q.get("clientId") ||
      q.get("iframe_id") ||
      q.get("id") ||
      "69";

    const resolvedClientId =
      clientId ||
      (config && config.clientId) ||
      q.get("clientId") ||
      resolvedIframeId;

    return {
      host: resolvedHost,
      iframeId: resolvedIframeId,
      clientId: resolvedClientId,
    };
  }, [host, iframeId, clientId, config]);

  // 🔁 Swap to the real client when available, but keep a safe fallback
  // const realClient = initOAFInstance?.(mergedConfig);
  // const client = realClient ?? createNoopClient(mergedConfig);
  const client = useMemo(() => createNoopClient(mergedConfig), [mergedConfig]);

  // ⚠️ IMPORTANT: Expose property named "state" so existing consumers keep working
  const value = useMemo(
    () => ({
      state: oaf,         // ← expose as "state"
      dispatch,
      client,
      config: mergedConfig,
    }),
    [oaf, dispatch, client, mergedConfig]
  );

  return <OafContext.Provider value={value}>{children}</OafContext.Provider>;
};