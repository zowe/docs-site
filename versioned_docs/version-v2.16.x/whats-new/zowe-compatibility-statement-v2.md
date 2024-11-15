# Zowe conformance and release compatibility

## Backward compatibility

Zowe V1 conformant extensions/plug-ins are not guaranteed to be compatible with Zowe V2 and therefore may not be operable. In general, plug-ins/extensions which leverage V2 APIs that have known breaking changes are at high risk of incompatibility and unpredictable results.

:::tip Recommendation
All V1 extenders test with Zowe V2, identify any issues, and disclose results to consumers to clearly indicate backward compatibility status in the extension documentation. If unable to test, clearly document as such.
:::

## Forward compatibility

Zowe V2 conformant (planning to earn conformance) extensions/plug-ins are not guaranteed to be compatible with Zowe V1 LTS. In general, plug-ins/extensions with no known dependency on any newly introduced Zowe V1 functions are at minimum risk.

:::tip Recommendation
All V2 extenders test with Zowe V1 LTS, identify any issues, and disclose results to consumers to clearly indicate forward compatibility status in the extension documentation. If unable to test, clearly document as such.
:::

## Conformance compatibility

Zowe V1 conformant extensions/plug-ins are likely to require changes to meet Zowe V2 conformance criteria. All extensions (regardless of V1 conformance status) must apply for V2 conformance and satisfy all required V2 testing criteria. You can find the V2 Conformance Criteria [here](https://github.com/openmainframeproject/foundation/files/8489757/Zowe.Conformance.Program.-.Test.Evaluation.Guide.Table.pdf).

:::tip Recommendation
All extenders interested in earning V2 conformance review the V2 conformance criteria, determine if technical changes are necessary, make appropriate modifications, and prepare to apply for V2 conformance.
:::

## Need help?

For assistance with reviewing or completing the Zowe Conformance Zowe V2 application, reach out to members of the Zowe Onboarding Squad on Slack at https://slack.openmainframeproject.org in the **#zowe-onboarding** channel.
