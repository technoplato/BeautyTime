import { Text, TouchableOpacity, StyleSheet } from "react-native";
import HeartButton from "../components/HeartButton";
import React from "react";

type HeartToggleListItemProps = {
  title: string;
  handleToggle: () => void;
  selected: boolean;
};
export const HeartToggleListItem = ({
  title,
  handleToggle,
  selected,
}: HeartToggleListItemProps) => {
  return (
    <TouchableOpacity
      key={title}
      onPress={handleToggle}
      style={styles.listItem}
    >
      <HeartButton onToggle={handleToggle} selected={selected} />
      <Text style={{ fontFamily: "ChampagneLimousines", fontSize: 22 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    position: "absolute",
    bottom: 0,
  },
  listContainer: {
    alignItems: "center",
  },
  listItem: {
    width: 230,
    flexDirection: "row",
    alignItems: "center",
  },
});
