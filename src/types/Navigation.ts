import { ScannedItem } from "./ScannedItem"

export type RootStackParamList = {
  Main: undefined
  SetCode: {},
  ActivityList: {}
  Alert: {}
  SetStatus: {}
  PickUser: {}
  Login: {}
  EnterCode: {}
  ScanResult: {
    items: ScannedItem[],
    itemCode: string
  }
}