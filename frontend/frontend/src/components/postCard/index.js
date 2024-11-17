import {
    View,
    Text,
    TouchableOpacity, Alert,
} from "react-native";
import React from "react";
import {theme} from "../../constants/theme";
import {hp, wp} from "../../constants/common";
import RenderHtml from "react-native-render-html";
import {Video} from "expo-av";
import Avatar from "../avartar/index";
import {TrashIcon} from "../icons/icons";
import {styles, tagsStyles, shadowStyles} from "./styles";
import {Image} from "expo-image";
import {deletePost} from "../../services/getPost";

const PostCard = ({
                      item,
                      user,
                      hasShadow = true,
                      navigation,
                      onPostDeleted
                  }) => {
    const htmlBody = {html: item?.body};

    const onDeleteDetail = async (item) => {
        console.log("Deleting post: ", item);
        let res = await deletePost(item.post_id);
        if (res.success) {
            console.log("Post deleted successfully");
            onPostDeleted();
        } else {
            Alert.alert("Post deleting error", res.msg);
        }
    };

    const handlePostDelete = () => {
        Alert.alert("Confirm", "Are you sure you want to do this?", [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel delete"),
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: () => onDeleteDetail(item),
                style: "destructive",
            },
        ]);
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
                    <View style={{gap: 2}}>
                        <Text style={styles.username}>
                            {user.name ? user.name : "Default Name"}
                        </Text>
                        <Text style={styles.postTime}>
                            {item.created_at ? item.created_at : "2024-09-28 13:00:03"}
                        </Text>
                    </View>
                </View>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={handlePostDelete}>
                        <TrashIcon
                            name="delete"
                            size={hp(2.5)}
                            color={theme.colors.rose}
                        />
                    </TouchableOpacity>
                </View>
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

                {item.file_type === "image" ? (
                    <Image
                        style={styles.postMedia}
                        transition={100}
                        contentFit='cover'
                        source={{uri: item.url}}
                    />
                ) : (
                    <Video
                        style={[
                            styles.postMedia,
                            {height: hp(40), width: wp(70), alignSelf: "center"},
                        ]}
                        source={{uri: item.record_url}}
                        useNativeControls
                        resizeMode="cover"
                        isLooping
                    />
                )}
            </View>
        </View>
    );
};
export default PostCard;
