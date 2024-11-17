import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { createPractice } from "../../redux/actions";
import * as VideoThumbnails from "expo-video-thumbnails";
import uuid from "uuid-random";
import RelaxDetailScreen from "../relaxDetails";

export default function SavePostScreen(props) {
  const [previewImage, setPreviewImage] = useState(null);
  const [description, setDescription] = useState("");
  const [requestRunning, setRequestRunning] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    generateThumbnail();
  }, []);

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        props.route.params.source,
        {
          time: 15000,
        }
      );
      setPreviewImage(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSavePost = () => {
    setRequestRunning(true);
    let roundId = uuid();
    let turnPreference = 1;
    let practiceType = "Forehand";
    console.log("Dispatching createPost");
    dispatch(createPractice(props.route.params.source,roundId,turnPreference,practiceType))
      .then(() => {
        console.log("create practice dispatched successfully. Navigating to top...");
        navigation.navigate('home');
      })
      .catch((error) => {
        console.log("Dispatching createPractice failed:", error);
      })
      .finally(() => {
        setRequestRunning(false);
      });
  };

  if (requestRunning) {
    return <RelaxDetailScreen/>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputText}
            maxLength={150}
            multiline
            onChangeText={(text) => setDescription(text)}
            placeholder="Describe your video"
          />
          <Image style={styles.mediaPreview} source={{ uri: previewImage }} />
        </View>
        <View style={styles.spacer} />
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            <Feather name="x" size={24} color="black" />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSavePost()}
            style={styles.postButton}
          >
            <Text style={styles.postButtonText}>Analyze</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
