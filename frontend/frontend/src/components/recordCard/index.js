import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";
import RenderHtml from "react-native-render-html";
import { Video } from "expo-av";
import Avatar from "../avartar/index";
import * as Progress from "react-native-progress";
import { ThreeDotIcon, TrashIcon } from "../icons/icons";
import { HistoryCardImageContainer } from "../historyCardImage";
import { styles, tagsStyles, shadowStyles } from "../recordCard/styles";

const RecordCard = ({
  item,
  user,
  navigation,
  showMoreIcon = true,
  hasShadow = true,
}) => {
  const htmlBody = { html: item?.body };

  const openPostDetails = () => {
    navigation.navigate("historyDetail", { historyId: item.recordId });
  };

  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar
            size={hp(4.5)}
            uri={
              user.image ? user.image : require("../../assets/images/defaultUser.png")
            }
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text style={styles.username}>
              {user.name ? user.name : "Default Name"}
            </Text>
            <Text style={styles.postTime}>
              {item.created_date ? item.created_date : "2024-09-28 13:00:03"}
            </Text>
          </View>
        </View>
        {/* actions */}
        {showMoreIcon && (
          <TouchableOpacity onPress={openPostDetails}>
            <ThreeDotIcon
              name="threeDotsHorizontal"
              size={hp(3.4)}
              strokeWidth={3}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* post image & body */}
      <View style={styles.content}>
        <View style={styles.postBody}>
          {item?.body && (
            <RenderHtml
              contentWidth={wp(100)}
              source={htmlBody}
              tagsStyles={tagsStyles}
              render
            />
          )}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {item.title ? item.title : "Uploaded Yesterday"}
          </Text>
        </View>
        {/* *******************Add for Result detail******************** */}

        <Video
          style={[
            styles.postMedia,
            { height: hp(40), width: wp(70), alignSelf: "center" },
          ]}
          source={{ uri: item.record_url }}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      </View>
    </View>
  );
};
export default RecordCard;
