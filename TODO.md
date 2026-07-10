# TODO - Modern Luxury Rectangular Design Refresh


## Step 1: Create unified design tokens (palette + surfaces)
- [x] Update `src/app/globals.css` CSS variables to requested cream/white/bronze/charcoal/divider palette.


## Step 2: Ensure consistent radius system
- [x] Verify `--radius` maps to 6–8px (target: 7px) and update if needed in `src/app/globals.css` and/or `tailwind.config.js`.


## Step 3: Update shared UI primitives (high leverage)
- [x] Update `src/components/ui/button.tsx` variants to use the unified rectangular radius + bronze hover/focus.
- [x] Update `src/components/ui/card.tsx` surface/border/radius to match tokens.


## Step 4: Layout-level background + typography
- [x] Update `src/app/layout.tsx` / global body classes to enforce cream background and charcoal text.


## Step 5: Scan & update remaining components/pages
- [ ] Search for pill/fully-rounded controls, rounded-full, radius 999, etc. and replace with rectangular radius.
- [ ] Update forms (input/select/textarea/button/dropdowns) to match borders/radius/focus rings.
- [ ] Update cards/sections/feature/service components.

## Step 6: Build & validate
- [ ] Run lint/build (`npm run build`, `npm run lint` if available).
- [ ] Quick manual responsive verification.

