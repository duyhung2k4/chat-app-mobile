import { ITEM_ASYNC_STORE_AGE } from "@/constants/itemAsycnStoreAge";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type TokenType = ITEM_ASYNC_STORE_AGE.ACCESS_TOKEN;
export const getToken = async (type: TokenType): Promise<string> => {
  const token = await AsyncStorage.getItem(type);
  return token || "";
}

export const removeItem = async (name: ITEM_ASYNC_STORE_AGE, callback?: () => void): Promise<void> => {
  const _ = await AsyncStorage.removeItem(name);
  if(callback) {
    callback();
  };
}