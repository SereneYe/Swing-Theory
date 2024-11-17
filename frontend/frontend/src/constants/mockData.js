import { theme } from "./theme";

export const practiceData = [
    {
        id: "Forehand",
        name: "Forehand",
        status: 24,
        image: require("../assets/images/forehand.png"),
        color: theme.colors.lightYellow,
        darkColor: theme.colors.darkYellow,
    },
    {
        id: "Backhand",
        name: "Backhand",
        status: 50,
        image: require("../assets/images/backhand.png"),
        color: theme.colors.lightGreen,
        darkColor: theme.colors.darkGreen,
    },
    {
        id: "Serve",
        name: "Serve",
        status: 88,
        image: require("../assets/images/serve.png"),
        color: theme.colors.lightBlue,
        darkColor: theme.colors.darkBlue,
    },
];

export const videoData = [
    {
        description: "2 Hour Forehand Training",
        duration: "45 Min",
        type: "Forehand",
       id:"kBB7ynB4sIU"
    },
    {
        description: "1.5 Hour Backhand Training",
        duration: "40 Min",
        type: "Backhand",
        id:"EiswW8p17q4"
    },
    {
        description: "1 Hour Serve Practice",
        duration: "30 Min",
        type: "Serve",
        id:"Ax4IKl4lOU8"
    },
];