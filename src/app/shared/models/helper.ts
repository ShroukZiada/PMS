export namespace Helper {

 export interface CurrentUser {
  id: string,
  userName: string,
  email: string,
  country: string,
  phoneNumber: number,
  imagePath: string,
 }
 export interface IMenu {
  text: string,
  icon: string,
  link: string,
  isActive: boolean,
 }

 export interface TaskCount {
  toDo: number,
  inProgress: number,
  done: number
 }
 export interface UserssCount {
  activatedEmployeeCount: number,
  deactivatedEmployeeCount: number
 }
}
