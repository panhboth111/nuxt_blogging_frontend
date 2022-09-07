const colors = require("tailwindcss/colors");
module.exports = {
  purge: [],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        100: "28rem",
        102: "34rem",
        104: "40rem",
        next_articles: "90vh",
      },
      width: {
        100: "28rem",
        104: "40rem",
      },
      maxHeight: {
        trending: "80vh",
      },
      minHeight: {
        trending: "80vh",
      },
      gridTemplateColumns: {
        article: "3fr 5fr",
      },
    },
    colors: {
      ...colors,
      primary: "#E50914",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
