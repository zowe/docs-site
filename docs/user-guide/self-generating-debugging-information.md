# Self-generating debugging information

:::info**Role:** system administrator
:::

As a system administrator, you can generate debugging information to troubleshoot problems, or to provide you with additional information to pass along to Zowe support. Enable the following properties to assist with debugging:

* **ZWE_configs_debug**  
This property can be used to unconditionally add active debug profiles.

For more information, see [Adding active profiles](https://docs.spring.io/spring-boot/docs/1.2.0.M1/reference/html/boot-features-profiles.html#boot-features-adding-active-profiles) in the Spring documentation.

* **ZWE_configs_sslDebug**  
This property can be used to enable the SSL debugging. This property can also assist with determining what exactly is happening at the SSL layer.

This property uses the `-Djavax.net.debug` Java parameter when starting the Gateway component. By setting `ZWE_configs_sslDebug` to `ssl`, all SSL debugging is turned on. The `ZWE_configs_sslDebug` parameter also accepts other values that can enable a different level of tracing. 

For more information, see the article **_Debugging Utilities_** in the IBM documentation.

:::note
This property can also be enabled for other API ML components.
:::