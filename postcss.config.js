module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    // Flatten Tailwind v4's native CSS cascade layers (@layer) into specificity-based
    // CSS so the styles still apply in browsers older than ~early 2022 (Safari/iOS
    // < 15.4, Chrome < 99) that don't support @layer. Without this, ~99% of the
    // stylesheet is ignored on those browsers and the page renders unstyled.
    '@csstools/postcss-cascade-layers': {},
  },
}
