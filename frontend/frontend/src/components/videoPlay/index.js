import React from "react";
import { View, Text } from "react-native";
import YoutubePlayer from 'react-native-youtube-iframe';
import styles from "./styles";

const VideoPlay = ({ video }) => {
    return (
        <View style={styles.videoCard}>
            <View style={{ borderRadius: 10, overflow: "hidden" }}>
                <YoutubePlayer
                    videoId={video.id}
                    play={false}
                    height={180}
                    width={300}
                />
            </View>

            <View style={styles.videoplay2}>
                <Text style={styles.videoTitle}>{video.description}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={styles.videoType}>{video.type}</Text>
                    <Text style={styles.videoDuration}>{video.duration}</Text>
                </View>
            </View>
        </View>
    );
};

export default VideoPlay;