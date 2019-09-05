export class OAuthOptionsModel {
  url: string;
  windowsName: string;
  options: string;

  constructor( url: string, windowsName: string, options?: string ) {
    this.url = url;
    this.windowsName = windowsName;
    this.options = options;
  }
}
