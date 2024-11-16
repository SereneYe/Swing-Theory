import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";

export const styles = StyleSheet.create({
  // result styles
  cardImageContainer: {
    alignItems: "center",
  },
  resultColumnContainer: {
    paddingHorizontal: hp(4),

    alignItems: "center",
    // justifyContent: "center",
    marginBottom: hp(2.5),
  },
  resultRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  resultTitle: {
    fontSize: hp(2.4),
    marginBottom: hp(2),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.bold,
  },
  resultDivisor: {
    fontSize: hp(2.4),
    marginBottom: hp(3.5),
    color: theme.colors.textDark,
  },

  textStyle: {
    fontSize: hp(3.6),
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
  },
  resultImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(2),
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
    marginBottom: hp(2.5),
  },
  postMedia: {
    height: hp(40),
    width: wp(70),
    alignSelf: "center",
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    marginBottom: hp(2.5),
  },
  /////////////////////////
});
