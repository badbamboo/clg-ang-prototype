export interface Device {
  mac: string[]
  path: string
  serialNo: string[]
  text: string;
  error?: any;
  [key: string]: any;
}
