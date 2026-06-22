import Toast from "react-native-toast-message";

export function showSuccess(message: string, description?: string) {
  Toast.show({
    type: "success",
    text1: message,
    text2: description,
    position: "top",
    visibilityTime: 3200,
  });
}

export function showError(message: string, description?: string) {
  Toast.show({
    type: "error",
    text1: message,
    text2: description,
    position: "top",
    visibilityTime: 4200,
  });
}

export function showInfo(message: string, description?: string) {
  Toast.show({
    type: "info",
    text1: message,
    text2: description,
    position: "top",
    visibilityTime: 3200,
  });
}
