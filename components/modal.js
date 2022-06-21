import React, { useState } from "react";
import { Button, Text, View, Image, ImageBackground } from "react-native";
import Modal from "react-native-modal";
import { IconButton } from "react-native-paper";

export function GetModal() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Button title="Show modal" onPress={toggleModal} /> */}
      <IconButton icon="information-outline" size={20} onPress={toggleModal} />
      <View>
        <Modal
          isVisible={isModalVisible}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          style={{
            backgroundColor: "white",
            maxHeight: 170,
            marginTop: 250,
            borderRadius: 30,
          }}
        >
          <View style={{ flex: 1, padding: 20, alignItems: "center" }}>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>
              How to use Stock Genius
            </Text>
            <Text>
              {"\n"}1. Single tab to view detail information of the stcok
            </Text>
            <Text>2. long press to remove the stock from your watchList</Text>

            <IconButton icon="close" size={20} onPress={toggleModal} />
          </View>
        </Modal>
      </View>
    </View>
  );
}
