import { View, Text, ScrollView, Alert, Pressable } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SummaryCard from "../../components/summaryCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { hp, wp } from "../../constants/common";
import { theme } from "../../constants/theme";
import {
  deletePostDetails,
  fetchPostDetails,
  fetchSummaryDetails,
  addColors,
} from "../../services/historyPost";
import { getUserInfo } from "../../services/user";
import { styles } from "./styles";
import { CrossIcon } from "../../components/icons/icons";
import Loading from "../../components/loading";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";

const SummaryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { summaryId } = route.params;
  const [item, setItem] = useState(null);
  const [user, setUser] = useState(() => getUserInfo());
  const [startLoading, setStartLoading] = useState(true);

  useEffect(() => {
    getSummaryDetails(summaryId);
  }, []);

  useEffect(
    useCallback(() => {
      (async () => {
        const data = await getUserInfo();
        setUser(data);
      })();
    }, [])
  );

  const getSummaryDetails = async (summaryId) => {
    let res = await fetchSummaryDetails(summaryId);
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
          <Text style={styles.notFound}>Summary not found !</Text>
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

  return (
    <ScreenWrapper bg="white">
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
          <SummaryCard item={item} user={user} navigation={navigation} />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default SummaryScreen;
