// Static assets that will be served by the Worker
const staticAssets = {
  '/': 'index.html',
  '/index.html': 'index.html',
  '/404.html': '404.html',
  '/ads.txt': 'ads.txt',
  '/sitemap_post.xml': 'sitemap_post.xml',
};

// MIME types for different file extensions
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
};

// Cache static content for better performance
const CACHE_NAME = 'static-assets-v1';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Handle static assets
  if (staticAssets[pathname]) {
    return serveStaticAsset(staticAssets[pathname]);
  }

  // Handle images directory
  if (pathname.startsWith('/images/')) {
    return serveImage(pathname);
  }

  // Handle subdirectory pages
  if (pathname.includes('/') && !pathname.endsWith('/')) {
    const parts = pathname.split('/');
    if (parts.length === 2) {
      const subdirectory = parts[1];
      if (subdirectory && !subdirectory.includes('.')) {
        return serveStaticAsset(`${subdirectory}/index.html`);
      }
    }
  }

  // Handle subdirectory index files
  if (pathname.endsWith('/')) {
    const subdirectory = pathname.slice(1, -1);
    if (subdirectory) {
      return serveStaticAsset(`${subdirectory}/index.html`);
    }
  }

  // Default to index.html for SPA-like behavior
  return serveStaticAsset('index.html');
}

async function serveStaticAsset(filename) {
  // Try to get from cache first
  const cache = caches.default;
  const cacheKey = new Request(filename);
  
  try {
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
  } catch (e) {
    // Cache might not be available, continue with fetch
  }

  // Instead of fetching from GitHub, return a simple HTML response
  // This is a basic fallback that will at least prevent the Worker from crashing
  const contentType = mimeTypes[filename.substring(filename.lastIndexOf('.'))] || 'text/html';
  
  if (filename === 'index.html' || filename === '404.html') {
    const htmlContent = filename === 'index.html' ?
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Jasa Web Pekanbaru</title>
        <meta name="description" content="Professional website development services in Pekanbaru">
      </head>
      <body>
        <h1>Welcome to Jasa Web Pekanbaru</h1>
        <p>Professional website development services in Pekanbaru, Indonesia.</p>
        <p><strong>Note:</strong> This is a fallback page. The website content is being updated.</p>
      </body>
      </html>` :
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 - Page Not Found | Jasa Web Pekanbaru</title>
      </head>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <a href="/">Return to homepage</a>
      </body>
      </html>`;
    
    const response = new Response(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600'
      }
    });
    
    return response;
  }
  
  // For other files, return a simple response
  return new Response('File not available', { status: 404 });
}

async function serveImage(imagePath) {
  const cache = caches.default;
  const cacheKey = new Request(imagePath);
  
  try {
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
  } catch (e) {
    // Cache might not be available, continue with fetch
  }

  // Return a simple placeholder image response
  return new Response('Image not available', { status: 404 });
}