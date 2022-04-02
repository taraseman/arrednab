import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      500: "#4C6FFF",
    },
    secondary: {
      500: "#1DC7B8",
    },
    grey: {
      50: "#E5E5E5",
      100: "#F5F6FA",
      150: "#E3E7F2",
      170: "#c7c7c7",
      200: "#DFE1E5",
      250: "#A7B0C7",
      300: "#8890A0",
      400: "#576073",
      500: "#3D454E",
      600: "#172635",
    },
    red: {
      400: "#EB5757",
      500: "#E03D28",
    },
    yellow: {
      300: "#FFDA00",
      500: "#BB9900",
    },
    blue: {
      300: "#9EE6FE",
      400: "#5A7DDD",
      500: "#4C6FFF"
    },
    white: "#FFFFFF",
  },
  fonts: {
    body: "Roboto",
  },
  fontSizes: {
    xs: "0.75rem", // 12px
    md: "0.875rem", // 14px
    lg: "1rem", // 16px
    xl: "1.25rem", // 20px
    "2xl": "1.625rem", // 26px
  },
  styles: {
    global: {
      body: {
        color: "grey.600",
        bg: "grey.100",
        height: "100%",
      },
      html: {
        height: "100%",
      },
      "#root": {
        height: "100%",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: '3px'
      }
    },
    Text: {
      baseStyle: {
        fontSize: "md",
        fontFamily: "Roboto",
      },
    },
    Badge: {
      baseStyle: {
        padding: "0.5625rem 0.8125rem",
        fontWeight: "normal",
        borderRadius: "4px",
      },
      variants: {
        outline: {
          color: "grey.600",
          borderColor: "grey.300",
        },
        solid: {
          background: "grey.600",
        },
      },
    },
  },
});

export default theme;
