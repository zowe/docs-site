# Troubleshooting Kubernetes environments

The following topics contain information that can help you troubleshoot problems when you encounter unexpected behavior installing and using Zowe™ containers in a Kubernetes environment.

## ISSUE: `/tmp` directory is not writable

**Problem:**

`readOnlyRootFilesystem` SecurityContext is enabled by default in `Deployment` object definition. As a result, `/tmp` is read-only and not writable to `zowe` runtime user.

**Recommended solution:**

Adjust your component to check the `TMPDIR` or `TMP` environment variable to determine the location of the temporary directory. Zowe runtime customizes those variables and points them to `/home/zowe/instance/tmp` directory, which is writable.

**Alternative solution:**

Disabling `readOnlyRootFilesystem` SecurityContext is not recommended. But you can make `/tmp` writable by replacing it with a newly mounted volume. Here is an example of defining the `/tmp` volume.

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

### ISSUE: `Permission denied` showing in pod log

**Problem:**

You see error messages similar to the following one in your pod log.

```
cp: cannot create regular file '/home/zowe/instance/workspace/manifest.json': Permission denied
mkdir: cannot create directory '/home/zowe/instance/workspace/api-mediation': Permission denied
mkdir: cannot create directory '/home/zowe/instance/workspace/backups': Permission denied
cp: cannot create regular file '/home/zowe/instance/workspace/active_configuration.cfg': Permission denied
/home/zowe/runtime/bin/internal/prepare-instance.sh: line 236: /home/zowe/instance/workspace/active_configuration.cfg: Permission denied
/home/zowe/runtime/bin/internal/prepare-instance.sh: line 240: /home/zowe/instance/workspace/active_configuration.cfg: Permission denied
/home/zowe/runtime/bin/internal/prepare-instance.sh: line 241: /home/zowe/instance/workspace/active_configuration.cfg: Permission denied
```

It means `zowe` user (UID `20000`) does not have write permission to your persistent volume. It's very likely the persistent volume is mounted as `root` user.

**Solution:**

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
          command: ['sh', '-c', 'OWNER=`stat -c "%u:%g" /home/zowe/instance/workspace` && PERMISSION=`stat -c "%a" /home/zowe/instance/workspace` && echo "Zowe workspace owner is ${OWNER} with ${PERMISSION} permission" && if [ "${OWNER}" != "20000:20000" -a "${PERMISSION}" != "777" ]; then chown -R 20000:20000 /home/zowe/instance/workspace; fi']
          imagePullPolicy: Always
          resources:
            requests:
              memory: "64Mi"
              cpu: "10m"
            limits:
              memory: "128Mi"
              cpu: "100m"
          volumeMounts:
            - name: zowe-workspace
              mountPath: "/home/zowe/instance/workspace"
          securityContext:
            readOnlyRootFilesystem: true
            allowPrivilegeEscalation: false
            capabilities:
              drop:
                - all
              add:
                - CHOWN
            runAsUser: 0
            runAsGroup: 0
```

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
