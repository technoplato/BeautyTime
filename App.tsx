import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Headline, Provider as PaperProvider, Title } from "react-native-paper";
import * as Font from "expo-font";

import servicesJSON from "../BeautyTime/services.json";
import ServiceListItemComponent from "./src/ServiceListItemComponent";
import { Service } from "./src/Types";
import ApplicationStyles from "./src/Themes/ApplicationStyles";

const ServiceSelectionScreen = props => {
  const [services, setServices] = useState<Service[]>(servicesJSON);

  return (
    <View style={ApplicationStyles.screen.mainContainer}>
      <Headline style={{ alignSelf: "center", paddingBottom: 24 }}>
        Select services being performed:
      </Headline>
      {services.map(service => {
        return (
          <ServiceListItemComponent
            key={service.title}
            onToggle={selected => {
              setServices(old => {
                const tmp = [...old];
                tmp[service.index] = { ...service, selected };
                return tmp;
              });
            }}
            selected={service.selected}
            service={service}
          />
        );
      })}
    </View>
  );
};
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!loading) return;
    Font.loadAsync({
      "champagne-limousines": require("./assets/fonts/ChampagneLimousines.ttf"),
      "champagne-limousines-bold": require("./assets/fonts/ChampagneLimousinesBold.ttf"),
      "champagne-limousines-italic": require("./assets/fonts/ChampagneLimousinesItalic.ttf")
    }).then(() => setLoading(false));
  }, [loading]);

  if (loading) return null;

  return (
    <NavigationContainer>
      <PaperProvider theme={ApplicationStyles.theme}>
        <Stack.Navigator screenOptions={{ title: "Beauty & the Brow" }}>
          <Stack.Screen name="Services" component={ServiceSelectionScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
