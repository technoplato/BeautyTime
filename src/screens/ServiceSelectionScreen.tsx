import React from "react";
import { View } from "react-native";
import { Headline } from "react-native-paper";
import ServiceSelectionFooter from "../components/Services/ServiceSelectionFooter";
import ApplicationStyles from "../Themes/ApplicationStyles";
import ServicesList from "../components/Services/ServiceList";

const ServiceSelectionScreen = ({ navigation }) => {
  return (
    <View style={ApplicationStyles.screen.serviceSelection}>
      <Headline style={{ alignSelf: "center", paddingBottom: 24 }}>
        Select services being performed
      </Headline>
      <ServicesList />
      <ServiceSelectionFooter navigation={navigation} />
    </View>
  );
};

export default ServiceSelectionScreen;
