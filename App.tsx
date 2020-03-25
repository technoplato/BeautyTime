import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { View, Image, Dimensions } from "react-native";
import {
  Button,
  Text,
  Headline,
  Provider as PaperProvider
} from "react-native-paper";

import BeautyServiceList from "beauty-services/BeautyServiceList";
import { BeautyServiceProvider } from "beauty-services/BeautyServicesContext";
import ApplicationStyles from "themes/ApplicationStyles";
import useCustomFonts from "fonts/useCustomFonts";
import * as metrics from "themes/Metrics";

const ServiceSelectionScreen = ({ navigation }) => {
  return (
    <View style={ApplicationStyles.screen.mainContainer}>
      <Headline style={{ alignSelf: "center", paddingBottom: 24 }}>
        Select services being performed:
      </Headline>
      <BeautyServiceList />
      <Button
        style={{ paddingBottom: 32 }}
        color="black"
        mode="text"
        onPress={() => navigation.navigate("Details")}
      >
        Choose Options for Services
      </Button>
    </View>
  );
};

const DetailsScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  const { loading } = useCustomFonts();

  const { width } = Dimensions.get("window");
  const padding = 42;

  if (loading) return null;

  return (
    <NavigationContainer>
      <PaperProvider theme={ApplicationStyles.theme}>
        <BeautyServiceProvider>
          <Stack.Navigator
            screenOptions={({ navigation, route }) => {
              return {
                header: () => (
                  <View
                    style={{
                      height: 120,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Image
                      style={{
                        width: width - 2 * padding,
                        marginTop: 30
                      }}
                      source={require("../BeautyTime/assets/bb_logo.png")}
                      resizeMode="contain"
                    />
                  </View>
                )

                // headerTitle: () => <Headline>Beauty & the Brow Icon</Headline>,
                // headerTitle: () => (
                //   <View
                //     style={{
                //       padding,
                //       marginTop: 12,
                //       width,
                //       justifyContent: "center",
                //       flexDirection: "row"
                //     }}
                //   >
                //     <Image
                //       style={{
                //         width: width - 2 * padding
                //       }}
                //       source={require("../BeautyTime/assets/bb_logo.png")}
                //       resizeMode="contain"
                //     />
                //   </View>
                // ),
                // headerLeft: () => {
                //   if (
                //     !["services", "timers"].includes(route.name.toLowerCase())
                //   ) {
                //     return (
                //       <Text
                //         style={{ paddingLeft: 16 }}
                //         onPress={() => navigation.goBack()}
                //       >
                //         back
                //       </Text>
                //     );
                //   }
                // }
              };
            }}
          >
            <Stack.Screen name="Services" component={ServiceSelectionScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
          </Stack.Navigator>
        </BeautyServiceProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
