import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

const TestScreen = () => {
  useEffect(() => {
    fetch("http://10.89.96.170:5002//get_videos_by_user_id?user_id=1", {
      // method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      // },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else if (response.status == 308) {
          throw new Error("Permanent Redirect 308888888");
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log("Successful fetch: ", responseJson);
      })
      .catch((error) => {
        console.error("Error name: ");

        console.error("Error name: ", error.name);
        console.error("Error message: ", error.message);
        console.error("Error stack: ", error.stack);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Test Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  text: {
    fontSize: 18,
  },
});

export default TestScreen;
