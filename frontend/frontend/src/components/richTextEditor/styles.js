import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";

const styles = StyleSheet.create({
    rich: {
        minHeight: 240,
        flex: 1,
        borderWidth: 1.5,
        borderTopWidth: 0,
        borderBottomRightRadius: theme.radius.xl,
        borderBottomLeftRadius: theme.radius.xl,
        borderColor: theme.colors.gray,
        padding: 5,
    },
    contentStyle: {
        color: theme.colors.textDark,
        fontSize:hp(2),
        placeholderColor: 'gray',
    },
    richBar: {
        borderTopLeftRadius: theme.radius.xl,
        borderTopRightRadius: theme.radius.xl,
        backgroundColor: theme.colors.gray,
    },
    flatStyle: {
        paddingHorizontal: 8,
        gap: 3,
    },
});

export default styles;