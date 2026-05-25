# Context Studio Lab

![Context Studio Lab](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

A modern, responsive website showcasing the Context Studio Lab platform - an advanced EDS (Edge Delivery Services) development platform featuring live editing, autonomous block generation, and intelligent orchestration capabilities.

## 🚀 Project Overview

Context Studio Lab is a comprehensive development platform designed for Adobe Edge Delivery Services (EDS). The website serves as both a marketing page and documentation hub, highlighting the platform's key features:

- **Live Editing System**: Real-time code editing with hot module replacement (HMR)
- **Autonomous Block Generation**: AI-powered orchestration for automatic EDS block creation
- **Intelligent Orchestration**: Seamless coordination between Context Studio, GitHub, XWalk, and AEM WKND components

### Key Features

- ⚡ **Lightning Fast Performance**: Sub-second build times and HMR latency
- 🎨 **Modern Design**: Clean, gradient-based UI with smooth animations
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ♿ **Accessible**: Semantic HTML and ARIA labels for screen readers
- 🎭 **Interactive**: Scroll animations, parallax effects, and smooth transitions
- 📊 **Performance Optimized**: Minimal dependencies, efficient CSS, and optimized JavaScript

## 📁 Project Structure

```
context-studio-lab/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Comprehensive stylesheet with CSS variables
├── js/
│   └── main.js            # Interactive JavaScript functionality
├── docs/                  # Documentation files
│   ├── eds-live-editing-architecture.md
│   ├── eds-block-generation-orchestration-plan.md
│   ├── functional-requirements.md
│   └── non-functional-requirements.md
├── schema/                # JSON-LD schemas
└── README.md             # This file
```

### File Descriptions

#### `index.html` (321 lines)
The main HTML document containing:
- Semantic HTML5 structure
- Fixed navigation bar with mobile menu
- Hero section with animated statistics
- Features grid showcasing three core capabilities
- Architecture visualization with 5-layer system
- Demo section with video placeholder
- Documentation cards linking to technical specs
- Comprehensive footer with links

#### `css/style.css` (882 lines)
Modern CSS with:
- CSS custom properties (variables) for theming
- Mobile-first responsive design
- Smooth animations and transitions
- Grid and Flexbox layouts
- Custom scroll animations
- Three responsive breakpoints (968px, 768px, 480px)
- Gradient effects and shadows
- Utility classes for spacing and alignment

#### `js/main.js` (480 lines)
Modular JavaScript featuring:
- ES6+ class-based architecture
- Navigation with smooth scrolling
- Scroll-triggered animations
- Statistics counter animation
- Feature card interactions
- Demo video placeholder
- Scroll progress indicator
- Active section highlighting
- Parallax effects
- Typing effect for hero title
- Performance metrics logging
- Debounced event handlers for optimization

## 🛠️ Getting Started

### Prerequisites

You need one of the following to run a local development server:

- **Python 3.x** (built-in on most systems)
- **Node.js** (v14 or higher)
- Any other static file server

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd context-studio-lab
   ```

2. **No build step required!** This is a static website with no dependencies.

### Running the Development Server

#### Option 1: Python (Recommended)

**Python 3.x:**
```bash
python -m http.server 8000
```

**Python 2.x:**
```bash
python -m SimpleHTTPServer 8000
```

#### Option 2: Node.js

**Using npx (no installation required):**
```bash
npx http-server -p 8000
```

**Using live-server (with auto-reload):**
```bash
npx live-server --port=8000
```

#### Option 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Accessing the Site

Once the server is running, open your browser and navigate to:
```
http://localhost:8000
```

## ✨ Features Documentation

### Hero Section
- **Animated Background**: Gradient background with pulsing radial effect
- **Statistics Display**: Three key metrics with gradient text
- **Call-to-Action Buttons**: Primary and secondary button styles
- **Scroll Indicator**: Animated arrow prompting users to explore

### Features Grid
Three feature cards highlighting:

1. **Live Editing System** 🔥
   - Incremental builds <500ms
   - WebSocket-based HMR
   - State preservation
   - Vite-powered development

2. **Autonomous Block Generation** 🤖
   - 85%+ autonomous completion
   - WKND component mapping
   - XWalk boilerplate integration
   - Multi-layer validation

3. **Intelligent Orchestration** ⚙️
   - Automatic dependency resolution
   - GitHub integration & PR automation
   - CI/CD pipeline configuration
   - State management & recovery

### Architecture Visualization
Five-layer system architecture:
1. Developer Interface (VS Code Extension, Browser DevTools)
2. File Watcher Service (Chokidar-based)
3. Build Pipeline (Vite + esbuild)
4. Development Server (Vite Dev Server)
5. WebSocket Layer (Real-time communication)

### Interactive Elements

- **Smooth Scrolling**: Navigation links scroll smoothly to sections
- **Scroll Animations**: Elements fade and slide in as you scroll
- **Hover Effects**: Cards lift and scale on hover
- **Mobile Menu**: Hamburger menu for mobile devices
- **Progress Bar**: Top-of-page indicator showing scroll progress
- **Active Section Highlighting**: Navigation updates based on scroll position
- **Parallax Effect**: Hero background moves at different speed

### Responsive Design Breakpoints

- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px - 968px (adjusted grid layouts)
- **Mobile**: 480px - 768px (stacked layouts, mobile menu)
- **Small Mobile**: <480px (optimized typography and spacing)

## 🎨 Technical Details

### Technologies Used

- **HTML5**: Semantic markup, accessibility features
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **JavaScript ES6+**: Classes, arrow functions, template literals
- **No frameworks or libraries**: Pure vanilla JavaScript for maximum performance

### Design System

#### Colors
```css
--primary-color: #0066ff      /* Primary blue */
--secondary-color: #6c63ff    /* Purple accent */
--accent-color: #ff6b6b       /* Red accent */
--success-color: #51cf66      /* Green */
--dark: #1a1a2e               /* Dark background */
--white: #ffffff              /* White */
```

#### Gradients
```css
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
--gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)
```

#### Typography
- **Font Family**: System font stack for optimal performance
- **Headings**: 700 weight, 1.2 line-height
- **Body**: 400 weight, 1.6 line-height
- **Sizes**: Responsive scaling from 1rem to 4rem

#### Spacing Scale
```css
--spacing-xs: 0.5rem   /* 8px */
--spacing-sm: 1rem     /* 16px */
--spacing-md: 2rem     /* 32px */
--spacing-lg: 4rem     /* 64px */
--spacing-xl: 6rem     /* 96px */
```

### JavaScript Functionality

#### Core Classes

1. **Navigation**: Handles navbar scrolling, mobile menu, smooth scrolling
2. **ScrollAnimations**: Triggers animations when elements enter viewport
3. **StatsCounter**: Animates statistics in hero section
4. **FeatureCards**: Manages hover interactions on feature cards
5. **DemoVideo**: Handles demo video placeholder interactions
6. **ScrollProgress**: Creates and updates scroll progress bar
7. **ActiveSectionHighlighter**: Updates active nav link based on scroll
8. **ParallaxEffect**: Applies parallax scrolling to hero background
9. **TypingEffect**: Creates typing animation for hero title
10. **PerformanceMetrics**: Logs page load performance

#### Performance Optimizations

- **Debouncing**: Scroll and resize events are debounced to reduce CPU usage
- **Viewport Detection**: Animations only trigger when elements are visible
- **CSS Transitions**: Hardware-accelerated transforms for smooth animations
- **Minimal Repaints**: Efficient DOM manipulation and style changes
- **Lazy Initialization**: Components initialize only when needed

## 🎯 Customization Guide

### Changing Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #your-color;
    --gradient-primary: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

### Modifying Content

1. **Hero Section**: Edit lines 35-69 in `index.html`
2. **Features**: Edit lines 72-128 in `index.html`
3. **Architecture**: Edit lines 130-197 in `index.html`
4. **Documentation Links**: Edit lines 240-274 in `index.html`

### Adding New Sections

1. Add section HTML in `index.html`:
```html
<section id="new-section" class="new-section">
    <div class="container">
        <!-- Your content -->
    </div>
</section>
```

2. Add navigation link:
```html
<li><a href="#new-section" class="nav-link">New Section</a></li>
```

3. Add styles in `css/style.css`:
```css
.new-section {
    padding: var(--spacing-xl) 0;
    background: var(--light);
}
```

### Updating Links and Images

- **Documentation Links**: Update `href` attributes in the documentation section
- **External Links**: Add to footer columns (lines 286-310)
- **Images**: Add to appropriate sections (currently using emoji icons)

### Customizing Animations

Modify animation parameters in `js/main.js`:

```javascript
// Change typing speed
this.speed = 100; // milliseconds per character

// Change parallax speed
const parallaxSpeed = 0.5; // 0 = no parallax, 1 = full speed

// Change animation delay
data-aos-delay="100" // milliseconds
```

## 🚀 Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select branch (usually `main`) and root folder
4. Save and wait for deployment
5. Access at `https://username.github.io/repository-name`

### Netlify

1. Create account at [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/` (root)
5. Click "Deploy site"

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow prompts to deploy
4. Or use Vercel dashboard to import from Git

### Traditional Web Hosting

1. Upload all files via FTP/SFTP
2. Ensure `index.html` is in the root directory
3. Maintain folder structure (`css/`, `js/`, `docs/`)
4. Set proper file permissions (644 for files, 755 for directories)

## 🌐 Browser Support

### Fully Supported
- ✅ Chrome 90+ (Desktop & Mobile)
- ✅ Firefox 88+ (Desktop & Mobile)
- ✅ Safari 14+ (Desktop & Mobile)
- ✅ Edge 90+
- ✅ Opera 76+

### Partially Supported
- ⚠️ Internet Explorer 11 (basic functionality, no animations)

### Known Issues
- Typing effect disabled on mobile devices for performance
- Some CSS Grid features may not work in older browsers
- Parallax effect may be choppy on low-end devices

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Reporting Issues
- Use GitHub Issues to report bugs
- Include browser version and steps to reproduce
- Provide screenshots if applicable

### Submitting Changes
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test across different browsers and devices
5. Commit with clear messages: `git commit -m "Add feature X"`
6. Push to your fork: `git push origin feature-name`
7. Submit a Pull Request

### Code Style Guidelines

**HTML:**
- Use semantic HTML5 elements
- Maintain proper indentation (4 spaces)
- Add ARIA labels for accessibility
- Keep attributes in logical order

**CSS:**
- Use CSS variables for theming
- Follow BEM naming convention where applicable
- Group related properties
- Add comments for complex sections
- Mobile-first approach

**JavaScript:**
- Use ES6+ features
- Follow class-based architecture
- Add JSDoc comments for functions
- Use meaningful variable names
- Implement error handling
- Debounce expensive operations

## 📄 License

This project is licensed under the MIT License.

```
MIT License

Copyright (c) 2026 Context Studio Lab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Credits

### Built With
- **Design Inspiration**: Modern SaaS landing pages
- **Icons**: Unicode emoji characters
- **Fonts**: System font stack for optimal performance
- **Color Palette**: Custom gradient-based design system

### Special Thanks
- Adobe Edge Delivery Services team for the platform
- The open-source community for inspiration
- IBM Bob for development assistance

## 📞 Support

For questions, issues, or feature requests:

- 📧 Email: support@contextstudiolab.com
- 🐛 Issues: [GitHub Issues](https://github.com/username/context-studio-lab/issues)
- 📖 Documentation: See `docs/` folder for technical specifications

## 🗺️ Roadmap

### Version 1.1 (Planned)
- [ ] Add interactive demo video
- [ ] Implement dark mode toggle
- [ ] Add code syntax highlighting for examples
- [ ] Create API documentation section
- [ ] Add search functionality

### Version 2.0 (Future)
- [ ] Integration with actual Context Studio platform
- [ ] Live code playground
- [ ] User authentication and dashboard
- [ ] Real-time collaboration features
- [ ] Advanced analytics and monitoring

---

**Made with ⚡ by IBM Bob**

*Last Updated: May 25, 2026*