import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React from "react";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";
import RenderHtml from "react-native-render-html";
import { Video } from "expo-av";
import Avatar from "../avartar/index";
import { styles, tagsStyles, shadowStyles } from "./styles";
import * as Progress from "react-native-progress";
import { ThreeDotIcon, TrashIcon } from "../icons/icons";
import { HistoryCardImageContainer } from "../historyCardImage";

const HistoryCard = ({
  item,
  user,
  navigation,
  hasShadow = true,
  showDelete = false,
  showResult = false,
  onDelete = () => {},
  type,
}) => {
  const htmlBody = { html: item?.body };

  const handlePostDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to do this?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel delete"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => onDelete(item),
        style: "destructive",
      },
    ]);
  };

  return (
    <ScrollView nestedScrollEnabled={true}>
      <FlatList
        data={item.video}
        ListHeaderComponent={
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.userInfo}>
                <Avatar
                  size={hp(4.5)}
                  uri={
                    user.image
                      ? user.image
                      : require("../../assets/images/defaultUser.png")
                  }
                  rounded={theme.radius.md}
                />
                <View style={{ gap: 2 }}>
                  <Text style={styles.username}>
                    {user.name ? user.name : "Default Name"}
                  </Text>
                  <Text style={styles.postTime}>
                    {item.created_date
                      ? item.created_date
                      : "2024-09-28 13:00:03"}
                  </Text>
                </View>
              </View>

              {showDelete && (
                <View style={styles.actions}>
                  <TouchableOpacity onPress={handlePostDelete}>
                    <TrashIcon
                      name="delete"
                      size={hp(2.5)}
                      color={theme.colors.rose}
                    />
                  </TouchableOpacity>
                </View>
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

              {/* *******************Add for Result detail******************** */}
              <View style={styles.resultContainer}>
                <View style={styles.resultColumnContainer}>
                  <Text style={styles.resultTitle}>
                    ⭐️ Your Total Score ⭐️
                  </Text>
                  <View style={{ alignSelf: "center" }}>
                    <Progress.Circle
                      size={120}
                      showsText={true}
                      progress={item.recordScore / 100}
                      formatText={() => item.recordScore}
                      unfilledColor="#ededed"
                      borderColor="#ededed"
                      color={theme.colors.primary}
                      direction="clockwise"
                      strokeCap="round"
                      thickness={12}
                      style={styles.circlestyle}
                      textStyle={styles.textStyle}
                    />
                  </View>
                </View>
                <View style={styles.resultColumnContainer}>
                  <Text style={styles.resultTitle}>
                    🎾 Practice Type: {item.recordType}
                  </Text>
                  <View style={styles.resultRowContainer}>
                    <Text style={styles.resultTitle}>
                      🎯 Turns: {item.recordTurns}
                    </Text>
                    <Text style={styles.resultTitle}>
                      ✅ Correct: {item.correctTurns}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <HistoryCardImageContainer
            key={item.processed_video_id}
            item={item}
            index={index}
            type={type}
          />
        )}
        style={{ width: "100%" }}
        scrollEnabled={false}
      />
    </ScrollView>
  );

  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.header}>
  //         {/* user info and post time */}
  //         <View style={styles.userInfo}>
  //           <Avatar
  //             size={hp(4.5)}
  //             uri={
  //               user.image ? user.image : require("../../images/defaultUser.png")
  //             }
  //             rounded={theme.radius.md}
  //           />
  //           <View style={{ gap: 2 }}>
  //             <Text style={styles.username}>
  //               {user.name ? user.name : "Default Name"}
  //             </Text>
  //             <Text style={styles.postTime}>
  //               {item.created_date ? item.created_date : "2024-09-28 13:00:03"}
  //             </Text>
  //           </View>
  //         </View>

  //         {showDelete && (
  //           <View style={styles.actions}>
  //             <TouchableOpacity onPress={handlePostDelete}>
  //               <TrashIcon
  //                 name="delete"
  //                 size={hp(2.5)}
  //                 color={theme.colors.rose}
  //               />
  //             </TouchableOpacity>
  //           </View>
  //         )}
  //       </View>

  //       {/* post image & body */}
  //       <View style={styles.content}>
  //         <View style={styles.postBody}>
  //           {item?.body && (
  //             <RenderHtml
  //               contentWidth={wp(100)}
  //               source={htmlBody}
  //               tagsStyles={tagsStyles}
  //               render
  //             />
  //           )}
  //         </View>

  //         {/* *******************Add for Result detail******************** */}

  //         <View style={styles.resultContainer}>
  //           <View style={styles.resultColumnContainer}>
  //             <Text style={styles.resultTitle}>⭐️ Your Total Score ⭐️</Text>
  //             <View style={{ alignSelf: "center" }}>
  //               <Progress.Circle
  //                 size={120}
  //                 showsText={true}
  //                 progress={item.recordScore / 100}
  //                 formatText={() => item.recordScore}
  //                 unfilledColor="#ededed"
  //                 borderColor="#ededed"
  //                 color={theme.colors.primary}
  //                 direction="clockwise"
  //                 strokeCap="round"
  //                 thickness={12}
  //                 style={styles.circlestyle}
  //                 textStyle={styles.textStyle}
  //               />
  //             </View>
  //           </View>
  //           <View style={styles.resultColumnContainer}>
  //             <Text style={styles.resultTitle}>
  //               🎾 Practice Type: {item.recordType}
  //             </Text>
  //             <View style={styles.resultRowContainer}>
  //               <Text style={styles.resultTitle}>
  //                 🎯 Turns: {item.recordTurns}
  //               </Text>
  //               <Text style={styles.resultTitle}>
  //                 ✅ Correct: {item.correctTurns}
  //               </Text>
  //             </View>

  //             <FlatList
  //               data={item.video}
  //               renderItem={({ item, index }) => (
  //                 <HistoryCardImageContainer
  //                   key={item.processed_video_id}
  //                   item={item}
  //                   index={index}
  //                 />
  //               )}
  //               style={{ width: "100%" }}
  //             />
  //           </View>
  //         </View>

  //         <Video
  //           style={[
  //             styles.postMedia,
  //             { height: hp(40), width: wp(70), alignSelf: "center" },
  //           ]}
  //           source={{ uri: item.record_url }}
  //           useNativeControls
  //           resizeMode="cover"
  //           isLooping
  //         />
  //       </View>
  //     </View>
  //   );
};
export default HistoryCard;
