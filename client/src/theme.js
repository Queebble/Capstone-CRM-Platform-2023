// color design tokens export
// this is setup to be expanded upon using tailwind themes addon

/* 
you can show a range of colors like this in a singe block and specify the number in the code.
black: {
    100: "#ccd8e0",
    200: "#9ab1c1",
    300: "#6789a2",
    400: "#356283",
    500: "#023b64",
    600: "#022f50",
    700: "#01233c",
    800: "#011828",
    900: "#000c14"
},

 This code defines color design tokens and MUI theme settings. The color tokens represent different color shades
 used in the application. They are set up with unique names and numeric codes. The MUI theme settings are defined
 to use the specified font family ("Montserrat") and font sizes for different heading levels.

 Additionally, the design tokens can be shown with multiple shades of the same color by specifying the number
 (e.g., black 100, black 200, etc.), though it is not used in this specific code. The color tokens can be easily
 customized and expanded upon to match the design requirements of the application.
 */
export const tokens = {
  // Define color tokens used in the application
  primaryblue: {
    500: "#023b64", // main blue color
  },
  secondarypink: {
    500: "#E48F92",
  },
  secondarygreen: {
    500: "#A8DADC",
  },
  background: {
    500: "#efefef", // background color
    600: "ffffff", // secondary background color
  },
  textoffblack: {
    500: "#333333", // text color
  },
  white: {
    500: "#ffffff", // pure white color
  },
  fadedtext: {
    500: "#90909F", // faded text color
  },
  uifadedblue: {
    500: "#6E8AA1", // faded UI blue color
  },
  uigreen: {
    500: "#D8E9E7", // green color
  },
  buttonborder: {
    500: "#C7C7C7", // border color of buttons
  },
  contentspacergrey: {
    500: "#E0E0E0", // content spacers color from figma
  },
  topuifill: {
    500: "#F9F9F9", // top UI fill color
  },
  scrollbarforeground: {
    500: "#DADADA", // scrollbar foreground color
  },
  scrollbarbackground: {
    500: "#F3F3F3", // scrollbar background color
  },
  sidebaruispacer: {
    500: "#004c82", // blue spacer bars on sidebar
  },
  sidebarHover: {
    500: "#024778", // sidebar hover color
  },
};

// mui theme settings
export const themeSettings = () => {
  // Define MUI theme settings using the color tokens defined above
  return {
    palette: {
      // Define the palette values using color tokens
      primaryblue: {
        default: tokens.primaryblue[500],
      },
      secondarypink: {
        default: tokens.secondarypink[500],
      },
      secondarygreen: {
        default: tokens.secondarygreen[500],
      },
      background: {
        default: tokens.background[500],
        alt: tokens.background[600],
      },
      textoffblack: {
        default: tokens.textoffblack[500],
      },
      white: {
        default: tokens.white[500],
      },
      fadedtext: {
        default: tokens.fadedtext[500],
      },
      uifadedblue: {
        default: tokens.uifadedblue[500],
      },
      uigreen: {
        default: tokens.uigreen[500],
      },
      buttonborder: {
        default: tokens.buttonborder[500],
      },
      contentspacergrey: {
        default: tokens.contentspacergrey[500],
      },
      topuifill: {
        default: tokens.topuifill[500],
      },
      scrollbarforeground: {
        default: tokens.scrollbarforeground[500],
      },
      scrollbarbackground: {
        default: tokens.scrollbarbackground[500],
      },
      sidebaruispacer: {
        default: tokens.sidebaruispacer[500],
      },
      sidebarHover: {
        default: tokens.sidebarHover[500],
      },
    },
    typography: {
      // Define typography settings using the "Montserrat" font family
      fontFamily: ["Montserrat", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Montserrat", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
