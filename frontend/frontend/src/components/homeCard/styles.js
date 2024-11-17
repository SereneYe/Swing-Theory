import { StyleSheet } from "react-native";
import { hp, wp } from "../../constants/common";
import { theme } from "../../constants/theme";

const styles = StyleSheet.create({
    circlestyle: {
        elevation: 2,
        overflow: "hidden",
    },
    textStyle: {
        fontSize: hp(2),
        fontFamily: "Poppins-Bold",
        fontWeight: "bold",
    },
    practicePressContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 10,
    },
    circleText: {
        fontSize: hp(1.6),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.primaryDark2,
    },
});

export default styles;