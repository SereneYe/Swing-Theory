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

    useEffect(
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


//useEffect(() => {
//         const fetchPosts = async () => {
//             const res = await fetchCurrentPost();
//             if (res.success) {
//                 setPosts(res.data);
//                 setHasMore(false);
//                 console.log("Fetched posts:", res.data);
//             } else {
//                 console.error("Failed to fetch posts: ", res.error);
//             }
//         };
//         fetchPosts();
//         const focusListener = navigation.addListener("focus", () => {
//             setRefresh((prev) => !prev);
//         });
//
//         return () => {
//             if (focusListener) {
//                 focusListener();
//             }
//         };
//     }, [navigation, refresh]);
//
//     // 处理新增记录
//     const handleRecordAdded = () => {
//         setRefresh((prev) => !prev); // 切换 `refresh` 状态触发刷新
//     };
//
//     // 处理删除记录
//     const handleRecordDeleted = () => {
//         setRefresh((prev) => !prev); // 切换 `refresh` 状态触发刷新
//     };