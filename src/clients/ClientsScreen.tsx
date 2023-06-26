import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { Button, Card, Title } from "react-native-paper";
import { getClients } from "./api.clients";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setClientForAppointment } from "../appointment/createAppointment.slice";
import { Client } from "../types";

export const useClients = () => {
  const [clients, setClients] = React.useState<Client[]>([]);
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    setLoading(true);
    getClients()
      .then((clients) => {
        setClients(clients);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return { clients, loading };
};

export const ClientsScreen = () => {
  const { clients, loading } = useClients();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const filteredClients = clients.filter((client) =>
    client.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  /**
   * If we are starting a session for an existing client, a Client object will be passed.
   * Otherwise, if we are starting a session for a new client, a string representing the
   * ID of the new client will be passed.
   * Client details will be filled in later on the notes screen during an active session
   * while the service is being performed.
   */
  const startSessionForClient = (client: Client) => {
    // Save the selected client's last services to the store
    dispatch(setClientForAppointment(client));

    // navigate through the normal service configuration flow
    // @ts-ignore
    navigation.navigate("ServiceListScreen");
  };

  const startSessionForNewClient = () => {
    console.log("Start session for new client");
    // navigate through the normal service configuration flow
    // @ts-ignore
    navigation.navigate("ServiceListScreen");
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search clients..."
      />
      <Button
        style={{
          margin: 4,
          padding: 4,
          borderRadius: 4,
          backgroundColor: "black",
        }}
        textColor={"white"}
        color={"black"}
        onPress={startSessionForNewClient}
      >
        Start session for a new client
      </Button>
      {filteredClients.length > 0 && (
        <ClientList
          clients={filteredClients}
          handleClientPressed={startSessionForClient}
        />
      )}
    </View>
  );
};

type Props = {
  clients: Client[];
  handleClientPressed: (client: Client) => void;
};

const renderItem =
  (handleClientPressed: (client: Client) => void) =>
  ({ item: client }: { item: Client }) =>
    (
      <Card
        style={{ margin: 8, padding: 4 }}
        key={client.id}
        onPress={() => handleClientPressed(client)}
      >
        <Card.Content>
          <Title>{client.name}</Title>
          <Text style={styles.notes}>{client.lashShieldNote}</Text>
          <Text style={styles.notes}>{client.notes}</Text>
        </Card.Content>
      </Card>
    );

const keyExtractor = (item: Client) => item.id;

const ClientList: React.FC<Props> = ({ clients, handleClientPressed }) => {
  return (
    <FlatList
      data={clients}
      renderItem={renderItem(handleClientPressed)}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 0,
  },
  listContainer: {
    alignItems: "center",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  item: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  lashShieldNote: {
    marginBottom: 4,
  },
  lashLiftBrand: {
    marginBottom: 4,
  },
  notes: {},
});
