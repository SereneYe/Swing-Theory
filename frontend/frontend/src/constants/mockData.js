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
        description: "Forehand: THE BASICS",
        duration: "40 Sec",
        type: "Forehand",
       id:"gcbh1hKavx0"
    },
    {
        description: "Backhand: THE BASICS",
        duration: "3 Mi",
        type: "Backhand",
        id:"WNnW9Dd2vMY"
    },
    {
        description: "Serve: THE BASICS",
        duration: "56 Sec",
        type: "Serve",
        id:"dIptTnc5pMU"
    },
];