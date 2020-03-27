import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BeautyServiceList from "beauty-services/BeautyServiceList";
import useCustomFonts from "fonts/useCustomFonts";
import * as Animatable from "react-native-animatable";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Image,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import {
  Button,
  Card,
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
import {
  BeautyService,
  REPEAT_UNTIL_DONE_SIGNIFIER,
  Timing
} from "./src/Types";
import formatDuration from "./src/Utilities/formatDuration";

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
        Select services being performed
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 16
  },
  item: {
    padding: 12,
    flexDirection: "row"
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
type TimerListItemSegmentProps = {
  sequential: Timing[];
  left?: boolean;
  right?: boolean;
};

const endTime = 0;

const TimerListItemSegment = ({
  sequential,
  left,
  right
}: TimerListItemSegmentProps) => {
  const [step, setStep] = useState<number>(0);
  const [serviceCompleted, setServiceCompleted] = useState<boolean>(false);
  const count = sequential.length;
  const currentOption = sequential[step];
  const { time, start, reset, isRunning } = useTimer({
    timerType: "DECREMENTAL",
    endTime,
    initialTime: Math.floor(currentOption.seconds / 100)
  });

  console.log("App::172: time:", time);
  const stepComplete = time === endTime;

  const [flashing, flashBackground] = useState<boolean>(false);

  useEffect(() => {
    if (stepComplete && !serviceCompleted) {
      flashBackground(!flashing);
    } else {
      flashBackground(false);
    }
  }, [stepComplete, serviceCompleted]);

  const onPress = () => {
    if (serviceCompleted || isRunning) {
      return;
    } else if (!isRunning && !stepComplete) {
      start();
    } else if (step === count - 1) {
      setServiceCompleted(true);
    } else if (sequential[step + 1].title === REPEAT_UNTIL_DONE_SIGNIFIER) {
      reset();
    } else if (stepComplete) {
      reset();
      setStep(step + 1);
    }
  };

  return (
    <Card
      style={{
        flex: 1,
        marginHorizontal: 4
      }}
      onPress={onPress}
    >
      {!serviceCompleted ? (
        <Animatable.View
          transition="borderWidth"
          iterationCount={"infinite"}
          direction={"alternate"}
          onTransitionEnd={() => {
            if (stepComplete) {
              flashBackground(!flashing);
            }
          }}
          style={{
            padding: 8,
            alignItems: right ? "flex-end" : "flex-start",
            backgroundColor: flashing ? "red" : "white"
          }}
        >
          {left && <Text>LEFT</Text>}
          {right && <Text style={{ textAlign: "right" }}>RIGHT</Text>}
          <Text style={{ textAlign: right ? "right" : "left" }}>
            {currentOption.title}
          </Text>
          <Text>Remaining: {formatDuration(time)}</Text>
        </Animatable.View>
      ) : (
        <Text>Service Completed! ✅</Text>
      )}
    </Card>
  );
};

const TimerListItem = ({ option }) => {
  return (
    <View style={styles.item}>
      {option.leftRight && (
        <>
          <TimerListItemSegment left sequential={option.sequential} />
          <TimerListItemSegment right sequential={option.sequential} />
        </>
      )}

      {!option.leftRight && (
        <TimerListItemSegment sequential={option.sequential} />
      )}
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
      title: service.title,
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
        renderSectionFooter={thing => {
          if (!thing) {
            return null;
          } else {
            // Ew
            const showCompleteServiceButton = thing.section.data
              .map(o =>
                o?.sequential.map(timing => timing.title === "*").includes(true)
              )
              .includes(true);
            if (!showCompleteServiceButton) {
              return null;
            }
            return (
              <View style={{ padding: 14 }}>
                <Button
                  disabled={selectedServices.length === 0}
                  color="white"
                  mode="contained"
                  onPress={() => {
                    alert(
                      "TODO - MARK COMPLETE - " + thing.section.service.title
                    );
                  }}
                >
                  Mark Service Complete
                </Button>
              </View>
            );
          }
        }}
        refreshControl={null}
        showsVerticalScrollIndicator={false}
        sections={sections}
        refreshing={true}
        keyExtractor={(item, index) => {
          return index + "";
        }}
        renderItem={thing => {
          const item = thing.item;
          if (!item) {
            return null;
          }

          return <TimerListItem option={item} />;
        }}
        renderSectionHeader={({ section }) => {
          return <Text style={styles.header}>{section.title}</Text>;
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
                      alignItems: "center",
                      flexDirection: "row",
                      marginTop: 30,
                      padding: 12
                    }}
                  >
                    <Image
                      style={{
                        flex: 1,
                        height: 120,
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
