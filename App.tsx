import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BeautyServiceList from "beauty-services/BeautyServiceList";
import useCustomFonts from "fonts/useCustomFonts";
import { useState } from "react";
import * as React from "react";
import { Dimensions, Image, SectionList, View, StyleSheet } from "react-native";
import {
  Button,
  Headline,
  Provider as PaperProvider,
  Text
} from "react-native-paper";

import ApplicationStyles from "themes/ApplicationStyles";
import { useTimer } from "use-timer";
import BeautyServiceOptionList from "./src/BeautyServices/BeautyServiceOptionList";
import useBeautyServices, {
  BeautyServiceProvider
} from "./src/BeautyServices/BeautyServicesContext";
import { BeautyService, REPEAT_UNTIL_DONE_SIGNIFIER } from "./src/Types";

const serviceSelectionButtonText = (
  first: BeautyService,
  selected: BeautyService[]
): string => {
  if (selected.length === 0) {
    return "Please Select at Least One Service";
  } else if (first === undefined) {
    return "Start Session";
  } else {
    return "NEXT: Select Options for Services";
  }
};

const ServiceSelectionScreen = ({ navigation }) => {
  const { firstServiceToConfigure, selectedServices } = useBeautyServices();

  return (
    <View style={ApplicationStyles.screen.serviceSelection}>
      <Headline style={{ alignSelf: "center", paddingBottom: 24 }}>
        Select services being performed:
      </Headline>
      <BeautyServiceList />
      <Button
        contentStyle={{ marginVertical: 32 }}
        disabled={selectedServices.length === 0}
        color="black"
        mode="contained"
        onPress={() => {
          if (firstServiceToConfigure) {
            navigation.navigate("Options", {
              name: firstServiceToConfigure.title
            });
          } else {
            navigation.navigate("Timers");
          }
        }}
      >
        {serviceSelectionButtonText(firstServiceToConfigure, selectedServices)}
      </Button>
    </View>
  );
};

const optionsSelectionButtonText = (
  current: BeautyService,
  next: BeautyService
): string => {
  const selectedOptionsCount = current.options.filter(o => o.selected).length;

  if (selectedOptionsCount === 0 && !current.singleOption) {
    return "Please Select at Least One Option";
  } else if (selectedOptionsCount === 0 && current.singleOption) {
    return "Please Select One Option";
  } else if (next !== undefined) {
    return `NEXT: Select Options for ${next.title}`;
  } else {
    return "Start Session";
  }
};

const OptionsScreen = ({ route, navigation }) => {
  const {
    findServiceByName,
    getNextSelectedServiceWithOptions
  } = useBeautyServices();
  const service = findServiceByName(route.params.name);
  const nextService = getNextSelectedServiceWithOptions(service);
  return (
    <View style={ApplicationStyles.screen.options}>
      <BeautyServiceOptionList service={findServiceByName(route.params.name)} />

      <Button
        contentStyle={{ marginVertical: 32 }}
        color="black"
        mode="contained"
        disabled={service.options.filter(o => o.selected).length === 0}
        onPress={() => {
          if (nextService) {
            navigation.navigate("Options", {
              name: nextService.title
            });
          } else {
            navigation.navigate("Timers");
          }
        }}
      >
        {optionsSelectionButtonText(service, nextService)}
      </Button>
    </View>
  );
};

const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  }
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 16
  },
  item: {
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    color: "white",
    padding: 12,
    backgroundColor: "black"
  },
  title: {
    fontSize: 24
  }
});

const TimerListItem = ({ option }) => {
  const [step, setStep] = useState<number>(0);
  const count = option.sequential.length;
  const currentOption = option.sequential[step];
  const { time, start, pause, reset, isRunning } = useTimer({
    timerType: "DECREMENTAL",
    initialTime: currentOption?.seconds
  });
  return (
    <View style={styles.item}>
      <Text style={styles.title}>
        {option?.title} ({count} steps)
      </Text>
      <Text style={styles.title}>
        Left and right? {option.leftRight ? "Yes" : "No"}
      </Text>
      <Text
        onPress={() => {
          console.log(
            "App::168: {step, count, currentOption} :",
            JSON.stringify({ step, count, currentOption }, null, 4)
          );
          if (step === -1) {
            return;
          }
          if (
            step === count - 1 &&
            currentOption.title !== REPEAT_UNTIL_DONE_SIGNIFIER
          ) {
            setStep(-1);
          } else if (currentOption.title === REPEAT_UNTIL_DONE_SIGNIFIER) {
            console.log(
              `App::181: done incrementing, just repeat until finished`
            );
            console.log(`App::182: to repeat:`);
            console.log(
              "App::183: option.sequential[step - 1] :",
              JSON.stringify(option.sequential[step - 1], null, 4)
            );
          } else {
            setStep((step + 1) % count);
          }
        }}
        style={styles.title}
      >
        step {step}
        {JSON.stringify(option.sequential[step], null, 4)}
      </Text>
      <Button onPress={start}>start</Button>
      <Button onPress={pause}>pause</Button>
      <Button onPress={reset}>reset</Button>
      <Text>Elapsed time: {time}</Text>
      {isRunning && <Text>Running...</Text>}
    </View>
  );
};

const TimersScreen = ({ route, navigation }) => {
  const { selectedServices } = useBeautyServices();
  const sections = selectedServices.map(service => {
    const defaultOptions = service.defaultOptions?.map(opt => ({
      ...opt,
      leftRight: service.leftRight
    }));

    return {
      data: service.options
        .filter(o => o.selected)
        .map(o => ({ ...o, leftRight: service.leftRight }))
        .concat(defaultOptions),
      service
    };
  });

  return (
    <View style={ApplicationStyles.screen.timers}>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={sections}
        keyExtractor={(item, index) => index + ""}
        renderItem={({ item }) => {
          if (!item) return null;
          return <TimerListItem option={item} />;
        }}
        renderSectionHeader={({ section }) => {
          return <Text style={styles.header}>{section.service.title}</Text>;
        }}
      />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  const { loading } = useCustomFonts();

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
                      backgroundColor: "white",
                      alignItems: "center",
                      flexDirection: "row",
                      marginTop: 30,
                      padding: 12
                    }}
                  >
                    <Image
                      style={{
                        flex: 1,
                        margin: 24
                      }}
                      source={require("../BeautyTime/assets/bb_logo.png")}
                      resizeMode="contain"
                    />
                  </View>
                )
              };
            }}
          >
            <Stack.Screen name="Services" component={ServiceSelectionScreen} />
            <Stack.Screen name="Options" component={OptionsScreen} />
            <Stack.Screen name="Timers" component={TimersScreen} />
          </Stack.Navigator>
        </BeautyServiceProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
