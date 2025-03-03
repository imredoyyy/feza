export default {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-replace": {
      pattern: /(\*, ::before, ::after)/g,
      data: {
        "*, ::before, ::after": ":root",
      },
    },
  },
};
