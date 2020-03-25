import * as Font from "expo-font";
import { useEffect, useState } from "react";

const useCustomFonts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!loading) return;
    Font.loadAsync({
      "champagne-limousines": require("../../assets/fonts/ChampagneLimousines.ttf"),
      "champagne-limousines-bold": require("../../assets/fonts/ChampagneLimousinesBold.ttf"),
      "champagne-limousines-italic": require("../../assets/fonts/ChampagneLimousinesItalic.ttf")
    }).then(() => setLoading(false));
  }, [loading]);

  return { loading };
};

export default useCustomFonts;
