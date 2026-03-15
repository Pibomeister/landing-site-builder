# Get Live Guide

This guide will help you get a landing page running, deploy it to production, and customize the basics—no coding required.

**Who is this for?** Marketers, designers, and anyone who wants to get a landing page live quickly.

**What you'll learn:**
- Clone and run the project
- Deploy to production
- Customize colors, fonts, and content
- Update images and CTAs

---

## Prerequisites

You'll need:
- **Node.js** (v20 or later) - [Download here](https://nodejs.org/)
- **pnpm** (package manager) - Install with `npm install -g pnpm`
- **Git** - [Download here](https://git-scm.com/)

Optional but recommended:
- **Vercel account** (for easy deployment) - [Sign up free](https://vercel.com)

---

## Step 1: Clone and Setup

```bash
# Clone the repository
git clone <your-repository-url>
cd landing-site-builder

# Install dependencies
pnpm install
```

This will download all required packages. It may take 2-3 minutes on first run.

---

## Step 2: Run Development Server

```bash
# Start the dev server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see your landing page.

**What you're seeing:** The demo app at `apps/demo/app/page.tsx`

Keep this terminal window open. The page will auto-refresh when you make changes.

---

## Step 3: Customize Content

### Edit Text and CTAs

Open `apps/demo/app/page.tsx` in any text editor. You'll see a JSON configuration like this:

```tsx
const pageConfig = {
  sections: [
    {
      type: 'hero',
      variant: 'split',
      heading: {
        title: 'Build beautiful landing pages',
        body: 'Create stunning, conversion-optimized landing pages...',
      },
      actions: {
        primary: {
          type: 'link',
          label: 'Get Started',
          href: '/signup',
        },
      },
      media: {
        kind: 'image',
        src: 'https://images.unsplash.com/...',
        alt: 'Dashboard preview',
      },
    },
  ],
}
```

**To change the headline:**
```json
"title": "Your new headline here"
```

**To change the description:**
```json
"body": "Your new description here"
```

**To change the CTA button:**
```json
"primary": {
  "type": "link",
  "label": "Your CTA text",
  "href": "/your-destination-url"
}
```

Save the file and the browser will auto-refresh.

### Update Images

Replace the image URL in the `media` section:

```json
"media": {
  "kind": "image",
  "src": "https://your-image-url.com/image.jpg",
  "alt": "Description for screen readers"
}
```

**Image recommendations:**
- Use high-quality images (at least 1200px wide)
- Optimize images before uploading ([TinyPNG](https://tinypng.com/))
- Use descriptive alt text for accessibility
- Host on a CDN (Cloudinary, Imgix, or Unsplash)

---

## Step 4: Customize Colors and Fonts

### Colors

Colors are defined using CSS variables in `apps/demo/app/globals.css`:

```css
:root {
  --primary: 220 90% 56%;          /* Brand color */
  --primary-foreground: 0 0% 100%; /* Text on brand color */
  --background: 0 0% 100%;         /* Page background */
  --foreground: 222 47% 11%;       /* Body text */
}
```

Colors use HSL format: `hue saturation lightness`

**Example: Change brand color to purple**
```css
--primary: 270 80% 60%; /* Purple */
```

### Fonts

Fonts are configured in `apps/demo/app/layout.tsx`:

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
```

**To change to a different Google Font:**

1. Import the new font:
```tsx
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin']
})
```

2. Apply it in the layout:
```tsx
<body className={poppins.className}>
```

Browse available fonts at [Google Fonts](https://fonts.google.com/).

---

## Step 5: Deploy to Production

### Option A: Deploy to Vercel (Recommended)

Vercel offers free hosting for Next.js apps with automatic deployments.

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial landing page"
   git push
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"

3. **Done!** Your site is live at `your-project.vercel.app`

Every git push will trigger a new deployment automatically.

### Option B: Self-Host with Docker

```bash
# Build the production image
docker build -t landing-site .

# Run the container
docker run -p 3000:3000 landing-site
```

Your site is now running at `http://localhost:3000`

### Option C: Traditional Node.js Hosting

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

Upload the `.next` folder and `node_modules` to your hosting provider.

---

## Step 6: Add More Sections

Your landing page is built from sections. To add more sections, edit the `sections` array:

```tsx
const pageConfig = {
  sections: [
    {
      type: 'hero',
      variant: 'split',
      // ... hero config
    },
    // Add more sections here
    {
      type: 'features',
      variant: 'grid',
      // ... features config
    },
  ],
}
```

See the [Component Registry](./components.md) for available sections and their configuration options.

---

## Troubleshooting

### "Port 3000 is already in use"

Kill the process using port 3000:
```bash
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <process-id> /F
```

### "Module not found" errors

Reinstall dependencies:
```bash
rm -rf node_modules
pnpm install
```

### Changes not appearing

1. Hard refresh the browser (Cmd+Shift+R or Ctrl+Shift+R)
2. Check the terminal for errors
3. Restart the dev server (Ctrl+C, then `pnpm dev`)

### Build fails in production

Check that all required environment variables are set:
```bash
# .env.production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Next Steps

Now that you're live, you might want to:

- **Learn more about page composition**: [Build Right Page Guide](./build-right-page.md)
- **Browse available sections**: [Component Registry](./components.md)
- **Set up analytics**: Add Google Analytics or Plausible
- **Configure SEO**: Update metadata in `app/layout.tsx`
- **Set up a custom domain**: Configure in Vercel dashboard

## Getting Help

- Check existing documentation in `/docs`
- Review example configs in `packages/core/src/registry/sections/`
- Open an issue on GitHub for bugs or questions

---

**You're live!** Time to drive traffic and start converting visitors.
