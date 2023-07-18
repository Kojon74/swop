import {
  KeyboardAvoidingView,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputSubmitEditingEventData,
  TextStyle,
  View,
} from "react-native";
import React, { MutableRefObject, useEffect, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";

interface Props {
  autoFocus?: boolean;
  editable?: boolean;
  errorMessage?: string;
  icon?: string;
  inputAccessoryViewID?: string;
  isPass?: boolean;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  multiline?: boolean;
  placeholder: string;
  value: any;
  style?: StyleProp<TextStyle>;
  touched?: boolean;
  refValue?: MutableRefObject<any>;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onChangeText: (text: string) => void;
  onSubmitEditing?: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
}

const CustomTextInput = ({
  autoFocus = false,
  editable = true,
  errorMessage = "",
  icon,
  inputAccessoryViewID,
  isPass,
  keyboardType,
  maxLength,
  multiline = false,
  placeholder,
  refValue,
  style,
  touched = false,
  value,
  onFocus,
  onChangeText,
  onSubmitEditing,
}: Props) => {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(errorMessage && touched);

  useEffect(() => {
    setError(errorMessage && touched);
  }, [errorMessage, touched]);

  return (
    <KeyboardAvoidingView>
      <View style={[styles.container, !!error && styles.containerError]}>
        {icon && (
          <View style={[styles.icon, !!error && styles.iconError]}>
            <FontAwesome5
              name={icon}
              solid
              size={20}
              color={colors.lightBlack}
            />
          </View>
        )}
        <TextInput
          autoCorrect={false}
          autoFocus={autoFocus}
          editable={editable}
          enablesReturnKeyAutomatically={true}
          inputAccessoryViewID={inputAccessoryViewID}
          keyboardType={keyboardType}
          maxLength={maxLength}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={colors.lightBlack}
          ref={refValue}
          returnKeyType="next"
          secureTextEntry={isPass && !showPass}
          style={[
            fonts.p,
            styles.input,
            multiline && styles.multiline,
            !!error && !icon && styles.inputError,
            style,
          ]}
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onSubmitEditing={onSubmitEditing}
        />
        {isPass && (
          <TouchableOpacity
            style={styles.showPass}
            onPress={() => setShowPass(!showPass)}
          >
            <FontAwesome5
              name={showPass ? "eye" : "eye-slash"}
              solid
              size={24}
              color={colors.darkGray}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={fonts.error}>{errorMessage}</Text>}
    </KeyboardAvoidingView>
  );
};

export default CustomTextInput;

const borderWidth = 2;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 10,
    backgroundColor: colors.lightGray,
  },
  containerError: {
    borderWidth,
    borderColor: colors.red,
    paddingVertical: 10 - borderWidth,
  },
  icon: {
    width: 30,
    marginLeft: 10,
    alignItems: "center",
  },
  iconError: { marginLeft: 10 - borderWidth },
  input: { flex: 1, paddingHorizontal: 10 },
  multiline: { height: 100 },
  inputError: { paddingLeft: 10 - borderWidth },
  showPass: { marginRight: 10 },
});
