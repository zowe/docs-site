# z/OSMF troubleshooting

The core command groups use the z/OSMF REST APIs, which can experience any number of problems.

If you encounter HTTP 500 errors with the CLI, consider gathering the following information:
- The IZU* (IZUSVR and IZUANG) joblogs (z/OSMF server)
- z/OSMF USS logs (default location: /global/zosmf/data/logs, but may change depending on installation)

If you encounter HTTP 401 errors with the CLI, consider gathering the following information:
- Any security violations for the TSO user in SYSLOG

## Alternate methods

At times, it may be beneficial to test z/OSMF outside of the CLI. You can use the CLI tool `curl` or a REST tool such as "Postman" to isolate areas where the problem might be occurring (CLI configuration, server-side, etc.).

Example `curl` command to `GET /zosmf/info`:
```
curl -k -H "Accept: application/json" -H "X-CSRF-ZOSMF-HEADER: true"  "https://zosmf.hostname.net:443/zosmf/info"
```
