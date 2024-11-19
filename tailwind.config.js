/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //Primary colors
        kpmgBlue: "#00338D",
        cobaltBlue: "#1E49E2",
        darkBlue: "#0C243C",
        lightBlue: "#ACEAFF",
        pacificBlue: "#00B8F6",
        kpmgPurple: "#7213EA",
        kpmgPink: "#FD349C",
        //Accent colors for infographic and charts only
        infoBlue: "#76D2FF",
        infoDarkPurple: "#510DBC",
        infoLightPurple: "#B497FF",
        infoDarkPink: "#AB0D82",
        infoLightPink: "#FFA3DA",
        infoDarkGreen: "#098E7E",
        infoGreen: "#00C0AE",
        infoLightGreen: "#63EBDA",
        //Neutrals for infographic and charts only
        infoGrey1: "#333333",
        infoGrey2: "#666666",
        infoGrey3: "#989898",
        infoGrey4: "#B2B2B2",
        infoGrey5: "#E5E5E5",
        white: "#FFFFFF",
        //traffic light palette
        trafficRed: "#ED2124",
        trafficYellow: "#F1C44D",
        trafficGreen: "#269924",
      },
    },
    animation: {
      fadeIn: "fadeIn 0.3s ease-in-out",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: 0, transform: "scale(0.95)" },
        "100%": { opacity: 1, transform: "scale(1)" },
      },
    },
  },
  plugins: [],
};
