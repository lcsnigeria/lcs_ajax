/**
 * @fileoverview
 * 
 * **LCS dySTYLE**: Dynamic Style Management System
 * 
 * **Introduction**:
 * `LCS dySTYLE` is a powerful JavaScript library designed to dynamically apply and manage CSS styles on HTML elements through class names.
 * Using a set of class-based rules and regex patterns, it interprets and applies complex styles, including pseudo-elements, media queries, animations, 
 * and direct property settings. This system enhances styling control and responsiveness in web applications by allowing developers to define 
 * styles dynamically through class names, minimizing the need to create static CSS files for every HTML page.
 * 
 * **About**:
 * The `LCS dySTYLE` library aims to simplify the styling process. Instead of creating external CSS files or adding styles manually in the `<head>` tag, 
 * you can apply styles directly using class names. This approach allows you to define styles once and reuse them across HTML elements, streamlining 
 * the styling process and reducing the need for additional CSS files.
 * 
 * `LCS dySTYLE` allows for extensive styling customization by encoding CSS properties and values directly into class names. This approach simplifies 
 * applying complex styles, including:
 * - **Sibling Styling**: Use classes like `lcsAllAfterThis` (same as `lcsAFT`) and `lcsAllBeforeThis` (same as `lcsABT`) for sibling elements.
 * - **Pseudo-Elements**: Apply pseudo-elements like `:hover`, `:focus`, `::before`, and `::after` using `lcsHover` (`lcsHPE`), `lcsFocus` (`lcsFPE`), 
 *   `lcsBefore` (`lcsBPE`), and `lcsAfter` (`lcsAPE`).
 * - **Responsive Designs**: Implement responsive designs with classes like `lcsMediaScreen`, `lcsMediaQuery`, or simply `lcsMQ`.
 * - **Direct CSS Properties**: Apply specific CSS properties with `lcs[Property]_[value]` classes.
 * 
 * **Getting Started**:
 * To begin using `LCS dySTYLE`, add the JS script as the first script in your `<head>` tag.
 * 
 * **Usage**:
 * Define class names following the `lcs` naming convention. Including "lcs" in the class name differentiates `LCS dySTYLE` functionality from custom classes 
 * and ensures that the logic applies only to `lcs` prefixed class names in your HTML.
 * 
 * - Class names should have CSS properties in camel case with the first letter in uppercase (e.g., `MarginTop` instead of `marginTop`).
 * - Values should be lowercase throughout (e.g., `10px`; `10PX` will not work).
 * - Hyphens in values should be omitted (e.g., `borderbox` instead of `border-box`).
 * 
 * **Examples**:
 * 
 * **Direct Implementation**: 
 * The class `lcsBackgroundColor_red` will generate the CSS rule:
 * ```css
 * .lcsBackgroundColor_red { background-color: red; }
 * ```
 * 
 * **Pseudo-Elements**:
 * - `lcsBefore_BackgroundColor_red` generates:
 * ```css
 * .lcsBefore_BackgroundColor_red::before { background-color: red; }
 * ```
 * - `lcsHPE_BackgroundColor_red` generates:
 * ```css
 * .lcsHPE_BackgroundColor_red:hover { background-color: red; }
 * ```
 * 
 * **Advanced and Multi-Definitions**:
 * - `lcsAllOfType_BackgroundColor_red` applies to all elements with the same tag name.
 * - `lcsChild_BackgroundColor_red` applies to an element’s first child.
 * - `lcsChildrenNotFirst_BackgroundColor_red` applies to all immediate children except the first.
 * 
 * **Of Same Tag Name**:
 * - `lcsChildOfType_BackgroundColor_red` applies to the element's first child of the same tag name.
 * - `lcsSiblingOfType2_BackgroundColor_red` applies to the element and its next second sibling of the same tag name.
 * 
 * **Multi-Property Styling**:
 * Multiple properties and values can be defined using one class name instead of separate class names:
 * ```html
 * <div class="lcsBackgroundColor.Color_red.green">...</div>
 * ```
 * This works with `lcsMQ`, pseudo-elements, and advanced logic. Ensure the number of values matches the number of properties.
 * 
 * **Complex CSS Values**:
 * For values requiring multiple inputs (e.g., `border`), use hyphens instead of spaces:
 * ```css
 * .lcsBorder_1px-solid-red { border: 1px solid red; }
 * ```
 * 
 * **Negative and Float Values**:
 * Since hyphens are used in multi-input values, use `mn` for negative values:
 * ```css
 * .lcsMarginTop_mn4rem { margin-top: -4rem; }
 * ```
 * For operators, use `pl` for `+`, `mp` for `*`, `dv` for `/`, and `pct` for `%`.
 * 
 * **Keyframe Animations**:
 * For animations, define keyframes directly in class names:
 * ```html
 * <div class="lcsAnimation_spin-3s-infinite lcsAnimate_spin_from[Opacity_1]to[Opacity_0]">...</div>
 * ```
 * 
 * **Error Handling**:
 * `LCS dySTYLE` includes logic to detect invalid properties and values. If the properties and values count mismatch, a console warning logs the affected 
 * class name and element, and the style won’t be applied.
 */










/**
 * Regex patterns for various dynamic style application specifications, allowing for
 * targeted styling based on element type, position, and relationships like siblings and children.
 * 
 * - **AllOfTypeSpecsSelection**: Matches "All" type specifications such as:
 *   - `All`: Applies to all elements.
 *   - `AllOfType`: Applies to all elements of the same type.
 *   - `AllOfTypeWithin`: Applies to all elements of the same type within a specified context.
 *   - `AllWithin`: Applies to all elements within a specified context.
 *   - `AllChildLikeThis`: Applies to child elements with the same type as the reference element's parent.
 * 
 * - **ChildSpecsSelection**: Matches "Child" type specifications, including:
 *   - `Child`: Applies to the first child.
 *   - `ChildOfType`: Applies to the first child of a specific type.
 *   - `ChildFirst`/`ChildLast`: Applies to the first or last child.
 *   - `Child2`, etc.: Applies to a specific child by position.
 * 
 * - **ChildrenSpecsSelection**: Matches "Children" type specifications, covering:
 *   - `Children`: Applies to all immediate children.
 *   - `ChildrenOfType`: Applies to all immediate children of a specific type.
 *   - `ChildrenNotFirst`/`ChildrenNotLast`: Excludes the first or last child.
 *   - `ChildrenNot2`, etc.: Excludes a specific child by position.
 * 
 * - **SiblingSpecsSelection**: Matches "Sibling" type specifications, including:
 *   - `Sibling`: Applies to the element and its next sibling.
 *   - `SiblingOfType`: Applies to the element and its next sibling of the same type.
 *   - `Sibling2`, etc.: Applies to the element and a specific sibling by position.
 *   - `Siblings`: Applies to all siblings of the element.
 *   - `SiblingNotFirst`/`SiblingNotLast`: Excludes the first or last sibling.
 * 
 * **Combined Pattern (SpecsSelectionPattern)**: 
 * Combines all patterns above into a single regex pattern to dynamically apply styles based 
 * on various selection criteria.
 * 
 * @type {string}
 */
const allOfTypeSpecsSelection = `All(?:ChildLikeThis|(?:OfType)?(?:Within)?)`;
const childSpecsSelection = `Child(?:OfType(?:First|Last|\\d+)?|First|Last|\\d+)?`;
const childrenSpecsSelection = `Children(?:OfType(?:Not(?:First|Last|\\d+))?)?`;
const siblingSpecsSelection = `Sibling(?:s)?(?:Not(?:\\d+|First|Last)|(?:OfType(?:\\d+)?|\\d+))?`;
const specsSelectionPattern = `(?:${allOfTypeSpecsSelection}|${childSpecsSelection}|${childrenSpecsSelection}|${siblingSpecsSelection})`;











/**
 * List of valid dySTYLE CSS property names.
 * @type {Array<string>}
 */
const dySTYLE_Properties = [
    "accent-color", "align-content", "align-items", "align-self", "all",
    "animation", "animation-delay", "animation-direction", "animation-duration",
    "animation-fill-mode", "animation-iteration-count", "animation-name",
    "animation-play-state", "animation-timing-function", "aspect-ratio",
    "backface-visibility", "background", "background-attachment",
    "background-blend-mode", "background-clip", "background-color",
    "background-image", "background-origin", "background-position",
    "background-repeat", "background-size", "block-size", "border",
    "border-block", "border-block-color", "border-block-end",
    "border-block-end-color", "border-block-end-style", "border-block-end-width",
    "border-block-start", "border-block-start-color", "border-block-start-style",
    "border-block-start-width", "border-block-style", "border-block-width",
    "border-bottom", "border-bottom-color", "border-bottom-left-radius",
    "border-bottom-right-radius", "border-bottom-style", "border-bottom-width",
    "border-collapse", "border-color", "border-end-end-radius",
    "border-end-start-radius", "border-image", "border-image-outset",
    "border-image-repeat", "border-image-slice", "border-image-source",
    "border-image-width", "border-inline", "border-inline-color",
    "border-inline-end", "border-inline-end-color", "border-inline-end-style",
    "border-inline-end-width", "border-inline-start", "border-inline-start-color",
    "border-inline-start-style", "border-inline-start-width", "border-inline-style",
    "border-inline-width", "border-left", "border-left-color", "border-left-style",
    "border-left-width", "border-radius", "border-right", "border-right-color",
    "border-right-style", "border-right-width", "border-spacing",
    "border-start-end-radius", "border-start-start-radius", "border-style",
    "border-top", "border-top-color", "border-top-left-radius",
    "border-top-right-radius", "border-top-style", "border-top-width",
    "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing",
    "break-after", "break-before", "break-inside", "caption-side", "caret-color",
    "@charset", "clear", "clip", "clip-path", "color", "color-adjust",
    "color-scheme", "column-count", "column-fill", "column-gap", "column-rule",
    "column-rule-color", "column-rule-style", "column-rule-width", "column-span",
    "column-width", "columns", "contain", "content", "content-visibility",
    "counter-increment", "counter-reset", "counter-set", "cursor", "direction",
    "display", "empty-cells", "filter", "flex", "flex-basis", "flex-direction",
    "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "float", "font",
    "@font-face", "font-family", "font-feature-settings", "font-kerning",
    "font-language-override", "font-optical-sizing", "font-size",
    "font-size-adjust", "font-stretch", "font-style", "font-synthesis",
    "font-variant", "font-variant-alternates", "font-variant-caps",
    "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric",
    "font-variant-position", "font-variation-settings", "font-weight", "gap",
    "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows",
    "grid-column", "grid-column-end", "grid-column-gap", "grid-column-start",
    "grid-gap", "grid-row", "grid-row-end", "grid-row-gap", "grid-row-start",
    "grid-template", "grid-template-areas", "grid-template-columns",
    "grid-template-rows", "hanging-punctuation", "height", "hyphens",
    "image-orientation", "image-rendering", "inline-size", "inset", "inset-block",
    "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end",
    "inset-inline-start", "isolation", "justify-content", "justify-items",
    "justify-self", "left", "letter-spacing", "line-break", "line-height",
    "list-style", "list-style-image", "list-style-position", "list-style-type",
    "margin", "margin-block", "margin-block-end", "margin-block-start",
    "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start",
    "margin-left", "margin-right", "margin-top", "mask", "mask-border",
    "mask-border-mode", "mask-border-outset", "mask-border-repeat",
    "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip",
    "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position",
    "mask-repeat", "mask-size", "mask-type", "max-block-size", "max-height",
    "max-inline-size", "max-width", "min-block-size", "min-height",
    "min-inline-size", "min-width", "mix-blend-mode", "@media", "object-fit",
    "object-position", "offset", "offset-anchor", "offset-distance", "offset-path",
    "offset-rotate", "opacity", "order", "orphans", "outline", "outline-color",
    "outline-offset", "outline-style", "outline-width", "overflow",
    "overflow-anchor", "overflow-block", "overflow-clip-margin", "overflow-inline",
    "overflow-wrap", "overflow-x", "overflow-y", "overscroll-behavior",
    "overscroll-behavior-block", "overscroll-behavior-inline",
    "overscroll-behavior-x", "overscroll-behavior-y", "padding", "padding-block",
    "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline",
    "padding-inline-end", "padding-inline-start", "padding-left", "padding-right",
    "padding-top", "page-break-after", "page-break-before", "page-break-inside",
    "paint-order", "perspective", "perspective-origin", "place-content",
    "place-items", "place-self", "pointer-events", "position", "print-color-adjust",
    "quotes", "resize", "right", "rotate", "row-gap", "ruby-align",
    "ruby-position", "scale", "scroll-behavior", "scroll-margin",
    "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start",
    "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end",
    "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right",
    "scroll-margin-top", "scroll-padding", "scroll-padding-block",
    "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom",
    "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start",
    "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align",
    "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter",
    "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside",
    "tab-size", "table-layout", "text-align", "text-align-last", "text-combine-upright",
    "text-decoration", "text-decoration-color", "text-decoration-line",
    "text-decoration-skip-ink", "text-decoration-style", "text-decoration-thickness",
    "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style",
    "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering",
    "text-shadow", "text-transform", "text-underline-offset", "text-underline-position",
    "top", "touch-action", "transform", "transform-box", "transform-origin", "transform-style",
    "transition", "transition-delay", "transition-duration", "transition-property",
    "transition-timing-function", "translate", "unicode-bidi", "user-select", "vertical-align",
    "visibility", "white-space", "widows", "width", "will-change", "word-break", "word-spacing",
    "word-wrap", "writing-mode", "z-index", "zoom"
];










/**
 * List of CSS color names.
 *
 * @type {Array<string>}
 */
const dySTYLE_ColorNames = [
    "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", 
    "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", 
    "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", 
    "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", 
    "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", 
    "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", 
    "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", 
    "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", 
    "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", 
    "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", 
    "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgreen", "lightpink", 
    "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", 
    "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", 
    "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", 
    "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", 
    "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", 
    "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", 
    "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", 
    "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", 
    "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", 
    "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", 
    "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", 
    "yellow", "yellowgreen"
];

/**
 * List of acceptable CSS display values.
 *
 * @type {Array<string>}
 */
const dySTYLE_DisplayValues = [
    "-webkit-box", "-webkit-inline-box", 
    "block", "contents", "flex", 
    "grid", "inline", "inline-block", 
    "inline-flex", "inline-grid", "inline-table", 
    "list-item", "none", "run-in", 
    "ruby", "ruby-base", "ruby-base-container", 
    "ruby-container", "ruby-position", 
    "ruby-position-container", "ruby-text", 
    "ruby-text-container", "table", 
    "table-caption", "table-cell", 
    "table-column", "table-column-group", 
    "table-footer", "table-footer-group", 
    "table-header", "table-header-group", 
    "table-row", "table-row-group"
];

/**
 * List of acceptable CSS flex values.
 *
 * @type {Array<string>}
 */
const dySTYLE_FlexValues = [
    "auto", "column", "column-reverse", 
    "end", "flex", "flex-end", 
    "flex-start", "inherit", 
    "initial", "none", 
    "nowrap", "revert", 
    "revert-layer", "row", 
    "row-reverse", "self-end", 
    "self-start", "space-around", 
    "space-between", "space-evenly", 
    "start", "stretch", "unset", 
    "wrap", "wrap-reverse"
];

/**
 * List of acceptable CSS grid values.
 *
 * @type {Array<string>}
 */
const dySTYLE_GridValues = [
    "auto", "auto-fill", 
    "auto-fit", "auto-flow",
    "column", "column dense", 
    "dense", "fit-content", "inherit", 
    "initial", "max-content", 
    "min-content", "none", 
    "repeat", "row", 
    "row dense", "revert", 
    "revert-layer", "unset"
];

/**
 * List of acceptable CSS list style position values.
 *
 * @type {Array<string>}
 */
const dySTYLE_ListStylePositionValues = [
    "inside", 
    "outside",
    "inherit",
    "initial",
    "unset" 
];

/**
 * List of acceptable CSS list style type values.
 *
 * @type {Array<string>}
 */
const dySTYLE_ListStyleTypeValues = [
    "arabic-indic", "circle", "cjk-earthly-branch", 
    "cjk-heavenly-stem", "cjk-ideographic", 
    "cjk-ideographic-nl", "decimal", 
    "decimal-leading-zero", "devanagari", 
    "disc", "ethiopic-halehame-aa-er", 
    "ethiopic-halehame-aa-et", "ethiopic-halehame-am-et", 
    "ethiopic-halehame-sid-et", "ethiopic-numeric", 
    "flex", "gurmukhi", 
    "gujarati", "hiragana", 
    "hiragana-iroha", "hiragana-nl", 
    "hiragana-parenthesized", "katakana", 
    "katakana-iroha", "katakana-nl", 
    "katakana-parenthesized", "korean-hanja-formal", 
    "korean-hangul-formal", "lower-alpha", 
    "lower-alpha-academic", "lower-alpha-nl", 
    "lower-alpha-traditional", "lower-georgian", 
    "lower-greek", "lower-greek-nl", 
    "lower-hexadecimal", "lower-latin", 
    "lower-latin-academic", "lower-latin-nl", 
    "lower-norwegian", "lower-roman", 
    "lower-roman-nl", "none", 
    "persian", "simp-chinese-formal", 
    "simp-chinese-informal", "square", 
    "trad-chinese-formal", "trad-chinese-informal", 
    "upper-alpha", "upper-alpha-academic", 
    "upper-alpha-nl", "upper-alpha-traditional", 
    "upper-georgian", "upper-greek", 
    "upper-greek-nl", "upper-hexadecimal", 
    "upper-latin", "upper-latin-academic", 
    "upper-norwegian", "upper-roman", 
    "upper-roman-nl", "ruby", 
    "ruby-base", "ruby-base-container", 
    "ruby-container", "ruby-position", 
    "ruby-position-container", "ruby-text", 
    "ruby-text-container"
];

/**
 * List of acceptable CSS border styles.
 *
 * @type {Array<string>}
 */
const dySTYLE_BorderStyleValues = [
    "border-box", "content-box", 
    "dashed", "dotted", 
    "double", "groove", 
    "hidden", "none", 
    "outset", "ridge", 
    "solid"
];

/**
 * List of acceptable CSS width values.
 *
 * @type {Array<string>}
 */
const dySTYLE_WidthValues = [
    "auto", "available", "contain", 
    "fill-available", "fit-content", 
    "inherit", "initial", "max-content", 
    "min-content", "none", "normal", 
    "revert", "unset"
];

/**
 * List of acceptable CSS height values.
 *
 * @type {Array<string>}
 */
const dySTYLE_HeightValues = [
    "auto", "available", "fill-available", 
    "fit-content", "inherit", 
    "initial", "max-content", 
    "min-content", "none", 
    "normal", "unset"
];

/**
 * List of acceptable CSS font family values.
 *
 * @type {Array<string>}
 */
const dySTYLE_FontFamilyValues = [
    "Arial", "Arial Black", "Comic Sans MS", 
    "Courier New", "Georgia", 
    "Helvetica", "Impact", 
    "Lucida Console", "Lucida Sans Unicode", 
    "Microsoft Sans Serif", "monospace", 
    "sans-serif", "Serif", 
    "system-ui", "Tahoma", 
    "Times New Roman", "Trebuchet MS", 
    "unset", "initial", "inherit", 
    "Verdana"
];

/**
 * List of acceptable CSS font style values.
 *
 * @type {Array<string>}
 */
const dySTYLE_FontStyleValues = [
    "defer", "inherit", "initial", 
    "italic", "normal", 
    "oblique", "unset"
];

/**
 * List of acceptable CSS font variant values.
 *
 * @type {Array<string>}
 */
const dySTYLE_FontVariantValues = [
    "normal", "small-caps", 
    "inherit", "initial", 
    "unset"
];

/**
 * List of acceptable CSS font weight values.
 *
 * @type {Array<string>}
 */
const dySTYLE_FontWeightValues = [
    "bold", "bolder", "lighter", 
    "normal", "inherit", 
    "initial", "unset", 
    "revert", "revert-layer"
];

/**
 * List of acceptable CSS box model values.
 *
 * @type {Array<string>}
 */
const dySTYLE_BoxModelValues = [
    "border-box", "content-box", 
    "inherit", "initial", 
    "margin-box", "padding-box", 
    "revert", "revert-layer", 
    "unset"
];

/**
 * List of acceptable CSS position values.
 *
 * @type {Array<string>}
 */
const dySTYLE_PositionValues = [
    "absolute", "fixed", 
    "inherit", "initial", 
    "relative", "static", "sticky", 
    "unset", "revert", "revert-layer"
];

/**
 * List of acceptable CSS text transform values.
 *
 * @type {Array<string>}
 */
const dySTYLE_TextTransformValues = [
    "capitalize", "inherit", 
    "initial", "lowercase", 
    "revert", "revert-layer", 
    "unset", "uppercase"
];

/**
 * List of acceptable CSS text decoration line values.
 *
 * @type {Array<string>}
 */
const dySTYLE_TextDecorationLineValues = [
    "blink", "line-through", 
    "none", "overline", 
    "underline", "inherit", 
    "initial", "unset", 
    "revert", "revert-layer"
];

/**
 * List of acceptable CSS text decoration style values.
 *
 * @type {Array<string>}
 */
const dySTYLE_TextDecorationStyleValues = [
    "dashed", "dotted", 
    "double", "inherit", 
    "initial", "line-through", 
    "none", "solid", 
    "unset", "revert", "revert-layer"
];

/**
 * List of acceptable CSS text align values.
 *
 * @type {Array<string>}
 */
const dySTYLE_TextAlignValues = [
    "center", "end", 
    "inherit", "initial", 
    "justify", "left", 
    "right", "unset", 
    "revert", "revert-layer"
];

/**
 * List of acceptable CSS vertical align values.
 *
 * @type {Array<string>}
 */
const dySTYLE_VerticalAlignValues = [
    "baseline", "bottom", 
    "inherit", "initial", 
    "middle", "sub", 
    "super", "text-bottom", 
    "text-top", "top", 
    "unset", "revert", "revert-layer"
];

/**
 * List of acceptable CSS text overflow values.
 * @type {Array<string>}
 */
const dySTYLE_TextOverflowValues = [
    "clip", "ellipsis", 
    "inherit", "initial", 
    "unset", "revert", "revert-layer"
];

/**
 * List of acceptable CSS font stretch values.
 * @type {Array<string>}
 */
const dySTYLE_FontStretchValues = [
    "condensed", "default", "extra-condensed", 
    "extra-expanded", "expanded", 
    "inherit", "initial", 
    "normal", "narrow", 
    "revert", "revert-layer", 
    "semi-condensed", "semi-expanded", 
    "unset", "ultra-condensed", 
    "ultra-expanded"
];

/**
 * List of acceptable CSS visibility values.
 * @type {Array<string>}
 */
const dySTYLE_VisibilityValues = [
    "collapse", "hidden", 
    "inherit", "initial", 
    "revert", "revert-layer", 
    "unset", "visible"
];

/**
 * List of acceptable CSS overflow values.
 * @type {Array<string>}
 */
const dySTYLE_OverflowValues = [
    "anywhere", "auto", "break-word", "clip", "hidden", 
    "inherit", "initial", 
    "normal", "revert", "revert-layer", 
    "scroll", "unset", 
    "visible"
];

/**
 * List of acceptable CSS font size values.
 * @type {Array<string>}
 */
const dySTYLE_FontSizeValues = [
    "absolute", "auto", 
    "inherit", "initial", 
    "larger", "large", 
    "medium", "revert", 
    "revert-layer", "smaller", 
    "small", "unset", 
    "xx-large", "x-large", 
    "xx-small", "x-small", 
    "xxx-large"
];

/**
 * List of acceptable CSS transition values.
 * @type {Array<string>}
 */
const dySTYLE_TransitionValues = [
    "ease", "ease-in", 
    "ease-in-out", "ease-out", 
    "initial", "inherit", 
    "linear", "step-end", 
    "step-start"
];

/**
 * List of acceptable CSS cursor values.
 * @type {Array<string>}
 */
const dySTYLE_CursorValues = [
    "alias", "all-scroll", "auto", "cell", "context-menu", "col-resize", "copy", 
    "crosshair", "default", "e-resize", "ew-resize", "grab", "grabbing", "help", 
    "move", "n-resize", "ne-resize", "nesw-resize", "ns-resize", "nw-resize", 
    "nwse-resize", "no-drop", "none", "not-allowed", "pointer", "progress", 
    "row-resize", "s-resize", "se-resize", "sw-resize", "text", "url", 
    "vertical-text", "w-resize", "wait", "zoom-in", "zoom-out"
];

/**
 * List of acceptable CSS image-related values.
 * @type {Array<string>}
 */
const dySTYLE_ImageValues = [
    "cover"
];

/**
 * Collects all CSS style values from various categories.
 *
 * @type {Array<string>}
 */
const AllValues = [
    ...dySTYLE_ColorNames,
    ...dySTYLE_DisplayValues,
    ...dySTYLE_BorderStyleValues,
    ...dySTYLE_FlexValues,
    ...dySTYLE_ListStylePositionValues,
    ...dySTYLE_ListStyleTypeValues,
    ...dySTYLE_WidthValues,
    ...dySTYLE_HeightValues,
    ...dySTYLE_FontFamilyValues,
    ...dySTYLE_FontStyleValues,
    ...dySTYLE_FontVariantValues,
    ...dySTYLE_FontWeightValues,
    ...dySTYLE_BoxModelValues,
    ...dySTYLE_PositionValues,
    ...dySTYLE_TextTransformValues,
    ...dySTYLE_GridValues,
    ...dySTYLE_TextAlignValues,
    ...dySTYLE_VisibilityValues,
    ...dySTYLE_TextDecorationLineValues,
    ...dySTYLE_TextDecorationStyleValues,
    ...dySTYLE_OverflowValues,
    ...dySTYLE_FontSizeValues,
    ...dySTYLE_FontStretchValues,
    ...dySTYLE_TextOverflowValues,
    ...dySTYLE_TransitionValues,
    ...dySTYLE_VerticalAlignValues,
    ...dySTYLE_CursorValues,
    ...dySTYLE_ImageValues
];
/**
 * List of all CSS style values from various categories.
 *
 * @type {Array<string>}
 */
const dySTYLE_Values = [...new Set(AllValues)];










/**
 * dySTYLE matching patterns
 */
const lengthsPattern = '(?:px|em|rem|cm|mm|in|pt|pct|pc|vh|vw|vmin|vmax|ch|ex|fr)';
const digitLengthPattern = `\\d+${lengthsPattern}(?:-\\d+${lengthsPattern})*`;
const digitPattern = `\\d+(?:-\\d+)*`;
const negativeDigitPattern = `mn\\d+(?:${lengthsPattern})?`;
const floatPattern = '(?:1|0[0-9]|0)';
const minmaxPattern = `minmax\\(\\d+${lengthsPattern}-\\d+${lengthsPattern}\\)`;
const fitcontentPattern = `fitcontent\\(\\d+${lengthsPattern}\\)`;
const calcFuncPattern = `calc\\(\\d+${lengthsPattern}?-(?:pl|mn|mp|dv)-\\d+${lengthsPattern}?\\)`;
const colorFuncPattern = `(?:rgb|hsl)(?:a)?\\(\\d+-\\d+-\\d+(?:-${floatPattern})?\\)`;
const hexColorPattern = `#[a-f0-9]{3,8}`;
const borderSettingPattern = `(?:${floatPattern}|\\d+)${lengthsPattern}-[a-z]{4,}(?:-(?:${hexColorPattern}|${colorFuncPattern}|[a-z]{3,}))?`;
const textPattern = `[a-z]{2,}(?:-[a-z]{2,})*`;
const gridTempPattern = `(?:${fitcontentPattern}(?:-\\d+${lengthsPattern})*(?:${fitcontentPattern})*|${minmaxPattern}(?:-\\d+${lengthsPattern})*(?:-${minmaxPattern})*|repeat\\((?:\\d+|autofill|autofit)-(?:${digitLengthPattern}|${minmaxPattern})\\))`;

const digitLengthOnlyPattern = `^\\d+${lengthsPattern}(?:-\\d+${lengthsPattern})*$`;
const digitOnlyPattern = `^\\d+(?:-\\d+)*$`;
const negativeDigitOnlyPattern = `^${negativeDigitPattern}$`;
const floatOnlyPattern = '^(?:1|0[0-9]|0)$';
const calcFuncOnlyPattern = `^${calcFuncPattern}$`;
const colorFuncOnlyPattern = `^${colorFuncPattern}$`;
const hexColorOnlyPattern = `^${hexColorPattern}$`;
const borderSettingOnlyPattern = `^(?:${floatPattern}|\\d+)${lengthsPattern}-[a-z]{4,}(?:-(?:${hexColorPattern}|${colorFuncPattern}|[a-z]{3,}))?$`;
const textOnlyPattern = `^[a-z]{2,}(?:-[a-z]{2,})*$`;
const gridTempOnlyPattern = `^(?:${fitcontentPattern}(?:-\\d+${lengthsPattern})*(?:${fitcontentPattern})*|${minmaxPattern}(?:-\\d+${lengthsPattern})*(?:-${minmaxPattern})*|repeat\\((?:\\d+|autofill|autofit)-(?:${digitLengthPattern}|${minmaxPattern})\\))$`;

const mediaQueryRegex = /^\s*(?:(?:\(\s*(min|max)-(width|height|resolution)\s*:\s*\d+(px|em|rem|vh|vw|vmin|vmax|dpi|dpcm|dppx)\s*\))|(?:\(\s*orientation\s*:\s*(landscape|portrait)\s*\)))(?:\s*and\s*(?:\(\s*(min|max)-(width|height|resolution)\s*:\s*\d+(px|em|rem|vh|vw|vmin|vmax|dpi|dpcm|dppx)\s*\)|\(\s*orientation\s*:\s*(landscape|portrait)\s*\)))*\s*$/;

/**  
 * Pattern to match valid CSS property names in camel case or Pascal case.
 * - Matches CSS property names with a minimum length of 2 characters.
 * - Examples: 'MarginTop', 'backgroundColor', 'Flex'.
 * - Ensures that the property names consist of capitalized letters followed by lowercase letters or multiple capital letters.
 * @type {string}
 */
const propertiesPattern = `(?:[A-Z][a-zA-Z]+)(?:\\.[A-Z][a-zA-Z]+)*`;

// lcsBorderRadius.OverFlow.Width.Height_
const valuesPattern = `(?:${borderSettingPattern}|${gridTempPattern}|${digitLengthPattern}|${digitPattern}|${floatPattern}|${negativeDigitPattern}|${calcFuncPattern}|${colorFuncPattern}|${hexColorPattern}|${textPattern})(?:\\.(?:${borderSettingPattern}|${gridTempPattern}|${digitLengthPattern}|${digitPattern}|${floatPattern}|${calcFuncPattern}|${colorFuncPattern}|${hexColorPattern}|${textPattern}))*`;

// Pattern to match media query settings
const mQPattern = `MQ(?:Orientation|(?:Max|Min)(?:Width|Height|Resolution)?)(?:(?:Portrait|Landscape)|\\d+(?:DPI|DPPX|PX))(?:(?:Resolution|(?:Max|Min)(?:Width|Height|Resolution)?)(?:(?:Portrait|Landscape)|\\d+(?:DPI|DPPX|PX)))*`;

/**
 * Pattern to match valid CSS values, including various types like:
 * - Grid templates
 * - Digit and length values (e.g., `10px`, `5%`)
 * - Pure digits (e.g., `10`, `200`)
 * - Floating-point numbers (e.g., `1.5`)
 * - CSS calc functions (e.g., `calc(100% - 10px)`)
 * - CSS color functions (e.g., `rgb(255, 255, 255)`)
 * - Hexadecimal color codes (e.g., `#ffffff`)
 * - Textual values (e.g., `inherit`, `none`)
 * The pattern combines multiple regex patterns to account for the different value types supported by dySTYLE.
 * @type {string}
 */
const valuesOnlyPattern = `${borderSettingOnlyPattern}|${gridTempOnlyPattern}|${digitLengthOnlyPattern}|${digitOnlyPattern}|${floatOnlyPattern}|${negativeDigitOnlyPattern}|${calcFuncOnlyPattern}|${colorFuncOnlyPattern}|${hexColorOnlyPattern}|${textOnlyPattern}`;










/**
 * CSS Rules Bucket to store regular CSS rules.
 * @type {Array<string>}
 */
const dySTYLE_RegularCSSBucket = [];

/**
 * CSS Rules Bucket to store media query CSS rules.
 * @type {Array<string>}
 */
const dySTYLE_MediaQueryCSSBucket = [];

/**
 * Internal style element for dySTYLE rules. 
 * Creates or selects the style element with ID "dySTYLEInternalCSS".
 * If not present, creates and appends it to the document head.
 * @type {HTMLStyleElement}
 */
let dySTYLE_InternalStyleElement = document.head.querySelector("#dySTYLEInternalCSS");
if (!dySTYLE_InternalStyleElement) {
    dySTYLE_InternalStyleElement = document.createElement('style');
    dySTYLE_InternalStyleElement.id = 'dySTYLEInternalCSS';
    document.head.appendChild(dySTYLE_InternalStyleElement);
}

/**
 * Initializes the LCS dySTYLE system after the DOM content is loaded.
 * 
 * This function waits for the DOM to be fully parsed and then runs 
 * `lcsRunDyStyleDependency()` to:
 * - Process elements with class attributes matching dySTYLE patterns.
 * - Apply dynamic styling rules.
 * - Insert the collected CSS into the document's internal style element.
 */
document.addEventListener("DOMContentLoaded", function () {
    lcsRunDyStyleDependency();
});

/**
 * Main function to initialize and process dySTYLE for the document.
 * 
 * - Checks if the `dySTYLE` system is enabled for the document body.
 * - Iterates over all elements with class attributes to match and process 
 *   `dySTYLE` class patterns.
 * - Dynamically generates CSS rules and inserts them into the document.
 */
function lcsRunDyStyleDependency() {
    
    if (document.body) {
        /** 
         * The body element of the document.
         * @type {HTMLElement}
         */
        const bodyElement = document.querySelector('body');

        /**
         * Checks if the `dySTYLE` system is disabled for the body via the `data-dystyle` attribute.
         * If the attribute value is "false", the function exits without processing.
         */
        if (bodyElement.hasAttribute("data-dystyle")) {
            if (bodyElement.getAttribute("data-dystyle") === "false") {
                return;
            }
        }

        /**
         * NodeList of all elements with class attributes in the body.
         * @type {NodeListOf<Element>}
         */
        const allElementsWithClasses = bodyElement.querySelectorAll('[class]');

        // Process each element with class attributes
        for (let i = 0; i < allElementsWithClasses.length; i++) {
            const element = allElementsWithClasses[i];

            /**
             * Class names of the current element.
             * @type {string}
             */
            let elementClassNames = element.hasAttribute("data-dystyle") &&
                element.getAttribute("data-dystyle") === "false"
                ? ''
                : element.getAttribute('class') || '';

            /**
             * Array of individual class names for the element.
             * Empty strings are filtered out.
             * @type {Array<string>}
             */
            const classNamesArray = elementClassNames.split(' ').filter(item => item.trim());

            if (classNamesArray.length > 0) {
                for (let i = 0; i < classNamesArray.length; i++) {
                    const className = classNamesArray[i];

                    /**
                     * Regex pattern to match `dySTYLE` class name structure.
                     * Matches optional media queries, pseudo-elements, properties, and values.
                     */
                    const dySTYLE_ClassRegex = new RegExp(`^lcs(${mQPattern}_)?(${specsSelectionPattern}_)?((?:APE|BPE|HPE|FPE)_)?(${propertiesPattern})_(${valuesPattern})(_IMPT)?$`);

                    /**
                     * Match result for the current class name.
                     * @type {Array<string>|null}
                     */
                    const matchedClassData = className.match(dySTYLE_ClassRegex);

                    if (matchedClassData) {
                        const mediaQuery = matchedClassData[1];
                        const specsSelection = matchedClassData[2];
                        const pseudoSelection = matchedClassData[3];
                        const properties = matchedClassData[4];
                        const values = matchedClassData[5];
                        const strictFlag = matchedClassData[6];

                        /**
                         * dySTYLE instance for the matched class data.
                         * Processes and generates CSS rules dynamically.
                         * @type {dySTYLE}
                         */
                        const dySTYLEInstance = new dySTYLE(
                            element, 
                            properties, 
                            values, 
                            mediaQuery, 
                            specsSelection, 
                            pseudoSelection, 
                            strictFlag
                        );

                        /**
                         * Adds generated CSS rules to the appropriate CSS bucket:
                         * - Media query rules go into `dySTYLE_MediaQueryCSSBucket`.
                         * - Regular CSS rules go into `dySTYLE_RegularCSSBucket`.
                         */
                        if (dySTYLEInstance.cssRule.startsWith('@media')) {
                            if (!dySTYLE_MediaQueryCSSBucket.includes(dySTYLEInstance.cssRule)) {
                                dySTYLE_MediaQueryCSSBucket.push(dySTYLEInstance.cssRule);
                            }
                        } else {
                            if (!dySTYLE_RegularCSSBucket.includes(dySTYLEInstance.cssRule)) {
                                dySTYLE_RegularCSSBucket.push(dySTYLEInstance.cssRule);
                            }
                        }
                    }
                }
            }
        }

        /**
         * Inserts the collected CSS rules into the internal style element:
         * - Regular CSS rules are added first.
         * - Media query CSS rules are added afterward.
         */
        if (dySTYLE_RegularCSSBucket.length > 0) {
            for (let i = 0; i < dySTYLE_RegularCSSBucket.length; i++) {
                const rule = dySTYLE_RegularCSSBucket[i];
                dySTYLE_InternalStyleElement.insertAdjacentText("beforeend", rule);
            }
        }

        if (dySTYLE_MediaQueryCSSBucket.length > 0) {
            for (let i = 0; i < dySTYLE_MediaQueryCSSBucket.length; i++) {
                const rule = dySTYLE_MediaQueryCSSBucket[i];
                dySTYLE_InternalStyleElement.insertAdjacentText("beforeend", rule);
            }
        }
    }
}








/**
 * Represents a dynamic style management system for managing CSS properties and values.
 */
class dySTYLE {
    
    #givenElement = null; // Element to which the css rule will be applied.
    #givenProperties = null; // The input string of CSS properties.
    #givenValues = null; // The input string of CSS values.
    #givenMediaQueryRule = null; // The type of rule for style application.
    #givenSpecSelection = null;
    #givenPseudoSelection = null;
    #givenStrictFlag = null;

    #validatedClassName = null;  

    #validatedProperties = []; // Array to store validated CSS properties.
    #inValidatedProperties = []

    #validatedValues = []; // Array to store validated CSS values. 
    #inValidatedValues = [];

    #validatedMediaQueryRule = null;
    #isTagNameSelector = false;

    #propertiesCount = 0; // The count of validated CSS properties.
    #valuesCount = 0; // The count of validated CSS values.

    cssRule = null; // The constructed CSS rule as a string.

    /**
     * Creates an instance of the dySTYLE class.
     *
     * @param {HTMLElement} element - The `element` parameter stores the HTML element to which the CSS rule will be applied.
     * @param {string} properties - The `properties` parameter stores the input string of CSS properties.
     * @param {string} values - The `values` parameter stores the input string of corresponding CSS values.
     * @param {string} [mediaQueryRule=null] - The `mediaQueryRule` parameter defines the rule for more advanced applications like media query.
     * 
     * The method calls `#startValidation()` to validate the properties and values upon instantiation.
     * 
     * @throws {Error} If the number of properties does not match the number of values.
     */
    constructor(element, properties, values, mediaQueryRule = null, specSelection = null, pseudoSelection = null, strictFlag = null) {
        
        this.#givenElement = element;
        this.#givenProperties = properties;
        this.#givenValues = values;
        this.#givenMediaQueryRule = mediaQueryRule;
        this.#givenSpecSelection = specSelection;
        this.#givenPseudoSelection = pseudoSelection;
        this.#givenStrictFlag = strictFlag;

        this.#startValidation();
    }










    /**
     * Validates the provided properties and values, ensuring they match in count and structure.
     * Constructs the CSS rule string if validation is successful.
     * 
     * @private
     * @throws {Error} If the number of validated properties does not equal the number of validated values.
     */
    #startValidation() {

        // Validate properties
        const propMatch = this.#matchRegex(this.#givenProperties, 'properties'); // Create regex match for properties.
        if (propMatch.regexMatched) {
            let propMatchCount = 0;
            while (propMatchCount < propMatch.regexMatches.length) {
                const pm = propMatch.regexMatches[propMatchCount];
                this.#validateCSSProperty(pm); // Validate each property.
                propMatchCount++;
            }
        } else {
            throw new Error("Error setting CSS rules: Invalid property detected! : " + this.regexMismatches);
        }

        // Validate values
        const valMatch = this.#matchRegex(this.#givenValues, 'values'); // Create regex match for values.
        if (valMatch.regexMatched) {
            let valMatchCount = 0;
            while (valMatchCount < valMatch.regexMatches.length) {
                const vm = valMatch.regexMatches[valMatchCount];
                this.#validateCSSValue(vm); // Validate each value.
                valMatchCount++;
            }
        } else {
            console.warn("Invalid value detected! : " + valMatch.regexMismatches);
        }

        // Validate media query rule
        this.#validateMediaQuery();

        // Check if counts of properties and values match
        if (this.#propertiesCount !== this.#valuesCount) {
            throw new Error(
                `Error setting CSS rules: The number of properties(${this.#propertiesCount}) must match the number of values(${this.#valuesCount}). 
                >> This can also happen if any of the properties or values is invalid or failed validation.
                >> See affected provisions:
                    Properties: ${this.#givenProperties}; 
                    Values: ${this.#givenValues}; 
                    Validated Properties: ${this.#validatedProperties.join(", ")}; 
                    Validated Values: ${this.#validatedValues.join(", ")}; 
                    Invalidated Properties: ${this.#inValidatedProperties.join(", ")}; 
                    Invalidated Values: ${this.#inValidatedValues.join(", ")}; 
                    Element: ${this.#givenElement.outerHTML}`
            );
        }

        // Check if the given element is a valid HTMLElement and exists in the DOM
        // If either check fails, throw an error indicating the issue with setting the CSS rules
        if (!(this.#givenElement instanceof HTMLElement) || !document.contains(this.#givenElement)) {
            throw new Error("Error setting CSS rules: Element is either not valid or does not exist in the DOM.");
        }

        this.#setRules();

    }










    /**
     * Sets and Validates the class name by replacing invalid characters (dots, hashtags, parentheses, and commas)
     * with underscores to ensure it conforms to valid class name conventions.
     *
     * @private
     * @throws {Error} If the given string is not provided or not a string type.
     */
    #setRules() {

        // Validate class name (using the given properties, values and MediaQueryRule (if available) joined together)
        const possibleMediaQueryRule = this.#givenMediaQueryRule ? `${this.#givenMediaQueryRule}_` : '';
        let operationString = `${possibleMediaQueryRule}_${this.#givenProperties}_${this.#givenValues}`;

        if (this.#givenSpecSelection) {
            const givenSpecInLC = this.#givenSpecSelection.toLowerCase();
            const givenElement = this.#givenElement;
        
            switch (true) {
                case givenSpecInLC.includes("allchildlikethis"):
                    // Get parent of the given element; get the tagname
                    const parentOfGivenElement = givenElement.parentElement;
                    if (parentOfGivenElement) {
                        const tagNameOfTheParentOfGivenElement = parentOfGivenElement.tagName.toLowerCase();
                        const tagNameOfTheGivenElement = givenElement.tagName.toLowerCase();
                        operationString = `${tagNameOfTheParentOfGivenElement} > ${tagNameOfTheGivenElement}`;
                        this.#isTagNameSelector = true;
                    }
                    break;
                case givenSpecInLC.includes("alloftype"):
                    operationString = `${givenElement.tagName.toLowerCase()}`;
                    this.#isTagNameSelector = true;
                    break;
                default:
                    // throw new Error("Invalid specific selection.");
                    
            }
            
        }

        // Ensure the given string is valid before proceeding
        if (typeof operationString !== 'string' || !operationString) {
            //throw new Error(`Invalid input: operationString must be a non-empty string: ${operationString}.`);
        }

        // Pattern to match characters that need to be replaced: dots, hashtags, parentheses, and commas
        const toBeReplacedPattern = '[.#(),]+'; // Characters to be replaced are placed inside brackets
        const toBeReplacedRegex = new RegExp(toBeReplacedPattern, 'g');

        // Replace invalid characters in the given string with underscores and store the result in the validated set
        this.#validatedClassName = operationString.replace(toBeReplacedRegex, '_');

        let validatedClassName = this.#validatedClassName;
        let validatedSelector = this.#validatedClassName;
        if (!this.#isTagNameSelector) {
            validatedSelector = `.${validatedSelector}`;
        }

        // Construct the CSS rule
        // Add the validated class name to the given element
        const cssRuleArray = this.#validatedProperties.map((property, index) => `${property}: ${this.#validatedValues[index]};`); // Create rule parts
        if (this.#validatedMediaQueryRule) {
            const validatedMediaQueryRule = this.#validatedMediaQueryRule;
            this.cssRule = `${validatedMediaQueryRule}{${validatedSelector}{${cssRuleArray.join(' ')}}}`;
        } else {
            this.cssRule = `${validatedSelector}{${cssRuleArray.join(' ')}}`; // Join the array into a single CSS rule string
        }


        if (!this.#isTagNameSelector) {
            this.#givenElement.classList.add(validatedClassName);
        }

    }

        




    #validateMediaQuery() {

        if (this.#givenMediaQueryRule && 
            this.#givenMediaQueryRule !== null && 
            this.#givenMediaQueryRule !== undefined
        ) {

            const mqsMap = {
                'orientation': '(orientation: ',
                'maxwidth': '(max-width: ',
                'minwidth': '(min-width: ',
                'maxheight': '(max-height: ',
                'minheight': '(min-height: ',
                'maxresolution': '(max-resolution: ',
                'minresolution': '(min-resolution: ',
                'landscape': 'landscape)',
                'portrait': 'portrait)',
            };
     
            // Initialize the result variable
            let mqs_Result = this.#givenMediaQueryRule.toLowerCase().replace(/^mq/, '');
            mqs_Result = mqs_Result.toLowerCase().replace(/_$/, '');
    
            const mqMatches = this.#givenMediaQueryRule.match(/(Orientation|MaxWidth|MaxHeight|MinWidth|MinHeight|MinResolution|MaxResolution)(Portrait|Landscape|\d+(?:DPPX|DPI|PX))((Orientation|MaxWidth|MaxHeight|MinWidth|MinHeight|MinResolution|MaxResolution)(Portrait|Landscape|\d+(?:DPPX|DPI|PX)))*/);
            if (mqMatches && mqMatches.length > 2) {
                for (let i = 0; i < mqMatches.length; i++) {
                    const mq = mqMatches[i];

                    if (mq) {
                        // Convert the query rule to lowercase for case-insensitive operation
                        const lc_MediaQueryRule = mq.toLowerCase();
                        if (mqsMap[lc_MediaQueryRule]) {
    
                            // Validate the mqs
                            const mqRegex = new RegExp(`${lc_MediaQueryRule}+`, 'g');
                            mqs_Result = mqs_Result.replace(mqRegex, mqsMap[lc_MediaQueryRule]);
    
                            // Validate the mqs lengths
                            const mqsL_Matches = mqs_Result.match(/(dpi|dppx|px)+/g);
                            if (mqsL_Matches && mqsL_Matches.length > 0) {
                                for (let i = 0; i < mqsL_Matches.length; i++) {
                                    const m = mqsL_Matches[i];
                                    mqs_Result = mqs_Result.replace(/(dpi|dppx|px)+/g, `${m}) `);
                                }
                            }
    
                            // Cleanup extra closing brackets
                            mqs_Result = mqs_Result.replace(/\)+\s*(?=\))/g, '');
    
                            // Set 'and' where there is ') ('; that is to replace ') (' with ') and ('
                            mqs_Result = mqs_Result.replace(/\)\s\(+/g, ') and (');
    
                        }
                    }
                }
            }
    
            // if this is now a valid media query, prepend the media query call
            if (mediaQueryRegex.test(mqs_Result)) {
                mqs_Result = `@media ${mqs_Result}`;
            }
    
            // Return the constructed media query or an empty string if not valid
            this.#validatedMediaQueryRule = mqs_Result;
        } else {
            this.#validatedMediaQueryRule = null;
        }
    }










    /**
     * Validates and normalizes a CSS property based on the dySTYLE system.
     *
     * @description
     * This method processes a given CSS property name according to dySTYLE rules. It:
     * - Normalizes the property to lowercase.
     * - Expands shorthand properties (like 'paddingt' to 'padding-top').
     * - Handles padding and margin shorthand combinations (e.g., 'PaddingTR').
     * - Removes hyphens for validation purposes and checks for a match in the dySTYLE_Properties list.
     *
     * If a match is found, the original property is added to `validatedSet`.
     * If no match is found, the property is added to `invalidatedSet`.
     * 
     * @private
     * @returns {void}
     */
    #validateCSSProperty(properties) {

        let styleProperty = properties;

        // Map of shorthand properties to their full forms
        const shorthandMap = {
            'paddingt': 'padding-top',
            'paddingr': 'padding-right',
            'paddingb': 'padding-bottom',
            'paddingl': 'padding-left',
            'margint': 'margin-top',
            'marginr': 'margin-right',
            'marginb': 'margin-bottom',
            'marginl': 'margin-left',
            'ai': 'align-items',
            'bd': 'border',
            'bdc': 'border-color',
            'bds': 'border-style',
            'bdw': 'border-width',
            'bg': 'background',
            'bgc': 'background-color',
            'bgs': 'background-size',
            'bs': 'box-shadow',
            'gtc': 'grid-template-columns',
            'gtr': 'grid-template-rows',
            'jc': 'justify-content'
        };

        // Match and handle padding and margin shorthand combinations like 'PaddingTR'
        const propSHMatch = styleProperty.match(/(Padding|Margin)((T|R|B|L){2,4}|(Y|X){1})/g);
        if (propSHMatch) {
            const propSHLeader = propSHMatch[0].match(/(Padding|Margin)/)[0].toLowerCase(); // Extract base property
            const propSHDirections = propSHMatch[0].match(/(T|R|B|L)/g); // Extract single-direction codes
            const propSHDouble = propSHMatch[0].match(/(Y|X)/g)?.[0]; // Extract double-direction codes (Y/X)
            
            // Map of single direction codes to full property names
            const propSHMap = { 'T': 'top', 'R': 'right', 'B': 'bottom', 'L': 'left' };

            // Handle single-direction shorthand combinations
            if (propSHDirections && propSHDirections.length > 1) {
                for (let i = 0; i < propSHDirections.length; i++) {
                    const dir = propSHDirections[i];
                    if (propSHMap[dir]) {
                        this.#validatedProperties.push(`${propSHLeader}-${propSHMap[dir]}`); // Add validated properties to the array.
                    } else {
                        this.#inValidatedProperties.push(styleProperty);
                    }
                }
            }

            // Handle Y and X shorthand combinations
            else if (propSHDouble === 'Y') {
                this.#validatedProperties.push(`${propSHLeader}-top`);
                this.#validatedProperties.push(`${propSHLeader}-bottom`);
            } else if (propSHDouble === 'X') {
                this.#validatedProperties.push(`${propSHLeader}-right`);
                this.#validatedProperties.push(`${propSHLeader}-left`);
            } else {
                this.#inValidatedProperties.push(styleProperty);
            }
        } 
        else {
            // Normalize the property to lowercase
            styleProperty = styleProperty.toLowerCase();

            // Replace shorthand properties with their full forms if present
            if (shorthandMap[styleProperty]) {
                styleProperty = shorthandMap[styleProperty];
            }

            // Remove hyphens for validation purposes
            const noHyphenProperty = styleProperty.replace(/-+/g, '');

            // Check for a match in the dySTYLE_Properties list
            for (const prop of dySTYLE_Properties) {
                const noHyphen_dP = prop.replace(/-+/g, '');
                if (noHyphenProperty === noHyphen_dP) {
                    this.#validatedProperties.push(prop);  // Add the original property to validatedSet
                    break;  // Exit loop once a match is found
                }
            }

            // If no match is found, add the property to invalidatedSet
            this.#inValidatedProperties.push(styleProperty);
        }

        // Update counts of validated properties
        this.#propertiesCount = this.#validatedProperties.length;
    }










    /**
     * Validates a CSS value based on the dySTYLE system.
     *
     * @description
     * This method processes the CSS value according to dySTYLE's specific rules. It handles 
     * the validation of values like `calc()` functions with custom operators (pl, mn, mp, dv, pct), 
     * numeric values, and lengths. If the value matches a predefined value in the `dySTYLE_Values` list, 
     * the original value is stored in the validated set. Otherwise, operators and hyphens are replaced 
     * according to the dySTYLE format.
     *
     * @private
     * @todo Enhance validation logic for non-calc and complex values.
     * @returns {void}
     */
    #validateCSSValue(values) {

        let styleValue = values;

        // Define operator mapping: converts dySTYLE operators to their corresponding standard operators
        const operatorMap = {
            'pl': '+',
            'mn': '-',
            'mp': '*',
            'dv': '/',
            'pct': '%'
        };


        // Check if the value starts with "calc" (indicating a calculated value)
        const isCalcValue = styleValue.startsWith('calc');


        /**
         * Regular expression to match several CSS value patterns:
         * This regex combines four different patterns:
         * - `hexColorOnlyPattern`: Matches a hex color value (e.g., `#FFF`, `#FFFFFF`).
         * - `borderSettingOnlyPattern`: Matches CSS border settings (e.g., `solid`, `dashed`, `none`).
         * - `digitLengthOnlyPattern`: Matches a length-based value that includes a unit (e.g., `10px`, `50%`, `15rem`).
         * - `digitOnlyPattern`: Matches a pure numeric value without a unit (e.g., `10`, `200`).
         * @type {RegExp}
         */
        const hexBorderDigitLength_or_LengthOnlyRegex = new RegExp(`${hexColorOnlyPattern}|${borderSettingOnlyPattern}|${digitLengthOnlyPattern}|${digitOnlyPattern}|${negativeDigitOnlyPattern}`);

        // Test if the value matches one of the patterns in the combined regex (like '100px', '200', '#FFF', or 'solid')
        const isHBDLD = hexBorderDigitLength_or_LengthOnlyRegex.test(styleValue);

        if (isCalcValue) {
            // If it's a calc() value, replace hyphens with spaces to prepare for validation
            styleValue = styleValue.replace(/-+/g, ' ');

            // Extract and validate operators in the calc() expression
            const matchedOperators = styleValue.match(/(pl|mn|mp|dv|pct)/g);
            if (matchedOperators && matchedOperators.length > 0) {

                // Replace dySTYLE operators with their mapped equivalents (e.g., 'pl' -> '+')
                for (let i = 0; i < matchedOperators.length; i++) {
                    const mo = matchedOperators[i];
                    if (operatorMap[mo]) {
                        const moRGX = new RegExp(mo, 'g');
                        this.#validatedValues.push(styleValue.replace(moRGX, operatorMap[mo]));
                    }
                }
            }

        } else if (isHBDLD) {

            // For numeric or length values, replace hyphens with spaces if present
            if (/-+/.test(styleValue)) {
                styleValue = styleValue.replace(/-+/g, ' ');
            }

            // If has float: 0[0-9]; validate with decimal point
            if (/^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?([0-9A-Fa-f]{2})?$/.test(styleValue)) {
                styleValue = styleValue;
            } else if (/\b0[0-9]{1}/.test(styleValue)) {
                const allDecimalNum = styleValue.match(/\b0[0-9]{1}/g);
                if (allDecimalNum && allDecimalNum.length > 0) {
                    for (let i = 0; i < allDecimalNum.length; i++) {
                        const adn = allDecimalNum[i];
                        const numAfterDecimal = adn.match(/\d/g)[1];
                        if (!isNaN(Number(numAfterDecimal))) {
                            styleValue = styleValue.replace(adn, '0.' + numAfterDecimal);
                        }
                    }
                }
            }

            // Check if the value contains specific dySTYLE operators (like 'mn' or 'pct')
            const matchedOperators = styleValue.match(/(mn|pct)/g);
            if (matchedOperators && matchedOperators.length > 0) {
                // Replace operators with their corresponding symbols
                for (let i = 0; i < matchedOperators.length; i++) {
                    const mo = matchedOperators[i];
                    if (operatorMap[mo]) {
                        const moRGX = new RegExp(mo, 'g');
                        this.#validatedValues.push(styleValue.replace(moRGX, operatorMap[mo]));
                    }
                }
            } else {
                
                // If no operators, simply push the style value as is
                this.#validatedValues.push(styleValue);
            }

        } else {
            // For other values, attempt to match against the dySTYLE_Values list
            const noHyphenValue = styleValue.replace(/-+/g, '');
            // Search through dySTYLE_Values for a match
            for (const val of dySTYLE_Values) {
                const noHyphen_dV = val.replace(/-+/g, '');
                if (noHyphenValue === noHyphen_dV) {
                    this.#validatedValues.push(val);  // Add the original matched value
                    break;  // Exit loop once a match is found
                }
            }
        }

        // Update counts of validated values
        this.#valuesCount = this.#validatedValues.length;
    }









    /**
     * Matches valid data for dySTYLE operations based on a given purpose.
     * Processes operation strings by splitting them and validating against specific patterns.
     * 
     * @private
     * @param {string} purpose - The purpose of the regex match, either 'properties' or 'values'.
     * @param {string} operationString - The string to be processed, which may contain multiple properties or values separated by dots.
     * @returns {Object} An object containing:
     * - `regexMatched` {boolean}: Whether all segments matched the regex.
     * - `regexMatches` {string[]}: An array of segments that matched the regex.
     * - `regexMismatches` {string[]}: An array of segments that did not match the regex.
     * - `regexSplitMatches` {string[]}: An array of all split segments (whether they matched or not).
     * @throws {Error} If the purpose provided is not valid ('properties' or 'values').
     * 
     */
    #matchRegex(operationString, purpose) {

        // Initialize arrays to store matches and mismatches
        let regexMatched = false;
        let regexMatches = [];
        let regexMismatches = [];
        let regexSplitMatches = [];

        // Validate the purpose argument, it must be either 'properties' or 'values'
        if (!['properties', 'values'].includes(purpose)) {
            throw new Error("Regex purpose not valid");
        }

        // Split the operation string by dots to get individual properties or values
        regexSplitMatches = operationString.split('.');

        // Handle 'properties' purpose
        if (purpose === 'properties') {
            
            // Use the properties pattern to test each property in the split array
            for (let i = 0; i < regexSplitMatches.length; i++) {
                const property = regexSplitMatches[i];
                const propertiesRegex = new RegExp(propertiesPattern, 'g'); 
                if (propertiesRegex.test(property)) {
                    regexMatches.push(property); // Collect matched properties
                } else {
                    regexMismatches.push(property); // Collect mismatched properties
                }
            }

        } else if (purpose === 'values') {
            
            // Use the values pattern to test each value in the split array
            for (let i = 0; i < regexSplitMatches.length; i++) {
                const value = regexSplitMatches[i];
                const valuesRegex = new RegExp(valuesOnlyPattern, 'g');
                if (valuesRegex.test(value)) {
                    regexMatches.push(value); // Collect matched values
                } else {
                    regexMismatches.push(value); // Collect mismatched values
                }
            }
        }

        // Determine if all segments matched by checking if there are no mismatches
        regexMatched = regexMismatches.length <= 0 && regexMatches.length > 0;

        // Return the results in a structured object
        return {
            regexMatched: regexMatched,
            regexMatches: regexMatches,
            regexMismatches: regexMismatches,
            regexSplitMatches: regexSplitMatches
        };
    }
        

}