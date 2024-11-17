import React, {useCallback, useEffect, useState} from "react";
import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    FlatList,
} from "react-native";
import styles from "./styles";
import ScreenWrapper from "../../components/screenWrapper/screenWrapper";
import HomeProgressCard from "../../components/homeCard";
import {getUserInfo} from "../../services/user";
import {useNavigation} from "@react-navigation/native";
import {practiceData, videoData} from "../../constants/mockData";
import VideoPlay from "../../components/videoPlay";
import banner from "../../assets/images/bg.jpeg";

const HomeScreen = () => {

    const [user, setUser] = useState(() => getUserInfo());
    useEffect(
        useCallback(() => {
            (async () => {
                const data = await getUserInfo();
                setUser(data);
            })();
        }, [])
    );

    const navigation = useNavigation();

    return (
        <ScreenWrapper bg="white">
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text}> Welcome back, {user.name} 😀</Text>
                </View>
                <ScrollView style={styles.screen}>
                    <ImageBackground style={styles.banner} source={banner}>
                        <View style={{flex: 1}}>
                            <Text style={styles.title}>Serve, Smash & Win!🎾</Text>
                            <Text style={styles.title}>Become a Tennis Pro with Us! ✊</Text>
                        </View>
                    </ImageBackground>

                    <View style={styles.activitiesContainer}>
                        <Text style={styles.activitiesTitle1}>Practices</Text>
                        <View style={{flexDirection: "row"}}>

                            <FlatList
                                data={practiceData}
                                keyExtractor={(item) => item.id}
                                renderItem={({item, index}) => (
                                    <HomeProgressCard
                                        data={item}
                                        index={index}
                                        navigation={navigation}
                                        status={item.status}
                                    />
                                )}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>

                    <View style={{padding: 10, alignItems: "flex-start"}}>
                        <Text style={styles.titleVideo}>Tutorial Video</Text>
                        <ScrollView
                            horizontal
                            style={{paddingBottom: 20, paddingTop: 10}}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{paddingHorizontal: 16}}
                        >
                            {videoData.map((video, index) => (
                                <VideoPlay
                                    key={index}
                                    video={video}
                                />
                            ))}
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
        </ScreenWrapper>
    );
};

export default HomeScreen;
