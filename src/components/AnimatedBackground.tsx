import { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";

export type AnimatedBackgroundProps = {
  children?: React.ReactNode;
  flashing?: boolean;
};
export const AnimatedBackground = ({
  children,
  flashing,
}: AnimatedBackgroundProps) => {
  const [backgroundColor] = useState(new Animated.Value(0));

  const animateBackground = () => {
    Animated.loop(
      Animated.timing(backgroundColor, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      })
    ).start();
  };
  const stopAnimation = () => {
    backgroundColor.stopAnimation();
  };

  useEffect(() => {
    if (flashing) {
      animateBackground();
    } else {
      stopAnimation();
    }
  }, [flashing]);

  const backgroundColorInterpolation = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "#ff0000"],
  });

  const animatedStyle = {
    backgroundColor: backgroundColorInterpolation,
  };

  const nonAnimatingStyle = {
    backgroundColor: "transparent",
  };

  const additionalStyles = flashing ? animatedStyle : nonAnimatingStyle;

  return (
    <View>
      <Animated.View style={[styles.view, additionalStyles]}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    // width: 100,
    // height: 100,
  },
});
