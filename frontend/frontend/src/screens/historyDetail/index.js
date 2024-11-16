import { View, Text, ScrollView, Alert, Pressable } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import HistoryCard from "../../components/historyCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { hp, wp } from "../../constants/common";
import { theme } from "../../constants/theme";
import {
  deletePostDetails,
  fetchPostDetails,
} from "../../services/historyPost";
import { getUserInfo } from "../../services/user";
import { styles } from "./styles";
import { CrossIcon } from "../../components/icons/icons";
import Loading from "../../components/loading";

const HistoryDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { historyId } = route.params;
  const [item, setItem] = useState(null);
  const [user, setUser] = useState(() => getUserInfo());
  const [startLoading, setStartLoading] = useState(true);

  useEffect(() => {
    getPostDetails(historyId);
  }, []);

  useEffect(
    useCallback(() => {
      (async () => {
        const data = await getUserInfo();
        setUser(data);
      })();
    }, [])
  );

  const getPostDetails = async (historyId) => {
    let res = await fetchPostDetails(historyId);
    if (res.success) {
      setItem(res.data);
      setStartLoading(false);
    } else {
      console.error("Failed to fetch posts: ", res.error);
    }
  };

  if (!item && !startLoading) {
    return (
      <>
        <View>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <CrossIcon strokeWidth={2.5} color={theme.colors.text} />
          </Pressable>
        </View>
        <View
          style={[
            styles.center,
            { justifyContent: "flex-start", marginTop: 100 },
          ]}
        >
          <Text style={styles.notFound}>Post not found !</Text>
        </View>
      </>
    );
  }

  if (startLoading) {
    return (
      <View style={styles.center}>
        <Loading />
      </View>
    );
  }

  const onDeleteDetail = async (history) => {
    console.log("Deleting post: ", history);
    let res = await deletePostDetails(history.recordId);

    if (res.success) {
      console.log("Post deleted successfully");
      navigation.goBack();
    } else {
      Alert.alert("Post deleting error", res.msg);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <CrossIcon strokeWidth={2.5} color={theme.colors.text} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        <HistoryCard
          item={item}
          user={user}
          navigation={navigation}
          hasShadow={false}
          showMoreIcon={false}
          showDelete={true}
          showResult={true}
          onDelete={onDeleteDetail}
          type={item.recordType}
        />
      </ScrollView>
    </View>
  );
};

export default HistoryDetailScreen;
