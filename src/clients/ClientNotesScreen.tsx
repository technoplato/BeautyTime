import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "react-native-paper";
import { upsertClient } from "./api.clients";
import { Client } from "../types";
import { RootState } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { updateClientForAppointment } from "../appointment/createAppointment.slice";

const ClientForm = () => {
  const dispatch = useDispatch();
  const client = useSelector<RootState, Client>(
    (state) => state.appointment.client
  );

  const [name, setName] = useState(client.name || "");
  const [lashShieldNote, setShieldNotes] = useState(
    client.lashShieldNote || ""
  );
  const [notes, setNotes] = useState(client.notes || "");

  const handleSave = () => {
    if (!name) return;

    const updatedClient: Partial<Client> = {
      ...client,
      name,
      lashShieldNote,
      notes,
    };

    upsertClient(updatedClient)
      .then((savedClient) => {
        // @ts-ignore
        dispatch(updateClientForAppointment(savedClient));
        navigation.goBack();
      })
      .catch((e) => console.log(e));
  };

  const navigation = useNavigation();
  return (
    <>
      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        // @ts-ignore
        backgroundColor="white"
      />
      <TextInput
        label="Shield Notes"
        value={lashShieldNote}
        onChangeText={setShieldNotes}
        // @ts-ignore
        backgroundColor="white"
      />

      <TextInput
        multiline
        // @ts-ignore
        backgroundColor="white"
        label="Notes"
        value={notes}
        onChangeText={(text) => setNotes(text)}
      />

      <Button onPress={handleSave} disabled={!name}>
        Save Client
      </Button>
    </>
  );
};

export const ClientNotesScreen = () => {
  return <ClientForm />;
};
