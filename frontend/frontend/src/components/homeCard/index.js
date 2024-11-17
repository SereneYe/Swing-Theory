import React from "react";
import {View, Text, Pressable} from "react-native";
import * as Progress from "react-native-progress";
import { hp, wp } from "../../constants/common";
import { theme } from "../../constants/theme";
import {ArrowRightIcon} from "../../components/icons/icons";
import styles from "./styles";

const HomeProgressCard = ({data, index, navigation, status}) => {
    return (
        <View
            style={{
                flex: 1,
                height: index === 1 ? hp(18) : hp(16),
                padding: 6,
                alignSelf: "center",
                backgroundColor: data.color,
                justifyContent: "space-between",
                marginHorizontal: 8,
                borderRadius: 10,
                shadowColor: "lightgrey",
                shadowOffset: {width: -5, height: 5},
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 2,
            }}
        >
            <View style={{alignSelf: "center", marginTop: 10}}>
                <Progress.Circle
                    size={70}
                    showsText={true}
                    progress={status / 100}
                    formatText={() => status + "%"}
                    unfilledColor="#ededed"
                    borderColor="#ededed"
                    color={data.darkColor}
                    direction="clockwise"
                    strokeCap="round"
                    thickness={7}
                    style={styles.circlestyle}
                    textStyle={styles.textStyle}
                />
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Pressable
                    onPress={() => navigation.push("summary", {summaryId: data.id})}
                    style={styles.practicePressContainer}
                >
                    <Text style={styles.circleText}>{data.name}</Text>
                    <ArrowRightIcon color={theme.colors.textDark}/>
                </Pressable>
            </View>
        </View>
    );
};

export default HomeProgressCard;