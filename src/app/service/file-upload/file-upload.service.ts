import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  async upload(url: string, formdata: any): Promise<any> {
		const requestOptions: any = {
			method: 'POST',
			body: formdata
		};
    return fetch(url, requestOptions)
    .then((response) => response.text())
    .then((result) => JSON.parse(result))
    .catch((error) => { error });
  }
}
