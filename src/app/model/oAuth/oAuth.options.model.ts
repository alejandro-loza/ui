export class OAuthOptionsModel {
  url: string;
  windowsName: string;
  options: string;
  data: any;

  constructor( url: string, windowsName: string, options?: string, data?: any ) {
    this.url = url;
    this.windowsName = windowsName;
    this.options = options;
    this.data = data;
  }
}
