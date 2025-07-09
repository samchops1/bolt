
<old_str>import { json, type ActionFunction } from '@remix-run/cloudflare';

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
};</old_str>
<new_str>import { json, type ActionFunction, type LoaderFunction } from '@remix-run/cloudflare';

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  // Always return success to prevent blocking the app
  return json({
    success: true,
    available: false,
    version: '1.0.0',
    message: 'Update checks disabled',
    skipped: true,
  });
};

export const loader: LoaderFunction = async () => {
  // Handle GET requests as well
  return json({
    success: true,
    available: false,
    version: '1.0.0',
    message: 'Update checks disabled',
    skipped: true,
  });
};</new_str>
