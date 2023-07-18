import { StyleSheet, Text, TextStyle } from "react-native";
import React, { ReactNode } from "react";
import { fonts } from "../../utils/fonts";

type Props = { style?: TextStyle | TextStyle[]; children: ReactNode };

const CustomText = ({ style, children }: Props) => {
  return <Text style={[fonts.p, style]}>{children}</Text>;
};

export default CustomText;

const styles = StyleSheet.create({});
