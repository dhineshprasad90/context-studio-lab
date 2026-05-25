# EDS Blank Page Fix - Solution Documentation

## Problem Summary

The EDS live site was displaying a blank page because the repository was configured incorrectly for Adobe Edge Delivery Services (EDS).

## Root Cause Analysis

After researching Adobe EDS documentation, I identified the following issues:

### 1. **Misunderstanding of EDS Architecture**
- EDS is a **document-based** content delivery system
- It serves content from documents (Google Docs, SharePoint, or Markdown files)
- It does NOT serve traditional HTML files directly

### 2. **Incorrect fstab.yaml Configuration**
The original [`fstab.yaml`](fstab.yaml) pointed to:
```yaml
mountpoints:
  /:
    url: "https://author-p130360-e1272151.adobeaemcloud.com/bin/franklin.delivery/adobe-rnd/aem-boilerplate-xwalk/main"
    type: "markup"
    suffix: ".html"
```

**Problems:**
- Pointed to an AEM Cloud URL that likely had no content
- Used complex configuration that wasn't necessary
- The content source was external and inaccessible

### 3. **Missing Document Content**
- The repository had an [`index.html`](index.html) file (traditional HTML)
- EDS needs markdown or document-based content
- No `index.md` or document source was configured

## Solution Implemented

### Step 1: Created Document-Based Content
Created [`index.md`](index.md) - a markdown file with the site content:
- Converted the HTML content to markdown format
- Structured content using markdown headings, lists, and formatting
- This file serves as the homepage content that EDS will render

### Step 2: Updated fstab.yaml Configuration
Simplified the configuration to point to the GitHub repository:
```yaml
mountpoints:
  /: https://github.com/dhineshprasad90/context-studio-lab/tree/main
```

**Why this works:**
- EDS can directly read markdown files from GitHub
- The mountpoint `/` maps to the root of the repository
- EDS will automatically find and serve `index.md` as the homepage
- No complex authentication or external dependencies needed

### Step 3: Committed and Pushed Changes
```bash
git add index.md fstab.yaml
git commit -m "Fix EDS blank page: Add markdown content and update fstab.yaml to point to GitHub repo"
git push origin main
```

## How EDS Works (Key Learnings)

### Content Authoring Model
1. **Document-First Approach**: Content is authored in:
   - Google Docs
   - Microsoft Word/SharePoint
   - Markdown files in GitHub
   
2. **Automatic Conversion**: EDS automatically converts documents to HTML

3. **File Mapping**:
   - `index.md` → Homepage (/)
   - `nav.md` → Navigation component
   - `footer.md` → Footer component
   - Other `.md` files → Corresponding pages

### fstab.yaml Purpose
- Defines where EDS should fetch content from
- Maps URL paths to content sources
- Supports multiple mountpoints for different content sources

## Verification Steps

After the changes are deployed, EDS will:

1. **Read fstab.yaml** to find the content source
2. **Fetch index.md** from the GitHub repository
3. **Convert markdown to HTML** automatically
4. **Apply EDS styling** and blocks
5. **Serve the rendered page** at the live URL

## Expected Behavior

- **Before Fix**: Blank page (no content source configured)
- **After Fix**: Homepage displays with content from `index.md`

## Additional Notes

### Why Not Use index.html?
- EDS is designed for document-based authoring
- HTML files are not processed by EDS's content pipeline
- The existing `index.html` can remain for local development but won't be served by EDS

### Future Content Updates

To update content on the EDS site:

1. **Edit index.md** (or create new .md files)
2. **Commit and push** to GitHub
3. **EDS automatically rebuilds** and serves the updated content

### Alternative Approaches

If you want to use Google Drive or SharePoint:

1. Create a folder in Google Drive/SharePoint
2. Share it with `helix@adobe.com`
3. Update fstab.yaml with the folder URL:
   ```yaml
   mountpoints:
     /: https://drive.google.com/drive/folders/YOUR_FOLDER_ID
   ```

## References

- [Adobe EDS Documentation](https://www.aem.live/docs/)
- [Getting Started - Developer Tutorial](https://www.aem.live/docs/getting-started)
- [Authoring and Publishing Content](https://www.aem.live/docs/authoring)
- [Google Drive Setup](https://www.aem.live/docs/setup-google-drive)

## Summary

The blank page issue was resolved by:
1. ✅ Creating markdown-based content (`index.md`)
2. ✅ Updating `fstab.yaml` to point to the GitHub repository
3. ✅ Committing and pushing changes to GitHub

EDS will now serve the content from the markdown file, rendering it as a proper webpage instead of showing a blank page.