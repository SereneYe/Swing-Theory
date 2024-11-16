import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    paddingHorizontal: wp(5),
  },
  welcomeImage: {
    marginTop: hp(10),
    height: hp(25),
    width: wp(100),
    alignSelf: "center",
  },
  welcomeTitle: {
    height: hp(10),
    width: wp(90),
    alignSelf: "flex-start",
  },
  punchline: {
    textAlign: "center",
    fontSize: hp(2),
    color: theme.colors.textLight,
    fontWeight: theme.fonts.bold,
    marginTop: hp(15),
  },
  footer: {
    gap: 30,
    width: "100%",
    marginBottom: hp(10),
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  loginText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
});

export default styles;
