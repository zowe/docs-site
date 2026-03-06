//to run: node scripts/commandproperties.js
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
      "@broadcom/ca7-for-zowe-cli",
      "@broadcom/dbm-db2-for-zowe-cli",
      "@broadcom/endevor-for-zowe-cli",
      "@broadcom/jclcheck-for-zowe-cli",
      "@broadcom/ops-for-zowe-cli",
      "@broadcom/mat-analyze-for-zowe-cli",
      "@broadcom/mat-detect-for-zowe-cli",
      "@broadcom/sysview-for-zowe-cli",
      "@broadcom/om-spool-for-zowe-cli",
      "@broadcom/om-view-for-zowe-cli",
      "@ibm/rse-api-for-zowe-cli",
      // TODO: Make sure this list is accurate
    ],
  };

  // Install all conformant plug-ins
  // TODO: Skip already installed plugins
  // TODO: Decide on which version to use (latest v. zowe-vX-lts tag)
  // TODO: Show progress (and currently installed plug-ins)
  const installPlugins = () => {
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
  };

  // Install all conformant plug-ins
  installPlugins();

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
          type: value.type,
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
  const prepWords = (value) => {
    return value.replaceAll("  ", "&nbsp;").replace(/\n/g, " \n ").replace(/{/g, "\\{").replace(/}/g, "\\}").replace(/\$/g, "\\\$");
    // return value.replace(/\n\n/g, "\n").replaceAll("  ", "&nbsp;").replace(/\n/g, " \n ").replace(/{/g, "\\{").replace(/}/g, "\\}").replace(/\$/g, "\\\$");
  };
  const customFormat = (value) => {
    if (value == null) {
      return "n/a";
    }
    if (Array.isArray(value)) {
      return prepWords(value.join("<br/>"));
    }
    if (typeof value === "object") {
      return prepWords(JSON.stringify(value, null, 8).replace(/\n/g, "<br/>"));
    }
    if (typeof value === "string") {
      return prepWords(value).replace(/\</g, "&lt;").replace(/\>/g, "&gt;").replace(/\n/g, "<br/>").replaceAll("<br/><br/>", "<br/>");
    }
    return value;
  };

  const getAllowed = (value) => {
    if (value.type === "boolean") {
      return `**${value.type}**:<br/> ${customFormat(["```true```", "```false```"])}`;
    }
    if (value.allowed != null) {
      return `**${value.type}**:<br/> ${customFormat(Array.isArray(value.allowed) ? value.allowed.map(v => "```" + v + "```") : value.allowed)}`;
    }
    return value.type;
  }

  const getDescription = (value) => {

    function normalizeDescription(description) {
      return description.replace(
        /(\n+\s*\n+)(\s*)((?:\b\w+(?:-\w+)*\b):)\s*(\n\s*)*/gi,
        (_match, _newlines, _spaces, label, _newline) => {
          return `\n\n${label}\n`;
          // return `\n\n${_spaces.length > 3 ? _spaces : ""}${label}\n`;
        }
      );
    }

    let description = customFormat(normalizeDescription(value.description));
    const defaultRegex = /(?:<br\s*\/>\s*<br\s*\/>\s*)?default value: (.*)$/i;
    const defaultMatch = description.match(defaultRegex);
    if (defaultMatch != null) {
      const defaultValue = defaultMatch[1].trim();
      description = description.replace(defaultRegex, "");
      description += `<br/><br/>**Default**: \`\`\`${defaultValue}\`\`\``;
    } else if (value.default != null) {
      const newDefault = customFormat(value.default);
      if (newDefault.length > 100 || value.type === "array" || value.type === "object") {
        description += `<br/><br/><details><summary>**Default**:</summary><br/>${newDefault}</details>`;
      } else {
        description += `<br/><br/>**Default**: \`\`\`${value.default}\`\`\``;
      }
    }
    return description;
  }

  let mdOutput = "## Profiles\n"
  const sortedProfileMap = new Map(
    [...profileMap.entries()].sort(([a], [b]) => a.localeCompare(b))
  );
  sortedProfileMap.forEach((profile, profileType) => {
    mdOutput += `### ${profileType}\n\n| Property | Description | Allowed |\n| --- | --- | --- |\n`;
    for (const [key, value] of Object.entries(profile)) {
      mdOutput += `| ${key} | ${getDescription(value)} | ${getAllowed(value)} |\n`;
    }
    mdOutput += "\n\n";
  });

  console.log("Writing markdown: zowe-profiles.md...");
  fs.writeFileSync("zowe-profiles.md", mdOutput);
})();