# UI design guidelines

This style guide is the visual language that represents Zowe&trade;. It is a living document that will be updated based on the needs of our users and software requirements.

### Clear
Our users rely on our software to help them be efficient in their work. The interfaces and experiences that we design should be clear so that there is never confusion about where to click or how to take the next step. Users should always feel confident in their actions.

### Consistent
Users should be able to look at Zowe software products and know that they are in a family. Each software product is different, but should use similar patterns, icons, and interactions. If a user switches to a new product within Zowe, it should feel familiar.

### Smart
Our users are intelligent, and they need smart software. Zowe design patterns should always compliment the user’s intelligence and reflect the user’s complex work environment. Designs should align with the Zowe design language by putting the human needs of the user first.

## Colors

Color brings a design to life. Color is versatile; it's used to express emotion and tone, as well as place emphasis and create associations. Color should always be used in meaningful and intentional ways to create patterns and visual cues.

### Color palette

The Zowe&trade; color palette is designed and implemented in a theme-able manner. The universal color variables are determined by common roles and usage; it is not based singularly on a color value (i.e. unique hex code). The same color value might be assigned to multiple variables in a theme's palette when the values have distinctly different roles.

A universal variable can also have multiple associated roles when the color is consistently used across those roles. This allows for uniform color application across themes, while giving each theme the freedom to express its own individuality at a more detailed level.

 ![color palette](../images/extender/full_palette.png)

#### Light theme
![default light theme colors](../images/extender/light_palette.png)

#### Dark theme

![default dark theme colors](../images/extender/dark_palette.png)

## Color contrast | WCAG AA standards

- Type colors

  All type color combinations on Zowe must pass WCAG AA standards of 4.5:1 for normal text and 3:1 for large text. For larger text, if the font weight is light (300) or normal (400) the text should be no smaller than 24px. If the font weight is Semi-Bold (600) then the large text should be no smaller than 19px.

- Body Text (4.5:1)

- Large Text (3:1): at least 24px / 19px semi-bold

WCAG guidelines: [https://www.w3.org/WAI/standards-guidelines/wcag/](https://www.w3.org/WAI/standards-guidelines/wcag/)

Contrast Checker Tool: [https://webaim.org/resources/contrastchecker/](https://webaim.org/resources/contrastchecker/)

# Typography

Typography is used to create clear hierarchies, useful organizations, and purposeful alignments that guide users through the product and experience. It is the core structure of any well designed interface.

## Typeface

Title typeface: Roboto Condensed

Body typeface: Roboto

Sample:

![type sample](../images/extender/type_sample.png)


## Font weight

Font weight is an important typographic style that can add emphasis and is used to differentiate content hierarchy. Font weight and size pairings must be carefully balanced. A bold weight will always have more emphasis than a lighter weight font of the same size. However, a lighter weight font can rank hierarchically higher than a bold font if the lighter weight type size is significantly larger than the bold.

Roboto font family provides a wide range of weights. However, only SemiBold, Regular, Light should be used for product design.

- Font-weight: 300 / Light

  ![type light sample](../images/extender/type_light_sample.png)

  Should only be used at sizes greater than or equal to 18px / 1.125rem

- Font-weight: 400 / Normal

  ![type regular sample](../images/extender/type_regular_sample.png)

- Font-weight: 500 / Semi-bold

  ![type bold sample](../images/extender/type_bold_sample.png)

## Body copy

We recommended that you use two sizes for body copy. The first size is UI specific. To maximize screen real estate we chose a smaller 14px / 0.875rem body copy size for the standard UI console. However, for areas that have prolonged reading, such as Documentation, we use a larger body copy size of 16px / 1rem to enhance readability.

## Line scale

- 1.333 Perfect Fourth-type scale - desktop

  ![type desktop sample](../images/extender/type_scale_desktop-1024x533.png)

- 1.2 Minor Third type-scale - mobile

  ![type mobile sample](../images/extender/type_scale_mobile-1024x461.png)

## Line-height

Line-height, traditionally known as leading, is one of several factors that directly contribute to readability and pacing of copy. Line-heights are based on the size of the font itself. Ideal line-heights for standard copy have a ratio of 1:1.5 (typesize : line-height). For example, a type at 16px / 1rem would have a line-height of 1.5rem / 24px (16 x 1.5). The exception to this rule are headings, which need less spacing and therefore have a line-height ratio of 1:1.25.

## Embed font

To embed your selected fonts into a web page, copy the following code into the `<head>` of your HTML document:

```
<link href="https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto:300,400,500" rel="stylesheet">
```

## Import font

```
<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed|Roboto:300,400,500');
</style>
```

## Specify in CSS

Use the following CSS rules to specify these families:

```
font-family: 'Roboto', sans-serif;
font-family: 'Roboto Condensed', sans-serif;
```

## Grid

Grid systems are used for creating page layouts through a series of rows and columns that house your content. Zowe&trade; uses a responsive, mobile-first, fluid grid system that appropriately scales up to 12 columns as the device or view port size increases.

### 12 column grid

A 12 column grid is recommended. 12 is a well-distributed division that provides a good range of widths to assign to content. It is dividable by 2, 3, 4 and 6, which allows flexibility. Many frameworks, such as Bootstrap and Pure, use a 12 column grid by default. Other grid systems like a 5 column grid can reduce flexibility, balance, and consistency.

### Gutters

Columns create gutters (gaps between column content) through padding. For devices with a screen width greater than 768px, the column padding is 20px. For devices with a screen width less than 768px, the column padding is 10px.

Screen width ≥ 768px = 20px gutters

Screen width 768px = 10px gutters


### Columns

Zowe designs should be limited to 12 columns. If designers feel that they need fewer columns in their grid, they can specify the number of 12 available columns they wish to span.

This can translate to percentages of the twelve columns. Using this method, a designer can create a folded, less granular grid. For example, if your component spans three equal columns, that is equal to 25% of twelve columns.

Column count: 12


### Margins

The 12 column grid does not have a maximum width. It has a width of 100%, with built in margins that create padding between column count and the edges of the viewport.

In devices with a screen width greater than 768px, the margins are **5%** on the left, and **5%** on the right.

In devices with a screen width less than 768px, the margins are **3%** on the left, and **3%** on the right.

**Example: Screen Width  > 768px**

    5% left = 38px (rounded to nearest whole pixel)
    5% right = 38px (rounded to nearest whole pixel)
    12 columns + gutters = 768px - 38px - 38px = 692px (rounded to nearest whole pixel)

![grid desktop](../images/extender/grid_desktop-1024x780.png)


**Example: Screen Width 320px**

    3% left = 10px (rounded to nearest whole pixel)
    3% right = 10px (rounded to nearest whole pixel)
    12 columns + gutters = 320px - 10px - 10px = 300px (rounded to nearest whole pixel)

![grid mobile](../images/extender/grid_mobile-1024x709.png)

## Iconography

Icons are key component for a successful UI design because they are a visual way to help add meaning to elements.

[Font Awesome](https://fontawesome.com/) is a robust icon library that allows for an easy addition to any web project. Scalable vector icons that can instantly be customized — size, color, drop shadow, and anything that can be done with the power of CSS.

![icons sample](../images/extender/icons_sample-1024x753.png)


- **One Font, Hundreds of Icons** – In a single collection, Font Awesome is a pictographic language of web-related actions.
- **No JavaScript Required** – Fewer compatibility concerns because Font Awesome doesn’t require JavaScript.
- **Infinite Scalability** – Scalable vector graphics means every icon looks awesome at any size.
- **Free, as in Speech** – Font Awesome is completely free for commercial use. Check out the license.
- **CSS Control** – Easily style icon color, size, shadow, and anything that’s possible with CSS.
- **Perfect on Retina Displays** – Font Awesome icons are vectors, which mean they’re gorgeous on high-resolution displays.
- **Plays Well with Others** – Originally designed for Bootstrap, Font Awesome works great with all frameworks.
- **Desktop Friendly** – To use on the desktop or for a complete set of vectors, check out the cheatsheet.
- **Accessibility-minded** – Font Awesome loves screen readers and helps make your icons accessible on the web.

To learn more or download the library go to www.fontawesome.com

## Application icon

### General rules

**Embrace simplicity.** Use a simple, unique shape or element that represents the essence of the application. Avoid excessive details and redundant shading.

**Use the Zowe&trade; color palette.** Avoid using a monochromatic palette for your icons. Use the Zowe color palette to ensure that the icons have a consistent look.

**Use unique shapes and design elements.** Avoid using single commonly used design elements, such as the gear, document, or folder. These elements can reduce recognizability. Do not use photos and screenshots. Keep icons simple and abstract.

**Avoid labels and text.** Short, commonly used abbreviations are acceptable, if necessary. Remember that all icons have center-aligned labels beneath them.

**Use brand identity.** If your Zowe application has a brand identity element such as a logo, you can use it. Remember to include the copyright symbol.

## Shape, size, and composition

**Use a flat design style.** Flat design focuses on open space, bright colors, and flat graphics or illustrations. Our minimalistic design approach puts the emphasis on usability.

![icon sample](../images/extender/icon_sample1.png)

A flat icon has clean, crisp edges and a flat dimensional layout.

**Use solid fill shapes.** Most Zowe App icons have solid fill shapes, which are more readable on dark backgrounds.

Use the circle shape for the background application icons.
Set the outer corners to 100% opacity. Create an image file that is 87x87 pixels, and save the file in PNG format.

**Maintain consistent visual proportions.**

![icon sample2](../images/extender/icon_sample2-1024x283.png)

### Colors and shades

#### Verify the contrast

Verify that the background color of the icon provides enough contrast against the desktop.

![icon sample3](../images/extender/icon_sample3.png)

#### Use the Zowe palette
To ensure that your app icons are clear and consistent, use the [Zowe color palette](colors.md#color-palette).
If you need to use well-established brand identity elements, you can use the colors that are associated with the brand.

#### Layer Shadows
Use smooth shadows to represent that some elements are on different layers and should be visually separated. Avoid using too many layers because they can overcomplicate the icon.

![icon sample4](../images/extender/icon_sample4.png)

#### Use the long shadow for consistency.
Although the long shadow effect does not have any semantic meaning, it adds focus to the main icon shape and identifies the central,most meaningful element.

Use the gradient shadow settings shown in the following image, or use a flat non-gradient shadow with 20% opacity and #000000 color.

![icon sample5](../images/extender/icon_sample5.png)
