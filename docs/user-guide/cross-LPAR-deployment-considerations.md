# Cross-LPAR deployment

This section provides information about additional steps to configure a cross-LPAR deployment. The steps in this section not in the standard single-LPAR installation.

## Checklist of prerequisites for cross-LPAR deployments

- Export the certificate authorities from the z/OSMF LPAR and import them into the Zowe LPAR's keyring (`ZOWEKeyring`). Ensure that the CA fingerprints match across LPARs. Include the procedure for comparing fingerprints using `CHKCERT CHAIN` and `RACDCERT CHKCERT`.

- Do not add the z/OSMF server's personal certificate to `ZOWEKeyring`. Add only the CA certificates with `USAGE(CERTAUTH)`.

- Create the user IDs that can access JES Explorer and MVS Explorer in the z/OSMF LPAR's security database, not only in the Zowe LPAR's database.

- Set `components.gateway.apiml.security.auth.provider` to `saf` when Zowe and z/OSMF run on LPARs with separate, unshared security databases.
:::note
The default value `zosmf` fails because z/OSMF cannot validate users that are only defined on the Zowe LPAR.
:::

- Set `components.gateway.apiml.security.auth.zosmf.jwtAutoconfiguration` to `ltpa`. 
:::note
The default `jwt` value requires z/OSMF to register itself in the Zowe API Mediation Layer's Eureka registry, which does not happen when z/OSMF runs on a separate LPAR.
:::

- Define the passticket configuration (`PTKTDATA` profile for `IZUDFLT`) on both LPARs with the identical session key. Authorize `ZWESVUSR` to generate passtickets on the Zowe LPAR so that JES and MVS Explorer can call z/OSMF on behalf of the logged-in user.

| Condition | Do this action  |
|-----------|-----------------|

| z/OSMF on same LPAR, shared security database | Standard installation; no special steps         |
| z/OSMF on different LPAR, shared DB (sysplex) | Add z/OSMF CA to ZOWEKeyring                        |
| z/OSMF on different LPAR, separate security DB| Use auth.provider=saf, jwtAutoconfiguration=        |
|                                               | ltpa, add z/OSMF CA (correct fingerprint),      |
|                                               | configure passtickets on both LPARs, create     |
|                                               | user IDs on z/OSMF LPAR                         |