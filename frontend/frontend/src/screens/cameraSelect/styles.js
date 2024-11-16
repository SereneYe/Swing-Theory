import { StyleSheet } from "react-native";
import { hp, wp } from "../../constants/common";
import { theme } from "../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    gap: 18,
    marginTop: hp(22),
    alignSelf: "center",
  },
  backButton: {
    position: "absolute",
    left: hp(3),
    padding: 5,
    borderRadius: theme.radius.sm,
    backgroundColor: "rgba(0,0,0,0.07)",
  },
  dropdownButtonStyle: {
    width: wp(80),
    height: hp(6.6),
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xl,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.text,
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: theme.radius.lg,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    height: hp(5),
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.text,
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
