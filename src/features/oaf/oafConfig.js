// src/features/oaf/oafConfig.js
import { CONFIG_PROPS } from "./oafConstants";

/**
 * Helpers
 */
const qs = new URLSearchParams(window.location.search);

// First non-empty value among a list of query keys
function firstFromQuery(...keys) {
  for (const k of keys) {
    const v = qs.get(k);
    if (v && String(v).trim().length > 0) return v.trim();
  }
  return null;
}

// Ensure host string includes scheme
function normalizeHost(host, httpsPrefix) {
  if (!host) return null;
  const h = host.trim();
  if (/^https?:\/\//i.test(h)) return h;               // already absolute
  return `${httpsPrefix}${h.replace(/^\/+/, "")}`;      // prefix protocol
}

/**
 * 1) Resolve Coupa host
 *    - Dev: use localhost from constants
 *    - Prod: prefer query params (coupaHost/host/tenant), else DEFAULT_HOST
 */
const getCoupaHost = () => {
  if (!import.meta.env.PROD) {
    return CONFIG_PROPS.HOST_URLS.LOCALHOST; // e.g., http://localhost:3000
  }

  // Accept multiple synonyms for host
  const rawFromQuery = firstFromQuery(
    CONFIG_PROPS?.URL_PARAMS?.COUPA_HOST ?? "coupaHost",
    "host",
    "tenant"
  );

  const httpsPrefix =
    (CONFIG_PROPS?.HOST_URLS?.HTTPS_PROTOCOL ?? "https://").trim();

  const defaultHost =
    CONFIG_PROPS?.HOST_URLS?.DEFAULT_HOST ?? "https://ey-in-demo.coupacloud.com";

  const resolved = normalizeHost(rawFromQuery, httpsPrefix);

  if (!resolved) {
    console.warn(
      "[OAF] No Coupa host found in URL parameters; using default host:",
      defaultHost
    );
  }

  return resolved || defaultHost;
};

/**
 * 2) Resolve iFrame ID
 *    - Accept iframeId/clientId/iframe_id/id from URL
 *    - If missing in PROD, warn and fall back to a safe default (69)
 */
const getIframeId = () => {
  // read from query using all known aliases
  const fromQuery = firstFromQuery(
    CONFIG_PROPS?.URL_PARAMS?.IFRAME_ID ?? "iframeId",
    "clientId",
    "iframe_id",
    "id"
  );

  // Your agreed default for standalone use
  const FALLBACK_IFRAME_ID = "69";

  if (!fromQuery && import.meta.env.PROD) {
    console.warn(
      "[OAF] Iframe ID not found in URL parameters; using default:",
      FALLBACK_IFRAME_ID
    );
  }

  return fromQuery || FALLBACK_IFRAME_ID;
};

/**
 * 3) Build config
 *    coupahost and iframeId will always be present after the above steps.
 */
const config = {
  appId: CONFIG_PROPS.APP_ID,
  coupahost: getCoupaHost(),
  iframeId: getIframeId(),
  // Some codepaths might expect clientId as an alias
  clientId: getIframeId(),
};

/**
 * 4) Validate (keep appId required; do not hard-throw for host/iframeId)
 */
const validateConfig = (cfg) => {
  if (!cfg.appId) {
    throw new Error("App ID is required for OAF configuration");
  }
  // Host / iframeId now guaranteed by getters (or safely defaulted).
  // If you still want hard enforcement for certain environments, add it here.
};

// Validate before export
validateConfig(config);

export default config;
// Optional named export for convenience if other files expect it:
export const OAF_CONFIG = config;