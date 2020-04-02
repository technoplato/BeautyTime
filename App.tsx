import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BeautyServiceList from "beauty-services/BeautyServiceList";
import useCustomFonts from "fonts/useCustomFonts";

import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  Button,
  Card,
  Headline,
  Provider as PaperProvider
} from "react-native-paper";
import ApplicationStyles from "themes/ApplicationStyles";
import { useTimer } from "use-timer";
import BeautyServiceOptionList from "./src/BeautyServices/BeautyServiceOptionList";
import useBeautyServices, {
  BeautyServiceProvider
} from "./src/BeautyServices/BeautyServicesContext";
import {
  BeautyService,
  BeautyServiceOption,
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

      <DynamicFontSizeBlackButtonFooter
        title={serviceSelectionButtonText(
          firstServiceToConfigure,
          selectedServices
        )}
        onPress={() => {
          if (firstServiceToConfigure) {
            navigation.navigate("Options", {
              name: firstServiceToConfigure.title
            });
          } else {
            navigation.navigate("Timers");
          }
        }}
        disabled={selectedServices.length === 0}
      />
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
      <DynamicFontSizeBlackButtonFooter
        title={optionsSelectionButtonText(service, nextService)}
        onPress={() => {
          if (nextService) {
            navigation.navigate("Options", {
              name: nextService.title
            });
          } else {
            navigation.navigate("Timers");
          }
        }}
        disabled={service.options.filter(o => o.selected).length === 0}
      />
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
  service: BeautyService;
  sequential: Timing[];
  left?: boolean;
  right?: boolean;
  onOptionComplete: () => void;
};

const endTime = 0;

const TimerListItemSegment = ({
  service,
  sequential,
  left,
  right,
  onOptionComplete
}: TimerListItemSegmentProps) => {
  const [step, setStep] = useState<number>(0);
  const [repeats, setRepeats] = useState<number>(0);

  const [optionCompleted, setOptionsCompleted] = useState<boolean>(false);
  const count = sequential.length;
  const currentOption = sequential[step];
  const { time, start, reset, isRunning } = useTimer({
    timerType: "DECREMENTAL",
    endTime,
    initialTime: currentOption.seconds
  });

  const stepComplete = time === endTime;

  const [flashing, flashBackground] = useState<boolean>(false);

  useEffect(() => {
    if (optionCompleted) {
      onOptionComplete();
    }
  }, [optionCompleted]);

  useEffect(() => {
    if (stepComplete && !optionCompleted) {
      flashBackground(!flashing);
    } else {
      flashBackground(false);
    }
  }, [stepComplete, optionCompleted]);

  const onPress = () => {
    if (optionCompleted || isRunning) {
      return;
    } else if (!isRunning && !stepComplete) {
      start();
    } else if (step === count - 1) {
      setOptionsCompleted(true);
    } else if (sequential[step + 1].title === REPEAT_UNTIL_DONE_SIGNIFIER) {
      setRepeats(repeats + 1);
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
      {!optionCompleted && !service.completed ? (
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
            {currentOption.title} {repeats !== 0 && `(${step + 1 + repeats})`}
          </Text>
          <Text>Remaining: {formatDuration(time)}</Text>
        </Animatable.View>
      ) : (
        <Text style={{ padding: 8 }}>Option Completed! ✅</Text>
      )}
    </Card>
  );
};

const TimerListItem = ({ option, service }) => {
  const { markOptionComplete } = useBeautyServices();

  const handleOptionComplete = (
    option: BeautyServiceOption,
    specifier: string
  ) => {
    markOptionComplete(service.title, option.title, specifier);
  };

  return useMemo(() => {
    return (
      <View style={styles.item}>
        {option.leftRight && (
          <>
            <TimerListItemSegment
              service={service}
              onOptionComplete={() => handleOptionComplete(option, "left")}
              left
              sequential={option.sequential}
            />
            <TimerListItemSegment
              service={service}
              onOptionComplete={() => handleOptionComplete(option, "right")}
              right
              sequential={option.sequential}
            />
          </>
        )}

        {!option.leftRight && (
          <TimerListItemSegment
            service={service}
            onOptionComplete={() => {
              handleOptionComplete(option, "both");
            }}
            sequential={option.sequential}
          />
        )}
      </View>
    );
  }, [service, option]);
};

const TimersScreen = ({ navigation }) => {
  const {
    selectedServices,
    markOptionComplete,
    sessionComplete,
    reset
  } = useBeautyServices();

  const { time, start, pause, isRunning } = useTimer();

  useEffect(() => {
    if (!isRunning && !sessionComplete) {
      start();
    } else if (sessionComplete) {
      pause();
    }
  }, [isRunning, sessionComplete]);

  useEffect(() => {
    if (sessionComplete) {
      reset();
      navigation.navigate("SessionComplete");
    }
  }, [sessionComplete]);

  const sections = selectedServices.map(service => {
    const data = service.options
      .filter(o => o.selected || o.isDefault)
      .map(o => ({
        ...o,
        leftRight: service.leftRight
      }));

    return {
      title: service.title,
      data,
      service
    };
  });

  const completedCount = selectedServices
    .filter(s => s.completed)
    .reduce(count => {
      return count + 1;
    }, 0);

  const list = useMemo(() => {
    return (
      <SectionList
        renderSectionFooter={thing => {
          if (!thing) {
            return null;
          } else {
            // Ew
            const service: BeautyService = thing.section.service;
            const showCompleteServiceButton =
              service.allowForce && !service.completed;
            if (!showCompleteServiceButton) {
              return null;
            }

            return (
              <View style={{ padding: 14 }}>
                <Button
                  disabled={selectedServices.length === 0}
                  color="white"
                  mode="contained"
                  onPress={() =>
                    markOptionComplete(thing.section.title, null, "force")
                  }
                >
                  Mark Service Complete
                </Button>
              </View>
            );
          }
        }}
        showsVerticalScrollIndicator={false}
        sections={sections}
        keyExtractor={(item, index) => {
          return index + "";
        }}
        renderItem={sectionContainer => {
          const item = sectionContainer.item;

          return (
            <TimerListItem
              option={item}
              service={sectionContainer.section.service}
            />
          );
        }}
        renderSectionHeader={({ section }) => {
          return <Text style={styles.header}>{section.title}</Text>;
        }}
      />
    );
  }, [sections.length, completedCount]);

  return (
    <View style={ApplicationStyles.screen.timers}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white"
        }}
      >
        <Headline>Session Length: {formatDuration(time, true)}</Headline>
      </View>
      {list}
    </View>
  );
};

const SessionCompleteScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>DONE WITH SERVICES HOORAY</Text>

      <Button
        color="black"
        mode="contained"
        onPress={() => navigation.popToTop()}
      >
        Start Another Session
      </Button>
    </View>
  );
};

const Stack = createStackNavigator();

const DynamicFontSizeBlackButtonFooter = ({ title, onPress, disabled }) => {
  const buttonStyles = [
    {
      alignItems: "center",
      marginTop: 50,
      backgroundColor: "#000000",
      padding: 10
    }
  ];
  const textStyles = [
    {
      fontSize: 24,
      textTransform: "uppercase",
      padding: 22,
      paddingBottom: 80,
      fontFamily: "champagne-limousines-bold",
      color: "white"
    }
  ];
  if (disabled) {
    buttonStyles.push({ backgroundColor: "#e0e0e0" });
    textStyles.push({ color: "#00000052" });
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.9}
      style={buttonStyles}
      onPress={onPress}
    >
      <Text numberOfLines={1} adjustsFontSizeToFit={true} style={textStyles}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

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
            <Stack.Screen
              name="SessionComplete"
              component={SessionCompleteScreen}
            />
          </Stack.Navigator>
        </BeautyServiceProvider>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default App;
