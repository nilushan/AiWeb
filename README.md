# AiWeb - Modern Web Platform

A modern, fast, and beautiful web platform built with Astro, DaisyUI, and Keystatic CMS.

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
aiweb/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # UI components (Button, Card, Hero, etc.)
│   │   ├── Header.astro    # Site header
│   │   ├── Footer.astro    # Site footer
│   │   └── SEO.astro       # SEO component
│   ├── layouts/            # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/              # Your pages (file-based routing)
│   │   ├── index.astro     # Homepage
│   │   ├── blog/           # Blog pages
│   │   ├── knowledge-base/ # Documentation
│   │   ├── about.astro     # About page
│   │   └── keystatic/      # CMS admin
│   ├── content/            # Content collections
│   │   ├── posts/          # Blog posts
│   │   ├── knowledge-base/ # KB articles
│   │   └── pages/          # Custom pages
│   └── styles/             # Global styles
│       └── global.css
├── public/                 # Static assets
│   └── images/            # Images
├── keystatic.config.tsx   # Keystatic CMS configuration
├── astro.config.mjs       # Astro configuration
├── tailwind.config.mjs    # Tailwind configuration
└── package.json
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

### Build for Production

```bash
npm run build
```

The built site will be in the `dist/` directory.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Other Platforms

AiWeb can be deployed to any platform that supports Node.js:

- Vercel
- Netlify
- Cloudflare Pages
- AWS
- DigitalOcean
- Railway

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
