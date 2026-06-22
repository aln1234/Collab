import { StyleSheet, Text } from "react-native";

type ErrorTextProps = {
  message?: string | null;
};

export function ErrorText({ message }: ErrorTextProps) {
  if (!message) {
    return null;
  }

  return <Text style={styles.text}>{message}</Text>;
}

const styles = StyleSheet.create({
  text: {
    color: "#b91c1c",
    fontSize: 14,
    lineHeight: 20,
  },
});
