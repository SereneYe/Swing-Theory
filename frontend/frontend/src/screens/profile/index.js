import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { hp } from "../../constants/common";
import { theme } from "../../constants/theme";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import Avatar from "../../components/avartar/index";
import Loading from "../../components/loading/index";
import { Image } from "expo-image";
import styles from "./styles";
import {
  ArrowLeftIcon,
  EditIcon,
  HandIcon,
  LogOutIcon,
  MailIcon,
  PhoneIcon,
  RulerIcon,
  ScaleIcon,
  UserIcon,
} from "../../components/icons/icons";
import { getUserInfo } from "../../services/user";
import { fetchCurrentPost } from "../../services/historyPost";
import HistoryCard from "../../components/historyCard";
import RecordCard from "../../components/recordCard";

const ProfileScreen = () => {
  const [user, setUser] = useState(() => getUserInfo());
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const [hasMore, setHasMore] = useState(true);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const data = await getUserInfo();
        setUser(data);
      })();
    }, [])
  );

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      getPosts();
    });

    return () => {
      if (focusListener) {
        focusListener();
      }
    };
  }, []);

  const getPosts = async () => {
    let res = await fetchCurrentPost();
    if (res.success) {
      setPosts(res.data);
      setHasMore(false);
    } else {
      console.error("Failed to fetch posts: ", res.error);
    }
  };

  const onLogout = async () => {
    navigation.navigate("welcome");
  };

  const handleLogout = () => {
    Alert.alert("Confirm", "Are you sure you want log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => onLogout(),
        style: "destructive",
      },
    ]);
  };

  return (
    <ScreenWrapper bg="white">
      {/* first create UserHeader and use it here, then move it to header comp when implementing user posts */}
      {/* posts */}
      <FlatList
        data={posts}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <UserHeader
            navigation={navigation}
            handleLogout={handleLogout}
            user={user}
          />
        }
        contentContainerStyle={styles.listStyle}
        keyExtractor={(item, index) => item.recordId.toString()}
        renderItem={({ item }) => (
          <RecordCard item={item} user={user} navigation={navigation} />
        )}
        onEndReached={() => {
          getPosts();
          console.log("got to the end");
        }}
        onEndReachedThreshold={0}
        ListFooterComponent={
          <View style={{ marginVertical: 30 }}>
            <Text style={styles.noPosts}>No more posts</Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
};

const UserHeader = ({ handleLogout, navigation, user }) => {
  return (
    <View style={styles.headerOuterContainer}>
      <View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeftIcon strokeWidth={2.5} color={theme.colors.text} />
        </Pressable>
      </View>
      <View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOutIcon name="logout" size={40} color={theme.colors.rose} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ gap: 15 }}>
          {/* avatar */}
          <View style={styles.avatarContainer}>
            <Avatar
              uri={
                user.image
                  ? user.image
                  : require("../../assets/images/defaultUser.png")
              }
              size={hp(12)}
              rounded={theme.radius.xxl * 1.4}
            />
            <Image
              source={
                user.image
                  ? user.image
                  : require("../../assets/images/defaultUser.png")
              }
              style={styles.avatar}
            />
            <Pressable
              style={styles.editIcon}
              onPress={() => navigation.navigate("editProfile")}
            >
              <EditIcon name="edit" />
            </Pressable>
          </View>

          <View style={{ alignItems: "center", gap: 4 }}>
            <Text style={styles.userName}>
              {user.name ? user.name : "USER NAME"}
            </Text>
            <Text style={styles.infoText}>
              Last Login In:
              {user.loginTime ? " " + user.loginTime : ""}
            </Text>
          </View>

          <View style={styles.profileContainer}>
            <View style={styles.info}>
              <MailIcon name="mail" size={20} color={theme.colors.textLight} />
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Email:</Text>
                <Text style={styles.infoText}>
                  {user.email ? user.email : "To be added"}
                </Text>
              </View>
            </View>

            <View style={styles.info}>
              <PhoneIcon
                name="phoneNumber"
                size={20}
                color={theme.colors.textLight}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Phone:</Text>
                <Text style={styles.infoText}>
                  {user.phoneNumber ? user.phoneNumber : "To be added"}
                </Text>
              </View>
            </View>

            <View style={styles.info}>
              <UserIcon
                name="gender"
                size={20}
                color={theme.colors.textLight}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Gender:</Text>
                <Text style={styles.infoText}>
                  {user.gender ? user.gender : "To be added"}
                </Text>
              </View>
            </View>

            <View style={styles.info}>
              <HandIcon name="hand" size={20} color={theme.colors.textLight} />
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Hand Preference:</Text>
                <Text style={styles.infoText}>
                  {user.gender ? user.handPreference : "To be added"}
                </Text>
              </View>
            </View>

            <View style={styles.info}>
              <RulerIcon
                name="height"
                size={20}
                color={theme.colors.textLight}
              />
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Height:</Text>
                <Text style={styles.infoText}>
                  {user.height ? user.height : "166"} cm
                </Text>
              </View>

              <ScaleIcon
                name="weight"
                size={20}
                color={theme.colors.textLight}
              />

              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Weight:</Text>
                <Text style={styles.infoText}>
                  {user.weight ? user.weight : "51"} kg
                </Text>
              </View>
            </View>
            {/* gap */}
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
