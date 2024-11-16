import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";

export const textStyle = {
  color: theme.colors.dark,
  fontSize: hp(1.75),
};

export const shadowStyles = {
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.06,
  shadowRadius: 6,
  elevation: 1,
};

export const tagsStyles = {
  div: textStyle,
  p: textStyle,
  ol: textStyle,
  h1: {
    color: theme.colors.dark,
  },
  h4: {
    color: theme.colors.dark,
  },
};

export const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: theme.radius.xxl * 1.1,
    borderCurve: "continuous",
    padding: 10,
    paddingVertical: 12,
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: theme.colors.gray,
    shadowColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  username: {
    fontSize: hp(1.7),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.medium,
  },
  titleContainer: { paddingHorizontal: hp(1) },
  title: {
    fontSize: hp(1.8),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.medium,
  },
  postTime: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    fontWeight: theme.fonts.medium,
  },
  content: {
    gap: 10,
  },
  postMedia: {
    height: hp(40),
    width: "100%",
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
  },
  postBody: {
    marginLeft: 5,
  },
  // result styles
  resultContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resultColumnContainer: {
    paddingHorizontal: hp(4),
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(2.5),
  },
  resultRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  resultTitle: {
    fontSize: hp(2.4),
    marginBottom: hp(2.5),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.bold,
  },
  circlestyle: {
    elevation: 2,
    overflow: "hidden",
  },
  textStyle: {
    fontSize: hp(3.6),
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
  },
  resultImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  resultImage: {
    width: wp(40),
    height: hp(30),
    borderRadius: theme.radius.xl,
    margin: wp(2),
  },
  resultTextContainer: {
    justifyContent: "flex-start",
    gap: 10,
  },
  resultText: {
    fontSize: hp(2),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.medium,
  },
  resultLastColumnContainer: {
    paddingHorizontal: hp(4),
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  /////////////////////////
});
