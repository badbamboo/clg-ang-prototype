import { Component, OnInit } from '@angular/core';
import { ENV_CONFIG } from '@configuration';
import { FileUploadService } from '@service';
import { Device } from '@model';
import _ from 'lodash';
const {
  ALERT_DANGER,
  ALERT_INFO,
  ALERT_SUCCESS,
  ERROR_FILE_MISSING,
  ERROR_FILE_TYPE,
  FILE_ID,
  FILE_TYPE,
  MESSAGE,
  MESSAGE_TEXT,
  TXT_MAC,
  TXT_SERIAL_NO,
  URL_SCAN,
} = ENV_CONFIG;
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  file: any = {};
  alertVarient = ALERT_INFO;
  alertMsgs = [MESSAGE];

  constructor(private readonly fileUploadSrv: FileUploadService) {}

  handleChange(event: any) {
    this.file = event.target.files[0];
  }

  handleSubmit(event: any) {
    this.alertVarient = ALERT_INFO;
    this.alertMsgs = [];
    event.preventDefault();
    if (!this.file.type) {
      this.alertVarient = ALERT_DANGER;
      this.alertMsgs.push({ ...MESSAGE, text: ERROR_FILE_MISSING });
      return console.error(ERROR_FILE_MISSING);
    }
    if (this.file.type !== FILE_TYPE) {
      this.alertVarient = ALERT_DANGER;
      this.alertMsgs.push({ ...MESSAGE, text: ERROR_FILE_TYPE });
      return console.error(ERROR_FILE_TYPE);
    }
    const formdata = new FormData();
    formdata.append(FILE_ID, this.file, this.file.name);
    this.alertMsgs.push({ ...MESSAGE, text: MESSAGE_TEXT });
    this.fileUploadSrv.upload(URL_SCAN, formdata).then((data: Device) => {
      if (data.error) {
        this.alertVarient = ALERT_DANGER;
        this.alertMsgs.push({ ...MESSAGE, text: JSON.stringify(data) });
        return;
      }
      this.alertMsgs = [];
      const { mac, serialNo } = data;
      this.alertVarient = ALERT_SUCCESS;
      this.alertMsgs.push({ ...MESSAGE, text: this.setDeviceInfo(TXT_MAC, {mac}) });
      this.alertMsgs.push({ ...MESSAGE, text: this.setDeviceInfo(TXT_SERIAL_NO, {serialNo}) });
    });
  }

  ngOnInit(): void {}

  private setDeviceInfo(key: string, value: any): string {
    const compiled = _.template(key);
      return compiled(value);
  }
}
