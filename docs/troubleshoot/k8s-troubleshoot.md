# Troubleshooting Kuberentes Environments

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

## Launch Single Image On Local Computer Without Kubernetes

**NOTE: This is for debugging purposes only.**

### Init `tmp` Folder

- Create `tmp` folder:

```
mkdir -p tmp
cd tmp
```

- Init with `zowe-launch-scripts` image:

```
docker run -it --rm -v $(pwd):/home/zowe zowe-docker-release.jfrog.io/ompzowe/zowe-launch-scripts:1.24.0-ubuntu.staging
```

- Create `tmp/instance/instance.env` with your desired content. This content you can modify from `samples/config-cm.yaml`.
- Create `tmp/keystore/` and `tmp/keystore/zowe-certificates.env` with your desired content.
