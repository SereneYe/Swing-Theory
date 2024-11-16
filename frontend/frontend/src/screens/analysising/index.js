import React from "react";
import { View, ActivityIndicator, Text } from "react-native";
import styles from "./styles";

const Analysising = () => (
  <View style={styles.uploadingContainer}>
    <ActivityIndicator color="gray" size="large" />
    <Text style={styles.analysisingText}>Analysising...</Text>
  </View>
);

export default Analysising;
