# Information About The Modifications

Many changes should be marked with `MODIFICATION_FROM_THEME`.

Extra notes:

- `layouts/Layout.vue` is not changed, but we need to port it here to pick up changes of `../util`. For example `resolveSidebarItems` in `Layout.vue` should use the one customized in util.
- `styles/wrapper.styl` is not changed, but we need to port if here to fix `Page.vue` loading.
