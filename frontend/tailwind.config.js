module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },

  plugins: [require("daisyui")],
};

/* ea0607; */

/*  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#ea0607",

          secondary: "#58C7F3",

          accent: "#F3CC30",

          neutral: "#AB2626",

          "base-100": "#780404",

          "base-300": "AD1111",

          info: "#53C0F3",

          success: "#71EAD2",

          warning: "#F3CC30",

          error: "#E24056",
        },
      },
    ],
  }, */
