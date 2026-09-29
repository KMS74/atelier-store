# Design Reference

Visual direction for Atelier Store, based on a study of a luxury fashion house's website (studied 2026-09-29 at 1440px and 390px viewports). This file only records structure, proportions and interaction patterns. None of the reference's text, logos, fonts, monograms or other brand assets should be copied.

The tokens described here are implemented in `src/app/globals.css` (see [Token map](#token-map)).

**Coverage gap:** the homepage, header, navigation drawer, footer and modals were studied directly. The reference site blocks automated access to its category (PLP) and product (PDP) pages, so product-grid and product-page guidance below is inferred from the product tiles in the navigation drawer. Revisit this section with manual screenshots before building PLP/PDP.

## Principles

- Monochrome UI: black, white and one gray. The photography supplies all the color.
- No decoration: square corners, no shadows, no gradients, no card frames.
- Hierarchy comes from weight contrast (thin large titles next to tiny bold uppercase labels), not from many sizes.
- Imagery runs edge to edge with no gaps between images.

## Typography

- One geometric sans family for everything, in weights 100, 400, 500 and 700.
- One display serif, used only for the wordmark (logo and the oversized footer wordmark).
- Letter-spacing is slightly tight everywhere: about -0.03em to -0.04em for normal text and -0.05em for uppercase labels. This app loosens uppercase labels to +0.04em because Jost crowds at tight tracking.
- Font sizes don't change between mobile and desktop.

| Role | Size / line height | Weight | Case | Tracking |
|---|---|---|---|---|
| Label (section headings, buttons, "MENU") | 12 / 16 | 700 | Uppercase | -0.05em (reference); +0.04em in this app, since Jost is wider |
| Caption (small body, footer links, image captions) | 12 / 16 | 500 | Normal | -0.03em |
| Body, input text | 16 / 24 | 400 (inputs 100) | Normal | -0.04em |
| Nav (main menu items) | 20 / 28 | 500 | Normal | -0.04em |
| Title (drawer and modal titles) | 24 / 32 | 500 | Uppercase | -0.03em |
| Headline (large titles, drawer second level) | 32 / 40 | 100 or 400 | Normal or uppercase | -0.03em |

Open fonts chosen for this app: **Jost** (sans) and **Bodoni Moda** (display serif).

## Color

| Token | Value | Use |
|---|---|---|
| ink | `#000000` | Text, primary buttons, dark sections (footer, video) |
| paper | `#ffffff` | Page and drawer background, text on dark |
| muted | `#767676` | Secondary text |
| line | `rgb(0 0 0 / 0.15)` | Dividers, accordion rules |
| line-inverse | `rgb(255 255 255 / 0.5)` | Input underlines on dark backgrounds |
| scrim | `rgb(0 0 0 / 0.4)` | Backdrop behind drawers and modals (combined with a blur) |
| surface | `#efefef` | Flat light-gray background behind product cut-outs |

There is no accent color, and hover states don't change color.

## Layout and spacing

- 8px vertical rhythm: links spaced 44px apart, groups 24px apart, sections 64-80px apart.
- Side margin (gutter): 24px on mobile, 64px on desktop. At 1440px wide that leaves 1312px of content on a 12-column grid.
- Header height: 72px.
- Footer on desktop: two narrow link columns (about 310px each) on the left and one half-width column on the right for store locator, newsletter and country selector.
- Image sections ignore the gutter and run full-bleed.

## Navigation

- **Header:** fixed at the top, 72px tall, transparent over the hero with white content.
  - Left: a small text link with a plus icon.
  - Center: the wordmark (about 143x23).
  - Right: 24px line icons (bag, account, search) and a hamburger icon with a bold uppercase "MENU" label.
- **No horizontal menu bar.** All navigation lives in a drawer that slides in from the right.
- **Drawer:** 600px wide on desktop, white, 80px left padding, round 48px black close button in the top-right corner. The rest of the page is blurred and darkened behind it.
  - Top level: category names in the Nav style, spaced 48px apart; then a smaller group of utility links (16px); then small underlined account links at the bottom.
  - Second level: replaces the list. A small underlined uppercase "‹ BACK" link, a thin Headline title, a 2-column grid of featured tiles, then a plain list of subcategories.

## Product presentation (inferred)

- Product photos are cut-outs on the flat `surface` gray, filling the tile width with no inner padding.
- Product name sits directly below the image in Body style, left-aligned. No border or card frame.
- Drawer tiles are about 3:2 (211x141) with an 18px gap.

## Imagery

- **Hero:** full-screen video, with small overlay controls: a time readout, mute and pause buttons in 24px dark circles, and a scrubber bar.
- **Runway grid:** tall 9:16 portrait images, 3 across on desktop and 1 across on mobile, no gaps.
- **Editorial block:** a full-bleed crop with a centered two-line caption (a Caption-style title and an underlined link).
- Photos are shown untouched: no overlays, tints or frames.

## Buttons, links, inputs and borders

- **Primary button:** solid ink rectangle, paper Label-style text, square corners, 40-48px tall.
- **Secondary button:** same shape, 1px ink outline, transparent fill.
- **Text links:** underlined, including footer links.
- **Inputs:** no box. Just a 1px bottom line, a 16px weight-100 placeholder, and a chevron submit icon on the right.
- **Round shapes:** only icon buttons (close, video controls). Everything else is square.

## Responsive behavior

- The header keeps its three-part layout on mobile.
- Image grids collapse from 3 across to 1 across.
- Footer columns become accordions (chevrons, `line` dividers). The store-locator and newsletter blocks move above the link groups.
- Modals become bottom sheets on mobile, with a round close button floating above them.
- The gutter drops from 64px to 24px. Font sizes stay the same.
- The page ends with an oversized serif wordmark spanning the full width, at every size.

## Token map

Tailwind v4 utilities defined in `src/app/globals.css`:

| Area | Utilities |
|---|---|
| Fonts | `font-sans` (Jost), `font-display` (Bodoni Moda) |
| Colors | `ink`, `paper`, `muted`, `line`, `line-inverse`, `scrim`, `surface` with any color utility (`bg-ink`, `text-muted`, `border-line`...) |
| Type | `text-caption`, `text-body`, `text-nav`, `text-title`, `text-headline` (size, line height and tracking), plus `text-label` (12px bold uppercase) |
| Spacing | `px-page` (responsive gutter), `gutter` / `gutter-lg`, `header`, `drawer` in any spacing utility (`h-header`, `w-drawer`, `pt-header`...) |
| Layout | `max-w-page` (1440px) |
| Aspect ratio | `aspect-portrait` (9:16), `aspect-tile` (3:2) |
