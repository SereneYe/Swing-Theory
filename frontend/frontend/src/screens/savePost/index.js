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
import { createPost } from "../../redux/actions";
import * as VideoThumbnails from "expo-video-thumbnails";
import Analysising from "../analysising/index.js";

export default function SavePostScreen(props) {
  const [previewImage, setPreviewImage] = useState(null);
  const [description, setDescription] = useState("");
  const [requestRunning, setRequestRunning] = useState(false);
  const navigation = useNavigation();

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

  const dispatch = useDispatch();
  const handleSavePost = () => {
    setRequestRunning(true);
    console.log("Dispatching createPost");
    dispatch(createPost(description, props.route.params.source))
      .then(() => {
        console.log("createPost dispatched successfully. Navigating to top...");
        navigation.dispatch(StackActions.popToTop());
      })
      .catch((error) => {
        console.log("Dispatching createPost failed:", error);
      })
      .finally(() => {
        // Ensure requestRunning is set to false when createPost operation is completed
        setRequestRunning(false);
      });
  };

  if (requestRunning) {
    return <Analysising />;
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
