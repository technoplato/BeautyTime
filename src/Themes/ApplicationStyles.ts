import { DefaultTheme } from "react-native-paper";
import Colors from "./Colors";

const theme = {
  ...DefaultTheme,
  fonts: {
    regular: { fontSize: 20, fontFamily: "champagne-limousines" },
    medium: { fontSize: 20, fontFamily: "champagne-limousines-bold" },
    light: { fontSize: 20, fontFamily: "champagne-limousines-italic" },
    thin: { fontSize: 20, fontFamily: "champagne-limousines-italic" }
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
