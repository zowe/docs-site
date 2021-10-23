# Troubleshooting Kubernetes Environments

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior installing and using Zowe™ containers in a Kubernetes environment.

## ISSUE: `/tmp` Directory Is Not Writable

**Problem**

We enabled `readOnlyRootFilesystem` SecurityContext by default in `Deployment` object definition. This will result in `/tmp` is readonly and not writable to `zowe` runtime user.

**Recommended fix:**

Adjust your component to check `TMPDIR` or `TMP` environment variable to determine location of the temporary directory. Zowe runtime customizes those variables and points them to `/home/zowe/instance/tmp` directory, which is writable.

**Alternative fix:**

Disabling `readOnlyRootFilesystem` SecurityContext is not recommended. But you can make `/tmp` writable by replacing it with a new mounted volume. Here is an example of defining `/tmp` volume.

```yaml
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      volumes:
        - name: tmp
          emptyDir: {}
        containers:
          - name: <my-component-name>
            volumeMounts:
              - name: tmp
                mountPath: "/tmp"
```

With this added to your `Deployment`, your component should be able to write to `/tmp` directory.


### ISSUE: `Permission denied` Showing In Pod Log

**Problem**

If you see error messages like in your pod log

```
cp: cannot create regular file '/home/zowe/instance/workspace/manifest.json': Permission denied
mkdir: cannot create directory '/home/zowe/instance/workspace/api-mediation': Permission denied
mkdir: cannot create directory '/home/zowe/instance/workspace/backups': Permission denied
cp: cannot create regular file '/home/zowe/instance/workspace/active_configuration.cfg': Permission denied
/home/zowe/runtime/bin/internal/prepare-instance.sh: line 236: /home/zowe/instance/workspace/active_configuration.cfg: Permission denied
/home/zowe/runtime/bin/internal/prepare-instance.sh: line 240: /home/zowe/instance/workspace/active_configuration.cfg: Permission denied
/home/zowe/runtime/bin/internal/prepare-instance.sh: line 241: /home/zowe/instance/workspace/active_configuration.cfg: Permission denied
```

, it means `zowe` user (UID `20000`) does not have write permission to your persistent volume. It's very likely the persistent volume is mounted as `root` user.

**Recommended fix:**

To solve this issue, you can modify workload files with extra `initContainers` step like this:

```yaml
apiVersion: apps/v1
kind: Deployment
spec:
  template:
    spec:
      initContainers:
        - name: update-workspace-permission
          image: busybox:1.28
          command: ['sh', '-c', 'OWNER=`stat -c "%u:%g" /home/zowe/instance/workspace` && echo "Owner of workspace is ${OWNER}" && if [ $OWNER != "20000:20000" ]; then chown -R 20000:20000 /home/zowe/instance/workspace; fi']
          volumeMounts:
            - name: zowe-workspace
              mountPath: "/home/zowe/instance/workspace"
          securityContext:
            runAsUser: 0
            runAsGroup: 0
```

### ISSUE: Deployment and ReplicaSet failed to create pod

**Problem**

If you are using OpenShift and see these error messages in `ReplicaSet` Events:

```
Generated from replicaset-controller
Error creating: pods "api-catalog-??????????-" is forbidden: unable to validate against any security context constraint: []
```

That means the Zowe ServiceAccount `zowe-sa` doesn't have any SecurityContextConstraint attached.

**Recommended fix:**

You can run this command to grant certain level of permission, for example `privileged`, to `zowe-sa` ServiceAccount:

```
oc admin policy add-scc-to-user privileged -z zowe-sa -n zowe
```

### ISSUE: Failed to create services

**Problem**

If you are using OpenShift and apply services, you may see this error:

```
The Service "api-catalog-service" is invalid: spec.ports[0].appProtocol: Forbidden: This field can be enabled with the ServiceAppProtocol feature gate
```

**Recommended fix:**

To fix this issue, you can simply find and comment out this line in the `Service` definition files:

```
      appProtocol: https
```

With OpenShift, we can define a `PassThrough` `Route` to let Zowe to handle TLS connections.
