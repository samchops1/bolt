export const skipUpdateChecks = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('skip_update_checks', 'true');
    console.log('Update checks have been disabled');
  }
};

export const enableUpdateChecks = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('skip_update_checks');
    console.log('Update checks have been enabled');
  }
};

export const isUpdateCheckSkipped = (): boolean => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('skip_update_checks') === 'true';
  }
  return false;
};

export function shouldCheckForUpdates(): boolean {
  // Don't check for updates in development
  if (import.meta.env.DEV) {
    return false;
  }

  // Don't check for updates in Replit environment
  if (process.env.REPLIT_ENVIRONMENT === 'true') {
    return false;
  }

  // Check if auto-updates are disabled
  const autoUpdatesDisabled = localStorage.getItem('autoUpdatesDisabled') === 'true';
  if (autoUpdatesDisabled) {
    return false;
  }

  return true;
}