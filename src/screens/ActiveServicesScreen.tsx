import React, { useEffect, useMemo, useState } from "react";
import { SectionList, View, Text, StyleSheet } from "react-native";
import { Button, Headline, Card } from "react-native-paper";
import { useTimer } from "use-timer";
import * as Animatable from "react-native-animatable";
import useBeautyServices from "../components/Services/ServicesContext";
import { Service, Timing, REPEAT_UNTIL_DONE_SIGNIFIER, Option } from "../Types";
import ApplicationStyles from "../Themes/ApplicationStyles";
import formatDuration from "../Utilities/formatDuration";

type TimerListItemSegmentProps = {
  service: Service;
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
  onOptionComplete,
}: TimerListItemSegmentProps) => {
  const [step, setStep] = useState<number>(0);
  const [repeats, setRepeats] = useState<number>(0);
  const [manuallyCompleted, setManuallyCompleted] = useState(false);
  const [serviceCompleted, setServiceCompleted] = useState<boolean>(false);
  const count = sequential.length;
  const currentOption = sequential[step];
  const { time, start, reset, isRunning } = useTimer({
    // timerType: "DECREMENTAL",
    // endTime,
    // initialTime: currentOption.seconds
    timerType: "DECREMENTAL",
    endTime,
    initialTime: 3,
  });

  const canManuallyCompleteStep = currentOption.seconds === -1;

  const stepComplete = manuallyCompleted || time === endTime;

  const [flashing, flashBackground] = useState<boolean>(false);

  useEffect(() => {
    if (serviceCompleted) {
      onOptionComplete();
    }
  }, [serviceCompleted]);

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
        marginHorizontal: 4,
      }}
      onPress={onPress}
    >
      {!serviceCompleted && !service.completed ? (
        <Animatable.View
          transition="borderWidth"
          iterationCount={"infinite"}
          direction={"alternate"}
          onTransitionEnd={() => {
            if (stepComplete && !canManuallyCompleteStep) {
              flashBackground(!flashing);
            }
          }}
          style={{
            padding: 8,
            alignItems: right ? "flex-end" : "flex-start",
            backgroundColor: flashing ? "red" : "white",
          }}
        >
          {left && <Text>LEFT</Text>}
          {right && <Text style={{ textAlign: "right" }}>RIGHT</Text>}
          <Text style={{ textAlign: right ? "right" : "left" }}>
            {currentOption.title} {repeats !== 0 && `(${step + 1 + repeats})`}
          </Text>
          {/* TODO: Add click to complete to all steps */}
          {/* TODO: Add crash reporting from sentry */}
          {canManuallyCompleteStep ? (
            <Text>Click to Complete</Text>
          ) : (
            <Text>Remaining: {formatDuration(time)}</Text>
          )}
        </Animatable.View>
      ) : (
        <Text style={{ padding: 8 }}>Option Completed! ✅</Text>
      )}
    </Card>
  );
};

const TimerListItem = ({ option, service }) => {
  const { markOptionComplete } = useBeautyServices();

  const handleOptionComplete = (option: Option, specifier: string) => {
    // TODO: fix name, marks entire service complete, not just the option
    markOptionComplete(service.title, option.title, specifier);
  };

  return useMemo(() => {
    return (
      <View style={{ flexDirection: "column" }}>
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
        <Button
          color="white"
          mode="contained"
          onPress={() => handleOptionComplete(option, "both")}
        >
          Mark Step Complete
        </Button>
        <Text>Shit</Text>
      </View>
    );
  }, [service, option]);
};

const ActiveServicesScreen = ({ navigation }) => {
  const {
    selectedServices,
    markOptionComplete,
    sessionComplete,
    reset,
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

  const sections = selectedServices.map((service) => {
    const data = service.options
      .filter((o) => o.selected || o.isDefault)
      .map((o) => ({
        ...o,
        leftRight: service.leftRight,
      }));

    return {
      title: service.title,
      data,
      service,
    };
  });

  const completedCount = selectedServices
    .filter((s) => s.completed)
    .reduce((count) => {
      return count + 1;
    }, 0);

  const list = useMemo(() => {
    return (
      <SectionList
        renderSectionFooter={(thing) => {
          if (!thing) {
            return null;
          } else {
            // Ew
            const service: Service = thing.section.service;

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
        renderItem={(sectionContainer) => {
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
          backgroundColor: "white",
        }}
      >
        <Headline>Session Length: {formatDuration(time, true)}</Headline>
      </View>
      {list}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
    marginHorizontal: 16,
  },
  item: {
    padding: 12,
    flexDirection: "row",
  },
  header: {
    fontSize: 32,
    color: "white",
    padding: 12,
    backgroundColor: "black",
  },
  title: {
    fontSize: 24,
  },
});

export default ActiveServicesScreen;
