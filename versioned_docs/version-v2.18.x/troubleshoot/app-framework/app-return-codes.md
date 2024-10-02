# App-server Return Codes

If the app-server abnormally ends with a return code, this may originate from the app-server itself or from the programs involved in starting the server. [Return codes from the startup process are documented here](../servers/return-codes), while the app-server specific codes are listed below.

| Return code | Explanation |
|-------------|-------------|
| 2           | Generic cause, check logs for more information. |
| 3           | Insufficient authentication configuration. The server found no authentication plugins, or all of the plugins found failed to load, or no plugins were found for the specific default auth type requested, or the entire auth configuration was missing. More specific error messages will be found in the logs. |
| 4           | The server encountered an error when reading the PFX file requested in the HTTPS configuration. ZWED0070W in the logs will explain the error in more detail. |
| 5           | The server could not establish networking for one of several possible reasons, and a ZWED error message in the logs will explain the error in more detail. |
| 7           | The configuration requested loading a z/OS keyring when not running on z/OS. The error ZWED0145E is also logged. |
