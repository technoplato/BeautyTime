/**
 * A component that accepts a service ID
 * It looks up that service from its ID using the use selector hook
 * Displays the title of the service
 * And then enters the current step that the services on
 */
import React from "react";
import { StyleSheet } from "react-native";
import { ServiceId } from "../../types";
import { CurrentStep } from "./ServiceCurrentStep";
import { useServiceInAppointmentById } from "../useServiceInAppointmentById";
import { Button, Card, Title } from "react-native-paper";
import { colors } from "../../styles/color";
import { addSecondsToService } from "../createAppointment.slice";
import { useDispatch } from "react-redux";

type ActiveAppointmentServiceListItemProps = {
  serviceId: ServiceId;
};

export const ActiveAppointmentServiceListItem = ({
  serviceId,
}: ActiveAppointmentServiceListItemProps) => {
  const dispatch = useDispatch();
  const service = useServiceInAppointmentById(serviceId)!;

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title style={styles.cardTitle}>{service.name}</Title>
        <Button
          style={{
            margin: 4,
            padding: 4,
            borderRadius: 4,
            backgroundColor: colors.black,
          }}
          // buttonColor={colors.black}
          textColor={colors.white}
          onPress={() => {
            // @ts-ignore
            dispatch(addSecondsToService({ serviceId, seconds: 30 }));
          }}
        >
          Add 30 seconds
        </Button>
        <CurrentStep serviceId={service.id} />
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  cardTitle: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: "bold",
    backgroundColor: colors.black,
    color: colors.lightGray,
    padding: 4,
  },
});
