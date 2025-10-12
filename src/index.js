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

  // Get the file from the repository
  const fileUrl = `https://raw.githubusercontent.com/yourusername/yourrepo/main/${filename}`;
  
  try {
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      // If file not found, serve 404 page
      const notFoundResponse = await fetch('https://raw.githubusercontent.com/yourusername/yourrepo/main/404.html');
      return new Response(notFoundResponse.body, {
        status: 404,
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    const contentType = mimeTypes[filename.substring(filename.lastIndexOf('.'))] || 'text/html';
    
    const responseToCache = new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block'
      }
    });

    // Store in cache for future requests
    event.waitUntil(cache.put(cacheKey, responseToCache.clone()));
    
    return responseToCache;
  } catch (error) {
    return new Response('Error serving content', { status: 500 });
  }
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

  const fileUrl = `https://raw.githubusercontent.com/yourusername/yourrepo/main${imagePath}`;
  
  try {
    const response = await fetch(fileUrl);
    
    if (!response.ok) {
      return new Response('Image not found', { status: 404 });
    }

    const contentType = mimeTypes[imagePath.substring(imagePath.lastIndexOf('.'))] || 'image/jpeg';
    
    const responseToCache = new Response(response.body, {
      status: response.status,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000'
      }
    });

    // Store in cache for future requests
    event.waitUntil(cache.put(cacheKey, responseToCache.clone()));
    
    return responseToCache;
  } catch (error) {
    return new Response('Error serving image', { status: 500 });
  }
}