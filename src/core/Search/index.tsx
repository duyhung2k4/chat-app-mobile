import React from "react";
import TextInputCustom from "../Form/TextInput";
import IconSearch from "@/assets/icon/search.svg";

import { View } from "react-native-ui-lib";
import { StyleSheet } from "react-native";

const Search: React.FC = () => {

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
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: "100%",
  },
})

export default Search;