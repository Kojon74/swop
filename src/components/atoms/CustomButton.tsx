import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fonts } from "../../utils/fonts";
import { colors } from "../../utils/colors";

enum ButtonType {
  Destructive,
  Disabled,
  Primary,
  Secondary,
  Input,
}

interface Props {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
  type?: ButtonType;
  placeholder?: boolean;
}

const CustomButton = ({
  style,
  text,
  onPress,
  disabled = false,
  type = ButtonType.Primary,
  placeholder,
}: Props) => {
  let btnStyle;
  let btnTxtStyle;
  switch (type) {
    case ButtonType.Primary:
      btnStyle = styles.primary;
      btnTxtStyle = styles.primaryTxt;
      break;
    case ButtonType.Secondary:
      btnStyle = styles.secondary;
      btnTxtStyle = styles.secondaryTxt;
      break;
    case ButtonType.Destructive:
      btnStyle = styles.destructive;
      btnTxtStyle = styles.destructiveTxt;
      break;
    case ButtonType.Disabled:
      btnStyle = styles.disabled;
      break;
    case ButtonType.Input:
      btnStyle = styles.disabled;
      btnTxtStyle = placeholder ? styles.inputTxt : styles.activeInputTxt;
      break;

    default:
      break;
  }

  return (
    <TouchableOpacity
      style={[styles.container, btnStyle, style]}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[fonts.p, styles.text, btnTxtStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

export { ButtonType };
export default CustomButton;

const styles = StyleSheet.create({
  container: {
    marginTop: "auto",
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.background,
  },
  secondary: {
    backgroundColor: colors.background,
    borderColor: colors.primary,
    borderWidth: 2,
  },
  disabled: { backgroundColor: colors.lightGray },
  destructive: {
    backgroundColor: colors.background,
    borderColor: colors.red,
    borderWidth: 2,
  },
  text: {
    textAlign: "center",
    color: "white",
  },
  primaryTxt: { color: colors.background },
  secondaryTxt: { color: colors.primary },
  destructiveTxt: { color: colors.red },
  inputTxt: { textAlign: "auto", color: colors.lightBlack },
  activeInputTxt: { textAlign: "auto", color: "black" },
});
