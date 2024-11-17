import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 30,
        paddingHorizontal: wp(4),
        gap: 15,
    },
    topHeader: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    backButton: {
        position: "absolute",
        left: wp(1.5),
        padding: 4,
        borderRadius: theme.radius.sm,
        backgroundColor: "rgba(0,0,0,0.07)",
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(3),
        fontWeight: theme.fonts.bold,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    username: {
        fontSize: hp(2.2),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text,
    },
    publicText: {
        fontSize: hp(1.7),
        fontWeight: theme.fonts.medium,
        color: theme.colors.textLight,
    },
    textEditor: {},
    media: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1.5,
        padding: 12,
        paddingHorizontal: 18,
        borderRadius: theme.radius.xl,
        borderColor: theme.colors.gray,
    },
    mediaIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    addImageText: {
        fontSize: hp(1.9),
        fontWeight: theme.fonts.semibold,
        color: theme.colors.text,
    },
    file: {
        height: hp(30),
        width: '100%',
        borderRadius: theme.radius.xl,
        overflow: 'hidden',
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
});

export default styles;