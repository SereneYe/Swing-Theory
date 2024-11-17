import { StyleSheet } from "react-native";
import { hp, wp } from "../../constants/common";
import { theme } from "../../constants/theme";

const styles = StyleSheet.create({
    videoCard: {
        borderRadius: 15,
        marginHorizontal: 12,
        shadowOffset: { width: -3, height: 3 },
        shadowColor: "grey",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        backgroundColor: "#fff",
        height: hp(28),
    },
    videoplay2: {
        backgroundColor: "white",
        padding: 8,
        borderRadius: 15,
    },
    videoTitle: {
        fontSize: hp(1.9),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.textDark,
    },
    videoDuration: {
        fontFamily: "Poppins-Regular",
        fontSize: hp(1.8),
        color: theme.colors.primary,
    },
    videoType: {
        marginTop: hp(1.5),
        fontSize: hp(2),
        fontWeight: "bold",
        color: theme.colors.primaryDark,
    },
});

export default styles;
