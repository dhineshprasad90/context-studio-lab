# EDS Local Setup Guide - Context Studio Lab

## Overview

This guide explains how to run the Context Studio Lab website locally using Adobe Edge Delivery Services (EDS) and how it syncs with the live site.

## What Was Changed

### 1. Content Source Configuration (`fstab.yaml`)

**Before:**
```yaml
mountpoints:
  /:
    url: "https://author-p130360-e1272151.adobeaemcloud.com/bin/franklin.delivery/adobe-rnd/aem-boilerplate-xwalk/main"
    type: "markup"
    suffix: ".html"
```

**After:**
```yaml
mountpoints: {}
```

**Why:** This change makes the local development server use local files (`index.md`) instead of pulling content from an external AEM source. This ensures your local development matches what you're editing.

### 2. Content File (`index.md`)

Created a comprehensive `index.md` file with EDS block syntax that includes:
- Hero section with gradient text and statistics
- Features section with three feature cards
- Architecture visualization using Columns block
- Demo section using Columns block
- Documentation cards using Cards block

**EDS Block Syntax:**
```markdown
## BlockName

Content for the block

---

## BlockName (variant)

Content with variant styling
```

### 3. Package Scripts (`package.json`)

Added convenient npm scripts:
```json
{
  "start": "npx @adobe/aem-cli up",
  "dev": "npx @adobe/aem-cli up",
  "up": "npx @adobe/aem-cli up",
  "serve": "npx http-server -p 3000 -o"
}
```

## How to Run Locally

### Option 1: Using npm start (Recommended for EDS)

```bash
npm start
```

This will:
- Start the AEM CLI development server
- Serve your local `index.md` content
- Process EDS blocks automatically
- Enable hot module replacement
- Open browser at `http://localhost:3000`

### Option 2: Using npm run serve (Simple HTTP Server)

```bash
npm run serve
```

This will:
- Start a basic HTTP server
- Serve static files only
- No EDS processing
- Good for testing static HTML

## Understanding the Architecture

### Local Development Flow

```
index.md (Your Content)
    ↓
AEM CLI Server (Processing)
    ↓
EDS Blocks (Decoration)
    ↓
Browser (Rendered Site)
```

### File Structure

```
context-studio-lab/
├── index.md              # Main content (EDS format)
├── index.html            # Legacy HTML version
├── fstab.yaml           # Content source config
├── head.html            # Global metadata
├── blocks/              # EDS blocks
│   ├── hero/
│   ├── features/
│   ├── cards/
│   ├── columns/
│   ├── header/
│   └── footer/
├── scripts/             # Core EDS scripts
│   ├── aem.js          # EDS library
│   ├── scripts.js      # Main init
│   └── delayed.js      # Delayed loading
└── styles/              # Global styles
    └── styles.css      # Base styles
```

## EDS Block Reference

### Hero Block

```markdown
## Hero

# Your Title

Your subtitle text

[Button Text](link) [Button Text](link)
```

### Features Block

```markdown
## Features

### 🔥 Feature Title

Feature description

- List item 1
- List item 2

[Learn more →](#)

---

### 🤖 Another Feature

...
```

### Cards Block

```markdown
## Cards (documentation)

### 📘 Card Title

Card description

[Link Text →](url)

---

### 📗 Another Card

...
```

### Columns Block

```markdown
## Columns (architecture)

### Column 1 Title

Column 1 content

---

### Column 2 Title

Column 2 content
```

## Syncing with Live Site

### Current Setup

- **Local**: Uses `index.md` from your repository
- **Live**: `https://main--context-studio-lab--dhineshprasad90.aem.page`

### To Deploy Changes to Live

1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

2. **Wait for automatic deployment:**
   - GitHub Actions will trigger
   - EDS will rebuild your site
   - Changes appear on preview URL

3. **Publish to live:**
   - Install [AEM Sidekick](https://chrome.google.com/webstore/detail/helix-sidekick/ccfggkjabjahcjoljmgmklhpaccedipo)
   - Navigate to preview URL
   - Click "Publish" in Sidekick

### Content Authoring Workflow

```
Edit index.md locally
    ↓
Test with npm start
    ↓
Commit & push to GitHub
    ↓
Preview at *.hlx.page
    ↓
Publish to *.hlx.live
```

## Troubleshooting

### Issue: Local site doesn't match live site

**Solution:** 
- Ensure `fstab.yaml` has `mountpoints: {}`
- Restart the dev server: Stop and run `npm start` again
- Clear browser cache

### Issue: Blocks not rendering correctly

**Solution:**
- Check block syntax in `index.md`
- Verify block files exist in `blocks/` directory
- Check browser console for errors
- Ensure block names match directory names

### Issue: PowerShell execution policy error

**Solution:**
Use the full path to npx:
```bash
& "C:\Program Files\nodejs\npx.cmd" @adobe/aem-cli up
```

Or use npm scripts which bypass the restriction:
```bash
npm start
```

### Issue: Changes not appearing

**Solution:**
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache
- Restart dev server
- Check if file was saved

## Performance Tips

1. **Use EDS blocks** instead of custom HTML for better performance
2. **Optimize images** - EDS automatically optimizes images
3. **Lazy load** non-critical content
4. **Use CSS variables** for consistent theming
5. **Minimize custom JavaScript** - leverage EDS functionality

## Development Best Practices

### 1. Content Structure

- Use semantic HTML in markdown
- Follow EDS block conventions
- Keep content separate from presentation

### 2. Styling

- Use CSS variables from `styles/styles.css`
- Block-specific styles in `blocks/[name]/[name].css`
- Avoid inline styles

### 3. JavaScript

- Block logic in `blocks/[name]/[name].js`
- Export default `decorate` function
- Keep blocks independent

### 4. Testing

- Test locally before pushing
- Test on multiple devices/browsers
- Check Core Web Vitals
- Validate accessibility

## Available Commands

```bash
# Start EDS development server
npm start
npm run dev
npm run up

# Start simple HTTP server
npm run serve

# Lint code
npm run lint
npm run lint:js
npm run lint:css
```

## Resources

- [EDS Documentation](https://www.aem.live/docs/)
- [Block Collection](https://www.aem.live/developer/block-collection)
- [Developer Tutorial](https://www.aem.live/developer/tutorial)
- [EDS Discord](https://discord.gg/aem-live)

## Next Steps

1. ✅ Local development is set up
2. ✅ Content is in EDS format
3. ✅ Blocks are configured
4. 🔄 Test all features locally
5. 🔄 Deploy to live site
6. 🔄 Set up custom domain (optional)

## Support

For issues or questions:
- Check this guide first
- Review EDS documentation
- Check browser console for errors
- Review terminal output for server errors

---

**Last Updated:** 2026-05-26  
**Version:** 1.0.0  
**Made with ⚡ by IBM Bob**