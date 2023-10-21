import { ProfileModel } from "@/model/profile"


export interface SendInfoRegisterPayload {
  username: string
  password: string
  email: string
}
export interface SendCode {
  idTemporaryCredential: number
  code: string
}
export interface SendInfoRegisterReponse {
  id: number
  username: string
  email: string
  timeStart: string
  timeEnd: string
}

export interface LoginPayload {
  username: string
  password: string
}
export interface LoginResponse {
  accessToken: string,
  refreshToken: string,
  profile: ProfileModel
}