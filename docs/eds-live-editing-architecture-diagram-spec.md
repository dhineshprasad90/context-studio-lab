# EDS Live Editing Architecture - DrawIO Diagram Specification

This document provides the complete specification for creating the [`eds-live-editing-architecture.drawio`](docs/eds-live-editing-architecture.drawio) diagram. This specification should be used to create the actual DrawIO file in Code or Advanced mode.

---

## Diagram Layout

**Canvas Size**: 1920 x 1600 pixels  
**Grid**: 8px  
**Background**: #ffffff

---

## Title Section

**Position**: x=560, y=16  
**Size**: 800 x 40  
**Style**: 
- Font: IBM Plex Sans, 24px, Bold
- Color: #161616
- Alignment: Center

**Text**: "EDS Live Editing System Architecture"

---

## Layer 1: Developer Interface Layer

**Position**: x=80, y=80  
**Size**: 1760 x 120  
**Style**:
- Border: #878d96, 2px
- Fill: #f2f4f8
- Font: IBM Plex Sans, 14px, Bold
- Label Position: Top-left

**Label**: "1. Developer Interface Layer"

### Components:

#### VS Code Extension
- **Position**: x=120, y=120
- **Size**: 200 x 60
- **Style**: Rounded rectangle, #0f62fe border, #edf5ff fill
- **Icon**: 📝
- **Text**: "VS Code Extension\nFile editing & commands"

#### Browser DevTools
- **Position**: x=360, y=120
- **Size**: 200 x 60
- **Style**: Rounded rectangle, #0f62fe border, #edf5ff fill
- **Icon**: 🔧
- **Text**: "Browser DevTools\nInspection & debugging"

#### Developer
- **Position**: x=600, y=120
- **Size**: 80 x 60
- **Style**: Ellipse, #0f62fe border, #edf5ff fill
- **Icon**: 👤
- **Text**: "Developer"

---

## Layer 2: File Watcher Service

**Position**: x=80, y=220  
**Size**: 1760 x 120  
**Style**:
- Border: #1192e8, 2px
- Fill: #e5f6ff
- Font: IBM Plex Sans, 14px, Bold

**Label**: "2. File Watcher Service (Chokidar)"

### Components:

#### File Monitor
- **Position**: x=120, y=260
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #1192e8 border, #ffffff fill
- **Text**: "File Monitor\nDetect changes"

#### Change Filter
- **Position**: x=340, y=260
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #1192e8 border, #ffffff fill
- **Text**: "Change Filter\nblocks/**/*.{html,css,js}"

#### Debouncer
- **Position**: x=560, y=260
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #1192e8 border, #ffffff fill
- **Text**: "Debouncer\n150ms delay"

#### Event Emitter
- **Position**: x=780, y=260
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #1192e8 border, #ffffff fill
- **Text**: "Event Emitter\nFileChangeEvent"

---

## Layer 3: Build Pipeline & Compiler

**Position**: x=80, y=360  
**Size**: 1760 x 140  
**Style**:
- Border: #a56eff, 2px
- Fill: #f6f2ff
- Font: IBM Plex Sans, 14px, Bold

**Label**: "3. Build Pipeline & Compiler (Vite + esbuild)"

### Components:

#### Build Orchestrator
- **Position**: x=120, y=400
- **Size**: 160 x 80
- **Style**: Rounded rectangle, #a56eff border, #ffffff fill
- **Text**: "Build Orchestrator\nCoordinate builds"

#### HTML Transformer
- **Position**: x=320, y=400
- **Size**: 140 x 80
- **Style**: Rounded rectangle, #a56eff border, #ffffff fill
- **Text**: "HTML Transform\nParse & validate"

#### CSS Processor
- **Position**: x=500, y=400
- **Size**: 140 x 80
- **Style**: Rounded rectangle, #a56eff border, #ffffff fill
- **Text**: "CSS Processor\nPostCSS + prefix"

#### JS Compiler
- **Position**: x=680, y=400
- **Size**: 140 x 80
- **Style**: Rounded rectangle, #a56eff border, #ffffff fill
- **Text**: "JS Compiler\nesbuild + HMR"

#### Build Cache
- **Position**: x=860, y=400
- **Size**: 140 x 80
- **Style**: Rounded rectangle, #a56eff border, #ffffff fill
- **Text**: "Build Cache\nArtifact storage"

#### Source Maps
- **Position**: x=1040, y=400
- **Size**: 140 x 80
- **Style**: Rounded rectangle, #a56eff border, #ffffff fill
- **Text**: "Source Maps\nDebug support"

---

## Layer 4: Development Server

**Position**: x=80, y=520  
**Size**: 1760 x 120  
**Style**:
- Border: #24a148, 2px
- Fill: #defbe6
- Font: IBM Plex Sans, 14px, Bold

**Label**: "4. Development Server (Vite Dev Server)"

### Components:

#### HTTP Server
- **Position**: x=120, y=560
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #24a148 border, #ffffff fill
- **Text**: "HTTP Server\nPort 3000"

#### Middleware
- **Position**: x=340, y=560
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #24a148 border, #ffffff fill
- **Text**: "Middleware\nEDS routing"

#### Asset Server
- **Position**: x=560, y=560
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #24a148 border, #ffffff fill
- **Text**: "Asset Server\nStatic files"

#### HMR Injector
- **Position**: x=780, y=560
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #24a148 border, #ffffff fill
- **Text**: "HMR Injector\nClient code"

---

## Layer 5: WebSocket Communication

**Position**: x=80, y=660  
**Size**: 1760 x 120  
**Style**:
- Border: #fa4d56, 2px
- Fill: #fff1f1
- Font: IBM Plex Sans, 14px, Bold

**Label**: "5. WebSocket Communication Layer"

### Components:

#### WS Server
- **Position**: x=120, y=700
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #fa4d56 border, #ffffff fill
- **Text**: "WS Server\nPort 3001"

#### Message Router
- **Position**: x=340, y=700
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #fa4d56 border, #ffffff fill
- **Text**: "Message Router\nProtocol handler"

#### Connection Manager
- **Position**: x=560, y=700
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #fa4d56 border, #ffffff fill
- **Text**: "Connection Mgr\nClient tracking"

#### Heartbeat Monitor
- **Position**: x=780, y=700
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #fa4d56 border, #ffffff fill
- **Text**: "Heartbeat\nPing/Pong"

---

## Layer 6: Browser Client (HMR Runtime)

**Position**: x=80, y=800  
**Size**: 1760 x 160  
**Style**:
- Border: #0f62fe, 2px
- Fill: #edf5ff
- Font: IBM Plex Sans, 14px, Bold

**Label**: "6. Browser Client (HMR Runtime)"

### Components:

#### WS Client
- **Position**: x=120, y=840
- **Size**: 160 x 100
- **Style**: Rounded rectangle, #0f62fe border, #ffffff fill
- **Text**: "WS Client\nReceive updates"

#### State Manager
- **Position**: x=320, y=840
- **Size**: 160 x 100
- **Style**: Rounded rectangle, #0f62fe border, #ffffff fill
- **Text**: "State Manager\nCapture/Restore"

#### Module Replacer
- **Position**: x=520, y=840
- **Size**: 160 x 100
- **Style**: Rounded rectangle, #0f62fe border, #ffffff fill
- **Text**: "Module Replacer\nApply updates"

#### CSS Updater
- **Position**: x=720, y=840
- **Size**: 160 x 100
- **Style**: Rounded rectangle, #0f62fe border, #ffffff fill
- **Text**: "CSS Updater\nStyle injection"

#### Error Overlay
- **Position**: x=920, y=840
- **Size**: 160 x 100
- **Style**: Rounded rectangle, #0f62fe border, #ffffff fill
- **Text**: "Error Overlay\nVisual feedback"

---

## Layer 7: EDS Block Runtime

**Position**: x=80, y=980  
**Size**: 1760 x=120  
**Style**:
- Border: #009d9a, 2px
- Fill: #d9fbfb
- Font: IBM Plex Sans, 14px, Bold

**Label**: "7. EDS Block Runtime"

### Components:

#### Block Registry
- **Position**: x=120, y=1020
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #009d9a border, #ffffff fill
- **Text**: "Block Registry\nActive blocks"

#### Decorate Functions
- **Position**: x=340, y=1020
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #009d9a border, #ffffff fill
- **Text**: "Decorate Functions\nBlock initialization"

#### Live Blocks
- **Position**: x=560, y=1020
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #009d9a border, #ffffff fill
- **Text**: "Live Blocks\nRendered content"

#### Event Handlers
- **Position**: x=780, y=1020
- **Size**: 180 x 60
- **Style**: Rounded rectangle, #009d9a border, #ffffff fill
- **Text**: "Event Handlers\nUser interactions"

---

## Data Flow Arrows

### Vertical Flow (Main Path)

1. **Developer → File Watcher**
   - From: Developer (Layer 1)
   - To: File Monitor (Layer 2)
   - Style: Solid arrow, #0f62fe, 2px
   - Label: "Edit & Save"

2. **File Watcher → Build Pipeline**
   - From: Event Emitter (Layer 2)
   - To: Build Orchestrator (Layer 3)
   - Style: Solid arrow, #1192e8, 2px
   - Label: "FileChangeEvent"

3. **Build Pipeline → Dev Server**
   - From: Build Cache (Layer 3)
   - To: HTTP Server (Layer 4)
   - Style: Solid arrow, #a56eff, 2px
   - Label: "BuildResult"

4. **Dev Server → WebSocket**
   - From: HMR Injector (Layer 4)
   - To: WS Server (Layer 5)
   - Style: Solid arrow, #24a148, 2px
   - Label: "Update Notification"

5. **WebSocket → Browser Client**
   - From: Message Router (Layer 5)
   - To: WS Client (Layer 6)
   - Style: Solid arrow, #fa4d56, 2px
   - Label: "BlockUpdateMessage"

6. **Browser Client → EDS Runtime**
   - From: Module Replacer (Layer 6)
   - To: Live Blocks (Layer 7)
   - Style: Solid arrow, #0f62fe, 2px
   - Label: "Apply HMR"

### Horizontal Flows (Within Layers)

#### Layer 2 Flow
- File Monitor → Change Filter → Debouncer → Event Emitter
- Style: Solid arrows, #1192e8, 1px

#### Layer 3 Flow
- Build Orchestrator → HTML/CSS/JS Transformers → Build Cache → Source Maps
- Style: Solid arrows, #a56eff, 1px

#### Layer 4 Flow
- HTTP Server → Middleware → Asset Server → HMR Injector
- Style: Solid arrows, #24a148, 1px

#### Layer 5 Flow
- WS Server → Message Router → Connection Manager → Heartbeat Monitor
- Style: Solid arrows, #fa4d56, 1px

#### Layer 6 Flow
- WS Client → State Manager → Module Replacer → CSS Updater → Error Overlay
- Style: Solid arrows, #0f62fe, 1px

#### Layer 7 Flow
- Block Registry → Decorate Functions → Live Blocks → Event Handlers
- Style: Solid arrows, #009d9a, 1px

### Feedback Loops

1. **Error Feedback**
   - From: Error Overlay (Layer 6)
   - To: Developer (Layer 1)
   - Style: Dashed arrow, #fa4d56, 2px
   - Label: "Error Display"

2. **State Feedback**
   - From: Event Handlers (Layer 7)
   - To: State Manager (Layer 6)
   - Style: Dashed arrow, #009d9a, 1px
   - Label: "User Interactions"

3. **Build Status**
   - From: Build Cache (Layer 3)
   - To: VS Code Extension (Layer 1)
   - Style: Dashed arrow, #a56eff, 1px
   - Label: "Build Status"

---

## Side Panel: Performance Metrics

**Position**: x=1880, y=80  
**Size**: 320 x 400  
**Style**:
- Border: #161616, 2px
- Fill: #ffffff
- Font: IBM Plex Sans, 12px

**Title**: "Performance Targets"

### Metrics Display:

```
⚡ Build Time
   Single block: <500ms
   10 blocks: <2s

🔄 HMR Latency
   Edit to preview: <1s
   WebSocket: <10ms

💾 Cache Performance
   Hit rate: >80%
   Memory: <200MB

🌐 Network
   WS messages: <1KB
   Compression: gzip

📊 Scalability
   Max blocks: 100+
   Concurrent devs: 10+
```

---

## Side Panel: Technology Stack

**Position**: x=1880, y=520  
**Size**: 320 x 400  
**Style**:
- Border: #161616, 2px
- Fill: #ffffff
- Font: IBM Plex Sans, 12px

**Title**: "Technology Stack"

### Stack Display:

```
🔧 Core Technologies
   • Vite 5.0.0
   • esbuild 0.19.0
   • Chokidar 3.5.3
   • PostCSS 8.4.0
   • Native WebSocket

📦 Dependencies
   • ws 8.14.0
   • autoprefixer 10.4.0
   • picomatch 2.3.1

🎨 Standards
   • ES2020
   • TypeScript 5.0
   • IBM Design System
```

---

## Legend

**Position**: x=80, y=1140  
**Size**: 400 x 200  
**Style**:
- Border: #878d96, 1px
- Fill: #f2f4f8

### Legend Items:

- **Solid Arrow**: Data flow
- **Dashed Arrow**: Feedback/Status
- **Rounded Rectangle**: Component
- **Ellipse**: Actor/User
- **Blue (#0f62fe)**: Primary components
- **Purple (#a56eff)**: Build/Transform
- **Green (#24a148)**: Server/Network
- **Red (#fa4d56)**: Communication
- **Teal (#009d9a)**: Runtime

---

## Notes Section

**Position**: x=520, y=1140  
**Size**: 720 x 200  
**Style**:
- Border: #878d96, 1px
- Fill: #ffffff

### Notes:

```
📝 Architecture Notes:

1. All components are loosely coupled via events
2. State preservation ensures zero data loss during updates
3. Error recovery happens at multiple levels
4. Caching is implemented at every layer
5. WebSocket provides bidirectional communication
6. Build pipeline is fully incremental
7. Browser client is framework-agnostic
```

---

## Footer

**Position**: x=80, y=1380  
**Size**: 1760 x 40  
**Style**:
- Font: IBM Plex Sans, 10px
- Color: #878d96
- Alignment: Center

**Text**: "EDS Live Editing System Architecture v1.0 | Last Updated: 2026-05-25 | IBM Bob"

---

## Color Palette Reference

### IBM Carbon Colors

- **Blue 60**: #0f62fe (Primary)
- **Blue 10**: #edf5ff (Light blue fill)
- **Purple 60**: #a56eff (Build/Transform)
- **Purple 10**: #f6f2ff (Light purple fill)
- **Green 60**: #24a148 (Server)
- **Green 10**: #defbe6 (Light green fill)
- **Red 50**: #fa4d56 (Communication)
- **Red 10**: #fff1f1 (Light red fill)
- **Teal 60**: #009d9a (Runtime)
- **Teal 10**: #d9fbfb (Light teal fill)
- **Gray 60**: #878d96 (Borders)
- **Gray 10**: #f2f4f8 (Background)
- **Gray 100**: #161616 (Text)

---

## Implementation Instructions

To create the actual DrawIO file:

1. Open draw.io or diagrams.net
2. Create new diagram with canvas size 1920x1600
3. Enable 8px grid
4. Create each layer as a container with the specified position and size
5. Add components within each layer
6. Connect components with arrows as specified
7. Add side panels for metrics and technology stack
8. Add legend and notes sections
9. Add footer
10. Save as `eds-live-editing-architecture.drawio`

**Note**: This diagram should be created in Code or Advanced mode since Plan mode can only edit Markdown files.