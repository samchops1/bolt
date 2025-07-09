export interface UpdateCheckResult {
  available: boolean;
  version: string;
  releaseNotes?: string;
  error?: {
    type: 'rate_limit' | 'network' | 'auth' | 'unknown';
    message: string;
  };
}

interface PackageJson {
  version: string;
  name: string;
  [key: string]: unknown;
}

function compareVersions(v1: string, v2: string): number {
  // Remove 'v' prefix if present
  const version1 = v1.replace(/^v/, '');
  const version2 = v2.replace(/^v/, '');

  const parts1 = version1.split('.').map(Number);
  const parts2 = version2.split('.').map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;

    if (part1 !== part2) {
      return part1 - part2;
    }
  }

  return 0;
}

export const checkForUpdates = async (): Promise<UpdateCheckResult> => {
  // Always return no update available to prevent blocking the app
  console.log('Update checks disabled to prevent app blocking');
  
  // Try to get current version for display purposes only
  let currentVersion = '1.0.0';
  try {
    const packageResponse = await fetch('/package.json');
    if (packageResponse.ok) {
      const packageData = (await packageResponse.json()) as PackageJson;
      if (packageData.version && typeof packageData.version === 'string') {
        currentVersion = packageData.version;
      }
    }
  } catch (error) {
    console.log('Could not fetch version, using default');
  }

  return {
    available: false,
    version: currentVersion,
    releaseNotes: undefined,
  };
};

export const acknowledgeUpdate = async (version: string): Promise<void> => {
  // Store the acknowledged version in localStorage
  try {
    localStorage.setItem('last_acknowledged_update', version);
  } catch (error) {
    console.error('Failed to store acknowledged version:', error);
  }
};
