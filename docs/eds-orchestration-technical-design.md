# EDS Block Generation Orchestration System - Technical Architecture Design

**Document Version**: 1.0  
**Last Updated**: 2026-05-25  
**Status**: Design Phase  
**Author**: IBM Bob Architecture Team

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture Overview](#2-system-architecture-overview)
3. [Architecture Layers](#3-architecture-layers)
4. [Core Components Design](#4-core-components-design)
5. [TypeScript Interface Definitions](#5-typescript-interface-definitions)
6. [Module Structure and Organization](#6-module-structure-and-organization)
7. [Configuration Schema](#7-configuration-schema)
8. [State Management Strategy](#8-state-management-strategy)
9. [Error Handling and Recovery](#9-error-handling-and-recovery)
10. [Integration Architecture](#10-integration-architecture)
11. [Component Interaction Flows](#11-component-interaction-flows)
12. [Validation Engine Architecture](#12-validation-engine-architecture)
13. [Deployment Pipeline Architecture](#13-deployment-pipeline-architecture)
14. [DrawIO Architecture Diagram](#14-drawio-architecture-diagram)
15. [Non-Functional Requirements](#15-non-functional-requirements)
16. [Implementation Roadmap](#16-implementation-roadmap)

---

## 1. Executive Summary

### 1.1 Purpose

This document provides a comprehensive technical architecture design for the **EDS Block Generation Orchestration System**, an autonomous AI-powered system where IBM Bob coordinates Context Studio, GitHub, XWalk boilerplate, AEM WKND components, and Edge Delivery Services to automatically generate deployable EDS blocks.

### 1.2 Key Objectives

- **Autonomous Operation**: Achieve >85% autonomous completion rate with minimal human intervention
- **Rapid Generation**: Average block generation time <5 minutes
- **High Success Rate**: First-time deployment success >90%
- **Intelligent Recovery**: Checkpoint-based recovery with auto-remediation
- **Enterprise-Ready**: Comprehensive audit trails, logging, and metrics

### 1.3 Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **State Persistence** | Local file system (`.bob/state/`) | Fast access, version control friendly, no external dependencies |
| **Execution Model** | Asynchronous event-driven | Non-blocking operations, better resource utilization, scalable |
| **Deployment Target** | VS Code extension + CLI | Developer-friendly, IDE integration, scriptable automation |
| **Context Studio Integration** | Query at start with caching | Fresh context per generation, reduced API calls during execution |
| **Language** | TypeScript | Type safety, excellent tooling, Node.js ecosystem |
| **Architecture Pattern** | Hexagonal (Ports & Adapters) | Testable, maintainable, swappable integrations |

---

## 2. System Architecture Overview

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     IBM Bob Orchestrator                         │
│                    (Central Coordinator)                         │
└────────────┬────────────────────────────────────────────────────┘
             │
    ┌────────┴────────┐
    │                 │
    ▼                 ▼
┌─────────┐      ┌─────────────┐
│ Context │      │ Prerequisite│
│ Studio  │      │  Discovery  │
│   API   │      │   Service   │
└─────────┘      └──────┬──────┘
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
    ┌────────┐    ┌─────────┐    ┌────────┐
    │ GitHub │    │  XWalk  │    │  WKND  │
    │  API   │    │ Analyzer│    │Analyzer│
    └────────┘    └─────────┘    └────────┘
         │              │              │
         └──────────────┼──────────────┘
                        ▼
                ┌───────────────┐
                │  EDS Block    │
                │  Generator    │
                └───────┬───────┘
                        │
         ┌──────────────┼──────────────┐
         ▼              ▼              ▼
    ┌────────┐    ┌─────────┐    ┌────────┐
    │Validate│    │  State  │    │  Log   │
    │ Engine │    │ Manager │    │ Service│
    └────────┘    └─────────┘    └────────┘
         │
         ▼
    ┌────────────┐
    │ Deployment │
    │  Pipeline  │
    └────────────┘
```

### 2.2 System Boundaries

**Internal Components** (Owned by this system):
- IBM Bob Orchestration Engine
- Prerequisite Discovery Service
- XWalk Integration Layer
- WKND Component Analyzer
- EDS Block Generator
- Validation Engine
- State Management
- Deployment Pipeline

**External Systems** (Integration points):
- Context Studio API
- GitHub API
- XWalk Boilerplate Repository
- AEM WKND Repository
- Edge Delivery Services

### 2.3 Design Principles

1. **Autonomous First**: Default to automatic decisions, escalate only when necessary
2. **Fail Fast**: Validate prerequisites early to avoid wasted effort
3. **Idempotent Operations**: All operations can be safely retried
4. **Observable**: Comprehensive logging and metrics at every step
5. **Recoverable**: Checkpoint-based state allows resume from any point
6. **Testable**: Clear interfaces enable unit and integration testing
7. **Extensible**: Plugin architecture for new block types and validators

---

## 3. Architecture Layers

### 3.1 Layer Diagram

```
┌─────────────────────────────────────────────────────────┐
│              Presentation Layer                          │
│  (VS Code Extension UI, CLI Interface)                   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│              Application Layer                           │
│  (Orchestration Logic, Workflow Management)              │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│              Domain Layer                                │
│  (Business Logic, Domain Models, Validation Rules)       │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│              Infrastructure Layer                        │
│  (External APIs, File System, State Persistence)         │
└─────────────────────────────────────────────────────────┘
```

### 3.2 Layer Responsibilities

#### 3.2.1 Presentation Layer
- **VS Code Extension**: Command palette integration, progress notifications, error dialogs
- **CLI Interface**: Command-line arguments, output formatting, interactive prompts
- **Responsibilities**: User input validation, output formatting, progress reporting

#### 3.2.2 Application Layer
- **Orchestration Engine**: Coordinates all services and manages workflow
- **Use Case Handlers**: Implements specific generation scenarios
- **Event Bus**: Publishes and subscribes to domain events
- **Responsibilities**: Workflow coordination, transaction boundaries, event handling

#### 3.2.3 Domain Layer
- **Domain Models**: Block, Component, Artifact, ValidationResult
- **Business Rules**: Validation logic, mapping rules, naming conventions
- **Domain Services**: Complex business logic that doesn't fit in entities
- **Responsibilities**: Core business logic, domain invariants, business rules

#### 3.2.4 Infrastructure Layer
- **Repositories**: Data access for state and configuration
- **External Adapters**: GitHub API, Context Studio API, File System
- **Logging**: Structured logging with correlation IDs
- **Responsibilities**: External system integration, data persistence, cross-cutting concerns

---

## 4. Core Components Design

### 4.1 IBM Bob Orchestration Engine

**Purpose**: Central coordinator that manages the entire block generation lifecycle.

**Key Responsibilities**:
- Coordinate all services and manage workflow execution
- Handle prerequisite discovery and validation
- Manage state transitions and checkpoints
- Implement retry logic and error recovery
- Emit events for observability

**Design Pattern**: Orchestrator pattern with event-driven architecture

**Key Methods**:
```typescript
class EDSBlockOrchestrator {
  async generateBlock(context: GenerationContext): Promise<GeneratedBlock>
  async validatePrerequisites(context: GenerationContext): Promise<PrerequisiteStatus>
  async recoverFromCheckpoint(checkpointId: string): Promise<void>
  async cancelGeneration(generationId: string): Promise<void>
}
```

**State Machine**:
```
INITIALIZING → DISCOVERING_PREREQUISITES → ANALYZING_WKND → 
MAPPING_COMPONENTS → GENERATING_ARTIFACTS → VALIDATING → 
DEPLOYING → COMPLETED | FAILED
```

### 4.2 Prerequisite Discovery Service

**Purpose**: Automatically discover and validate all prerequisites before generation.

**Discovery Targets**:
1. **GitHub Repository**: Access, structure, branches, workflows
2. **Authentication**: Tokens, credentials, permissions
3. **XWalk Boilerplate**: Templates, conventions, patterns
4. **WKND Components**: Available components, structure, dependencies
5. **Dependencies**: NPM packages, system requirements

**Discovery Strategy**:
```typescript
interface PrerequisiteDiscoveryService {
  async discoverGitHub(repoUrl: string): Promise<GitHubPrerequisites>
  async discoverAuthentication(): Promise<AuthPrerequisites>
  async discoverXWalk(source: string): Promise<XWalkPrerequisites>
  async discoverWKND(componentRef: string): Promise<WKNDPrerequisites>
  async discoverDependencies(): Promise<DependencyPrerequisites>
  async validateAll(prerequisites: AllPrerequisites): Promise<ValidationResult>
}
```

**Auto-Configuration**:
- Detect missing credentials and generate setup instructions
- Auto-install missing dependencies where possible
- Create required directory structures
- Configure Git hooks and workflows

### 4.3 XWalk Integration Layer

**Purpose**: Extract patterns and conventions from XWalk boilerplate.

**Key Capabilities**:
- Parse XWalk directory structure
- Extract naming conventions (kebab-case, file patterns)
- Identify reusable templates
- Map XWalk patterns to EDS requirements

**Pattern Extraction**:
```typescript
interface XWalkIntegrationLayer {
  async loadConventions(source: string): Promise<XWalkConventions>
  async extractTemplates(blockType: string): Promise<BlockTemplate[]>
  async analyzeExistingBlocks(): Promise<BlockPattern[]>
  async validateCompliance(artifacts: GeneratedArtifacts): Promise<ComplianceResult>
}
```

**Convention Mapping**:
- Block naming: `[block-name].{html,css,js}`
- Folder structure: `blocks/[block-name]/`
- CSS classes: `.block-name__element--modifier`
- JavaScript: `export default function decorate(block) { ... }`

### 4.4 WKND Component Analyzer

**Purpose**: Analyze AEM WKND components and extract reusable patterns.

**Analysis Capabilities**:
- Parse HTL templates
- Extract Sling Model logic
- Analyze CSS styling patterns
- Identify JavaScript behaviors
- Map dialog definitions to content properties

**Component Mapping**:
```typescript
interface WKNDComponentAnalyzer {
  async analyzeComponent(componentPath: string): Promise<WKNDComponent>
  async extractHTLStructure(htlFile: string): Promise<HTMLStructure>
  async extractStyling(cssFiles: string[]): Promise<StyleDefinition>
  async extractBehavior(jsFiles: string[]): Promise<BehaviorDefinition>
  async mapToEDSBlock(component: WKNDComponent): Promise<EDSBlockMapping>
}
```

**Transformation Rules**:
- HTL → Semantic HTML5
- AEM CSS → EDS CSS conventions
- Sling Models → Vanilla JavaScript
- Dialog definitions → Block configuration

### 4.5 EDS Block Generator

**Purpose**: Generate all artifacts required for a deployable EDS block.

**Generated Artifacts**:
1. **HTML**: Semantic structure with EDS conventions
2. **CSS**: Responsive styles with BEM-like naming
3. **JavaScript**: Decorate function and event handlers
4. **Configuration**: `block.json`, `manifest.json`
5. **Documentation**: `README.md` with usage examples
6. **Tests**: Unit and integration test scaffolding

**Generation Strategy**:
```typescript
interface EDSBlockGenerator {
  async generateHTML(mapping: EDSBlockMapping): Promise<string>
  async generateCSS(mapping: EDSBlockMapping): Promise<string>
  async generateJavaScript(mapping: EDSBlockMapping): Promise<string>
  async generateConfiguration(metadata: BlockMetadata): Promise<Configuration>
  async generateDocumentation(block: GeneratedBlock): Promise<string>
  async generateTests(block: GeneratedBlock): Promise<TestSuite>
  async packageArtifacts(artifacts: GeneratedArtifacts): Promise<DeploymentPackage>
}
```

**Template Engine**: Handlebars with custom helpers for EDS patterns

### 4.6 Validation Engine

**Purpose**: Multi-layer validation ensuring quality and compliance.

**Validation Layers** (executed in parallel where possible):

1. **XWalk Compliance**: Folder structure, naming conventions, required files
2. **EDS Compatibility**: HTML structure, CSS syntax, JavaScript ES6+
3. **WKND Alignment**: Feature parity, styling consistency, behavior equivalence
4. **Code Quality**: Linting (ESLint, Stylelint), accessibility (WCAG), performance
5. **Build Validation**: Successful compilation, no errors, asset optimization
6. **Dependency Validation**: Resolved dependencies, no vulnerabilities, license compliance

**Validation Architecture**:
```typescript
interface ValidationEngine {
  async validate(artifacts: GeneratedArtifacts): Promise<ValidationResult>
  async validateLayer(layer: ValidationLayer, artifacts: GeneratedArtifacts): Promise<LayerResult>
  async autoRemediate(issues: ValidationIssue[]): Promise<RemediationResult>
  async generateReport(result: ValidationResult): Promise<ValidationReport>
}
```

**Auto-Remediation Capabilities**:
- Fix HTML syntax errors
- Format CSS and JavaScript
- Add missing accessibility attributes
- Install missing dependencies
- Fix naming convention violations

### 4.7 Deployment Pipeline

**Purpose**: Deploy generated blocks to GitHub and EDS.

**Deployment Stages**:
1. **Pre-deployment**: Final validation, backup current state
2. **GitHub Operations**: Branch creation, commit, PR generation
3. **CI/CD Trigger**: Initiate automated tests and builds
4. **EDS Deployment**: Package upload, build trigger, validation
5. **Post-deployment**: Smoke tests, monitoring, rollback if needed

**Pipeline Architecture**:
```typescript
interface DeploymentPipeline {
  async deployToGitHub(artifacts: GeneratedArtifacts, config: GitHubConfig): Promise<GitHubDeployment>
  async deployToEDS(artifacts: GeneratedArtifacts, config: EDSConfig): Promise<EDSDeployment>
  async createPullRequest(deployment: GitHubDeployment): Promise<PullRequest>
  async monitorDeployment(deploymentId: string): Promise<DeploymentStatus>
  async rollback(deploymentId: string): Promise<RollbackResult>
}
```

### 4.8 State Management

**Purpose**: Track execution state and enable recovery.

**State Storage**: JSON files in `.bob/state/[generation-id]/`

**State Structure**:
```typescript
interface OrchestrationState {
  generationId: string
  status: OrchestrationStatus
  currentStep: string
  checkpoints: Checkpoint[]
  context: GenerationContext
  artifacts: GeneratedArtifacts | null
  validationResults: ValidationResult[]
  deploymentResults: DeploymentResult[]
  errors: Error[]
  startTime: Date
  endTime: Date | null
  metadata: Record<string, any>
}
```

**Checkpoint Strategy**:
- Checkpoint after each major step
- Store intermediate results
- Enable resume from any checkpoint
- Automatic cleanup of old states (configurable retention)

---

## 5. TypeScript Interface Definitions

### 5.1 Core Domain Types

```typescript
// ============================================================================
// Generation Context
// ============================================================================

interface GenerationContext {
  /** Unique identifier for this generation */
  generationId: string
  
  /** Project name */
  projectName: string
  
  /** WKND component reference (path or name) */
  componentReference: string
  
  /** XWalk boilerplate source */
  xwalkSource: string
  
  /** Repository configuration */
  repository: RepositoryConfig
  
  /** Deployment target */
  deploymentTarget: 'github' | 'eds' | 'both'
  
  /** Business context from Context Studio */
  businessContext?: ContextStudioMetadata
  
  /** User preferences */
  preferences?: UserPreferences
  
  /** Timestamp */
  createdAt: Date
}

interface RepositoryConfig {
  /** Repository URL or name */
  url: string
  
  /** Default branch */
  defaultBranch: string
  
  /** Target branch for deployment */
  targetBranch?: string
  
  /** GitHub token */
  token?: string
  
  /** Repository owner */
  owner: string
  
  /** Repository name */
  name: string
}

interface ContextStudioMetadata {
  /** Context ID */
  contextId: string
  
  /** Agent persona */
  agentPersona: string
  
  /** Business requirements */
  requirements: string[]
  
  /** Design patterns */
  patterns: string[]
  
  /** Constraints */
  constraints: string[]
}

interface UserPreferences {
  /** Auto-remediation enabled */
  autoRemediate: boolean
  
  /** Auto-deploy to GitHub */
  autoDeployGitHub: boolean
  
  /** Auto-deploy to EDS */
  autoDeployEDS: boolean
  
  /** Validation strictness */
  validationLevel: 'strict' | 'normal' | 'lenient'
  
  /** Retry attempts */
  maxRetries: number
}

// ============================================================================
// Prerequisites
// ============================================================================

interface PrerequisiteStatus {
  /** Overall status */
  status: 'valid' | 'invalid' | 'partial'
  
  /** GitHub prerequisites */
  github: GitHubPrerequisites
  
  /** Authentication prerequisites */
  auth: AuthPrerequisites
  
  /** XWalk prerequisites */
  xwalk: XWalkPrerequisites
  
  /** WKND prerequisites */
  wknd: WKNDPrerequisites
  
  /** Dependency prerequisites */
  dependencies: DependencyPrerequisites
  
  /** Issues found */
  issues: PrerequisiteIssue[]
  
  /** Auto-fix applied */
  autoFixApplied: boolean
}

interface GitHubPrerequisites {
  /** Repository accessible */
  accessible: boolean
  
  /** Has write permission */
  hasWritePermission: boolean
  
  /** Default branch */
  defaultBranch: string
  
  /** Existing workflows */
  workflows: string[]
  
  /** Repository structure */
  structure: RepositoryStructure
}

interface AuthPrerequisites {
  /** GitHub token available */
  githubToken: boolean
  
  /** Context Studio API key available */
  contextStudioApiKey: boolean
  
  /** AEM credentials available */
  aemCredentials: boolean
  
  /** EDS credentials available */
  edsCredentials: boolean
}

interface XWalkPrerequisites {
  /** XWalk source accessible */
  accessible: boolean
  
  /** Conventions file found */
  conventionsFound: boolean
  
  /** Available templates */
  templates: string[]
  
  /** Conventions */
  conventions: XWalkConventions
}

interface WKNDPrerequisites {
  /** Component found */
  componentFound: boolean
  
  /** Component path */
  componentPath: string
  
  /** Component type */
  componentType: string
  
  /** Dependencies */
  dependencies: string[]
}

interface DependencyPrerequisites {
  /** NPM dependencies */
  npm: NpmDependency[]
  
  /** System requirements */
  system: SystemRequirement[]
  
  /** All resolved */
  allResolved: boolean
}

interface PrerequisiteIssue {
  /** Issue type */
  type: 'missing' | 'invalid' | 'conflict'
  
  /** Severity */
  severity: 'error' | 'warning' | 'info'
  
  /** Description */
  description: string
  
  /** Suggested fix */
  suggestedFix?: string
  
  /** Auto-fixable */
  autoFixable: boolean
}

// ============================================================================
// WKND Component
// ============================================================================

interface WKNDComponent {
  /** Component name */
  name: string
  
  /** Component path */
  path: string
  
  /** Component type */
  type: 'hero' | 'card' | 'carousel' | 'teaser' | 'list' | 'custom'
  
  /** HTL structure */
  htlStructure: HTMLStructure
  
  /** Styling */
  styling: StyleDefinition
  
  /** Behavior */
  behavior: BehaviorDefinition
  
  /** Dialog definition */
  dialog: DialogDefinition
  
  /** Dependencies */
  dependencies: string[]
  
  /** Metadata */
  metadata: ComponentMetadata
}

interface HTMLStructure {
  /** Root element */
  rootElement: string
  
  /** Child elements */
  children: HTMLElement[]
  
  /** Data attributes */
  dataAttributes: Record<string, string>
  
  /** Semantic structure */
  semanticStructure: string
}

interface StyleDefinition {
  /** CSS classes */
  classes: string[]
  
  /** CSS rules */
  rules: CSSRule[]
  
  /** Responsive breakpoints */
  breakpoints: Breakpoint[]
  
  /** Variables */
  variables: Record<string, string>
}

interface BehaviorDefinition {
  /** Event handlers */
  eventHandlers: EventHandler[]
  
  /** Initialization logic */
  initialization: string
  
  /** Helper functions */
  helpers: FunctionDefinition[]
  
  /** Dependencies */
  dependencies: string[]
}

interface DialogDefinition {
  /** Fields */
  fields: DialogField[]
  
  /** Validation rules */
  validationRules: ValidationRule[]
  
  /** Default values */
  defaults: Record<string, any>
}

// ============================================================================
// EDS Block Mapping
// ============================================================================

interface EDSBlockMapping {
  /** Block name */
  blockName: string
  
  /** Source component */
  sourceComponent: WKNDComponent
  
  /** HTML mapping */
  htmlMapping: HTMLMapping
  
  /** CSS mapping */
  cssMapping: CSSMapping
  
  /** JavaScript mapping */
  jsMapping: JavaScriptMapping
  
  /** Configuration */
  configuration: BlockConfiguration
  
  /** Metadata */
  metadata: BlockMetadata
}

interface HTMLMapping {
  /** Template */
  template: string
  
  /** Element mappings */
  elementMappings: ElementMapping[]
  
  /** Attribute mappings */
  attributeMappings: AttributeMapping[]
}

interface CSSMapping {
  /** Class mappings */
  classMappings: ClassMapping[]
  
  /** Style transformations */
  transformations: StyleTransformation[]
  
  /** Responsive rules */
  responsiveRules: ResponsiveRule[]
}

interface JavaScriptMapping {
  /** Decorate function */
  decorateFunction: string
  
  /** Event handler mappings */
  eventHandlerMappings: EventHandlerMapping[]
  
  /** Helper function mappings */
  helperMappings: HelperMapping[]
}

interface BlockConfiguration {
  /** Block type */
  type: string
  
  /** Variants */
  variants: string[]
  
  /** Properties */
  properties: Record<string, any>
  
  /** Dependencies */
  dependencies: string[]
}

interface BlockMetadata {
  /** Author */
  author: string
  
  /** Version */
  version: string
  
  /** Description */
  description: string
  
  /** Tags */
  tags: string[]
  
  /** Source component */
  sourceComponent: string
  
  /** Created at */
  createdAt: Date
}

// ============================================================================
// Generated Artifacts
// ============================================================================

interface GeneratedArtifacts {
  /** Block name */
  blockName: string
  
  /** HTML content */
  html: string
  
  /** CSS content */
  css: string
  
  /** JavaScript content */
  javascript: string
  
  /** Configuration files */
  configuration: ConfigurationFiles
  
  /** Documentation */
  documentation: string
  
  /** Tests */
  tests: TestFiles
  
  /** Metadata */
  metadata: ArtifactMetadata
}

interface ConfigurationFiles {
  /** block.json */
  blockJson: string
  
  /** manifest.json */
  manifestJson: string
  
  /** package.json updates */
  packageJsonUpdates?: string
}

interface TestFiles {
  /** Unit tests */
  unitTests: string
  
  /** Integration tests */
  integrationTests: string
  
  /** Test configuration */
  testConfig: string
}

interface ArtifactMetadata {
  /** Generation ID */
  generationId: string
  
  /** Generated at */
  generatedAt: Date
  
  /** Generator version */
  generatorVersion: string
  
  /** File sizes */
  fileSizes: Record<string, number>
  
  /** Checksums */
  checksums: Record<string, string>
}

// ============================================================================
// Validation
// ============================================================================

interface ValidationResult {
  /** Overall status */
  status: 'passed' | 'failed' | 'warning'
  
  /** Layer results */
  layers: LayerResult[]
  
  /** Issues */
  issues: ValidationIssue[]
  
  /** Remediation applied */
  remediationApplied: boolean
  
  /** Execution time */
  executionTime: number
  
  /** Timestamp */
  timestamp: Date
}

interface LayerResult {
  /** Layer name */
  layer: ValidationLayer
  
  /** Status */
  status: 'passed' | 'failed' | 'warning'
  
  /** Issues */
  issues: ValidationIssue[]
  
  /** Execution time */
  executionTime: number
}

type ValidationLayer = 
  | 'xwalk_compliance'
  | 'eds_compatibility'
  | 'wknd_alignment'
  | 'code_quality'
  | 'build_validation'
  | 'dependency_validation'

interface ValidationIssue {
  /** Issue ID */
  id: string
  
  /** Layer */
  layer: ValidationLayer
  
  /** Severity */
  severity: 'error' | 'warning' | 'info'
  
  /** Message */
  message: string
  
  /** File */
  file?: string
  
  /** Line */
  line?: number
  
  /** Column */
  column?: number
  
  /** Rule */
  rule?: string
  
  /** Auto-fixable */
  autoFixable: boolean
  
  /** Suggested fix */
  suggestedFix?: string
}

// ============================================================================
// Deployment
// ============================================================================

interface DeploymentResult {
  /** Deployment ID */
  deploymentId: string
  
  /** Target */
  target: 'github' | 'eds'
  
  /** Status */
  status: 'success' | 'failed' | 'pending'
  
  /** GitHub deployment */
  github?: GitHubDeployment
  
  /** EDS deployment */
  eds?: EDSDeployment
  
  /** Errors */
  errors: Error[]
  
  /** Timestamp */
  timestamp: Date
}

interface GitHubDeployment {
  /** Branch name */
  branchName: string
  
  /** Commit SHA */
  commitSha: string
  
  /** Pull request */
  pullRequest: PullRequest
  
  /** CI/CD status */
  cicdStatus: CICDStatus
}

interface PullRequest {
  /** PR number */
  number: number
  
  /** PR URL */
  url: string
  
  /** Title */
  title: string
  
  /** Description */
  description: string
  
  /** Labels */
  labels: string[]
  
  /** Reviewers */
  reviewers: string[]
}

interface CICDStatus {
  /** Status */
  status: 'pending' | 'success' | 'failure'
  
  /** Checks */
  checks: CICDCheck[]
  
  /** Build URL */
  buildUrl?: string
}

interface CICDCheck {
  /** Check name */
  name: string
  
  /** Status */
  status: 'pending' | 'success' | 'failure'
  
  /** Details URL */
  detailsUrl?: string
}

interface EDSDeployment {
  /** Deployment URL */
  deploymentUrl: string
  
  /** Build ID */
  buildId: string
  
  /** Status */
  status: 'pending' | 'success' | 'failure'
  
  /** Smoke test results */
  smokeTests?: SmokeTestResult[]
}

interface SmokeTestResult {
  /** Test name */
  name: string
  
  /** Status */
  status: 'passed' | 'failed'
  
  /** Message */
  message?: string
}

// ============================================================================
// Generated Block (Final Output)
// ============================================================================

interface GeneratedBlock {
  /** Block name */
  blockName: string
  
  /** Artifacts */
  artifacts: GeneratedArtifacts
  
  /** Validation results */
  validation: ValidationResult
  
  /** Deployment results */
  deployment: DeploymentResult
  
  /** Metadata */
  metadata: BlockMetadata
  
  /** Generation summary */
  summary: GenerationSummary
}

interface GenerationSummary {
  /** Generation ID */
  generationId: string
  
  /** Status */
  status: 'completed' | 'failed' | 'partial'
  
  /** Start time */
  startTime: Date
  
  /** End time */
  endTime: Date
  
  /** Duration (ms) */
  duration: number
  
  /** Steps completed */
  stepsCompleted: string[]
  
  /** Autonomous completion */
  autonomousCompletion: boolean
  
  /** Manual interventions */
  manualInterventions: number
  
  /** Errors encountered */
  errorsEncountered: number
  
  /** Auto-fixes applied */
  autoFixesApplied: number
}

// ============================================================================
// Supporting Types
// ============================================================================

interface XWalkConventions {
  /** Naming patterns */
  namingPatterns: NamingPattern[]
  
  /** Folder structure */
  folderStructure: FolderStructure
  
  /** File patterns */
  filePatterns: FilePattern[]
  
  /** CSS conventions */
  cssConventions: CSSConvention[]
  
  /** JavaScript conventions */
  jsConventions: JSConvention[]
}

interface NamingPattern {
  /** Pattern type */
  type: 'block' | 'file' | 'class' | 'function'
  
  /** Pattern */
  pattern: string
  
  /** Example */
  example: string
}

interface FolderStructure {
  /** Root folder */
  root: string
  
  /** Subfolders */
  subfolders: string[]
  
  /** Required files */
  requiredFiles: string[]
}

interface FilePattern {
  /** File type */
  type: 'html' | 'css' | 'js' | 'json' | 'md'
  
  /** Pattern */
  pattern: string
  
  /** Required */
  required: boolean
}

interface CSSConvention {
  /** Convention type */
  type: 'naming' | 'structure' | 'formatting'
  
  /** Rule */
  rule: string
  
  /** Example */
  example: string
}

interface JSConvention {
  /** Convention type */
  type: 'naming' | 'structure' | 'formatting' | 'pattern'
  
  /** Rule */
  rule: string
  
  /** Example */
  example: string
}

interface RepositoryStructure {
  /** Root folders */
  rootFolders: string[]
  
  /** Has blocks folder */
  hasBlocksFolder: boolean
  
  /** Has tests folder */
  hasTestsFolder: boolean
  
  /** Has docs folder */
  hasDocsFolder: boolean
  
  /** Package.json exists */
  hasPackageJson: boolean
}

interface NpmDependency {
  /** Package name */
  name: string
  
  /** Version */
  version: string
  
  /** Required */
  required: boolean
  
  /** Installed */
  installed: boolean
}

interface SystemRequirement {
  /** Requirement type */
  type: 'node' | 'npm' | 'git' | 'other'
  
  /** Name */
  name: string
  
  /** Required version */
  requiredVersion: string
  
  /** Installed version */
  installedVersion?: string
  
  /** Met */
  met: boolean
}

interface ComponentMetadata {
  /** Author */
  author: string
  
  /** Version */
  version: string
  
  /** Description */
  description: string
  
  /** Tags */
  tags: string[]
  
  /** Last modified */
  lastModified: Date
}

interface HTMLElement {
  /** Tag name */
  tag: string
  
  /** Attributes */
  attributes: Record<string, string>
  
  /** Children */
  children: HTMLElement[]
  
  /** Text content */
  textContent?: string
}

interface CSSRule {
  /** Selector */
  selector: string
  
  /** Properties */
  properties: Record<string, string>
  
  /** Media query */
  mediaQuery?: string
}

interface Breakpoint {
  /** Name */
  name: string
  
  /** Min width */
  minWidth: number
  
  /** Max width */
  maxWidth?: number
}

interface EventHandler {
  /** Event type */
  eventType: string
  
  /** Target selector */
  targetSelector: string
  
  /** Handler function */
  handler: string
}

interface FunctionDefinition {
  /** Function name */
  name: string
  
  /** Parameters */
  parameters: string[]
  
  /** Return type */
  returnType: string
  
  /** Body */
  body: string
}

interface DialogField {
  /** Field name */
  name: string
  
  /** Field type */
  type: string
  
  /** Label */
  label: string
  
  /** Required */
  required: boolean
  
  /** Default value */
  defaultValue?: any
}

interface ValidationRule {
  /** Field */
  field: string
  
  /** Rule type */
  ruleType: string
  
  /** Parameters */
  parameters: Record<string, any>
}

interface ElementMapping {
  /** Source element */
  source: string
  
  /** Target element */
  target: string
  
  /** Transformation */
  transformation?: string
}

interface AttributeMapping {
  /** Source attribute */
  source: string
  
  /** Target attribute */
  target: string
  
  /** Transformation */
  transformation?: string
}

interface ClassMapping {
  /** Source class */
  source: string
  
  /** Target class */
  target: string
}

interface StyleTransformation {
  /** Property */
  property: string
  
  /** Transformation function */
  transformation: string
}

interface ResponsiveRule {
  /** Breakpoint */
  breakpoint: string
  
  /** Rules */
  rules: CSSRule[]
}

interface EventHandlerMapping {
  /** Source handler */
  source: string
  
  /** Target handler */
  target: string
  
  /** Transformation */
  transformation?: string
}

interface HelperMapping {
  /** Source helper */
  source: string
  
  /** Target helper */
  target: string
  
  /** Transformation */
  transformation?: string
}
```

---

## 6. Module Structure and Organization

### 6.1 Project Structure

```
eds-orchestration/
├── src/
│   ├── presentation/           # Presentation Layer
│   │   ├── cli/
│   │   │   ├── commands/
│   │   │   │   ├── generate.command.ts
│   │   │   │   ├── validate.command.ts
│   │   │   │   └── deploy.command.ts
│   │   │   ├── cli.ts
│   │   │   └── output-formatter.ts
│   │   └── vscode/
│   │       ├── extension.ts
│   │       ├── commands/
│   │       ├── views/
│   │       └── notifications.ts
│   │
│   ├── application/            # Application Layer
│   │   ├── orchestrator/
│   │   │   ├── eds-block-orchestrator.ts
│   │   │   ├── workflow-manager.ts
│   │   │   └── event-bus.ts
│   │   ├── use-cases/
│   │   │   ├── generate-block.use-case.ts
│   │   │   ├── validate-prerequisites.use-case.ts
│   │   │   └── deploy-block.use-case.ts
│   │   └── services/
│   │       ├── prerequisite-discovery.service.ts
│   │       ├── xwalk-integration.service.ts
│   │       ├── wknd-analyzer.service.ts
│   │       ├── block-generator.service.ts
│   │       ├── validation.service.ts
│   │       └── deployment.service.ts
│   │
│   ├── domain/                 # Domain Layer
│   │   ├── models/
│   │   │   ├── block.model.ts
│   │   │   ├── component.model.ts
│   │   │   ├── artifact.model.ts
│   │   │   └── validation-result.model.ts
│   │   ├── services/
│   │   │   ├── mapping.service.ts
│   │   │   ├── transformation.service.ts
│   │   │   └── remediation.service.ts
│   │   ├── rules/
│   │   │   ├── validation-rules.ts
│   │   │   ├── naming-rules.ts
│   │   │   └── mapping-rules.ts
│   │   └── events/
│   │       ├── generation-started.event.ts
│   │       ├── validation-completed.event.ts
│   │       └── deployment-completed.event.ts
│   │
│   ├── infrastructure/         # Infrastructure Layer
│   │   ├── adapters/
│   │   │   ├── github/
│   │   │   │   ├── github.adapter.ts
│   │   │   │   └── github.client.ts
│   │   │   ├── context-studio/
│   │   │   │   ├── context-studio.adapter.ts
│   │   │   │   └── context-studio.client.ts
│   │   │   ├── xwalk/
│   │   │   │   └── xwalk.adapter.ts
│   │   │   ├── wknd/
│   │   │   │   └── wknd.adapter.ts
│   │   │   └── eds/
│   │   │       └── eds.adapter.ts
│   │   ├── repositories/
│   │   │   ├── state.repository.ts
│   │   │   ├── config.repository.ts
│   │   │   └── cache.repository.ts
│   │   ├── file-system/
│   │   │   ├── file-system.service.ts
│   │   │   └── template-loader.ts
│   │   ├── logging/
│   │   │   ├── logger.ts
│   │   │   └── correlation-id.ts
│   │   └── metrics/
│   │       └── metrics.service.ts
│   │
│   ├── shared/                 # Shared utilities
│   │   ├── types/
│   │   │   └── index.ts        # All TypeScript interfaces
│   │   ├── constants/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── string.utils.ts
│   │   │   ├── file.utils.ts
│   │   │   └── validation.utils.ts
│   │   └── errors/
│   │       ├── base.error.ts
│   │       ├── prerequisite.error.ts
│   │       ├── validation.error.ts
│   │       └── deployment.error.ts
│   │
│   └── index.ts                # Main entry point
│
├── templates/                  # Generation templates
│   ├── html/
│   │   ├── hero.hbs
│   │   ├── card.hbs
│   │   └── carousel.hbs
│   ├── css/
│   │   ├── base.hbs
│   │   └── responsive.hbs
│   ├── javascript/
│   │   ├── decorate.hbs
│   │   └── helpers.hbs
│   └── docs/
│       └── readme.hbs
│
├── config/                     # Configuration files
│   ├── default.yml
│   ├── development.yml
│   └── production.yml
│
├── tests/                      # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .bob/                       # Bob configuration
│   ├── eds-orchestration.yml
│   ├── state/                  # State persistence
│   └── cache/                  # Cache storage
│
├── docs/                       # Documentation
│   └── eds-orchestration-technical-design.md
│
├── package.json
├── tsconfig.json
├── .eslintrc.js
└── README.md
```

### 6.2 Module Dependencies

```
presentation → application → domain ← infrastructure
                                ↑
                              shared
```

**Dependency Rules**:
- Presentation depends on Application
- Application depends on Domain
- Infrastructure depends on Domain
- Domain depends only on Shared
- Shared has no dependencies
- No circular dependencies allowed

### 6.3 Key Modules

#### 6.3.1 Orchestrator Module
```typescript
// src/application/orchestrator/eds-block-orchestrator.ts
export class EDSBlockOrchestrator {
  constructor(
    private readonly prerequisiteService: PrerequisiteDiscoveryService,
    private readonly wkndAnalyzer: WKNDComponentAnalyzer,
    private readonly xwalkIntegration: XWalkIntegrationLayer,
    private readonly blockGenerator: EDSBlockGenerator,
    private readonly validationEngine: ValidationEngine,
    private readonly deploymentPipeline: DeploymentPipeline,
    private readonly stateManager: StateManager,
    private readonly eventBus: EventBus,
    private readonly logger: Logger
  ) {}
  
  async generateBlock(context: GenerationContext): Promise<GeneratedBlock> {
    // Implementation
  }
}
```

#### 6.3.2 Service Modules
Each service follows the same pattern:
```typescript
// src/application/services/[service-name].service.ts
export class ServiceName {
  constructor(
    private readonly dependencies: Dependencies,
    private readonly logger: Logger
  ) {}
  
  async operation(params: Params): Promise<Result> {
    // Implementation
  }
}
```

#### 6.3.3 Adapter Modules
```typescript
// src/infrastructure/adapters/[system]/[system].adapter.ts
export class SystemAdapter implements SystemPort {
  constructor(
    private readonly client: SystemClient,
    private readonly logger: Logger
  ) {}
  
  async operation(params: Params): Promise<Result> {
    // Implementation
  }
}
```

---

## 7. Configuration Schema

### 7.1 Configuration File: `.bob/eds-orchestration.yml`

```yaml
# ============================================================================
# EDS Block Generation Orchestration Configuration
# ============================================================================

# Version of this configuration schema
version: "1.0"

# ============================================================================
# Orchestration Settings
# ============================================================================
orchestration:
  # Orchestration mode: autonomous, interactive, manual
  mode: autonomous
  
  # Number of retry attempts before escalation
  escalation_threshold: 3
  
  # Timeout for each step (in seconds)
  step_timeout: 300
  
  # Overall generation timeout (in seconds)
  generation_timeout: 600
  
  # Enable parallel execution where possible
  parallel_execution: true
  
  # Maximum concurrent operations
  max_concurrency: 5

# ============================================================================
# Prerequisite Discovery
# ============================================================================
prerequisites:
  # Automatically discover prerequisites
  auto_discover: true
  
  # Automatically configure discovered prerequisites
  auto_configure: true
  
  # Automatically remediate issues
  auto_remediate: true
  
  # Cache prerequisite discovery results (in seconds)
  cache_ttl: 3600
  
  # Required prerequisites (fail if missing)
  required:
    - github_access
    - xwalk_source
    - wknd_component
  
  # Optional prerequisites (warn if missing)
  optional:
    - context_studio_api
    - eds_credentials

# ============================================================================
# GitHub Integration
# ============================================================================
github:
  # Automatically create feature branch
  auto_create_branch: true
  
  # Automatically create pull request
  auto_create_pr: true
  
  # Branch naming prefix
  branch_prefix: "feature/add-"
  
  # Branch naming suffix
  branch_suffix: "-block"
  
  # Automatically merge PR (requires approval)
  pr_auto_merge: false
  
  # PR labels to apply
  pr_labels:
    - "eds-block"
    - "auto-generated"
    - "needs-review"
  
  # Request reviews from
  pr_reviewers: []
  
  # Commit message template
  commit_message_template: "feat: Add {blockName} EDS block\n\nGenerated from WKND {componentName} component\nGeneration ID: {generationId}"
  
  # PR title template
