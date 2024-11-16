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
import { ArrowLeftIcon, CrossIcon } from "../../components/icons/icons";
import Loading from "../../components/loading";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";

const ResultScreen = () => {
  const navigation = useNavigation();
  const historyId = "007dbffd-f975-4937-9d36-1094e8fbdd58";
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
      <ScreenWrapper bg="white">
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
      </ScreenWrapper>
    );
  }

  if (startLoading) {
    return (
      <View style={styles.center}>
        <Loading />
      </View>
    );
  }

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <View>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeftIcon strokeWidth={2.5} color={theme.colors.text} />
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
            showResult={true}
          />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default ResultScreen;
