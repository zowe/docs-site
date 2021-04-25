module.exports = {
  "getting-started": [
    //id of the sidebar
    {
      type: "category", // doc(default), 'link'(external links), 'ref'(link without sidebar)
      label: "Get Started",
      items: [
        {
          type: "category",
          label: "Zowe Fundamentals",
          items: [
            "getting-started/overview", //folder-name/filename
            "getting-started/zowe-architecture",
            "getting-started/freqaskques",
            {
              type: "category",
              label: "Introductions Parent",
              items: [
                "getting-started/doc2",
                "getting-started/introductions/doc1",
                {
                  type: "category",
                  label: "Introductions Child 1",
                  items: [
                    "getting-started/doc4",
                    {
                      type: "category",
                      label: "Introductions Child 2",
                      items: ["getting-started/doc7", "getting-started/doc8"],
                    },
                  ],
                },
              ],
            },
          ],
        },
        // 'getting-started/release-notes', //type: doc, id ='getting-started/release-notes
        {
          type: "doc",
          id: "getting-started/release-notes",
          customProps: {
            /* props */
            title: "Review Notes",
            sidebar_label: "Overview",
          },
        },
        {
          type: "category",
          label: "Zowe quick start",
          items: [
            "getting-started/zowe-getting-started",
            "getting-started/cli-getting-started",
          ],
        },
      ],
    },
  ],
  extending: [
    {
      type: "category",
      label: "Extending",
      items: ["extend/doc1"],
    },
  ],
  contributing: [
    {
      type: "category",
      label: "Contributing",
      items: [
        {
          type: "category",
          label: "Code Guidelines",
          items: [
            "contribute/guidelines-code/categories",
            "contribute/guidelines-code/general",
            "contribute/guidelines-code/code-and-patches",
            "contribute/guidelines-code/documentation",
          ],
        },
        {
          type: "category",
          label: "UI Guidelines",
          items: [
            "contribute/guidelines-ui/ui",
            "contribute/guidelines-ui/appicon",
            "contribute/guidelines-ui/colors",
            "contribute/guidelines-ui/grid",
            "contribute/guidelines-ui/icon",
            "contribute/guidelines-ui/typography",
          ],
        },
        "contribute/contributing",
      ],
    },
  ],
};

//items should be array of only strings, or array of object and strings
//the object should be 'string': array, not 'string': 'string'
