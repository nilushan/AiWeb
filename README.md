# AiWeb - Production-Ready Monorepo

A modern web application built with Astro and Keystatic CMS, structured as a monorepo for production deployment to Firebase Hosting and Google Cloud Run.

## ✨ Features

- **⚡ Lightning Fast** - Built with Astro for optimal performance
- **🎨 Beautiful Design** - Modern UI powered by DaisyUI with 30+ themes
- **📝 Content Management** - Keystatic CMS integration for easy content editing
- **🔍 SEO Optimized** - Built-in SEO best practices
- **🖼️ Image Optimization** - Automatic image optimization with Sharp
- **🎭 Theme Support** - 30+ beautiful themes with dark mode
- **📱 Responsive** - Mobile-first design
- **♿ Accessible** - WCAG compliant components
- **🚀 Fast Development** - Hot reload and instant preview

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/aiweb.git
cd aiweb
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:4321`

## 📁 Project Structure

```
your-repo/
├── .github/
│   └── workflows/
│       └── deploy-production.yml   # Production deployment workflow
├── apps/
│   ├── web/                         # Astro static site
│   │   ├── src/
│   │   │   ├── components/         # Reusable components
│   │   │   ├── content/            # Content collections
│   │   │   ├── layouts/            # Page layouts
│   │   │   ├── pages/              # File-based routing
│   │   │   └── styles/             # Global styles
│   │   ├── public/                 # Static assets
│   │   ├── astro.config.mjs        # Astro configuration
│   │   ├── keystatic.config.tsx    # Keystatic client config
│   │   ├── tailwind.config.mjs     # Tailwind CSS config
│   │   ├── package.json            # Web app dependencies
│   │   └── .env.example            # Environment template
│   └── cms/                         # CMS Docker configuration
│       ├── Dockerfile              # Builds apps/web in hybrid mode
│       ├── .dockerignore           # Docker ignore rules
│       ├── .env.example            # Environment template
│       ├── test-local.sh           # Local Docker testing script
│       └── README.md               # CMS deployment docs
├── package.json                     # Root workspace config
├── firebase.json                    # Firebase Hosting config
├── DEPLOYMENT_GUIDE.md              # Deployment instructions
└── README.md                        # This file
```

## 🎨 Tech Stack

- **[Astro](https://astro.build)** - Web framework
- **[DaisyUI](https://daisyui.com)** - Component library
- **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS
- **[Keystatic](https://keystatic.com)** - Content management
- **[React](https://react.dev)** - For interactive components
- **[TypeScript](https://www.typescriptlang.org)** - Type safety
- **[Sharp](https://sharp.pixelplumbing.com)** - Image optimization

## 📝 Content Management

Access the Keystatic CMS at `/keystatic` to manage your content:

```
http://localhost:4321/keystatic
```

### Collections

- **Blog Posts** - Write and publish blog articles
- **Knowledge Base** - Create documentation and guides
- **Pages** - Manage custom pages

## 🎭 Themes

AiWeb supports 30+ beautiful DaisyUI themes:

- Light themes: light, cupcake, bumblebee, emerald, corporate, fantasy
- Dark themes: dark, synthwave, halloween, forest, black, luxury, dracula
- And many more!

Change themes using the theme switcher in the header.

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Utilities
npm run astro        # Run Astro CLI
```

## 🔧 Configuration

### Site Configuration

Update `astro.config.mjs` to configure your site:

```javascript
export default defineConfig({
  site: 'https://your-domain.com',
  // ... other options
});
```

### SEO

Edit `src/components/SEO.astro` to update default meta tags.

### Themes

Customize themes in `tailwind.config.mjs`:

```javascript
daisyui: {
  themes: ['light', 'dark', 'cupcake', ...],
}
```

## 🚀 Deployment

### Production Setup (Firebase + Cloud Run)

This monorepo is optimized for production deployment with:
- **Static Site** → Firebase Hosting
- **CMS Server** → Google Cloud Run

**Quick Deploy:**

1. Set up Firebase and Google Cloud projects
2. Configure GitHub secrets and variables
3. Push to `main` branch:

```bash
git add .
git commit -m "Deploy to production"
git push origin main
```

GitHub Actions will automatically:
- Build and deploy static site to Firebase Hosting
- Build and deploy CMS server to Cloud Run

📖 **[Full Deployment Guide](DEPLOYMENT_GUIDE.md)** - Comprehensive setup and deployment instructions

### Local Development

```bash
# Start web development server (includes Keystatic admin)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**No separate CMS server needed in development!** The Keystatic admin UI is built into the Astro dev server at `/keystatic`.

### Available Scripts

```bash
npm run dev              # Start web development server (includes CMS)
npm run build            # Build static site for production
npm run build:cms        # Build CMS Docker image (for Cloud Run)
npm run preview          # Preview production build locally
npm run clean            # Clean all build artifacts
```

### Docker Testing (Optional)

To test the CMS server Docker container locally:

```bash
# Use the test script (from repository root)
./apps/cms/test-local.sh

# Or manually
docker build -f apps/cms/Dockerfile -t aiweb-cms .
docker run -p 8080:8080 --env-file apps/cms/.env.cms.local aiweb-cms
```

See `apps/cms/README.md` for detailed Docker testing instructions.

### Content Management

**Development:**
- Access Keystatic admin at `http://localhost:4321/keystatic`
- Content stored in GitHub repository

**Production:**
- CMS API runs on Cloud Run
- Content managed via GitHub
- Automatic deployments on content changes

## 📖 Documentation

Visit our [Knowledge Base](/knowledge-base) for comprehensive documentation:

- [Quick Start Guide](/knowledge-base/quick-start-guide)
- [UI Components](/knowledge-base/ui-components)
- [SEO Best Practices](/knowledge-base/seo-best-practices)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [Astro](https://astro.build) - The web framework
- [DaisyUI](https://daisyui.com) - Beautiful components
- [Keystatic](https://keystatic.com) - Content management
- [Tailwind CSS](https://tailwindcss.com) - CSS framework

## 📞 Support

Need help? Check out:

- [Documentation](/knowledge-base)
- [FAQ](/knowledge-base?category=faq)
- [Contact](/contact)

---

Built with ❤️ using Astro, DaisyUI & Keystatic
