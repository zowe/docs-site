# Managing Cluster Mode for app-server

On the Zowe servers, the component app-server has an environment variable `ZLUX_NO_CLUSTER` which controls whether or not it uses cluster mode. Cluster mode is enabled by default. However, you might need to disable cluster mode under certain circumstances. When cluster mode is disabled, make sure you are aware of the potential drawbacks and benefit.

When you **disable** cluster mode, you lose the following benefits:

1. **Performance under high user Count:** This is due to the absence of redundant workers, which can impact the system's efficiency when dealing with a large number of users.

2. **Reduced downtime during unexpected exceptions:** The low-downtime characteristic, where only one request is interrupted compared to around 15 seconds of downtime, is compromised.

## To turn the cluster mode on

- Do NOT include the `zowe.environments.ZLUX_NO_CLUSTER `in the `zowe.yaml` file.

## To turn the cluster mode off

- Include `zowe.environments.ZLUX_NO_CLUSTER=1` in the `zowe.yaml` file.

