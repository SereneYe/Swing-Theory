import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "white",
  },
  uploadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  spacer: {
    flex: 1,
  },
  formContainer: {
    margin: 20,
    flexDirection: "row",

    height: 300,
  },
  buttonsContainer: {
    flexDirection: "row",
    marginRight: 40,
    marginLeft: 60,
    marginBottom: 60,
  },
  inputText: {
    paddingVertical: 10,
    marginRight: 20,
    flex: 1,
    fontSize: 24,
  },
  mediaPreview: {
    aspectRatio: 9 / 16,
    backgroundColor: "black",
    width: 120,
    borderRadius: 18,
  },
  cancelButton: {
    alignItems: "center",
    flex: 1,
    borderColor: "lightgray",
    borderWidth: 1,
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 12,
    marginRight: 10,
  },
  postButton: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "#ff4040",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 12,
    marginRight: 10,
  },
  cancelButtonText: {
    marginLeft: 5,
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  postButtonText: {
    marginLeft: 5,
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  analysisingText: {
    marginTop: 10, // Adding space above the text
    fontSize: 18, // Sets font size
    color: "#555", // Sets text color
    textAlign: "center", // Align text to center
  },
});

export default styles;
