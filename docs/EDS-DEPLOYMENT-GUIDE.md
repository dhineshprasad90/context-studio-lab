# Adobe Edge Delivery Services (EDS) Deployment Guide

This comprehensive guide will walk you through deploying this GitHub repository as an Adobe Edge Delivery Services (EDS) site.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Content Source Setup](#content-source-setup)
3. [EDS Project Setup](#eds-project-setup)
4. [Deployment Steps](#deployment-steps)
5. [Content Authoring](#content-authoring)
6. [Custom Domain Setup](#custom-domain-setup)
7. [Troubleshooting](#troubleshooting)
8. [Next Steps](#next-steps)

---

## Prerequisites

Before you begin, ensure you have the following:

### Required Accounts & Access

- **Adobe Experience Manager (AEM) Account**: You need access to Adobe Experience Manager or Adobe Experience Cloud
  - Sign up at: https://business.adobe.com/products/experience-manager/adobe-experience-manager.html
  - Or request access from your organization's Adobe administrator

- **GitHub Account**: 
  - Repository owner or admin access to this repository
  - Ability to configure GitHub Pages and webhooks

- **Content Source Access** (choose one):
  - **Google Drive**: A Google account with access to create and share documents
  - **SharePoint**: Microsoft 365 account with SharePoint access
  - **GitHub**: Direct content management in the repository

### Required Permissions

- **GitHub Repository Permissions**:
  - Admin access to configure webhooks
  - Ability to enable GitHub Pages
  - Permission to modify repository settings

- **Adobe Permissions**:
  - Access to create new EDS projects
  - Permission to configure domains

### Tools & Software

- **Web Browser**: Chrome, Firefox, or Edge (latest version)
- **AEM Sidekick Extension**: 
  - Chrome: https://chrome.google.com/webstore/detail/helix-sidekick/ccfggkjabjahcjoljmgmklhpaccedipo
  - Firefox: https://addons.mozilla.org/en-US/firefox/addon/helix-sidekick/

- **AEM CLI** (Optional, for local development):
  ```bash
  npm install -g @adobe/aem-cli
  ```

---

## Content Source Setup

EDS supports multiple content sources. Choose the one that best fits your workflow.

### Option 1: Google Drive (Recommended for Content Teams)

#### Step 1: Create a Google Drive Folder

1. Go to [Google Drive](https://drive.google.com)
2. Create a new folder for your content (e.g., "My EDS Site Content")
3. Right-click the folder → Share → Get link
4. Set permissions to "Anyone with the link can view"
5. Copy the folder URL (it will look like: `https://drive.google.com/drive/folders/FOLDER_ID`)

#### Step 2: Update fstab.yaml

Update the `fstab.yaml` file in your repository:

```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/YOUR_FOLDER_ID
```

Replace `YOUR_FOLDER_ID` with your actual Google Drive folder ID.

**Example:**
```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/1a2b3c4d5e6f7g8h9i0j
```

#### Step 3: Create Initial Content

1. In your Google Drive folder, create a new Google Doc
2. Name it exactly: `index`
3. Add some initial content (this will be your homepage)
4. Share the document with "Anyone with the link can view"

### Option 2: SharePoint

#### Step 1: Create a SharePoint Site

1. Go to your SharePoint site
2. Create a new document library or use an existing one
3. Note the SharePoint URL

#### Step 2: Update fstab.yaml

```yaml
mountpoints:
  /: https://yourtenant.sharepoint.com/sites/yoursite/Shared%20Documents/content
```

#### Step 3: Configure Permissions

1. Ensure the document library is accessible to "Everyone" or specific users
2. Create an `index.docx` file as your homepage

### Option 3: GitHub (Direct Content Management)

#### Step 1: Create Content Directory

```bash
mkdir -p content
```

#### Step 2: Update fstab.yaml

```yaml
mountpoints:
  /: https://github.com/YOUR_ORG/YOUR_REPO/tree/main/content
```

#### Step 3: Create Content Files

Create Markdown files in the `content` directory:

```bash
echo "# Welcome to My Site" > content/index.md
```

---

> **📌 Important Note (Updated 2026)**: The Adobe Edge Delivery Services setup process has evolved. The modern approach uses the **AEM Boilerplate template** and **AEM Code Sync GitHub App** instead of the older Helix Bot. This guide reflects the current best practices as documented in the [official Adobe EDS documentation](https://www.aem.live/docs/).

### Alternative Setup Method: Using AEM Boilerplate Template

For new projects, Adobe recommends starting with the AEM Boilerplate template:

1. Visit https://github.com/adobe/aem-boilerplate
2. Click **Use this template** → **Create a new repository**
3. Name your repository and set it to **Public** (recommended)
4. Clone your new repository locally
5. Follow steps 3-4 below to connect it to EDS

This approach provides a pre-configured structure optimized for Edge Delivery Services.

## EDS Project Setup

### Step 1: Access Adobe Experience Manager

1. Navigate to https://experience.adobe.com
2. Sign in with your Adobe ID
3. Select **Experience Manager** from the product switcher

### Step 2: Create a New EDS Project

1. In the AEM interface, click **Create** → **Site**
2. Select **Edge Delivery Services** as the template
3. Fill in the project details:
   - **Project Name**: Your site name
   - **Project Title**: Display name for your site
   - **GitHub Repository**: URL of this repository

### Step 3: Connect GitHub Repository

#### Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**
4. Save the settings

#### Configure Repository Settings

1. In your repository, go to **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets (if required by your organization):
   - `ADOBE_CLIENT_ID`
   - `ADOBE_CLIENT_SECRET`

### Step 4: Install AEM Code Sync GitHub App

The correct GitHub App for Adobe Edge Delivery Services is **AEM Code Sync**, not helix-bot.

1. Go to https://github.com/apps/aem-code-sync/installations/new
2. Click **Install**
3. In the **Repository access** settings:
   - Select **Only select repositories** (recommended)
   - Choose this repository from the dropdown
4. Click **Save** to grant the necessary permissions

**Note**: If you're using GitHub Enterprise with IP filtering, add this IP to your allowlist: `3.227.118.73`

The AEM Code Sync App will:
- Monitor content changes in your repository
- Trigger automatic builds when you push changes
- Manage preview and production deployments
- Sync content from your configured source (Google Drive, SharePoint, etc.)

### Step 5: Configure Project Settings

Create or update `.helix/config.yaml` in your repository:

```yaml
version: 1

# Content source configuration
contentSources:
  - type: google
    url: https://drive.google.com/drive/folders/YOUR_FOLDER_ID

# Performance settings
performance:
  device: mobile
  connection: 4g

# CDN configuration
cdn:
  prod:
    host: main--YOUR_REPO--YOUR_ORG.hlx.page
  live:
    host: main--YOUR_REPO--YOUR_ORG.hlx.live
```

---

## Deployment Steps

### Step 1: Verify Repository Structure

Ensure your repository has the following structure:

```
your-repo/
├── fstab.yaml              # Content source configuration
├── head.html               # Custom head elements
├── blocks/                 # Custom blocks
│   ├── header/
│   ├── footer/
│   ├── hero/
│   └── features/
├── scripts/
│   ├── scripts.js          # Main JavaScript
│   ├── aem.js              # EDS core functionality
│   └── delayed.js          # Delayed loading scripts
└── styles/
    └── styles.css          # Global styles
```

### Step 2: Test Locally (Optional)

Install the AEM CLI and test locally:

```bash
# Install AEM CLI
npm install -g @adobe/aem-cli

# Navigate to your project
cd your-repo

# Start local development server
aem up

# Open browser to http://localhost:3000
```

### Step 3: Commit and Push Changes

```bash
# Add all files
git add .

# Commit changes
git commit -m "Configure EDS deployment"

# Push to GitHub
git push origin main
```

### Step 4: Trigger Initial Deployment

1. Go to your GitHub repository
2. Navigate to **Actions** tab
3. You should see a workflow running automatically
4. Wait for the workflow to complete (usually 2-5 minutes)

### Step 5: Access Preview Environment

Once deployed, your site will be available at:

**Preview URL**: `https://main--YOUR_REPO--YOUR_ORG.hlx.page`

Example: `https://main--context-studio-lab--myorg.hlx.page`

### Step 6: Publish to Production

1. Install the AEM Sidekick browser extension
2. Navigate to your preview URL
3. Click the Sidekick extension icon
4. Click **Publish** to promote to production

**Production URL**: `https://main--YOUR_REPO--YOUR_ORG.hlx.live`

### Step 7: Verify Deployment

Check the following:

- [ ] Preview site loads correctly
- [ ] All blocks render properly
- [ ] Images and assets load
- [ ] Navigation works
- [ ] Mobile responsiveness
- [ ] Performance scores (use Lighthouse)

---

## Content Authoring

### Using Google Docs

#### Step 1: Create a New Document

1. In your Google Drive content folder, create a new Google Doc
2. Name it with the desired URL path (e.g., `about` for `/about` page)
3. Add content using standard Google Docs formatting

#### Step 2: Use EDS Formatting Conventions

**Headings**: Use Google Docs heading styles (Heading 1, 2, 3)

**Images**: 
- Insert images directly into the document
- Images will be automatically optimized by EDS

**Links**:
- Use standard Google Docs links
- Internal links: Use relative paths (e.g., `/about`)
- External links: Use full URLs

**Tables**: 
- Tables are automatically converted to blocks
- First row becomes the block name

**Example Block Structure**:

```
---
Hero
---
Welcome to Our Site
This is a hero section
[Image]
Learn More | /about
---
```

#### Step 3: Preview Content

1. Open your Google Doc
2. Click the AEM Sidekick extension
3. Click **Preview** to see how it will look
4. The preview opens in a new tab

#### Step 4: Publish Content

1. In the Sidekick, click **Publish**
2. Content is immediately available on the live site
3. CDN cache is automatically purged

### Using the AEM Sidekick

The Sidekick provides quick access to:

- **Preview**: See unpublished changes
- **Publish**: Push content to production
- **Reload**: Refresh the preview
- **Edit**: Open the source document
- **Delete**: Remove published content

**Keyboard Shortcuts**:
- `Ctrl/Cmd + Shift + P`: Preview
- `Ctrl/Cmd + Shift + L`: Publish

### Working with Blocks

Blocks are reusable components. This repository includes:

#### Header Block

```
---
Header
---
Logo | /
Home | /
About | /about
Contact | /contact
---
```

#### Hero Block

```
---
Hero
---
# Welcome to Our Site
Your tagline here
[Hero Image]
Get Started | /get-started
---
```

#### Features Block

```
---
Features
---
Feature 1 | Description 1 | [Icon 1]
Feature 2 | Description 2 | [Icon 2]
Feature 3 | Description 3 | [Icon 3]
---
```

#### Footer Block

```
---
Footer
---
© 2024 Your Company
Privacy Policy | /privacy
Terms of Service | /terms
---
```

### Content Best Practices

1. **Use Semantic HTML**: Headings should follow hierarchy (H1 → H2 → H3)
2. **Optimize Images**: Use appropriate image sizes (max 2000px width)
3. **Write Descriptive Alt Text**: For accessibility
4. **Use Relative Links**: For internal navigation
5. **Keep Documents Organized**: Use folders for different sections
6. **Test Before Publishing**: Always preview changes

---

## Custom Domain Setup

### Step 1: Choose Your Domain

Decide on your custom domain (e.g., `www.example.com` or `example.com`)

### Step 2: Configure DNS

Add the following DNS records in your domain registrar:

**For Apex Domain (example.com)**:

```
Type: A
Name: @
Value: 151.101.1.195
TTL: 3600

Type: A
Name: @
Value: 151.101.65.195
TTL: 3600

Type: A
Name: @
Value: 151.101.129.195
TTL: 3600

Type: A
Name: @
Value: 151.101.193.195
TTL: 3600
```

**For Subdomain (www.example.com)**:

```
Type: CNAME
Name: www
Value: main--YOUR_REPO--YOUR_ORG.hlx.live
TTL: 3600
```

### Step 3: Configure Domain in Adobe

1. Go to Adobe Experience Manager
2. Navigate to your project settings
3. Click **Domains** → **Add Domain**
4. Enter your custom domain
5. Click **Verify** to check DNS configuration

### Step 4: SSL Certificate Setup

Adobe automatically provisions SSL certificates via Let's Encrypt:

1. DNS verification is performed automatically
2. Certificate is issued within 24 hours
3. Auto-renewal is configured

**Verify SSL**:
```bash
curl -I https://www.example.com
```

Look for `HTTP/2 200` and valid SSL certificate.

### Step 5: Update Configuration

Update your `fstab.yaml` to include the custom domain:

```yaml
mountpoints:
  /: https://drive.google.com/drive/folders/YOUR_FOLDER_ID

domains:
  - www.example.com
```

### Step 6: Test Custom Domain

1. Wait for DNS propagation (up to 48 hours, usually faster)
2. Visit your custom domain
3. Verify HTTPS is working
4. Check that all assets load correctly

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Site Not Loading

**Symptoms**: 404 error or blank page

**Solutions**:
1. Check that `fstab.yaml` is correctly configured
2. Verify GitHub Pages is enabled
3. Check that content source is accessible
4. Review GitHub Actions logs for errors

```bash
# Check GitHub Actions status
gh run list --repo YOUR_ORG/YOUR_REPO
```

#### Issue: Content Not Updating

**Symptoms**: Changes not appearing on preview/live site

**Solutions**:
1. Clear browser cache (Ctrl+Shift+R)
2. Use Sidekick to reload preview
3. Check content source permissions
4. Verify document is shared correctly

**Force Cache Clear**:
```bash
# Add ?bust=timestamp to URL
https://main--YOUR_REPO--YOUR_ORG.hlx.page?bust=1234567890
```

#### Issue: Blocks Not Rendering

**Symptoms**: Block content appears as plain text

**Solutions**:
1. Check block JavaScript files exist in `/blocks/` directory
2. Verify block CSS is loaded
3. Check browser console for JavaScript errors
4. Ensure block name matches folder name exactly

**Debug Blocks**:
```javascript
// Add to scripts.js for debugging
console.log('Loaded blocks:', document.querySelectorAll('[class*="block"]'));
```

#### Issue: Images Not Loading

**Symptoms**: Broken image icons or missing images

**Solutions**:
1. Verify image permissions in content source
2. Check image URLs are accessible
3. Ensure images are in supported formats (JPG, PNG, WebP, GIF)
4. Check image file size (max 10MB recommended)

**Test Image URL**:
```bash
curl -I https://your-image-url.jpg
```

#### Issue: Slow Performance

**Symptoms**: Low Lighthouse scores, slow page load

**Solutions**:
1. Optimize images (use WebP format)
2. Minimize custom JavaScript
3. Use lazy loading for images
4. Enable compression in `head.html`

**Performance Checklist**:
- [ ] Images optimized and properly sized
- [ ] Minimal custom JavaScript
- [ ] CSS is minified
- [ ] Fonts are preloaded
- [ ] Third-party scripts are deferred

#### Issue: Custom Domain Not Working

**Symptoms**: Domain shows error or doesn't resolve

**Solutions**:
1. Verify DNS records are correct
2. Wait for DNS propagation (up to 48 hours)
3. Check domain verification in Adobe console
4. Ensure SSL certificate is issued

**Check DNS Propagation**:
```bash
# Check DNS records
nslookup www.example.com

# Check from multiple locations
https://www.whatsmydns.net/
```

### Checking Logs

#### GitHub Actions Logs

1. Go to repository → **Actions** tab
2. Click on the latest workflow run
3. Expand each step to see detailed logs
4. Look for error messages in red

#### Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for errors (red messages)
4. Check **Network** tab for failed requests

#### AEM Logs

1. Use Sidekick → **Tools** → **Logs**
2. Check for rendering errors
3. Review content transformation logs

### Performance Optimization Tips

#### 1. Image Optimization

```html
<!-- Use WebP format -->
<picture>
  <source type="image/webp" srcset="image.webp">
  <img src="image.jpg" alt="Description">
</picture>
```

#### 2. Lazy Loading

```javascript
// Add to scripts.js
document.querySelectorAll('img').forEach(img => {
  img.loading = 'lazy';
});
```

#### 3. Font Optimization

```html
<!-- In head.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

#### 4. CSS Optimization

- Remove unused CSS
- Inline critical CSS
- Defer non-critical CSS

#### 5. JavaScript Optimization

- Use `delayed.js` for non-critical scripts
- Minimize third-party scripts
- Use async/defer attributes

### Getting Help

If you're still experiencing issues:

1. **Adobe Support**: https://helpx.adobe.com/support.html
2. **EDS Documentation**: https://www.aem.live/docs/
3. **Community Forums**: https://experienceleaguecommunities.adobe.com/
4. **GitHub Issues**: Create an issue in this repository

---

## Next Steps

### Monitoring and Analytics

#### Set Up Adobe Analytics

1. Create an Adobe Analytics account
2. Get your tracking ID
3. Add to `head.html`:

```html
<script src="https://assets.adobedtm.com/YOUR_TRACKING_ID.js"></script>
```

#### Set Up Google Analytics

```html
<!-- Add to head.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

#### Monitor Performance

Use these tools regularly:
- **Lighthouse**: Built into Chrome DevTools
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **WebPageTest**: https://www.webpagetest.org/

### Content Migration Strategies

#### From Existing Website

1. **Audit Current Content**: List all pages and assets
2. **Create Content Structure**: Organize in Google Drive/SharePoint
3. **Migrate in Phases**: Start with high-priority pages
4. **Set Up Redirects**: Use redirect rules in `fstab.yaml`

**Example Redirects**:
```yaml
redirects:
  /old-page: /new-page
  /blog/*: /news/$1
```

#### From CMS

1. **Export Content**: Use CMS export tools
2. **Convert Format**: Transform to Google Docs or Markdown
3. **Preserve URLs**: Maintain URL structure or set up redirects
4. **Test Thoroughly**: Verify all links and assets

### Team Collaboration Setup

#### Content Team

1. **Share Content Folder**: Give edit access to content creators
2. **Create Style Guide**: Document content formatting standards
3. **Set Up Review Process**: Use Google Docs comments for reviews
4. **Train on Sidekick**: Ensure team knows how to preview/publish

#### Development Team

1. **Branch Strategy**: Use feature branches for development
2. **Code Reviews**: Require PR reviews before merging
3. **Testing Environment**: Use preview URLs for testing
4. **Documentation**: Keep block documentation updated

#### Workflow Example

```
Content Creator → Creates/Edits Doc → Reviews in Preview
                                    ↓
Content Manager → Reviews → Approves → Publishes
                                    ↓
                            Live Site Updated
```

### Advanced Features

#### Implement Search

```javascript
// Add to scripts.js
async function initSearch() {
  const response = await fetch('/query-index.json');
  const data = await response.json();
  // Implement search logic
}
```

#### Add Forms

Create a form block:

```
---
Form
---
Name | text | required
Email | email | required
Message | textarea | required
Submit | submit
---
```

#### Implement Personalization

Use Adobe Target for personalization:

```html
<!-- Add to head.html -->
<script src="https://assets.adobedtm.com/YOUR_TARGET_ID.js"></script>
```

### Continuous Improvement

1. **Monitor Analytics**: Review traffic and user behavior weekly
2. **Performance Audits**: Run Lighthouse monthly
3. **Content Updates**: Keep content fresh and relevant
4. **Security Updates**: Monitor for security advisories
5. **User Feedback**: Implement feedback mechanisms

### Resources

- **Official Documentation**: https://www.aem.live/docs/
- **Developer Tutorial**: https://www.aem.live/developer/tutorial
- **Block Collection**: https://www.aem.live/developer/block-collection
- **Best Practices**: https://www.aem.live/docs/best-practices
- **Community Discord**: https://discord.gg/adobe-developers

---

## Conclusion

You now have a fully deployed Adobe Edge Delivery Services site! This guide covered:

✅ Prerequisites and account setup
✅ Content source configuration
✅ EDS project creation and deployment
✅ Content authoring workflows
✅ Custom domain setup
✅ Troubleshooting common issues
✅ Next steps for optimization and growth

### Quick Reference Commands

```bash
# Install AEM CLI
npm install -g @adobe/aem-cli

# Start local development
aem up

# Check GitHub Actions
gh run list

# Test DNS
nslookup www.example.com

# Check SSL
curl -I https://www.example.com
```

### Support

For additional help:
- 📧 Email: support@example.com
- 💬 Slack: #eds-support
- 📚 Docs: https://www.aem.live/docs/
- 🐛 Issues: https://github.com/YOUR_ORG/YOUR_REPO/issues

---

**Last Updated**: 2026-05-25
**Version**: 1.0.0
**Maintained By**: Development Team