
/**
 * Configuration utilities for Replit environment
 */
export const REPLIT_CONFIG = {
  // Use 0.0.0.0 for host binding in Replit
  HOST: process.env.REPLIT_ENVIRONMENT === 'true' ? '0.0.0.0' : 'localhost',
  PORT: process.env.PORT || '5000',
  
  // Disable certain features in Replit
  DISABLE_AUTO_UPDATES: process.env.REPLIT_ENVIRONMENT === 'true',
  DISABLE_FILE_WATCHERS: process.env.REPLIT_ENVIRONMENT === 'true',
  
  // Environment detection
  IS_REPLIT: process.env.REPLIT_ENVIRONMENT === 'true',
  IS_DEV: process.env.NODE_ENV === 'development',
};

export function getServerConfig() {
  return {
    host: REPLIT_CONFIG.HOST,
    port: parseInt(REPLIT_CONFIG.PORT),
    hmr: !REPLIT_CONFIG.IS_REPLIT, // Disable HMR in Replit
  };
}
