# Installing Zowe CLI with Node.js 16 on Windows

 there are 3 workarounds to be documented, listed below in their preferred order:

- Configure NPM proxy so that it can access the public NPM registry (npmjs.org). Then the install from TGZ should succeed. To configure an NPM proxy:
    - If your proxy is HTTP: npm config set proxy <proxyUrl>
    - If your proxy is HTTPS: npm config set https-proxy <proxyUrl>
- Install CLI from an online registry instead of TGZ (the other installation method that we already document). This may also require configuring an NPM proxy.
- Downgrade NPM to v6 which may not be ideal, but it still receives security updates. To downgrade from a newer version of NPM: npm install -g npm@6.x