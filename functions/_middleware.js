/**
 * Cloudflare Pages Functions Middleware
 * Redirect .pages.dev domain to custom domain
 */

export async function onRequest(context) {
  const url = new URL(context.request.url);

  // If accessing via .pages.dev domain, redirect to custom domain
  if (url.hostname.endsWith('.pages.dev')) {
    url.hostname = 'greenbeanscoffeeambassador.com';
    return Response.redirect(url.toString(), 301);
  }

  // Otherwise, continue with normal processing
  return context.next();
}
