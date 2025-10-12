# Jasa Web Pekanbaru - Static Website

This is a static website for Jasa Web Pekanbaru, a professional web development service provider in Pekanbaru, Indonesia.

## Deployment Options

### Option 1: Cloudflare Pages (Recommended)

Cloudflare Pages is the recommended platform for deploying this static website as it's specifically designed for static sites and provides better performance and simpler deployment.

#### Steps to deploy to Cloudflare Pages:

1. **Push your code to a Git repository** (GitHub, GitLab, etc.)
2. **Sign up for Cloudflare Dashboard** at https://dash.cloudflare.com/sign-up
3. **Go to Pages** in the left sidebar
4. **Click "Create a project"**
5. **Connect your Git repository**
6. **Configure build settings:**
   - Framework preset: `None`
   - Build command: `echo "No build needed"`
   - Build output directory: `.` (root directory)
7. **Click "Save and Deploy"**

The `_headers` and `_redirects` files will automatically be applied to configure security headers and routing.

### Option 2: Cloudflare Workers

If you must use Cloudflare Workers, follow these steps:

#### Prerequisites:
- Node.js 16+ installed
- Wrangler CLI installed

#### Installation:
```bash
# Install dependencies
npm install

# Login to Cloudflare
npx wrangler login
```

#### Deployment:
```bash
# Deploy the Worker
npm run deploy:worker
```

#### Configuration:
The Worker configuration is in `wrangler.toml` and the main script is in `src/index.js`.

**Important:** The Worker script currently fetches assets from GitHub. You need to update the repository URLs in `src/index.js` to point to your actual repository:

```javascript
// Update these lines in src/index.js:
const fileUrl = `https://raw.githubusercontent.com/yourusername/yourrepo/main/${filename}`;
// and
const fileUrl = `https://raw.githubusercontent.com/yourusername/yourrepo/main${imagePath}`;
```

### Option 3: Local Development

To run the website locally for development:

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

The site will be available at http://localhost:3000

## Project Structure

```
jasawebpekanbaru/
├── index.html              # Main homepage
├── 404.html               # Custom 404 page
├── ads.txt                # Ads.txt file
├── sitemap_post.xml       # Sitemap
├── _headers               # Cloudflare Pages security headers
├── _redirects             # Cloudflare Pages routing rules
├── package.json           # Project dependencies and scripts
├── wrangler.toml          # Cloudflare Workers configuration
├── src/
│   └── index.js           # Worker script (for Workers deployment)
├── images/                # Static images
├── jasa-seo-pekanbaru/    # SEO service subpage
├── mesin-kasir-pekanbaru/ # Cash machine service subpage
├── sewa-genset-pekanbaru/ # Generator rental subpage
├── sewa-jas-pekanbaru/    # Suit rental subpage
└── sewa-molen-pekanbaru/  # Concrete mixer rental subpage
```

## Environment Variables

For Workers deployment, you can configure environment variables in `wrangler.toml`:

```toml
[vars]
ENVIRONMENT = "production"
```

## Performance Optimization

The site includes:
- Optimized images with lazy loading
- CSS and JavaScript minification
- Proper caching headers via `_headers`
- Compressed assets
- SEO optimization with structured data

## Troubleshooting

### Deployment Issues

1. **Missing entry-point error**: This occurs when trying to deploy to Workers without proper configuration. Use the provided `wrangler.toml` file or deploy to Pages instead.

2. **Asset loading issues**: If using Workers, make sure the GitHub repository URLs in `src/index.js` are correct.

3. **Routing issues**: The `_redirects` file handles all routes by serving `index.html` for SPA-like behavior.

### Performance Issues

1. **Images not loading**: Check image paths and ensure they exist in the `images/` directory.
2. **Slow loading**: The site uses CDN links for external resources (Tailwind CSS, Font Awesome, etc.) which should be fast globally.

## Support

For deployment issues or questions:
- Check Cloudflare documentation for Pages or Workers
- Ensure all dependencies are installed with `npm install`
- Verify your Cloudflare account has the necessary permissions

## License

MIT License - feel free to use this project for your own static websites.