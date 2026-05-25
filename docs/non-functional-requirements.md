# Non-Functional Requirements Documentation

## Overview

Non-Functional Requirements (NFRs) describe **how** a system should perform rather than **what** it should do. They specify quality attributes, constraints, and system properties that affect user experience and system operation. NFRs are critical for system success but are often harder to define and measure than functional requirements.

## Entity Definition

**Type:** `sro:NonFunctionalRequirement`  
**Parent Class:** `sro:Requirement`  
**Identity Key:** `requirementId` (UUID)  
**Human Reference:** `requirementCode`

## Attributes

| Attribute | Type | Required | Description |
|-----------|------|----------|-------------|
| `requirementId` | string (UUID) | Yes | Unique identifier for the requirement |
| `requirementCode` | string | Yes | Human-readable code (e.g., NFR-001, NFR-PERF-001) |
| `name` | string | Yes | Short, descriptive name of the requirement |
| `description` | string | Yes | Detailed description of the quality attribute |
| `qualityAttribute` | enum | Yes | Type of quality attribute (see below) |
| `priority` | enum | Yes | MoSCoW priority: MUST, SHOULD, COULD, WONT |
| `status` | enum | Yes | Current state: DRAFT, APPROVED, IMPLEMENTED, VERIFIED, REJECTED |
| `measurementCriteria` | string | Yes | How the requirement will be measured |
| `targetValue` | string\|null | No | Specific target value or threshold |

## Quality Attributes

Non-functional requirements are categorized by quality attributes:

| Quality Attribute | Description | Example Metrics |
|-------------------|-------------|-----------------|
| **PERFORMANCE** | Speed, throughput, response time | Response time, TPS, latency |
| **SECURITY** | Protection, access control, compliance | Encryption strength, auth methods |
| **USABILITY** | User experience, ease of use | Task completion time, error rate |
| **RELIABILITY** | Availability, fault tolerance | Uptime %, MTBF, MTTR |
| **MAINTAINABILITY** | Code quality, documentation | Cyclomatic complexity, test coverage |
| **PORTABILITY** | Platform independence | Supported platforms, migration effort |
| **SCALABILITY** | Growth capacity | Concurrent users, data volume |

## Specialized NFR Types

The ontology includes specialized subtypes for common NFR categories:

- **[SecurityRequirement](./security-requirements.md)**: Security-specific NFRs with threat models and compliance
- **[PerformanceRequirement](./performance-requirements.md)**: Performance-specific NFRs with metrics and targets

## Priority Levels (MoSCoW)

- **MUST**: Critical quality attribute that must be satisfied
- **SHOULD**: Important quality attribute that should be achieved
- **COULD**: Desirable quality attribute if resources permit
- **WONT**: Quality attribute deferred to future releases

## Status Lifecycle

```
DRAFT → APPROVED → IMPLEMENTED → VERIFIED
                                    ↓
                                REJECTED
```

### State Descriptions

1. **DRAFT**: NFR is being defined and refined
2. **APPROVED**: NFR has been reviewed and approved
3. **IMPLEMENTED**: System has been designed/built to meet NFR
4. **VERIFIED**: NFR has been tested and confirmed through measurements
5. **REJECTED**: NFR has been rejected or deemed not feasible

## Invariants (Business Rules)

1. **Must specify measurable quality criteria**: The `measurementCriteria` must be quantifiable and testable
2. **qualityAttribute must be one of defined values**: Must use predefined quality attribute categories
3. **measurementCriteria must be quantifiable**: Must include specific metrics and measurement methods
4. **targetValue should be defined for verification**: Recommended to specify concrete targets for testing

## Relationships

### Incoming Relationships

| Operation | From Entity | Description |
|-----------|-------------|-------------|
| `VerifiedBy` | TestCase | Test cases that verify this NFR |
| `HasSource` | Stakeholder | Stakeholders who defined this NFR |
| `RealizedBy` | SystemComponent | Components that implement this NFR |

### Outgoing Relationships

| Operation | To Entity | Description |
|-----------|-----------|-------------|
| `Refines` | Goal | Goals that this NFR supports |
| `DependsOn` | Requirement | Other requirements this depends on |
| `ConflictsWith` | Requirement | Requirements that conflict with this NFR |
| `Impacts` | Requirement | Requirements affected by this NFR |

## Best Practices

### Writing Non-Functional Requirements

1. **Be Measurable**: Always include specific metrics
   - ❌ Bad: "The system should be fast"
   - ✅ Good: "The system shall respond to user requests within 2 seconds for 95% of requests under normal load"

2. **Define Conditions**: Specify under what conditions the NFR applies
   - ❌ Bad: "The system shall be available"
   - ✅ Good: "The system shall maintain 99.9% uptime during business hours (8 AM - 6 PM EST)"

3. **Use Quantifiable Metrics**: Include numbers, percentages, or ranges
   - ❌ Bad: "The system should be secure"
   - ✅ Good: "The system shall encrypt all data at rest using AES-256 encryption"

4. **Consider Trade-offs**: Acknowledge conflicts with other NFRs
   - Example: High security may impact performance; document acceptable trade-offs

### Measurement Criteria Guidelines

Measurement criteria should include:

1. **Metric**: What will be measured (e.g., response time, uptime)
2. **Method**: How it will be measured (e.g., load testing, monitoring tools)
3. **Threshold**: Acceptable values or ranges
4. **Conditions**: Under what circumstances (e.g., peak load, normal operation)

**Template:**
```
Measure [metric] using [method] under [conditions], 
ensuring [threshold] is met for [percentage] of cases
```

## Examples by Quality Attribute

### 1. PERFORMANCE

```json
{
  "requirementId": "550e8400-e29b-41d4-a716-446655440010",
  "requirementCode": "NFR-PERF-001",
  "name": "API Response Time",
  "description": "The system API shall respond to requests within acceptable time limits to ensure good user experience.",
  "qualityAttribute": "PERFORMANCE",
  "priority": "MUST",
  "status": "APPROVED",
  "measurementCriteria": "Measure API response time using automated performance testing tools under simulated load of 1000 concurrent users",
  "targetValue": "95th percentile response time < 2 seconds, 99th percentile < 5 seconds"
}
```

### 2. SECURITY

```json
{
  "requirementId": "550e8400-e29b-41d4-a716-446655440011",
  "requirementCode": "NFR-SEC-001",
  "name": "Data Encryption at Rest",
  "description": "All sensitive data stored in the database shall be encrypted to protect against unauthorized access in case of data breach.",
  "qualityAttribute": "SECURITY",
  "priority": "MUST",
  "status": "IMPLEMENTED",
  "measurementCriteria": "Verify encryption implementation through security audit and penetration testing, confirm AES-256 encryption is applied to all PII and financial data fields",
  "targetValue": "100% of sensitive data fields encrypted with AES-256 or stronger"
}
```

### 3. USABILITY

```json
{
  "requirementId": "550e8400-e29b-41d4-a716-446655440012",
  "requirementCode": "NFR-USAB-001",
  "name": "Task Completion Time",
  "description": "Users shall be able to complete common tasks efficiently without extensive training or documentation.",
  "qualityAttribute": "USABILITY",
  "priority": "SHOULD",
  "status": "VERIFIED",
  "measurementCriteria": "Conduct usability testing with 10 representative users performing 5 common tasks, measure time to completion and error rate",
  "targetValue": "Average task completion time < 3 minutes, error rate < 5% for trained users"
}
```

### 4. RELIABILITY

```json
{
  "requirementId": "550e8400-e29b-41d4-a716-446655440013",
  "requirementCode": "NFR-REL-001",
  "name": "System Uptime",
  "description": "The system shall maintain high availability to ensure business continuity and user access.",
  "qualityAttribute": "RELIABILITY",
  "priority": "MUST",
  "status": "IMPLEMENTED",
  "measurementCriteria": "Monitor system uptime using automated monitoring tools, calculate monthly uptime percentage excluding planned maintenance windows",
  "targetValue": "99.9% uptime (maximum 43.2 minutes downtime per month)"
}
```

### 5. MAINTAINABILITY

```json
{
  "requirementId": "550e8400-e29b-41d4-a716-446655440014",
  "requirementCode": "NFR-MAINT-001",
  "name": "Code Test Coverage",
  "description": "The codebase shall maintain high test coverage to ensure maintainability and reduce regression risks.",
  "qualityAttribute": "MAINTAINABILITY",
  "priority": "SHOULD",
  "status": "VERIFIED",
  "measurementCriteria": "Measure code coverage using automated testing tools (e.g., Jest, Coverage.py), calculate line and branch coverage percentages",
  "targetValue": "Minimum 80% line coverage, 70% branch coverage for all modules"
}
```

### 6. PORTABILITY

```json
{
  "requirementId": "550e8400-e29b-41d4-a716-446655440015",
  "requirementCode": "NFR-PORT-001",
  "name": "Browser Compatibility",
  "description": "The web application shall function correctly across all major modern browsers to maximize user accessibility.",
  "qualityAttribute": "PORTABILITY",
  "priority": "MUST",
  "status": "VERIFIED",
  "measurementCriteria": "Test all features on Chrome, Firefox, Safari, and Edge (latest 2 versions), verify functionality and visual consistency",
  "targetValue": "100% feature parity across Chrome, Firefox, Safari, Edge (latest 2 versions)"
}
```

### 7. SCALABILITY

```json
{
  "requirementId": "550e8400-e29b-41d4-a716-446655440016",
  "requirementCode": "NFR-SCAL-001",
  "name": "Concurrent User Capacity",
  "description": "The system shall scale to support growing user base without performance degradation.",
  "qualityAttribute": "SCALABILITY",
  "priority": "SHOULD",
  "status": "APPROVED",
  "measurementCriteria": "Conduct load testing with increasing concurrent users, measure response time degradation and resource utilization",
  "targetValue": "Support 10,000 concurrent users with < 10% response time degradation compared to 1,000 users"
}
```

## Quality Attribute Details

### PERFORMANCE

**Common Metrics:**
- Response time (average, median, 95th/99th percentile)
- Throughput (requests per second, transactions per second)
- Latency (network, database, API)
- Resource utilization (CPU, memory, disk I/O)

**Measurement Tools:**
- JMeter, Gatling, LoadRunner (load testing)
- New Relic, DataDog, Prometheus (monitoring)
- Chrome DevTools, Lighthouse (frontend performance)

### SECURITY

**Common Metrics:**
- Encryption strength (algorithm, key length)
- Authentication methods (MFA, SSO)
- Vulnerability count (by severity)
- Compliance score (OWASP, PCI-DSS, GDPR)

**Measurement Tools:**
- OWASP ZAP, Burp Suite (penetration testing)
- SonarQube, Snyk (static analysis)
- Qualys, Nessus (vulnerability scanning)

### USABILITY

**Common Metrics:**
- Task completion time
- Error rate
- User satisfaction score (SUS, NPS)
- Learning curve (time to proficiency)

**Measurement Tools:**
- UserTesting, Hotjar (user testing)
- Google Analytics (behavior tracking)
- SUS questionnaire (satisfaction)

### RELIABILITY

**Common Metrics:**
- Uptime percentage
- Mean Time Between Failures (MTBF)
- Mean Time To Recovery (MTTR)
- Error rate

**Measurement Tools:**
- Pingdom, UptimeRobot (uptime monitoring)
- PagerDuty, Opsgenie (incident management)
- ELK Stack, Splunk (log analysis)

### MAINTAINABILITY

**Common Metrics:**
- Code coverage (line, branch, function)
- Cyclomatic complexity
- Technical debt ratio
- Documentation coverage

**Measurement Tools:**
- SonarQube, CodeClimate (code quality)
- Jest, pytest, JUnit (test coverage)
- ESLint, Pylint (code standards)

### PORTABILITY

**Common Metrics:**
- Platform support (OS, browsers, devices)
- Migration effort (time, resources)
- Dependency count
- Configuration complexity

**Measurement Tools:**
- BrowserStack, Sauce Labs (cross-browser testing)
- Docker, Kubernetes (containerization)

### SCALABILITY

**Common Metrics:**
- Concurrent user capacity
- Data volume capacity
- Horizontal scaling factor
- Resource efficiency

**Measurement Tools:**
- Kubernetes (auto-scaling)
- AWS CloudWatch, Azure Monitor (cloud metrics)
- JMeter, Gatling (load testing)

## NFR Testing Strategies

### 1. Performance Testing

- **Load Testing**: Test under expected load
- **Stress Testing**: Test beyond expected load
- **Spike Testing**: Test sudden load increases
- **Endurance Testing**: Test sustained load over time

### 2. Security Testing

- **Penetration Testing**: Simulate attacks
- **Vulnerability Scanning**: Automated security checks
- **Code Review**: Manual security analysis
- **Compliance Audit**: Verify standards adherence

### 3. Usability Testing

- **User Testing**: Observe real users
- **A/B Testing**: Compare design alternatives
- **Heuristic Evaluation**: Expert review
- **Accessibility Testing**: WCAG compliance

### 4. Reliability Testing

- **Failover Testing**: Test backup systems
- **Recovery Testing**: Test disaster recovery
- **Chaos Engineering**: Inject failures
- **Monitoring**: Continuous uptime tracking

## Common NFR Conflicts

### Performance vs. Security

- **Conflict**: Encryption adds processing overhead
- **Resolution**: Use hardware acceleration, optimize algorithms
- **Trade-off**: Accept slight performance impact for critical data

### Usability vs. Security

- **Conflict**: Strong security (MFA) adds friction
- **Resolution**: Risk-based authentication, biometrics
- **Trade-off**: Balance security level with user convenience

### Scalability vs. Cost

- **Conflict**: Scaling infrastructure increases costs
- **Resolution**: Auto-scaling, serverless architecture
- **Trade-off**: Pay for capacity vs. risk of insufficient resources

### Maintainability vs. Performance

- **Conflict**: Abstraction layers reduce performance
- **Resolution**: Profile and optimize critical paths
- **Trade-off**: Accept minor performance cost for better code quality

## NFR Documentation Template

```markdown
## NFR-[CATEGORY]-[NUMBER]: [Name]

**Quality Attribute**: [PERFORMANCE|SECURITY|USABILITY|RELIABILITY|MAINTAINABILITY|PORTABILITY|SCALABILITY]

**Priority**: [MUST|SHOULD|COULD|WONT]

**Description**: 
[Detailed description of the quality requirement]

**Rationale**:
[Why this NFR is important]

**Measurement Criteria**:
- Metric: [What to measure]
- Method: [How to measure]
- Tools: [Measurement tools]
- Conditions: [Test conditions]

**Target Value**:
[Specific threshold or range]

**Verification Method**:
[How to verify compliance]

**Dependencies**:
- [Related requirements]

**Conflicts**:
- [Conflicting requirements and resolutions]
```

## Common Pitfalls

### 1. Vague Requirements

❌ **Wrong**: "The system should be fast and secure"

✅ **Correct**: 
- NFR-PERF-001: "API response time < 2s for 95% of requests under 1000 concurrent users"
- NFR-SEC-001: "All data at rest encrypted with AES-256"

### 2. Unmeasurable Requirements

❌ **Wrong**: "The system should be user-friendly"

✅ **Correct**: "Users shall complete checkout process in < 3 minutes with < 5% error rate (measured via usability testing with 10 users)"

### 3. Missing Context

❌ **Wrong**: "99.99% uptime required"

✅ **Correct**: "99.99% uptime during business hours (8 AM - 6 PM EST, Mon-Fri), excluding planned maintenance windows announced 48 hours in advance"

### 4. Ignoring Trade-offs

❌ **Wrong**: Specifying conflicting NFRs without resolution

✅ **Correct**: Document conflicts and agreed-upon trade-offs with stakeholder approval

## Verification Checklist

- [ ] Quality attribute is clearly specified
- [ ] Measurement criteria is quantifiable
- [ ] Target value is specific and testable
- [ ] Test conditions are defined
- [ ] Measurement tools are identified
- [ ] Priority is assigned using MoSCoW
- [ ] Dependencies are documented
- [ ] Conflicts are identified and resolved
- [ ] Stakeholders have approved the NFR
- [ ] Verification method is defined

## Related Documentation

- [Functional Requirements](./functional-requirements.md)
- [Security Requirements](./security-requirements.md)
- [Performance Requirements](./performance-requirements.md)
- [Test Cases](./test-cases.md)
- [Quality Attributes Guide](./quality-attributes.md)

## References

- ISO/IEC 25010:2011 - Systems and software Quality Requirements and Evaluation (SQuaRE)
- IEEE 830-1998 - IEEE Recommended Practice for Software Requirements Specifications
- FURPS+ Model (Functionality, Usability, Reliability, Performance, Supportability)
- ISO/IEC 9126 - Software Engineering — Product Quality (superseded by ISO 25010)
- NIST Cybersecurity Framework
- OWASP Top 10