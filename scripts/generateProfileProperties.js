const os = require("os");
const path = require("path");
const fs = require("fs");
const cp = require("child_process");

(async () => {
  // Get list of conformant plug-ins
  const allPlugins = {
    zowePlugins: [
      "@zowe/cics-for-zowe-cli",
      "@zowe/db2-for-zowe-cli",
      "@zowe/mq-for-zowe-cli",
      "@zowe/zos-ftp-for-zowe-cli"
    ],
    v3Conformant: [
      "@broadcom/dbm-db2-for-zowe-cli",
      "@broadcom/endevor-for-zowe-cli",
      "@broadcom/jclcheck-for-zowe-cli",
      "@broadcom/ops-for-zowe-cli",
      "@broadcom/mat-analyze-for-zowe-cli",
      "@broadcom/mat-detect-for-zowe-cli",
      "@broadcom/sysview-for-zowe-cli",
      "@broadcom/om-spool-for-zowe-cli",
      "@broadcom/om-view-for-zowe-cli",
      // "@ibm/rse-api-for-zowe-cli",
      // TODO: Make sure this list is accurate
    ],
    v2Conformant: [
      // "@zowe/ims-for-zowe-cli",
      "@broadcom/ca7-for-zowe-cli",
      // TODO: Make sure this list is accurate
    ]
  };

  // Install all conformant plug-ins
  // TODO: Skip already installed plugins
  // TODO: Decide on which version to use (latest v. zowe-vX-lts tag)
  // TODO: Show progress (and currently installed plug-ins)
  for (const plugin of allPlugins.zowePlugins) {
    console.log(`Installing ${plugin}...`);
    cp.execSync(`zowe plugins install ${plugin}`);
  }

  for (const plugin of allPlugins.v3Conformant) {
    console.log(`Installing ${plugin}...`);
    cp.execSync(`zowe plugins install ${plugin}`);
  }

  for (const plugin of allPlugins.v2Conformant) {
    console.log(`Installing ${plugin}...`);
    cp.execSync(`zowe plugins install ${plugin}`);
  }

  // Read schema definitions
  const schemaFile = require(path.join(os.homedir(), ".zowe", "zowe.schema.json"));
  const profiles = schemaFile.properties.profiles.patternProperties["^\\S*$"].allOf;

  console.log("Generating markdown...");
  const profileMap = new Map();
  for (const profile of profiles) {
    if (profile.if.properties.type !== false) {
      const profileType = profile.if.properties.type.const;

      // Create profile map
      profileMap.set(profileType, {});
      const profileProperties = profile.then.properties.properties.properties;

      for (const [property, value] of Object.entries(profileProperties)) {
        profileMap.get(profileType)[property] = {
          description: value.description,
        };
        if (value.default != null) {
          profileMap.get(profileType)[property].default = value.default;
        }
        if (value.enum != null) {
          profileMap.get(profileType)[property].allowed = value.enum;
        }
      }
    }
  }


  // Generate markdown from profile map
  const hackyWordWrap = (value) => {
    const MAX_WIDTH = 80;
      const words = value.replace(/\n\n/g, "\n").replaceAll("  ", "&nbsp;").replace(/\n/g, " \n ").split(" ");
      let line = "";
      let result = "";
      words.forEach((word) => {
        if (line.length + word.length + 1 > MAX_WIDTH || line.indexOf("\n") !== -1) {
          result += line + "\n";
          line = word;
        } else {
          if (line !== "") {
            line += " ";
          }
          line += word;
        }
      });
      result += line;
      return result;
  }
  const customFormat = (value) => {
    if (value == null) {
      return "n/a";
    }
    if (Array.isArray(value)) {
      return value.join("<br/>").replace(/\$/g, "\\\$");
    }
    if (typeof value === "object") {
      return hackyWordWrap(JSON.stringify(value).replace(/,/g, ",<br/>"));
    }
    if (typeof value === "string") {
      return hackyWordWrap(value).replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\n/g, "<br/>").replaceAll("<br/><br/>", "<br/>");
    }
    return value;
  };

  let mdOutput = "## Profiles\n"
  const sortedProfileMap = new Map(
    [...profileMap.entries()].sort(([a], [b]) => a.localeCompare(b))
  );
  sortedProfileMap.forEach((profile, profileType) => {
    mdOutput += `### ${profileType}\n\n| Property | Description | Default | Allowed |\n| --- | --- | --- | --- |\n`;
    for (const [key, value] of Object.entries(profile)) {
      mdOutput += `| ${key} | ${customFormat(value.description)} | ${customFormat(value.default)} | ${customFormat(value.allowed)} |\n`;
    }
    mdOutput += "\n\n";
  });

  console.log("Writing markdown: zowe-profiles.md...");
  fs.writeFileSync("zowe-profiles.md", mdOutput);
})();