
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
