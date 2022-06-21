import * as React from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import {
  Linking,
  Text,
  View,
  Image,
  SafeAreaView,
  Dimensions,
  Pressable,
} from "react-native";

//const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export function NewsCard(props) {
  const windowWidth = Dimensions.get("window").width;
  console.log(props.data);
  return (
    <View
      style={{
        flexDirection: "column ",
        justifyContent: "center",
        alignItem: "center",
      }}
    >
      <Text
        style={{ fontFamily: "Helvetica-Bold", color: "red", marginLeft: 20 }}
      >
        News
      </Text>
      {props.data.map((news) => (
        <View key={news.title}>
          <Pressable
            onPress={() => Linking.openURL(news.url)}
            style={{
              flex: 1,
              flexDirection: "row",
              width: windowWidth - 50,
              height: 100,
              paddingRight: 90,
              margin: 10,
              borderBottomColor: "#BFBFBF",
              borderBottomWidth: 1,
              marginHorizontal: 20,
            }}
          >
            <View>
              <Image
                style={{ aspectRatio: 1, height: 100 }}
                source={{ uri: news.img }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{news.title}</Text>
            </View>
          </Pressable>
        </View>
      ))}
    </View>
    // <ScrollView>
    //   {props.data.map((news) => (
    //     <Card key={news.title} onPress={() => Linking.openURL(news.url)}>
    //       {/* <Card.Title
    //         title={news.title}
    //         subtitle={news.description}
    //         //left={LeftContent}
    //       /> */}
    //       <Card.Content>
    //         <Title>{news.title}</Title>
    //         <Paragraph>{news.description}</Paragraph>
    //       </Card.Content>
    //       <Card.Cover source={{ uri: news.img }} />
    //       {/* <Card.Actions>
    //       <Button>Cancel</Button>
    //       <Button>Ok</Button>
    //     </Card.Actions> */}
    //     </Card>
    //   ))}
    // </ScrollView>
  );
}
