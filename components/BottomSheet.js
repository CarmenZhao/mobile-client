import React, { useCallback, useMemo, useRef } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";

export function BottomSheetTest() {
  // hooks
  const bottomSheetRef = useRef < BottomSheet > null;

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  // callbacks
  //   const handleSheetChanges = useCallback((index: number) => {
  //     console.log("handleSheetChanges", index);
  //   }, []);

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        initialSnapIndex={1}
        snapPoints={snapPoints}
      >
        {/* INSERT A SCROLLABLE HERE */}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
