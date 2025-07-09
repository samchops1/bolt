
/**
 * Environment validation utilities
 */
export function validateEnvironment() {
  const warnings: string[] = [];
  const errors: string[] = [];

  // Check if we're in Replit
  const isReplit = process.env.REPLIT_ENVIRONMENT === 'true';
  
  if (isReplit) {
    console.log('✅ Running in Replit environment');
    
    // Replit-specific checks
    if (!process.env.PORT) {
      warnings.push('PORT environment variable not set, defaulting to 5000');
    }
    
    // Disable problematic features
    if (process.env.CHOKIDAR_USEPOLLING !== 'true') {
      warnings.push('Consider setting CHOKIDAR_USEPOLLING=true for better file watching in Replit');
    }
  }

  // Log warnings and errors
  warnings.forEach(warning => console.warn(`⚠️  ${warning}`));
  errors.forEach(error => console.error(`❌ ${error}`));

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
    isReplit
  };
}

// Run validation on import
validateEnvironment();
