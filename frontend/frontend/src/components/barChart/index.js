import React from "react";
import { Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";

const BarChartComponent = ({ item }) => {
  const data = [
    {
      value: 25,
      frontColor: item.colors.primary,
      spacing: 6,
      label: "W1",
    },
    { value: 24, frontColor: item.colors.primaryLight },

    {
      value: 35,
      frontColor: item.colors.primary,
      spacing: 6,
      label: "W2",
    },
    { value: 30, frontColor: item.colors.primaryLight },
    {
      value: 42,
      frontColor: item.colors.primary,
      spacing: 6,
      label: "W3",
    },
    { value: 37, frontColor: item.colors.primaryLight },
    {
      value: 38,
      frontColor: item.colors.primary,
      spacing: 6,
      label: "W4",
    },
    { value: 42, frontColor: item.colors.primaryLight },
  ];

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot(item.colors.primary)}
            <Text style={{ color: theme.colors.textDark }}>This Month</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot(item.colors.primaryLight)}
            <Text style={{ color: theme.colors.textDark }}>Last Month</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: 25,
          }}
        ></View>
      </>
    );
  };

  return (
    <View style={{ marginBottom: hp(2) }}>
      <View style={{ alignItems: "center", marginBottom: hp(2) }}>
        <BarChart
          data={data}
          barWidth={16}
          initialSpacing={10}
          spacing={14}
          barBorderRadius={4}
          yAxisThickness={0}
          xAxisType={"dashed"}
          xAxisColor={theme.colors.textDark}
          yAxisTextStyle={{ color: theme.colors.textDark }}
          stepValue={10}
          maxValue={50}
          noOfSections={6}
          yAxisLabelTexts={["0", "50", "100", "150", "200", "250"]}
          labelWidth={40}
          xAxisLabelTextStyle={{
            color: theme.colors.textDark,
            textAlign: "center",
          }}
          showLine
          lineConfig={{
            color: item.colors.highlight2,
            thickness: 3,
            curved: true,
            hideDataPoints: true,
            shiftY: 20,
            initialSpacing: -30,
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
};

export default BarChartComponent;
