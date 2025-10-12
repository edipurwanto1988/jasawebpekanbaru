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

  // Define the actual content for key files
  const staticContent = {
    'index.html': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Penyedia jasa pembuatan website, desain, aplikasi, SEO, blog dengan harga bersaing dan kualitas terjamin di Pekanbaru. Pengalaman lebih dari 10 tahun melayani ratusan klien.">
    <meta name="keywords" content="jasa web pekanbaru, pembuatan website pekanbaru, jasa pembuatan website, web development pekanbaru, jasa SEO pekanbaru, desain website pekanbaru, aplikasi mobile pekanbaru, hosting pekanbaru, jasa digital marketing pekanbaru">
    <meta name="google-site-verification" content="dsln9e54cWBdDCSDkAF2sfeLZmIiWDJ_bVulBCj4Nno">
    <title>Jasa Web Pekanbaru - Profesional Pembuatan Website</title>
    <link rel="icon" type="image/png" href="images/logo.png">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '#2563EB',     /* Biru utama */
                        secondary: '#3B82F6',   /* Biru muda */
                        accent: '#60A5FA',      /* Biru terang */
                        dark: '#1D4ED8',        /* Biru tua */
                        light: '#EFF6FF',       /* Biru sangat muda */
                        'text-dark': '#1F2937',  /* Abu gelap */
                        'gradient-start': '#0EA5E9', /* Cyan untuk gradient */
                        'gradient-end': '#6366F1'   /* Indigo untuk gradient */
                    },
                    fontFamily: {
                        inter: ['Inter', 'sans-serif'],
                    },
                    animation: {
                        'float': 'float 3s ease-in-out infinite',
                        'bounce-slow': 'bounce 2s infinite',
                    },
                    keyframes: {
                        float: {
                            '0%, 100%': { transform: 'translateY(0px)' },
                            '50%': { transform: 'translateY(-10px)' },
                        }
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Social Media Schema -->
    <meta property="og:title" content="Jasa Web Pekanbaru - Profesional Pembuatan Website">
    <meta property="og:description" content="Jasa pembuatan pembuatan website, desain, aplikasi, SEO dengan harga bersaing dan kualitas di Pekanbaru">
    <meta property="og:image" content="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80.png">
    <meta property="og:url" content="https://jasawebpekanbaru.com">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Jasa Web Pekanbaru">
    
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Jasa Web Pekanbaru - Profesional Web Development Services">
    <meta name="twitter:description" content="Penyedia jasa pembuatan website, desain, aplikasi, SEO, blog dengan harga bersaing dan kualitas terjamin">
    <meta name="twitter:image" content="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80.png">
    
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Jasa Web Pekanbaru",
        "url": "https://jasawebpekanbaru.com",
        "logo": "images/logo.png",
        "image": "images/logo.png",
        "description": "Jasa pembuatan website di pekanbaru, desain, aplikasi, SEO dengan harga bersaing dan kualitas di Pekanbaru",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Jalan Soebrantas No 188",
            "addressLocality": "Pekanbaru",
            "addressRegion": "Riau",
            "postalCode": "",
            "addressCountry": "Indonesia"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "6285210832769",
            "contactType": "customer service",
            "email": "admin@jasawebpekanbaru.com"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "19763"
        },
        "priceRange": "Rp 750.000 - Rp 2.500.000",
        "sameAs": [
            "https://wa.me/6285210832769"
        ]
    }
    </script>
</head>
<body class="bg-light text-text-dark font-inter">
    <!-- Header -->
    <header class="bg-primary text-white p-4 md:p-6 fixed w-full z-50 shadow-lg">
        <div class="container mx-auto flex justify-between items-center">
            <a href="https://jasawebpekanbaru.com" class="text-xl md:text-2xl font-bold flex items-center">
                <img src="images/logo.png" alt="Jasa Web Pekanbaru Logo" class="h-8 w-8 mr-2" loading="lazy">
                Jasa Web Pekanbaru
            </a>
            <!-- Desktop Navigation -->
            <nav class="hidden md:block">
                <ul class="flex space-x-4 md:space-x-6">
                    <li><a href="#beranda" class="hover:text-gradient-start transition-colors">Beranda</a></li>
                    <li><a href="#layanan" class="hover:text-gradient-start transition-colors">Layanan</a></li>
                    <li><a href="#tentang" class="hover:text-gradient-start transition-colors">Tentang</a></li>
                    <li><a href="#tim" class="hover:text-gradient-start transition-colors">Tim</a></li>
                    <li><a href="#faq" class="hover:text-gradient-start transition-colors">FAQ</a></li>
                    <li><a href="#kontak" class="hover:text-gradient-start transition-colors">Kontak</a></li>
                </ul>
            </nav>
            <!-- Mobile Menu Button -->
            <button id="mobile-menu-button" class="md:hidden text-white focus:outline-none">
                <i class="fas fa-bars text-2xl"></i>
            </button>
        </div>
        <!-- Mobile Navigation -->
        <nav id="mobile-menu" class="hidden md:hidden mt-4 pb-4">
            <ul class="flex flex-col space-y-3">
                <li><a href="#beranda" class="hover:text-gradient-start transition-colors block py-2">Beranda</a></li>
                <li><a href="#layanan" class="hover:text-gradient-start transition-colors block py-2">Layanan</a></li>
                <li><a href="#tentang" class="hover:text-gradient-start transition-colors block py-2">Tentang</a></li>
                <li><a href="#tim" class="hover:text-gradient-start transition-colors block py-2">Tim</a></li>
                <li><a href="#faq" class="hover:text-gradient-start transition-colors block py-2">FAQ</a></li>
                <li><a href="#kontak" class="hover:text-gradient-start transition-colors block py-2">Kontak</a></li>
            </ul>
        </nav>
    </header>

    <!-- Hero Section -->
    <section id="beranda" class="py-20 md:py-32 bg-gradient-to-r from-gradient-start to-gradient-end text-white">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row items-center">
                <div class="md:w-1/2 mb-10 md:mb-0" data-aos="fade-right">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">Jasa Pembuatan Website Profesional di Pekanbaru</h1>
                    <p class="text-lg md:text-xl mb-8">Penyedia jasa pembuatan website, desain, aplikasi, SEO, blog dengan harga bersaing dan kualitas terjamin</p>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <a href="https://wa.me/6285210832769?text=Halo,%20saya%20tertarik%20dengan%20jasa%20pembuatan%20website%20di%20Pekanbaru" class="bg-white text-gradient-start px-8 py-3 rounded-lg font-semibold hover:bg-accent transition-colors transform hover:-translate-y-1 active:translate-y-0 shadow-lg inline-block">
                            Hubungi Kami
                        </a>
                        <a href="https://wa.me/6285210832769?text=Halo,%20saya%20ingin%20melihat%20portfolio%20jasa%20pembuatan%20website%20di%20Pekanbaru" class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gradient-start transition-colors inline-block">
                            Lihat Portfolio
                        </a>
                    </div>
                </div>
                <div class="md:w-1/2 flex justify-center" data-aos="fade-left">
                    <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80" alt="Web Development" class="rounded-lg shadow-2xl animate-float" loading="lazy">
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gradient-to-r from-dark to-gradient-end text-white py-12">
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <a href="https://jasawebpekanbaru.com" class="text-xl font-bold mb-4 flex items-center">
                        <img src="images/logo.png" alt="Jasa Web Pekanbaru Logo" class="h-8 w-8 mr-2" loading="lazy">
                        Jasa Web Pekanbaru
                    </a>
                    <p class="text-gray-200">Penyedia jasa pembuatan website profesional di Pekanbaru dengan pengalaman lebih dari 10 tahun.</p>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Layanan</h4>
                    <ul class="space-y-2">
                        <li><a href="#layanan" class="text-gray-200 hover:text-white transition-colors">Web Development</a></li>
                        <li><a href="#layanan" class="text-gray-200 hover:text-white transition-colors">UI/UX Design</a></li>
                        <li><a href="#layanan" class="text-gray-200 hover:text-white transition-colors">SEO Marketing</a></li>
                        <li><a href="#layanan" class="text-gray-200 hover:text-white transition-colors">Cloud Hosting</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Link Terkait</h4>
                    <ul class="space-y-2">
                        <li><a href="https://jasawebpekanbaru.com/sewa-jas-pekanbaru" target="_blank" class="text-gray-200 hover:text-white transition-colors">Sewa Jas Pekanbaru</a></li>
                        <li><a href="https://jasawebpekanbaru.com/mesin-kasir-pekanbaru" target="_blank" class="text-gray-200 hover:text-white transition-colors">Mesin Kasir Pekanbaru</a></li>
                        <li><a href="https://jasawebpekanbaru.com/jasa-seo-pekanbaru/" target="_blank" class="text-gray-200 hover:text-white transition-colors">Jasa SEO Pekanbaru</a></li>
                        <li><a href="https://jasawebpekanbaru.com/sewa-genset-pekanbaru" target="_blank" class="text-gray-200 hover:text-white transition-colors">Sewa Genset Pekanbaru</a></li>
                        <li><a href="https://jasawebpekanbaru.com/sewa-molen-pekanbaru" target="_blank" class="text-gray-200 hover:text-white transition-colors">Sewa Molen Pekanbaru</a></li>
                       
                     </ul>
                </div>
                <div>
                    <h4 class="text-lg font-semibold mb-4">Ikuti Kami</h4>
                    <div class="flex space-x-4 mb-4">
                        <a href="#" class="text-gray-200 hover:text-white transition-colors text-xl"><i class="fab fa-facebook"></i></a>
                        <a href="#" class="text-gray-200 hover:text-white transition-colors text-xl"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-gray-200 hover:text-white transition-colors text-xl"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="text-gray-200 hover:text-white transition-colors text-xl"><i class="fab fa-linkedin"></i></a>
                    </div>
                    <p class="text-gray-200">admin@jasawebpekanbaru.com</p>
                    <p class="text-gray-200">085210832769</p>
                </div>
            </div>
            <div class="border-t border-gray-600 mt-8 pt-8 text-center">
                <p>&copy; 2025 <a href="https://jasawebpekanbaru.com/">Jasa Website Pekanbaru</a>. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <!-- Floating WhatsApp Button -->
    <a href="https://wa.me/6285210832769" class="whatsapp-float" target="_blank" rel="noopener noreferrer">
        <i class="fab fa-whatsapp whatsapp-icon"></i>
    </a>

    <style>
        .whatsapp-float {
            position: fixed;
            width: 60px;
            height: 60px;
            bottom: 40px;
            right: 40px;
            background-color: #25d366;
            color: #FFF;
            border-radius: 50px;
            text-align: center;
            font-size: 30px;
            box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            animation: float 3s ease-in-out infinite;
        }
        
        .whatsapp-float:hover {
            background-color: #128C7E;
            transform: scale(1.1);
        }
        
        .whatsapp-icon {
            color: white;
            font-size: 30px;
        }
        
        @keyframes float {
            0% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0px);
            }
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .whatsapp-float {
                width: 50px;
                height: 50px;
                bottom: 20px;
                right: 20px;
                font-size: 24px;
            }
            
            .whatsapp-icon {
                font-size: 24px;
            }
            
            /* Fix horizontal scrolling issue */
            html, body {
                overflow-x: hidden;
                width: 100%;
            }
            
            /* Ensure mobile menu stays visible */
            #mobile-menu {
                position: relative;
                z-index: 40;
                background-color: inherit;
            }
            
            /* Make sure container doesn't overflow */
            .container {
                max-width: 100%;
                padding-left: 1rem;
                padding-right: 1rem;
                overflow: hidden;
            }
            
            /* Fix for images that might overflow */
            img {
                max-width: 100%;
                height: auto;
            }
            
            /* Ensure sections don't overflow horizontally */
            section {
                width: 100%;
                overflow-x: hidden;
            }
        }
    </style>

    <script>
        // Initialize AOS (Animate On Scroll)
        AOS.init({
            duration: 1000,
            once: true
        });

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    </script>
</body>
</html>`,
    '404.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - Page Not Found | Jasa Web Pekanbaru</title>
    <link href="https://cdn.tailwindcss.com" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
    <div class="max-w-lg mx-auto text-center p-8">
        <div class="mb-8">
            <h1 class="text-9xl font-bold text-blue-600">404</h1>
        </div>
        <h2 class="text-3xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p class="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <a href="/" class="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Return to Homepage
        </a>
    </div>
</body>
</html>`,
    'ads.txt': `ads.txt file content`,
    'sitemap_post.xml': `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://jasawebpekanbaru.com/</loc>
        <lastmod>2025-10-12</lastmod>
        <priority>1.0</priority>
    </url>
</urlset>`
  };

  const contentType = mimeTypes[filename.substring(filename.lastIndexOf('.'))] || 'text/html';
  
  // Check if we have the content for this file
  if (staticContent[filename]) {
    const response = new Response(staticContent[filename], {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600'
      }
    });
    
    // Store in cache for future requests
    event.waitUntil(cache.put(cacheKey, response.clone()));
    
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