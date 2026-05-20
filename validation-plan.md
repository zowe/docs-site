# Issue Validation Plan for docs-site Repository

## Overview

This plan outlines a structured approach to validate the **224 open issues** in the docs-site repository. The goal is to distribute validation work among multiple team members who have access to the docs-site repository only.

## Current Issue Distribution

### By Area (Primary Categories)
| Area | Count | % of Total |
|------|-------|------------|
| apiml | 52 | 23.2% |
| install and config | 34 | 15.2% |
| cli | 22 | 9.8% |
| webui | 14 | 6.2% |
| zwe | 10 | 4.5% |
| Zowe App Framework | 9 | 4.0% |
| zos-install-upgrade | 7 | 3.1% |
| docs | 7 | 3.1% |
| site-infrastructure | 6 | 2.7% |
| zowe-explorer | 4 | 1.8% |
| onboarding | 4 | 1.8% |
| misc | 4 | 1.8% |

### By Type
| Type | Count |
|------|-------|
| enhancement | 24 |
| bug | 8 |
| troubleshoot | 2 |

### By Size
| Size | Count |
|------|-------|
| M | 31 |
| L | 27 |
| S | 20 |

### By Release
| Release | Count |
|---------|-------|
| V3 | 45 |
| V2 | 5 |

---

## Validation Goals

1. **Verify Issue Relevance**: Confirm each issue is still valid and applicable to the current docs-site state
2. **Assess Priority**: Evaluate if the issue priority (Size, Release) is still accurate
3. **Categorize**: Ensure proper labeling (area, type, size, release)
4. **Identify Duplicates**: Find and flag duplicate or overlapping issues
5. **Check for Completion**: Identify issues that may already be resolved but not closed
6. **Gather Context**: Document any additional context needed for resolution

---

## Validation Workflow

### Phase 1: Preparation (Lead Validator - 1 person)

**Duration**: 1-2 days

1. **Create Tracking Spreadsheet**
   - Google Sheet or shared CSV with columns:
     - Issue #
     - Title
     - URL
     - Current Labels (area, type, size, release)
     - Assigned Validator
     - Validation Status (Not Started / In Progress / Completed)
     - Validation Notes
     - Recommended Action (Keep / Close / Modify / Needs Info)
     - Priority (Low / Medium / High)

2. **Distribute Issues**
   - Assign issues to validators based on expertise areas
   - Aim for balanced workload (~20-25 issues per person)

3. **Set Up Validation Template**
   - Create a standard format for validation notes

### Phase 2: Individual Validation (All Validators - Parallel)

**Duration**: 5-7 days

Each validator is responsible for their assigned issues. For each issue:

#### Validation Checklist

- [ ] **Read the full issue** - Understand the problem/feature request
- [ ] **Check current docs-site state**
  - Search the codebase for related content
  - Check if the issue has already been addressed
  - Verify if the issue is still relevant
- [ ] **Validate labels**
  - `area`: Does it match the correct component?
  - `type`: Is it correctly classified as enhancement/bug/troubleshoot?
  - `size`: Does S/M/L accurately reflect the effort?
  - `release`: Is the target release still valid?
- [ ] **Assess dependencies**
  - Does this depend on other issues or repos?
  - Are there blocking issues?
- [ ] **Document findings**
  - Note any inconsistencies
  - Flag if issue should be closed
  - Suggest label modifications if needed

#### Validation Actions

Each issue should be categorized into one of these actions:

| Action | Description | Example |
|--------|-------------|---------|
| **Keep As-Is** | Issue is valid, properly labeled, still relevant | Most current enhancement requests |
| **Close** | Issue is resolved, duplicate, or no longer relevant | Fixed in a recent PR, superseded by another issue |
| **Modify Labels** | Labels need updating | Size changed, area incorrect |
| **Needs Info** | Requires clarification from reporter or maintainer | Unclear requirements, missing context |
| **Split** | Issue contains multiple distinct items | One issue covering 3 different features |
| **Defer** | Valid but low priority, move to backlog | V2 issues when V3 is current |

### Phase 3: Review & Consolidation (Lead Validator + Reviewers)

**Duration**: 2-3 days

1. **Collect all validations**
2. **Identify conflicts** - Where validators disagreed on an issue
3. **Review "Close" recommendations** - Verify issues can actually be closed
4. **Consolidate duplicate flagging** - Merge overlapping issues
5. **Finalize recommendations**

### Phase 4: Action & Reporting

**Duration**: 1-2 days

1. **Execute validated actions**
   - Close issues marked for closure (with comments)
   - Update labels on issues needing modification
   - Request information on "Needs Info" issues
   - Create new issues for "Split" recommendations

2. **Generate report**
   - Summary statistics
   - Issues closed
   - Labels updated
   - High priority issues identified
   - Recommendations for next steps

---

## Team Assignment Strategy

### Option A: By Area of Expertise (Recommended)

Assign validators to issues based on their domain knowledge:

| Validator | Primary Area | Secondary Area | Issues Assigned |
|-----------|--------------|----------------|-----------------|
| Validator 1 | apiml | cli | ~50 issues |
| Validator 2 | install and config | zos-install-upgrade | ~40 issues |
| Validator 3 | webui | zwe, zowe-explorer | ~25 issues |
| Validator 4 | site-infrastructure | docs, misc | ~20 issues |
| Validator 5 | General | All areas | Remaining issues |

### Option B: Round-Robin Distribution

Distribute issues evenly regardless of area:
- 224 issues / 5 validators = ~45 issues each
- Each validator gets a mix of all areas
- Good for cross-training, but may require more research per issue

### Option C: By Size

Assign based on issue complexity:
- Senior validators: L and M issues
- Junior validators: S issues
- Ensures appropriate expertise for complex issues

---

## Validation Criteria by Label

### Area-Specific Guidelines

#### apiml (52 issues)
- Check if related to API Mediation Layer documentation
- Verify against current apiml docs in `docs/extend/api-mediation/`
- Many may be outdated due to architecture changes

#### install and config / zos-install-upgrade (41 total)
- Check installation documentation in `docs/getting-started/`
- Verify against current zowe-install-packaging repo state
- Look for duplicates between these two areas

#### cli (22 issues)
- Verify against CLI documentation
- Check if issues reference correct CLI version
- Many may be resolved by recent CLI updates

#### webui (14 issues)
- Focus on Zowe Explorer and web-based components
- Check `docs/user-guide/` for existing documentation

#### docs (7 issues)
- Meta-issues about documentation itself
- Verify if documentation improvements have been made
- Check for issues that can be closed by recent docs updates

#### site-infrastructure (6 issues)
- Issues about the docs site build, deployment, tooling
- Verify against current docusaurus.config.js and scripts/

### Type-Specific Guidelines

#### Enhancement (24 issues)
- Validate that the enhancement is still desired
- Check if it has been implemented but not documented
- Assess if it aligns with current roadmap

#### Bug (8 issues)
- Verify if the bug still exists
- Check if it affects current release
- Prioritize based on impact

#### Troubleshoot (2 issues)
- Verify if the troubleshooting tip is still relevant
- Check if it's already documented in `docs/troubleshoot/`

### Size Guidelines

Use this matrix to validate Size labels:

| Size | Expected Effort | Characteristics |
|------|----------------|----------------|
| S | < 2 hours | Minor doc update, typo fix, small clarification |
| M | 2-8 hours | New section, multiple page updates, moderate feature docs |
| L | > 8 hours | New major feature documentation, architecture changes, multi-repo coordination |

---

## Quality Assurance Checklist

Before finalizing validation:

- [ ] Every issue has been reviewed by at least one validator
- [ ] All "Close" recommendations have been verified
- [ ] Duplicate issues have been identified and consolidated
- [ ] Labels are consistent across similar issues
- [ ] High priority issues are clearly marked
- [ ] Dependencies between issues are documented
- [ ] A summary report is prepared

---

## Tools & Resources

### Available Tools
- **GitHub Issues**: Primary source for all issues
- **docs-site repository**: For verifying current state
- **Shared Spreadsheet**: For tracking validation progress
- **Slack #zowe-doc**: For questions and collaboration

### Query Templates for GitHub

```
# Find issues in a specific area
label:area/apiml is:open

# Find issues by size
label:Size/L is:open

# Find issues by release
label:release/V3 is:open

# Find issues needing triage
no:label is:open
```

### Documentation Locations
- Main docs: `docs/`
- Versioned docs: `versioned_docs/`
- API definitions: `api_definitions/`
- Configuration: `docusaurus.config.js`, `sidebars.js`

---

## Timeline

| Phase | Duration | Owner |
|-------|----------|-------|
| Preparation | 1-2 days | Lead Validator |
| Individual Validation | 5-7 days | All Validators |
| Review & Consolidation | 2-3 days | Lead + Reviewers |
| Action & Reporting | 1-2 days | Lead Validator |
| **Total** | **9-14 days** | |

---

## Success Metrics

1. **Completion Rate**: 100% of issues validated
2. **Closure Rate**: Target 15-20% of issues closed (resolved/duplicate)
3. **Label Accuracy**: All issues have correct area/type/size/release labels
4. **Duplicate Reduction**: Identify and consolidate overlapping issues
5. **Priority Clarity**: Clear understanding of high-priority issues

---

## Next Steps

1. [ ] Lead validator creates tracking spreadsheet
2. [ ] Issues are assigned to validators
3. [ ] Validators complete individual reviews
4. [ ] Consolidation meeting scheduled
5. [ ] Actions executed on validated issues
6. [ ] Final report generated and shared

---

## Appendix: Issue Number Ranges by Area

For quick reference when distributing:

- **apiml**: Issues spread across all ranges
- **cli**: Issues spread across all ranges  
- **install and config**: Issues spread across all ranges
- **webui**: Issues spread across all ranges

*Note: All 224 issues are in the docs-site-issues folder with their full content available for validation.*
