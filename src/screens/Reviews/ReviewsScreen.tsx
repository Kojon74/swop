import { SafeAreaView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { TabBar, TabView } from "react-native-tab-view";
import ReviewsList from "./ReviewsList";
import { colors } from "../../utils/colors";
import { Text } from "react-native";
import { fonts } from "../../utils/fonts";

type Props = {};

const renderTabBar = (props) => (
  <SafeAreaView>
    <TabBar
      {...props}
      activeColor={colors.primary}
      inactiveColor={colors.lightGray}
      indicatorStyle={{ backgroundColor: colors.primary }}
      renderLabel={({ route, focused }) => (
        <Text style={[fonts.p, focused && { color: colors.primary }]}>
          {route.title}
        </Text>
      )}
      style={styles.tabBar}
    />
  </SafeAreaView>
);

const ReviewsScreen = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0);

  const routes = [
    { key: "received", title: "Reviews Received" },
    { key: "given", title: "Reviews Given" },
  ];

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "received":
        return <ReviewsList data={{}} />;
      case "given":
        return <ReviewsList data={{}} />;
    }
  };

  return (
    <TabView
      navigationState={{ index: tabIndex, routes }}
      onIndexChange={setTabIndex}
      renderScene={renderScene}
      // initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      style={{ alignSelf: "stretch" }}
    />
  );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
  tabBar: { backgroundColor: "rgba(0, 0, 0, 0)", marginBottom: 10 },
});
