# Swizzled NavbarItem

**NOTE**: The following components were swizzled to support the use of both versioning and dropdowns together since Docusaurs by default doesn't support them and treat dropdown as list of static links because 2 versions may not contain the same doc and 2 different users may need 2 different behaviors for this kind of edge case.

Currently the dropdowns from each section are removed for easier maintenance of documentation.
But if in future, the dropdowns are planned to be used along side site versioning.

Follow these steps:

- Change the folder name from `SwizzledNavbarItem` to `NavbarItem` back. This will replace the default NavbarItem files.
- Add Navbar dropdowns items in `docusaurus.config.js`:

```
{
  to: "/folder_name/file_name",
  label: "User Guide",
  position: "left",
  items: [
   {
      label: "",
      to: "folder_name/file_name",
    },
    {
      label: "",
      to: "folder_name/file_name",
    },
  ],
},
```
