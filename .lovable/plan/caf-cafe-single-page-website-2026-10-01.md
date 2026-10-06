# CAF Cafe — single-page website

A warm, mobile-first site for CAF Cafe (كاف كافيه) at Crystal Tower, Kuwait City. Everything lives on the home page, with the two key actions — Get Directions and Call CAF Cafe — always easy to reach.

## Sections

1. **Header** — CAF Cafe wordmark with كاف كافيه beneath, links to Menu / About / Visit Us, and a Get Directions button. Compact menu on phones.
2. **Hero** — large cafe photo, headline "Your coffee moment in the heart of Kuwait City.", supporting line, Get Directions (map search) and Call CAF Cafe (tel:+96552553551), plus "Open daily, 7 AM–11 PM".
3. **Menu highlights** — category cards only, no invented items or prices: Coffee, Matcha, Mojitos, Ice Cream, Cookies, Cakes, Desserts.
4. **About** — short, grounded welcome copy. No invented history or claims.
5. **Visit us** — address, phone, daily hours, both action buttons, and a simple map area linking out to Google Maps.
6. **Reviews** — "4.1/5 on Google · 635 reviews" shown as listing information, with a link to reviews on Google Maps. No testimonials.
7. **Footer** — both names, address, phone, hours, directions link.

## Look and feel

Warm cream background, deep espresso text, one restrained caramel accent. Generous spacing, elegant headline typeface paired with a clean body face, soft corners, minimal motion. No gradients or glassy effects.

## Images

Cafe photos will be generated (hero plus a few category visuals) and labelled in the code as replaceable placeholders, not presented as photos of this specific location.

## Technical notes

- Built on the existing TanStack Start setup; the home route `src/routes/index.tsx` becomes the page.
- Section components under `src/components/` (Header, Hero, MenuHighlights, About, Visit, Reviews, Footer) sharing one spacing/typography scale.
- Palette, fonts and radii added as semantic tokens in `src/styles.css`; no hardcoded colors in components.
- Fonts loaded via a `<link>` in `src/routes/__root.tsx`.
- Page title, description and social tags set on the home route.
- Semantic landmarks, descriptive alt text, keyboard-reachable nav, AA contrast, no horizontal scroll.

## Not included

No menu prices, testimonials, awards, email addresses, or social accounts — nothing beyond the supplied details.
