import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { colors } from "../../utils/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { State, TapGestureHandler } from "react-native-gesture-handler";

const WINDOW_WIDTH = Dimensions.get("window").width;

type Props = {
  data: string[];
  liked: boolean;
  setLiked: Dispatch<SetStateAction<boolean>>;
};

const Carousel = ({ data, liked, setLiked }: Props) => {
  const doubleTapRef = useRef(null);

  const onSingleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      console.log("single tap 1");
    }
  };

  const onDoubleTapEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setLiked(true);
    }
  };

  return (
    <TapGestureHandler
      onHandlerStateChange={onDoubleTapEvent}
      numberOfTaps={2}
      ref={doubleTapRef}
    >
      <View>
        <FlatList
          renderItem={({ item }) => (
            <TapGestureHandler
              onHandlerStateChange={onSingleTapEvent}
              waitFor={doubleTapRef}
            >
              <Image source={{ uri: item }} style={styles.image} />
            </TapGestureHandler>
          )}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
        <TouchableOpacity
          onPress={() => setLiked((prev) => !prev)}
          style={styles.likeButton}
        >
          <FontAwesome5
            name="heart"
            solid={liked}
            color={liked ? colors.red : "#000"}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </TapGestureHandler>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  image: { width: WINDOW_WIDTH, height: WINDOW_WIDTH },
  likeButton: { position: "absolute", bottom: 0, right: 0, padding: 10 },
});
