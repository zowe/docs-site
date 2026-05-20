# Issue #2528: addition of ZOWE MSU/MIPS usage query to ZOWE FAQ.

**URL:** https://github.com/zowe/docs-site/issues/2528

**Created:** 2022-12-05T14:14:49Z

**Updated:** 2025-03-14T14:40:14Z

**Labels:** type: enhancement, status: review, area: zos-install-upgrade, release: V3, Size: L

---

## Validation Status: ❌ STILL OPEN

**Validation Date:** 2025-05-20

**Validator:** Mistral Vibe

**Findings:** The issue is NOT yet addressed. The Zowe FAQ does not contain information about MSU and MIPS consumption.

**Current State:**
- `docs/getting-started/zowe_faq.md` contains FAQs about Zowe but no MSU/MIPS information
- No search results for "MSU", "MIPS", "Processor Capacity Index", or "LSPR" in the documentation
- Customers frequently ask about MSU consumption for Zowe started task (as noted in the issue)

**Missing:** The requested FAQ entry with:
- Explanation of MSU and MIPS calculation formulas
- CP (number of processors), PCI (Processor Capacity Index), MSU, LSPR definitions
- Conversion formulas for CPU seconds to MSU, MIPS, and 4HRA MSU
- Example calculations

**Recommendation:** This issue remains valid. The FAQ should be enhanced with the MSU/MIPS usage information as described in the issue.

---

<!-- Thanks for deciding to open an issue! Before submitting, please fill in the following information. -->

<!-- See [How to contribute](https://docs.zowe.org/stable/contribute/contributing.html) for guidance on writing an actionable issue description. -->

## Is your request for enhancement related to a problem? Please describe.
<!-- A clear and concise description of what the problem is. e.g., I'm always frustrated when [I am using the search feature to search topics...] -->

Enhancement to ZOWE doc FAQs, As many customers inquired about MSU consumption for ZOWE.

## Describe the solution you'd like
<!-- A clear and concise description of what you want to happen.-->
Q: MSU and MIPS consumed by ZOWE started task?
A: Use the below formula to calculate MSU and MIPS.

_CP: the number of processors
PCI: Processor Capacity Index
MSU: the maximum MSU capacity for the machine 
LSPR: IBM Large System Programming Reference_ 

**Converting CPU seconds to MSU** 

MSUfactor = MSU/CP/3600

MSUs average over one hour= "MSUfactor * no. of CPU seconds per hour" used by the product.

**Converting CPU seconds to MIPS** 

For MIPS the PCI value is used from LSPR

MIPSfactor = PCI/CP/3600
MIPS average over one hour = "MIPSfactor * no. of CPU seconds per hour" 

**Converting CPU seconds to 4HRA MSU** 

4HRA_MSUFactor = MSU / CP / 3600 / 4
4HRA_MSUs average over one hour = "4HRA_MSUfactor * no. of CPU seconds average for 4 hrs" used by the product.

e.g. 
CP: the number of processors = 4
MSU: the maximum MSU capacity for the machine =727

4HRA_MSUFactor = 727 / 4/ 3600 / 4  = 0.01262
4HRA_MSUs average over one hour= 0.01262 * 70s = 0.88 MSUs

A system with a 70sec average of CPU time per 4 hours approx is consuming 0.88 MSUs per hour out of a total 727 MSU capacity.


## Related doc pages
<!-- https://docs.zowe.org/... -->
https://docs.zowe.org/stable/getting-started/zowe_faq

## Additional context
<!-- Add any other context or screenshots about the feature request here.-->

