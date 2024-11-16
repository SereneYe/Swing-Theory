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
  videoText: {
    position: "absolute",
    fontSize: hp(2),
    fontWeight: theme.fonts.semibold,
    bottom: 5,
    left: 10,
    color: "#fff",
  },
  videoplay1: {
    position: "absolute",
    backgroundColor: "#fff",
    padding: 5,
    right: 10,
    top: 10,
    borderRadius: 5,
  },
  videoplay2: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
  },
  videoplay3: {
    position: "absolute",
    backgroundColor: theme.colors.primary,
    padding: 10,
    right: 25,
    top: -15,
    borderRadius: 15,
    zIndex: 3,
  },
  videotext: {
    fontFamily: "Poppins-Regular",
    fontSize: hp(1.8),
    color: theme.colors.primary,
  },
  dataimage: {
    height: 25,
    width: 25,
  },
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
  cirText: {
    marginTop: hp(1.5),
    fontSize: hp(2),
    fontWeight: "bold",
    color: theme.colors.primaryDark,
  },
  circleText: {
    fontSize: hp(1.6),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.primaryDark2,
  },

  videoImage: {
    height: 10,
    width: 10,
  },
  VideoImage: {
    height: 150,
    width: 300,
  },
  videoTitle: {
    fontSize: hp(1.8),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.textDark,
  },

  screen: {
    margin: "4%",
    flex: 1,
  },
});

export default styles;
