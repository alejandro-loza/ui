import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpInterceptorService} from "./http-interceptor/http-interceptor.service";

export const InterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
];
