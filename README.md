# PROHERB V2 — Medical / Premium Vue Website

A fully editable Vue 3 + Vite site with an original procedural Three.js supplement bottle, scroll-controlled pouring capsules, real catalog photos (53 user-provided images), product detail pages and a professional medical-corporate layout.

## Run

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).

## Production

```bash
npm run build
npm run preview
```

## Pages

- `/` — Home + WebGL 3D supplement bottle
- `/about` — About company
- `/experience` — Experience, markets, vision
- `/products` — Filterable catalog of 53 product photo entries
- `/products/:slug` — Individual product details
- `/contact` — Quote request form; copy, email, WhatsApp actions

## Important configuration

1. In `src/App.vue`, edit `company.email`, `company.whatsapp`, `company.phone` and `company.address` with the **real verified** contact details. If not configured, quote actions copy the formatted enquiry instead of sending it to an invented recipient.
2. Company-reported total sales are not independently verified. Only publish them with company approval.
3. Hero product bottle is a custom PROHERB-inspired 3D **concept**, not a precise manufacturing model or official label. The label says 60 softgels, 1000mg; confirm product/pack details before publication.
4. `public/logo.png` is the supplied logo. `public/products/p01.webp` ... `p53.webp` are the user's product photos.
5. Product label medical/therapeutic claims should be verified for each market before launch.
6. `src/data.js` contains all catalog entries. `src/components/SoftgelScene.vue` implements the 3D bottle, lighting, logo decal, capsules and scroll interaction.

## Notes

- English / Arabic RTL / Turkish switching.
- Site uses Google Fonts; browser falls back to system fonts without internet.
- For lower-power devices WebGL can be unavailable; the scene includes a fallback product image.
