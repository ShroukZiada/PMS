export namespace Users {

 export interface userData {
  pageNumber: number;
  pageSize: number;
  totalNumberOfPages: number;
  totalNumberOfRecords: number;
  data: IUsers;
 }

 export interface IUsers {
  id: number,
  userName: string,
  isActivated: string,
  phoneNumber: string,
  email: string,
  creationDate: string,
  imagePath: string
  country: string,
  Tasks: userTasks
 }


 export interface userTasks {
  id: number,
  title: string,
  description: string,
  status: string,
  creationDate: string,
  modificationDate: string
  country: string,
  project: IProject
 }
 export interface IProject {
  id: number,
  title: string,
  description: string,
  status: string,
  creationDate: string,
  modificationDate: string
 }
}
