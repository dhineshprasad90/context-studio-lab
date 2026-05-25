# Adobe Edge Delivery Services (EDS) Migration Guide

## Overview

This document describes the conversion of the Context Studio Lab website to Adobe Edge Delivery Services (EDS) compatible structure.

## What Changed

### Directory Structure

The project now follows EDS conventions with the following structure:

```
context-studio-lab/
├── blocks/              # EDS blocks (components)
│   ├── header/
│   │   ├── header.js
│   │   └── header.css
│   ├── hero/
│   │   ├── hero.js
│   │   └── hero.css
│   ├── features/
│   │   ├── features.js
│   │   └── features.css
│   ├── footer/
│   │   ├── footer.js
│   │   └── footer.css
│   └── [other blocks]/
├── scripts/             # Core EDS scripts
│   ├── aem.js          # EDS helper library (lib-franklin.js)
│   ├── scripts.js      # Main initialization script
│   └── delayed.js      # Delayed loading functionality
├── styles/              # Global styles
│   └── styles.css      # Base styles and CSS variables
├── fstab.yaml          # Content source configuration
├── head.html           # HTML head metadata
└── [content files]     # Markdown or HTML content files
```

### Core Files

#### 1. `fstab.yaml`
Configures the content source for EDS. Points to Google Drive or SharePoint where content is authored.

```yaml
mountpoints:
  /: https://drive.google.com/drive/u/0/folders/[folder-id]
```

#### 2. `head.html`
Contains metadata and script/style references that will be injected into every page's `<head>`.

```html
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta name="description" content="..."/>
<script src="/scripts/aem.js" type="module"></script>
<script src="/scripts/scripts.js" type="module"></script>
<link rel="stylesheet" href="/styles/styles.css"/>
```

#### 3. `scripts/aem.js`
Core EDS helper library providing:
- Block decoration and loading
- Section management
- Button decoration
- Image optimization
- RUM (Real User Monitoring) integration
- Metadata utilities

#### 4. `scripts/scripts.js`
Main initialization script that:
- Decorates the main content
- Loads blocks progressively
- Handles header and footer
- Manages page lifecycle (eager, lazy, delayed loading)

#### 5. `styles/styles.css`
Global styles including:
- CSS custom properties (variables)
- Base typography
- Button styles
- Section layouts
- Responsive breakpoints

## EDS Block Architecture

### Block Structure

Each block follows this pattern:

```
blocks/[block-name]/
├── [block-name].js    # Block decoration logic
└── [block-name].css   # Block-specific styles
```

### Block Decoration Pattern

Every block exports a default `decorate` function:

```javascript
export default function decorate(block) {
  // Transform block DOM
  // Add classes, structure content
  // Initialize interactions
}
```

### Created Blocks

#### 1. Header Block (`blocks/header/`)
- Responsive navigation
- Mobile hamburger menu
- Dropdown support
- Sticky header behavior

#### 2. Hero Block (`blocks/hero/`)
- Full-screen hero section
- Gradient text effects
- Animated scroll indicator
- CTA buttons

#### 3. Features Block (`blocks/features/`)
- Grid layout for feature cards
- Icon support
- Hover animations
- Responsive columns

#### 4. Footer Block (`blocks/footer/`)
- Multi-column layout
- Brand section
- Link groups
- Copyright information

## How EDS Works

### 1. Content Authoring
Content is authored in:
- Google Docs/Sheets
- Microsoft Word/Excel
- Markdown files

### 2. Content Transformation
EDS automatically converts documents to semantic HTML:
- Tables become blocks
- Headings create sections
- Links become buttons (when appropriate)

### 3. Block Loading
Blocks are loaded progressively:
1. **Eager**: Critical blocks (LCP - Largest Contentful Paint)
2. **Lazy**: Below-the-fold blocks
3. **Delayed**: Non-critical functionality

### 4. Performance Optimization
- Automatic image optimization
- CSS/JS minification
- Progressive enhancement
- Edge caching via CDN

## Migration from Original Structure

### Original Structure
```
├── index.html          # Monolithic HTML
├── css/style.css       # All styles in one file
└── js/main.js          # All JavaScript in one file
```

### EDS Structure Benefits

1. **Modularity**: Each component is self-contained
2. **Performance**: Progressive loading and optimization
3. **Maintainability**: Clear separation of concerns
4. **Scalability**: Easy to add new blocks
5. **Authoring**: Content can be edited in familiar tools

## Content Authoring in EDS

### Creating a Page

1. Create a Google Doc or Markdown file
2. Use tables to define blocks:

```
| Hero |
|------|
| # Welcome to Context Studio Lab |
| Advanced EDS Development Platform |
| [Explore Features](#features) |
```

3. The table becomes a hero block automatically

### Block Syntax

```
| Block Name |
|------------|
| content    |
| more       |
```

Becomes:
```html
<div class="block-name block">
  <div><div>content</div></div>
  <div><div>more</div></div>
</div>
```

## Development Workflow

### Local Development

1. **Install AEM CLI**:
   ```bash
   npm install -g @adobe/aem-cli
   ```

2. **Start Local Server**:
   ```bash
   aem up
   ```

3. **Access Site**:
   ```
   http://localhost:3000
   ```

### Creating New Blocks

1. Create block directory:
   ```bash
   mkdir -p blocks/my-block
   ```

2. Create block files:
   ```bash
   touch blocks/my-block/my-block.js
   touch blocks/my-block/my-block.css
   ```

3. Implement decoration:
   ```javascript
   // blocks/my-block/my-block.js
   export default function decorate(block) {
     // Your block logic
   }
   ```

4. Add styles:
   ```css
   /* blocks/my-block/my-block.css */
   .my-block {
     /* Your styles */
   }
   ```

## Best Practices

### 1. Block Design
- Keep blocks focused and single-purpose
- Use semantic HTML
- Follow BEM naming for CSS classes
- Make blocks responsive by default

### 2. Performance
- Minimize JavaScript execution
- Use CSS for animations when possible
- Lazy load images and heavy content
- Leverage browser caching

### 3. Accessibility
- Use proper ARIA attributes
- Ensure keyboard navigation
- Maintain color contrast
- Provide alt text for images

### 4. SEO
- Use semantic HTML5 elements
- Include proper meta tags
- Optimize images
- Create descriptive URLs

## Testing

### Local Testing
```bash
# Start development server
aem up

# Run in different viewports
# Desktop: 1920x1080
# Tablet: 768x1024
# Mobile: 375x667
```

### Performance Testing
- Use Lighthouse in Chrome DevTools
- Check Core Web Vitals
- Test on real devices
- Monitor RUM data

## Deployment

### 1. Push to GitHub
```bash
git add .
git commit -m "EDS migration complete"
git push origin main
```

### 2. Configure EDS
- Connect repository to EDS
- Set up preview/live environments
- Configure CDN

### 3. Publish
- Preview changes on `*.hlx.page`
- Publish to production `*.hlx.live`

## Troubleshooting

### Block Not Loading
1. Check console for errors
2. Verify block name matches directory
3. Ensure export default function exists
4. Check CSS file exists

### Styles Not Applying
1. Verify CSS file is in correct location
2. Check class names match
3. Clear browser cache
4. Inspect element in DevTools

### Content Not Updating
1. Clear EDS cache
2. Check fstab.yaml configuration
3. Verify content source permissions
4. Reload preview

## Resources

- [EDS Documentation](https://www.aem.live/docs/)
- [EDS GitHub](https://github.com/adobe/helix-project-boilerplate)
- [EDS Discord Community](https://discord.gg/aem-live)
- [Block Collection](https://www.aem.live/developer/block-collection)

## Next Steps

1. **Content Migration**: Convert existing content to EDS format
2. **Additional Blocks**: Create remaining blocks (architecture, demo, documentation)
3. **Testing**: Comprehensive testing across devices
4. **Optimization**: Performance tuning and optimization
5. **Deployment**: Set up production environment

## Support

For questions or issues:
- Check EDS documentation
- Join EDS Discord community
- Review block collection examples
- Consult with EDS experts

---

**Migration Date**: 2026-05-25  
**EDS Version**: Latest  
**Status**: Core structure complete, content migration pending