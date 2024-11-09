# LCS dySTYLE

**LCS dySTYLE** is a dynamic, JavaScript-based CSS management library. It enables developers to apply complex, responsive, and custom styles directly through HTML class names, eliminating the need for static CSS files. This lightweight and flexible library supports pseudo-elements, sibling and child selectors, media queries, and direct style properties — all using class names.

## Features

- **Dynamic Styling**: Apply CSS styles dynamically with a structured class name syntax, reducing the need for external CSS files.
- **Responsive Support**: Embed media queries in class names for responsive designs.
- **Advanced Selectors**: Style sibling, child, and type-based elements directly through class names.
- **Pseudo-Classes and Pseudo-Elements**: Use `:hover`, `:focus`, `::before`, and `::after` styles effortlessly.
- **Customizable Control**: Use `data-dystyle="false"` to exclude specific elements or the entire body from `dySTYLE` processing.

## Installation

You can install `LCS dySTYLE` via npm:

```bash
npm install lcs_dystyle
```

Or clone the repository from GitHub:

```bash
git clone https://github.com/lcs_dystyle/lcs_dystyle.git
```

Then, include the script in your HTML:

```html
<script src="https://cdn.jsdelivr.net/npm/lcs_dystyle/dist/ld.min.js"></script>
```

## Usage

Add the `lcs` prefix to your class names to dynamically apply styles. `LCS dySTYLE` interprets the class names as CSS rules, allowing direct styling through naming conventions.

### Example

```html
<!-- Basic style application -->
<div class="lcsBackgroundColor_red"></div>

<!-- Responsive styling -->
<div class="lcsMQ_MaxWidth600PX_FontSize_14px"></div>

<!-- Pseudo-element styling (COMING SOON) -->
<div class="lcsBefore_BackgroundColor_red"></div>

<!-- Advanced selectors (COMING SOON) -->
<ul>
  <li class="lcsSibling_BackgroundColor_lightblue">List Item</li>
</ul>
```

### Disabling dySTYLE on Specific Elements

To disable `dySTYLE` on specific elements or the entire body, use the `data-dystyle="false"` attribute:

```html
<!-- Disables dySTYLE on this div -->
<div data-dystyle="false" class="lcsBackgroundColor_red">This will not be styled by dySTYLE.</div>

<!-- Disables dySTYLE on the entire body -->
<body data-dystyle="false">
  <!-- All elements inside the body will not be styled by dySTYLE -->
</body>
```

## Class Name Structure

Class names are parsed by `LCS dySTYLE` and converted to CSS rules. Use the following structure to construct class names:

```plaintext
lcs[MediaQuery]_[SpecificSelector]_[PseudoClass]_[CSSProperty]_[CSSValue]
```

### Class Name Syntax Details

- **Media Queries**: Prefix classes with `lcsMQ` for responsive styling.
- **Advanced Selectors**: Use `lcsAllOfType`, `lcsSibling` (COMING SOON), `lcsChild` (COMING SOON), and similar selectors to apply styles to child or sibling elements.
- **Pseudo-Classes and Pseudo-Elements**: Use `lcsHPE` (COMING SOON) for `:hover`, `lcsBPE` (COMING SOON) for `::before`, and other similar syntax.
- **Direct Properties**: Apply specific styles using the format `lcs[Property]_[Value]`.

### Example Syntax

```html
<!-- Direct property example -->
<div class="lcsBackgroundColor_red">Red Background</div>

<!-- Pseudo-element example (COMING SOON) -->
<div class="lcsBefore_BackgroundColor_blue">Blue Before Element</div>

<!-- Media query example -->
<div class="lcsMQ_MaxWidth768PX_FontSize_12px">Font size 12px on screens 768px wide or smaller</div>
```

## Internal Workings

`LCS dySTYLE` operates only on elements within the `body` tag and dynamically generates and injects CSS rules into the document’s internal style element. The library skips elements with `data-dystyle="false"` attributes, enabling selective styling control.

## Development

For contributing, clone the repository and open a pull request with your updates. Contributions, issue reporting, and feature requests are welcome.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
