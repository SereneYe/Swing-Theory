import {View, Text, Pressable, FlatList} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import {theme} from "../../constants/theme";
import {hp} from "../../constants/common";
import Avatar from "../../components/avartar/index";
import {styles} from "./styles";
import {useNavigation} from "@react-navigation/native";
import {AddIcon} from "../../components/icons/icons";
import {getUserInfo} from "../../services/user";
import {fetchCurrentPost} from "../../services/historyPost";
import Loading from "../../components/loading";
import RecordCard from "../../components/recordCard/index";

const HistoryScreen = () => {
    const [user, setUser] = useState(() => getUserInfo());
    const navigation = useNavigation();
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const focusListener = navigation.addListener("focus", () => {
            getPosts();
        });

        // Clean up the listener when the component unmounts
        return () => {
            if (focusListener) {
                focusListener();
            }
        };
    }, [navigation]);


    // Fetch user info
    useEffect(() => {
        const fetchUserInfo = async () => {
            const data = await getUserInfo();
            setUser(data);
        };
        fetchUserInfo();
    }, []);

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
        try {
            const res = await fetchCurrentPost();
            if (res.success) {
                setPosts(res.data);
                setHasMore(false);
            } else {
                console.error("Failed to fetch posts: ", res.error);
            }
        } catch (error) {
            console.error("Error fetching posts: ", error);
        }
    };
    return (
        <ScreenWrapper bg="white">
            <View style={styles.container}>
                {/* header */}
                <View style={styles.header}>
                    <Pressable>
                        <Text style={styles.title}>{user.name}</Text>
                    </Pressable>
                    <View style={styles.icons}>
                        <Pressable onPress={() => navigation.navigate("select")}>
                            <AddIcon
                                name="plus"
                                size={hp(3.2)}
                                strokeWidth={2}
                                color={theme.colors.text}
                            />
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("profile")}>
                            <Avatar
                                uri={
                                    user.image
                                        ? user.image
                                        : require("../../assets/images/defaultUser.png")
                                }
                                size={hp(4.3)}
                                rounded={theme.radius.sm}
                                style={{borderWidth: 2}}
                            />
                        </Pressable>
                    </View>
                </View>

                {/* posts */}
                <FlatList
                    data={posts}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listStyle}
                    keyExtractor={(item, index) => item.recordId.toString()}
                    renderItem={({item}) => (
                        <RecordCard item={item} user={user} navigation={navigation}/>
                    )}
                    onEndReached={() => {
                        getPosts();
                        console.log("got to the end");
                    }}
                    onEndReachedThreshold={0}
                    ListFooterComponent={
                        hasMore ? (
                            <View style={{marginVertical: posts.length == 0 ? 200 : 30}}>
                                <Loading/>
                            </View>
                        ) : (
                            <View style={{marginVertical: 30}}>
                                <Text style={styles.noPosts}>No more practices</Text>
                            </View>
                        )
                    }
                />
            </View>
        </ScreenWrapper>
    );
};

export default HistoryScreen;

