import { TypeModelType } from "../constants/modelType"

export interface BasicQueryPayload {
  data: Record<string, any> | Record<string, any>[]
  modelType: TypeModelType
}

export interface BasicQueryPayResponse {
  data: Record<string, any> | Record<string, any>[]
}