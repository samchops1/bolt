import { json, type ActionFunction } from '@remix-run/cloudflare';

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  // Always return success to prevent blocking the app
  return json({
    success: true,
    message: 'Update checks are handled automatically',
    skipped: true,
  });
};
