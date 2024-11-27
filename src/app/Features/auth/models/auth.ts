export namespace Auth {

 export interface IRegisterReq {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage: string;
 }

 export interface IRegisterRes {
  message: string;
  data: Data;
 }

 export interface Data {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage: string;
 }

 export interface IData {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage: string;
 }
 export interface ILoginReq {
  email: string;
  password: string;
 }


 export interface ILoginRes {
  expiresIn: string
  token: string
 }

 export interface ILoginProfile {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  profileImage: string;
 }
 export interface IVerifyRes {
  message: string;
  data: IVerify;
 }
 export interface IVerify {
  email: string;
  code: string;
 }

 export interface IForget {
  email: string;
 }

 export interface IForgetRes {
  message: string;
 }


 export interface iChangePassword {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
 }

 export interface iReset {
  email: string,
  seed: string,
  password: string,
  confirmPassword: string
 }

 export interface iRequest {
  email: string
 }



 export interface IResetPasswordRequest {
  otp: string,
  email: string,
  password: string
 }
 export interface IResetPasswordResponse {
  data: IData
  message: string;
 }



 export interface ILogoutRes {
  message: string;
 }

 export interface IUpdateProfileReq {
  first_name: string;
  last_name: string;
  email: string;

 }




 export interface IChangeReq {
  email: string;
  password: string;
  password_new: string
 }
 export interface IChangeRes {
  message: string
  data: IData
 }
}