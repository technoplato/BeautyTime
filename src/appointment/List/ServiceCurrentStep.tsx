import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Subheading, Text } from "react-native-paper";
import { LeftOrRight, ServiceId } from "../../types";
import { useDispatch } from "react-redux";
import {
  markServiceAsComplete,
  serviceStepSegmentPressed,
} from "../createAppointment.slice";
import { secondsToTimeString } from "../../utilities/formatTime";
import { AnimatedBackground } from "../../components/AnimatedBackground";
import { useServiceInAppointmentById } from "../useServiceInAppointmentById";
import { useStepForSegmentByServiceId } from "../useStepForSegmentByServiceId";

type CurrentStepProps = {
  serviceId: ServiceId;
};

export const CurrentStep = ({ serviceId }: CurrentStepProps) => {
  const service = useServiceInAppointmentById(serviceId)!;

  const dispatch = useDispatch();

  const isCompleted = service.completed;

  const handleStepSegmentPress = (leftOrRight?: LeftOrRight) => {
    dispatch(
      serviceStepSegmentPressed({
        serviceId,
        leftOrRight,
      })
    );
  };

  const handleServiceCompletePress = () => {
    dispatch(markServiceAsComplete(serviceId));
  };

  const currentStepSegmentProps = {
    serviceId,
    handleStepSegmentPress,
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <CurrentStepSegment left {...currentStepSegmentProps} />
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <CurrentStepSegment right {...currentStepSegmentProps} />
        </View>
      </View>
      {isCompleted && (
        <View>
          <Subheading>Service Completed!</Subheading>
        </View>
      )}
    </View>
  );
};

type CurrentStepSegmentProps = {
  serviceId: ServiceId;
  handleStepSegmentPress: (leftOrRight?: LeftOrRight) => void;
  left?: boolean;
  right?: boolean;
};

export const CurrentStepSegment = ({
  serviceId,
  left,
  right,
  handleStepSegmentPress,
}: CurrentStepSegmentProps) => {
  const { step, progress } = useStepForSegmentByServiceId(
    serviceId,
    left ? "left" : right ? "right" : "both"
  );
  if (!step)
    return (
      <View>
        <Text>{JSON.stringify(progress)}</Text>
        {!progress.hasNextStep && <Text>Segment Completed!</Text>}
      </View>
    );

  const isStepCompleted: boolean = progress.status === "completed";
  const isSegmentCompleted = progress.status === "terminal";
  const noNextStep: boolean = !progress.hasNextStep;

  const hideTime = isSegmentCompleted;
  const flash = isStepCompleted && !hideTime;
  // The information will either say "Tap to start step" or "Tap to go to next step"
  // depending on the status
  const information = isSegmentCompleted
    ? "Segment is complete!"
    : noNextStep && isStepCompleted
    ? "Tap to mark this segment completed"
    : isStepCompleted
    ? "Tap to go to next step"
    : null;
  const showInformation = !!information;

  const alignmentStyle = right
    ? ({ alignItems: "flex-end", textAlign: "right" } as const)
    : {};

  const segmentTitle = step.title;

  return (
    <TouchableOpacity
      onPress={() =>
        handleStepSegmentPress(left ? "left" : right ? "right" : undefined)
      }
    >
      <View
        style={{
          height: 170,
          borderColor: "black",
          borderRadius: 4,
          borderWidth: 2,
          margin: 1,
          padding: 3,
        }}
      >
        <AnimatedBackground flashing={flash}>
          {left && <Text style={styles.biggerText}>LEFT</Text>}
          {right && (
            <Text style={[alignmentStyle, styles.biggerText]}>RIGHT</Text>
          )}
          <Subheading style={[alignmentStyle, styles.biggerText]}>
            {segmentTitle}
          </Subheading>
          {!hideTime && (
            <Text style={[alignmentStyle, styles.biggerText]}>
              {secondsToTimeString(progress.remainingSeconds)}
            </Text>
          )}
          {showInformation && (
            <Text style={[alignmentStyle, styles.biggerText]}>
              {information}
            </Text>
          )}
        </AnimatedBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  biggerText: {
    fontSize: 24,
  },
});
