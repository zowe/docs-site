# Zowe conformance and release compatibility

## Backward compatibility

Zowe V2 conformant extensions/plug-ins are not guaranteed to be compatible with Zowe V3 and therefore may not be operable. In general, plug-ins/extensions which leverage V3 APIs that have known breaking changes are at high risk of incompatibility and unpredictable results.

:::tip Recommendation
All V2 extenders test with Zowe V3, identify any issues, and disclose results to consumers to clearly indicate backward compatibility status in the extension documentation. Testing limitations should be clearly documented.
:::

## Forward compatibility

Zowe V3 conformant (planning to earn conformance) extensions/plug-ins are not guaranteed to be compatible with Zowe V2 LTS. In general, plug-ins/extensions with no known dependency on any newly introduced Zowe V2 functions are at minimum risk.

:::tip Recommendation
All V3 extenders test with Zowe V2 LTS, identify any issues, and disclose results to consumers to clearly indicate forward compatibility status in the extension documentation. Any testing limitations should be clearly documented.
:::

## Conformance compatibility

Zowe V2 conformant extensions/plug-ins are likely to require changes to meet Zowe V3 conformance criteria. All extensions (regardless of V2 conformance status) must apply for V3 conformance and satisfy all required V3 testing criteria. For more information about V3 Conformance Criteria, see the [Zowe Support Provider Conformance Guide](https://github.com/openmainframeproject/foundation/releases/download/zowe_conformant_zowe_v3_20240910/Zowe.Support.Provider.-.Test.Evaluation.Guide.Table.pdf).

:::tip Recommendation
Extenders interested in earning V3 conformance should review the V3 conformance criteria, determine if technical changes are necessary, make appropriate modifications, and then prepare to apply for V3 conformance.
:::

## Need help?

For assistance with reviewing or completing the Zowe Conformance Zowe V3 application, reach out to members of the Zowe Onboarding Squad on Slack at https://slack.openmainframeproject.org in the **#zowe-onboarding** channel.
