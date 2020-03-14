import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { Provider as PaperProvider, Title } from "react-native-paper";
import HeartButton from "./src/HeartButton";
import ServiceListItemComponent from "./src/ServiceListItemComponent";

import servicesJSON from "../BeautyTime/services.json";
import { Service } from "./src/Types";

const ServiceSelectionScreen = props => {
  const [services, setServices] = useState<Service[]>(
    Object.values<Service>(servicesJSON).map(s => ({
      title: s.title,
      selected: false,
      index: s.index
    }))
  );

  console.log("App::22: services :", JSON.stringify(services, null, 4));

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 32
      }}
    >
      <Title style={{ alignSelf: "center", paddingBottom: 24 }}>
        Select services being performed:
      </Title>
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

function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator screenOptions={{ title: "Beauty & the Brow" }}>
          <Stack.Screen name="Services" component={ServiceSelectionScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

export default App;
