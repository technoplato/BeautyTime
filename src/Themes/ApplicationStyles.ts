import { DefaultTheme } from "react-native-paper";
import Colors from "./Colors";

const theme = {
  ...DefaultTheme,
  fonts: {
    regular: { fontFamily: "champagne-limousines" },
    medium: { fontFamily: "champagne-limousines-bold" },
    light: { fontFamily: "champagne-limousines-italic" },
    thin: { fontFamily: "champagne-limousines-italic" }
  }
};

const ApplicationStyles = {
  screen: {
    serviceSelection: {
      flex: 1,
      backgroundColor: Colors.background
    },
    options: {
      flex: 1,
      backgroundColor: Colors.background
    },
    timers: {
      flex: 1,
      backgroundColor: Colors.background
    }
  },
  theme
};

export default ApplicationStyles;
