import {
    StyleSheet,
    View /* include other react-native components here as needed */,
    Text,
  } from "react-native";

export default function ComDetails(props){
return(

<View>
    <Text>{props.compData.name}</Text>
    <Text>{props.compData.change}</Text>
    <Text>{props.compData.price}</Text>
</View>
)

} 