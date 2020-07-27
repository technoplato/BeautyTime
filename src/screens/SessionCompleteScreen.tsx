import React from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";

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

export default SessionCompleteScreen;
