import { StyleSheet } from "react-native";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp(3),
    justifyContent: "space-between",
  },
  headerOuterContainer: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: hp(2),
  },
  headerContainer: {
    marginHorizontal: wp(4),
    marginBottom: 20,
  },
  headerShape: {
    width: wp(100),
    height: hp(20),
  },
  avatarContainer: {
    height: hp(12),
    width: hp(12),
    alignSelf: "center",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  userName: {
    fontSize: hp(3),
    fontWeight: "500",
    color: theme.colors.textDark,
  },
  profileContainer: {
    gap: hp(0.8),
    marginTop: hp(1),
    marginHorizontal: wp(4),
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
  },
  infoTitle: {
    fontWeight: "500",
    color: theme.colors.textDark,
    fontSize: hp(2.0),
  },
  infoText: {
    fontWeight: "500",
    color: theme.colors.textLight,
    fontSize: hp(2.0),
  },
  backButton: {
    position: "absolute",
    left: wp(1.5),
    padding: 4,
    borderRadius: theme.radius.sm,
    backgroundColor: "rgba(0,0,0,0.07)",
  },
  logoutButton: {
    position: "absolute",
    right: wp(1.5),
    padding: 8,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.roseLight,
  },
  listStyle: {
    paddingHorizontal: wp(4),
    paddingBottom: 30,
  },
  noPosts: {
    fontSize: hp(2),
    textAlign: "center",
    color: theme.colors.text,
  },
});
