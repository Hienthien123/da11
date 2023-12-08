import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { BaseResponseModel } from '../models/baseResponse.model';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
// import { TokenResponseModel, UserLogInModel, UserSignUpModel } from '../models/user.model';
import { ChangePasswordModel } from '../models/changePassword.model';
import {
  CreateAccount,
  GetAllInfoUserModel,
  TokenResponseModel,
  UserLogInModel,
  UserSignUpModel
} from '../models/user.model';
import {DocumentModel} from "../models/document.model";
import {CommentModel} from "../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.apiUrl}/AppUser`;
  private baseUrl1 = `${environment.apiUrl1}/auth`;
  private REDIRECT_URI = environment.sso_redirect_uri;
  constructor(private http: HttpClient) { }

  SignUp(payload: UserSignUpModel): Observable<BaseResponseModel<string>>{
    const apiUrl = `${this.baseUrl}/SignUp`;
    return this.http.post<BaseResponseModel<string>>(apiUrl, payload);
  }

  GetAllUserInfo() :  Observable<BaseResponseModel<GetAllInfoUserModel[]>> {
    const apiUrl = `${this.baseUrl}/GetAllUserInfo`;
    return this.http.get<BaseResponseModel<GetAllInfoUserModel[]>>(apiUrl);
  }
  LogIn(payload: UserLogInModel): Observable<BaseResponseModel<TokenResponseModel>>{
    const apiRul = `${this.baseUrl1}/login`;
    return this.http.post<BaseResponseModel<TokenResponseModel>>(apiRul, payload)
  }

  // LogIn(payload: UserLogInModel): Observable<BaseResponseModel<TokenResponseModel>>{
  //   const apiRul = `${this.baseUrl}/Login`;
  //   return this.http.post<BaseResponseModel<TokenResponseModel>>(apiRul, payload)
  // }


  LogOut(){
    // localStorage.removeItem('UserInfo');
    localStorage.clear();
  }

  GetLocalStorageUserInfo(){
    const userInfo = localStorage.getItem('UserInfo');
    return userInfo;
  }

  GetCurrentUserId(){
    const userInfo = this.GetLocalStorageUserInfo();
    if(!!userInfo) return JSON.parse(userInfo).userId;
    return 0;
  }

  ChangePassword(payload: ChangePasswordModel): Observable<BaseResponseModel<ChangePasswordModel>>{
    const apiUrl = `${this.baseUrl}/ChangePassword`;
    return this.http.put<BaseResponseModel<ChangePasswordModel>>(apiUrl, payload)
  }

  ResetPassword(userId: string): Observable<BaseResponseModel<boolean>>{
    const apiUrl = `${this.baseUrl}/ResetPassword/${userId}`;
    return this.http.put<BaseResponseModel<boolean>>(apiUrl, null);
  }

  GetUserById(userId: string): Observable<BaseResponseModel<GetAllInfoUserModel>>{
    const apiUrl = `${this.baseUrl}/GetUserById/${userId}`;
    return this.http.get<BaseResponseModel<GetAllInfoUserModel>>(apiUrl)
  }

  UpdateUser(payload: GetAllInfoUserModel): Observable<BaseResponseModel<string>>{
    const apiUrl = `${this.baseUrl}/UpdateUser`;
    return this.http.put<BaseResponseModel<string>>(apiUrl, payload);
  }

  getSSOUrl(): Observable<BaseResponseModel<any>>{
    const apiUrl = `${environment.apiUrl}/sso/get-auth-uri`;
    return this.http.get<BaseResponseModel<any>>(apiUrl);
  }

  ssoCallbackSignin(code: string): Observable<BaseResponseModel<any>>{
    const apiUrl = `${environment.apiUrl}/sso/signin`;
    return this.http.post<BaseResponseModel<any>>(apiUrl, {code, redirect_uri: this.REDIRECT_URI, access_token: '', refresh_token: ''});
  }




}
