# App-server cluster behavior control

On the Zowe servers, the component "app-server" has an environment variable "ZLUX_NO_CLUSTER" which controls whether or not it uses cluster mode. Cluster mode is enabled by default.

When `ZLUX_NO_CLUSTER=1` as an environment variable, you **disable** cluster mode. Then you will lose the following benefits.

- Performance under high user count due to lack of redundant workers.
- Low-downtime when an unexpected exception occurs (only 1 interrupted request vs about 15 seconds downtime).

However, disabling the cluster mode can bring you an advantage: there is a limitation in node where it cannot handle a network interface going down. This leads to an infinite socket read loop until the process is canceled.

## To turn the cluster mode on

- In Zowe V1, do NOT have `ZLUX_NO_CLUSTER` in `instance.env`.
- In Zowe V2, do NOT have `zowe.environments.ZLUX_NO_CLUSTER `in `zowe.yaml`.

## To turn the cluster mode off

- In Zowe V1, make `ZLUX_NO_CLUSTER=1` in `instance.env`.
- In Zowe V2, make `zowe.environments.ZLUX_NO_CLUSTER=1`in `zowe.yaml`.

