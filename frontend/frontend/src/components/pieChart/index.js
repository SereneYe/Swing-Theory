import React from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";

const PieChartComponent = ({ item }) => {
  const pieData = [
    {
      value: item.performanceDetail.excellent,
      color: item.colors.primary,
      gradientCenterColor: item.colors.primaryDark,
      focused: true,
    },
    {
      value: item.performanceDetail.good,
      color: item.colors.primaryLight,
    },
    {
      value: item.performanceDetail.fair,
      color: item.colors.highlight1,
    },
    { value: item.performanceDetail.poor, color: item.colors.highlight2 },
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
            marginBottom: 10,
            marginLeft: 25,
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
            <Text style={{ color: theme.colors.textDark }}>
              Excellent: {item.performanceDetail.excellent}%
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot(item.colors.highlight1)}
            <Text style={{ color: theme.colors.textDark }}>
              Okay: {item.performanceDetail.fair}%
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: 25,
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
            {renderDot(item.colors.primaryLight)}
            <Text style={{ color: theme.colors.textDark }}>
              Good: {item.performanceDetail.good}%
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot(item.colors.highlight2)}
            <Text style={{ color: theme.colors.textDark }}>
              Poor: {item.performanceDetail.poor}%
            </Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        marginBottom: hp(2),
      }}
    >
      <View style={{ padding: 20, alignItems: "center" }}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 22,
                    color: theme.colors.textDark,
                    fontWeight: "bold",
                  }}
                >
                  {item.performanceDetail.excellent}%
                </Text>
                <Text style={{ fontSize: 18, color: theme.colors.textDark }}>
                  Excellent
                </Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
};

export default PieChartComponent;
