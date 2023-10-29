import AsyncStorage from "@react-native-async-storage/async-storage";

export type TokenType = "accessToken";
export const getToken = async (type: TokenType): Promise<string> => {
  const token = await AsyncStorage.getItem(type);
  return token || "";
}