import React, { useEffect, useMemo, useState } from "react";
import { SectionList, View, Text, StyleSheet } from "react-native";
import { Button, Headline, Card } from "react-native-paper";
import { useTimer } from "use-timer";
import * as Animatable from "react-native-animatable";
import useBeautyServices from "../components/Services/ServicesContext";
import {
  Service,
  Step,
  REPEAT_UNTIL_DONE_MODIFIER,
  Option,
  HIDE_TIME_MODIFIER,
} from "../Types";
import ApplicationStyles from "../Themes/ApplicationStyles";
import formatDuration from "../Utilities/formatDuration";

type TimerListItemSegmentProps = {
  service: Service;
  steps: Step[];
  left?: boolean;
  right?: boolean;
  onStepCompleted: (step: Step) => void;
};

const endTime = 0;

const TimerListItemSegment = ({
  service,
  steps,
  left,
  right,
  onStepCompleted,
}: TimerListItemSegmentProps) => {
  const [step, setStep] = useState<number>(0);
  const [repeats, setRepeats] = useState<number>(0);
  const [serviceCompleted, setServiceCompleted] = useState<boolean>(false);
  const [flashing, flashBackground] = useState<boolean>(false);

  const { time, start, reset, isRunning } = useTimer({
    timerType: "DECREMENTAL",
    endTime,
    initialTime: 3,
    // initialTime: currentStep.seconds
  });

  const count = steps.length;
  const currentStep = steps[step];

  const hideTime = currentStep.modifier === HIDE_TIME_MODIFIER;
  const stepComplete = time === endTime;
  const doRepeat = currentStep.modifier === REPEAT_UNTIL_DONE_MODIFIER;

  useEffect(() => {
    if (serviceCompleted) {
      onStepCompleted(currentStep);
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
    if (serviceCompleted || isRunning || hideTime) {
      return;
    } else if (!isRunning && !stepComplete) {
      start();
    } else if (doRepeat) {
      setRepeats(repeats + 1);
      reset();
    } else if (step === count - 1) {
      setServiceCompleted(true);
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
            if (stepComplete) {
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
            {currentStep.title} {repeats !== 0 && `(${step + 1 + repeats})`}
          </Text>
          {!hideTime && <Text>Remaining: {formatDuration(time)}</Text>}
        </Animatable.View>
      ) : (
        <Text style={{ padding: 8 }}>Option Completed! ✅</Text>
      )}
    </Card>
  );
};

const TimerListItem = ({ option, service }) => {
  const { markStepComplete } = useBeautyServices();

  const markStepCompleted = (
    option: Option,
    stepTitle: string,
    specifier: string
  ) => {
    markStepComplete(service.title, option.title, stepTitle, specifier);
  };

  return useMemo(() => {
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={styles.item}>
          {option.leftRight && (
            <>
              <TimerListItemSegment
                service={service}
                onStepCompleted={(completedStep) =>
                  markStepCompleted(option, completedStep.title, "left")
                }
                left
                steps={option.steps}
              />
              <TimerListItemSegment
                service={service}
                onStepCompleted={(completedStep) =>
                  markStepCompleted(option, completedStep.title, "right")
                }
                right
                steps={option.steps}
              />
            </>
          )}

          {!option.leftRight && (
            <TimerListItemSegment
              service={service}
              onStepCompleted={(completedStep) =>
                markStepCompleted(option, completedStep.title, "both")
              }
              steps={option.steps}
            />
          )}
        </View>
        <Button
          color="white"
          mode="contained"
          onPress={() => markStepCompleted(option, undefined, "both")}
        >
          Mark Step Complete
        </Button>
      </View>
    );
  }, [service, option]);
};

const ActiveServicesScreen = ({ navigation }) => {
  const { selectedServices, sessionComplete, reset } = useBeautyServices();

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
