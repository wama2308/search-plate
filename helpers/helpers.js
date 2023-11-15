import { showMessage } from "react-native-flash-message";

export const flashMessageAction = (message, type) => {
    showMessage({
        message: message,
        type: type,
        icon: { icon: "auto", position: "left" },
        floating: true,
        position: "top",
        animated: true,
        animationDuration: 500,
        autoHide: true,
        duration: 5000,
        hideOnPress: true,
    })
};

export const dataMenuAccount = [
    {
        label: 'IMEI',
        route: 'imei'
    }
]