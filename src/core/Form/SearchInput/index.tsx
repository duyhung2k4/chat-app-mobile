import React from "react";
import TextInputCustom from "../TextInput";
import IconSearch from "@/assets/icon/search.svg";

import { View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

const SearchInput: React.FC = () => {

  const Icon = React.forwardRef((props, ref) => {
    return (
      <View ref={ref as any}>
        <IconSearch height={24} width={24} />
      </View>
    )
  })

  return (
    <View style={styles.root}>
      <TextInputCustom
        placeholder="Search"
        leadingAccessory={<Icon />}
        containerStyle={{
          backgroundColor: "#232736",
          paddingLeft: 10,
          paddingRight: 10,
          borderRadius: 8,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
})

export default SearchInput;