# Troubleshooting Kubernetes environments

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior installing and using Zowe™ containers in a Kubernetes environment.

### ISSUE: Deployment and ReplicaSet failed to create pod

**Problem:**

If you are using OpenShift and see these error messages in `ReplicaSet` Events:

```
Generated from replicaset-controller
Error creating: pods "api-catalog-??????????-" is forbidden: unable to validate against any security context constraint: []
```

That means the Zowe ServiceAccount `zowe-sa` doesn't have any SecurityContextConstraint attached.

**Solution:**

You can run this command to grant a certain level of permission, for example, `privileged`, to `zowe-sa` ServiceAccount:

```
oc admin policy add-scc-to-user privileged -z zowe-sa -n zowe
```

### ISSUE: Failed to create services

**Problem:**

If you are using OpenShift and apply services, you may see this error:

```
The Service "api-catalog-service" is invalid: spec.ports[0].appProtocol: Forbidden: This field can be enabled with the ServiceAppProtocol feature gate
```

**Solution:**

To fix this issue, you can simply find and comment out this line in the `Service` definition files:

```
appProtocol: https
```

With OpenShift, you can define a `PassThrough` `Route` to let Zowe handle TLS connections.
