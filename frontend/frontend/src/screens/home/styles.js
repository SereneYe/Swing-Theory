import { StyleSheet } from "react-native";
import { hp, wp } from "../../constants/common";
import { theme } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: wp(4),
  },
  text: {
    fontSize: hp(2.8),
    marginHorizontal: hp(0.5),
    fontWeight: theme.fonts.bold,
    color: theme.colors.primary,
  },
  banner: {
    marginTop: hp(1),
    padding: 25,
    resizeMode: "contain",
    borderRadius: 20,
    overflow: "hidden",
    flexDirection: "row",
  },
  model: {
    position: "absolute",
    right: 0,
    bottom: 154,
    zIndex: 10,
    height: "127%",
    width: "30%",
    borderRadius: 30,
  },
  title: {
    fontSize: hp(2.4),
    fontWeight: theme.fonts.bold,
    color: "white",
  },
  titleVideo: {
    fontSize: hp(2.6),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textDark,
    marginBottom: 10,
  },
  activitiesContainer: {
    marginTop: hp(1),
    marginBottom: hp(1),
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  activitiesTitle1: {
    fontSize: hp(2.6),
    fontWeight: theme.fonts.bold,
    color: theme.colors.textDark,
  },
  screen: {
    margin: "4%",
    flex: 1,
  },
});

export default styles;
