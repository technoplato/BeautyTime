import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, Title } from "react-native-paper";
import { Client, Service, ServiceNames } from "../types";
import { RootState } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import {
  resetSelection,
  updateClientForAppointment,
} from "../appointment/createAppointment.slice";
import { ActiveAppointmentServiceListItem } from "../appointment/List/ActiveAppointmentServiceListItem";
import { colors } from "../styles/color";
import { useAppointmentTime } from "../appointment/useAppointmentTime";
import { deleteClient, upsertClient } from "../clients/api.clients";

export const useUpdateClientsLastServices = () => {
  const dispatch = useDispatch();
  const servicesInAppointment = useSelector<RootState, Service[]>(
    (state) => state.appointment.servicesInAppointment
  );

  const client = useSelector<RootState, Client>(
    (state) => state.appointment.client
  );

  useEffect(() => {
    const updatedClient = {
      ...client,
      lastServices: servicesInAppointment,
    };

    upsertClient(updatedClient)
      .then((savedClient) => {
        // @ts-ignore We're not doing anything crazy here, but adding an ID potentially in the function
        // TODO: architect a better way to do this, integrating firebase side effects directly with redux
        dispatch(updateClientForAppointment(savedClient));
      })
      .catch((e) => console.log(e));
  }, []);
};

export const ActiveAppointmentScreen = () => {
  useUpdateClientsLastServices();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const servicesInAppointment = useSelector<RootState, Service[]>(
    (state) => state.appointment.servicesInAppointment
  );

  const client = useSelector<RootState, Client>(
    (state) => state.appointment.client
  );

  const clientHasSavedServices =
    Object.keys(client?.lastServices ?? []).length > 0;
  const clientHasName = client?.name?.length > 0;
  const clientIsSetup = clientHasName && clientHasSavedServices;
  const clientNeedsSetup =
    !clientIsSetup &&
    servicesInAppointment.some(
      (service) => service.name === ServiceNames.lashLiftAndTint
    );

  const allServicesCompleted = servicesInAppointment.every(
    (service) => service.completed
  );

  const { elapsedTime: sessionLengthTimestamp, stop: stopTimer } =
    useAppointmentTime();

  const buttonText = clientNeedsSetup
    ? "Please click 'Add client notes' below"
    : "Finish Appointment";

  const deleteClientIfNoNotes = () => {
    if (!clientHasName) {
      deleteClient(client?.id).catch((e) => console.log(e));
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: allServicesCompleted ? 120 : 70 },
      ]}
    >
      <Title style={styles.sessionLength}>
        Session Length: {sessionLengthTimestamp}
      </Title>
      {allServicesCompleted && (
        <Button
          style={{
            margin: 4,
            padding: 4,
            borderRadius: 4,
            backgroundColor: clientNeedsSetup ? colors.lightGray : colors.black,
          }}
          disabled={clientNeedsSetup}
          textColor={clientNeedsSetup ? colors.darkGray : colors.white}
          onPress={() => {
            stopTimer();
            dispatch(resetSelection());
            deleteClientIfNoNotes();

            // @ts-ignore
            navigation.popToTop();
          }}
        >
          {buttonText}
        </Button>
      )}
      <ScrollView>
        {servicesInAppointment.map((service) => {
          return (
            <ActiveAppointmentServiceListItem
              key={service.id}
              serviceId={service.id}
            />
          );
        })}
      </ScrollView>
      <Button
        style={styles.addClientNotes}
        buttonColor={clientHasSavedServices ? colors.black : colors.lightGray}
        textColor={colors.white}
        onPress={() => {
          // @ts-ignore
          navigation.navigate("ClientNotesScreen");
        }}
      >
        Add client notes
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  addClientNotes: {
    margin: 4,
    marginHorizontal: 18,
    padding: 4,
    borderRadius: 4,
    backgroundColor: colors.black,
  },
  sessionLength: {
    fontSize: 20,
    fontStyle: "italic",
    marginBottom: 10,
    marginTop: -8,
    alignItems: "center",
    textAlign: "center",
    width: "100%",
    backgroundColor: colors.white,
  },
  container: {
    marginBottom: 40,
  },
});
