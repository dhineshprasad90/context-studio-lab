# Context Studio Lab - EDS Edition

Adobe Edge Delivery Services (EDS) compatible version of the Context Studio Lab website.

## 📖 Documentation

- **[🚀 EDS Deployment Guide](./docs/EDS-DEPLOYMENT-GUIDE.md)** - Complete step-by-step deployment instructions
- [EDS Migration Guide](./EDS-MIGRATION-GUIDE.md) - Migration from traditional web to EDS
- [EDS Conversion Summary](./EDS-CONVERSION-SUMMARY.md) - Technical conversion details

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- AEM CLI (optional for local development)

### Installation

```bash
# Install AEM CLI globally (optional)
npm install -g @adobe/aem-cli

# Start local development server
aem up
```

Visit `http://localhost:3000` to see your site.

## ⚡ Quick Deploy to EDS

Ready to deploy your site to Adobe Edge Delivery Services? Follow these quick steps:

### 1. Prerequisites
- Adobe Experience Manager account ([Sign up](https://business.adobe.com/products/experience-manager/adobe-experience-manager.html))
- GitHub repository access (admin permissions)
- Content source: Google Drive, SharePoint, or GitHub

### 2. Configure Content Source

Update `fstab.yaml` with your content source:

```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/YOUR_FOLDER_ID
```

### 3. Enable GitHub Pages

1. Go to **Settings** → **Pages**
2. Select **GitHub Actions** as source
3. Save settings

### 4. Install AEM Code Sync GitHub App

1. Visit https://github.com/apps/aem-code-sync/installations/new
2. Click **Install**
3. Select **Only select repositories** and choose this repository
4. Click **Save** to grant necessary permissions

**Note**: If using GitHub Enterprise with IP filtering, add `3.227.118.73` to your allowlist.

### 5. Deploy

```bash
git add .
git commit -m "Configure EDS deployment"
git push origin main
```

Your site will be available at:
- **Preview**: `https://main--YOUR_REPO--YOUR_ORG.hlx.page`
- **Live**: `https://main--YOUR_REPO--YOUR_ORG.hlx.live` (after publishing)

### 6. Publish Content

1. Install [AEM Sidekick](https://chrome.google.com/webstore/detail/helix-sidekick/ccfggkjabjahcjoljmgmklhpaccedipo) browser extension
2. Navigate to your preview URL
3. Click **Publish** in the Sidekick

### Need More Details?

📖 **[Read the Complete Deployment Guide](./docs/EDS-DEPLOYMENT-GUIDE.md)** for:
- Detailed step-by-step instructions
- Content authoring workflows
- Custom domain setup
- Troubleshooting tips
- Performance optimization
- Team collaboration setup

## 📁 Project Structure

```
context-studio-lab/
├── blocks/                 # EDS Blocks (Components)
│   ├── header/            # Navigation header
│   ├── hero/              # Hero section
│   ├── features/          # Features grid
│   ├── architecture/      # Architecture diagram
│   ├── demo/              # Demo section
│   ├── documentation/     # Documentation cards
│   └── footer/            # Footer
├── scripts/               # Core Scripts
│   ├── aem.js            # EDS helper library
│   ├── scripts.js        # Main initialization
│   └── delayed.js        # Delayed loading
├── styles/                # Global Styles
│   └── styles.css        # Base styles & variables
├── fstab.yaml            # Content source config
├── head.html             # HTML head metadata
└── [content files]       # Page content
```

## 🎨 EDS Blocks

### Available Blocks

| Block | Description | Location |
|-------|-------------|----------|
| **Header** | Responsive navigation with mobile menu | `blocks/header/` |
| **Hero** | Full-screen hero with gradient text | `blocks/hero/` |
| **Features** | Feature cards in responsive grid | `blocks/features/` |
| **Footer** | Multi-column footer with links | `blocks/footer/` |

### Creating a New Block

1. Create block directory:
```bash
mkdir -p blocks/my-block
```

2. Create block files:
```bash
touch blocks/my-block/my-block.js
touch blocks/my-block/my-block.css
```

3. Implement the block:
```javascript
// blocks/my-block/my-block.js
export default function decorate(block) {
  // Your block decoration logic
  block.classList.add('my-custom-class');
}
```

4. Style the block:
```css
/* blocks/my-block/my-block.css */
.my-block {
  padding: 2rem;
  background: var(--light);
}
```

## 🎯 Key Features

### Performance
- ⚡ Sub-second page loads
- 🚀 Progressive block loading
- 📦 Automatic code splitting
- 🖼️ Optimized image delivery

### Developer Experience
- 🔥 Hot module replacement
- 📝 Markdown/Google Docs authoring
- 🎨 Component-based architecture
- 🔧 Modern tooling

### SEO & Accessibility
- ♿ WCAG 2.1 AA compliant
- 🔍 SEO optimized
- 📱 Mobile-first responsive
- ⚡ Core Web Vitals optimized

## 🛠️ Development

### Local Development

```bash
# Start development server
aem up

# Access at
http://localhost:3000
```

### Building for Production

EDS automatically builds and optimizes your site when deployed.

### Testing

```bash
# Run Lighthouse
npm run lighthouse

# Test responsive
# Desktop: 1920x1080
# Tablet: 768x1024  
# Mobile: 375x667
```

## 📝 Content Authoring

### Using Google Docs

1. Create a Google Doc
2. Use tables to define blocks:

```
| Hero |
|------|
| # Welcome |
| Your subtitle here |
```

3. Publish to EDS

### Using Markdown

Create `.md` files with block syntax:

```markdown
# My Page

## Hero
Welcome to my site

## Features
- Feature 1
- Feature 2
```

## 🎨 Styling

### CSS Variables

All colors, spacing, and typography use CSS custom properties:

```css
:root {
  --primary-color: #0066ff;
  --spacing-md: 2rem;
  --heading-font-size-xl: 2.5rem;
}
```

### Responsive Design

Mobile-first approach with breakpoints:
- Mobile: < 600px
- Tablet: 600px - 900px
- Desktop: > 900px

## 🚀 Deployment

### GitHub Integration

1. Push to GitHub:
```bash
git add .
git commit -m "Update content"
git push origin main
```

2. EDS automatically:
   - Builds your site
   - Optimizes assets
   - Deploys to CDN

### Environments

- **Preview**: `*.hlx.page` (automatic)
- **Live**: `*.hlx.live` (after publish)
- **Production**: Your custom domain

## 📊 Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| LCP | < 2.5s | ✅ |
| FID | < 100ms | ✅ |
| CLS | < 0.1 | ✅ |
| TTI | < 3.8s | ✅ |

## 🔧 Configuration

### fstab.yaml

Configure content source:

```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/[id]
```

### head.html

Global metadata and scripts:

```html
<meta name="description" content="..."/>
<script src="/scripts/aem.js" type="module"></script>
<link rel="stylesheet" href="/styles/styles.css"/>
```

## 📚 Documentation

### Project Documentation
- **[🚀 EDS Deployment Guide](./docs/EDS-DEPLOYMENT-GUIDE.md)** - Step-by-step deployment instructions
- [EDS Migration Guide](./EDS-MIGRATION-GUIDE.md) - Complete migration documentation
- [EDS Conversion Summary](./EDS-CONVERSION-SUMMARY.md) - Technical conversion details

### External Resources
- [EDS Official Docs](https://www.aem.live/docs/) - Adobe EDS documentation
- [Block Collection](https://www.aem.live/developer/block-collection) - Pre-built blocks
- [Developer Tutorial](https://www.aem.live/developer/tutorial) - Getting started tutorial

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the Apache License 2.0.

## 🆘 Support

- 📖 [Deployment Guide](./docs/EDS-DEPLOYMENT-GUIDE.md) - Complete deployment instructions
- 📖 [Migration Guide](./EDS-MIGRATION-GUIDE.md) - Migration documentation
- 💬 [EDS Discord](https://discord.gg/aem-live) - Community support
- 🐛 [Report Issues](https://github.com/your-repo/issues) - Bug reports and feature requests

## 🎯 Roadmap

- [x] Core EDS structure
- [x] Header & Footer blocks
- [x] Hero & Features blocks
- [ ] Architecture block
- [ ] Demo block
- [ ] Documentation block
- [ ] Content migration
- [ ] Production deployment

## 📈 Analytics

EDS includes built-in Real User Monitoring (RUM):
- Page performance metrics
- User interaction tracking
- Error monitoring
- Core Web Vitals

Access via: `https://rum.hlx.page/`

## 🔐 Security

- HTTPS by default
- CDN edge security
- Content Security Policy
- Regular security updates

---

**Built with** ⚡ **Adobe Edge Delivery Services**

For questions or support, please refer to the [EDS Migration Guide](./EDS-MIGRATION-GUIDE.md).