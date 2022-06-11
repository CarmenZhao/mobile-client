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


let openData =[];

props.rowData.map((x)=>{

openData.push(x.open);


})
let data = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100
  ]
return(
<View>
    <Text>Bezier Line Chart</Text>
    <LineChart
      data={{
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: openData
          }
        ]
      }}
      width={Dimensions.get("window").width} // from react-native
      height={220}
      withDots={false}//can't delete!important
      yAxisLabel="$"
      yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: "#e26a00",
        backgroundGradientFrom: "#fb8c00",
        backgroundGradientTo: "#ffa726",
        decimalPlaces: 2, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: "#ffa726"
        }
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 16
      }}
    />
  </View>);



}