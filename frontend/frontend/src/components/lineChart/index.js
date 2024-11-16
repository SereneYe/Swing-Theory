import React from "react";
import { Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";

export const LineChartComponent = ({ item }) => {
  const OFFSET = 50;

  var data = item.pastScore.map(function (score) {
    return { value: score };
  });
  return (
    <View style={{}}>
      <LineChart
        areaChart
        curved
        data={data}
        hideDataPoints
        spacing={18}
        color={item.colors.primary}
        startFillColor={item.colors.primary}
        endFillColor={item.colors.primary}
        startOpacity={0.9}
        endOpacity={0.2}
        initialSpacing={0}
        noOfSections={4}
        yAxisColor={theme.colors.textDark}
        yAxisThickness={0}
        rulesType="solid"
        rulesColor={theme.colors.textDark}
        yAxisTextStyle={{ color: theme.colors.textDark }}
        xAxisColor={theme.colors.textDark}
        yAxisOffset={50}
      />
    </View>
  );
};

export default LineChartComponent;
