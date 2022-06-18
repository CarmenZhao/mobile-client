import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import {
    StyleSheet,
    View /* include other react-native components here as needed */,
    Text,
    Dimensions,
  } from "react-native";
export default function InfoChart(props){

let dateLabel = []
props.rowData.map((x)=>{
  dateLabel.push(x.date)

})
let finalLabel=[dateLabel[0],dateLabel[24],dateLabel[49],dateLabel[100]]

let date1 = dateLabel[0];
let date2 = dateLabel[24];
let date3 = dateLabel[49];
let date4 = dateLabel[99];

const labels = props.rowData.date;

let openData =[];

props.rowData.map((x)=>{

openData.push(x.open);


})

return (
  <View>
    <LineChart
      data={{
        labels: [date1, date2, date3, date4],
        datasets: [
          {
            data: openData,
            color: (opacity = 1) => `rgba(255, 70, 62, ${opacity})`,
          },
        ],
      }}
      width={Dimensions.get("window").width} // from react-native
      height={220}
      withDots={false} //can't delete!important
      yAxisLabel="$"
      yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundGradientFrom: "#FF463E",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#FF463E",
        backgroundGradientToOpacity: 0,
        fillShadowGradientFrom: "#FF463E",
        fillShadowGradientFromOpacity: 0.5,
        fillShadowGradientTo: "rgba(242, 242, 242)",
        fillShadowGradientToOpacity: 1,
        propsForBackgroundLines: {strokeDasharray: "" },

        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(6, 7, 10, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(6, 7, 10, ${opacity})`,
        style: {
          borderRadius: 0,
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 0,
        margin: 15,
      }}
    />
  </View>
);



}