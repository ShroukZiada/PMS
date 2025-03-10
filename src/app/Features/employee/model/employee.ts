export namespace Employee {
 export interface projectTableData {
  pageNumber: 20,
  pageSize: 1,
  data: [],
  totalNumberOfRecords: 0,
  totalNumberOfPages: 1
 }

 export interface iEmployeeProjects {
  id: number
  title: string
  description: string
  creationDate: string
  modificationDate: string
  task: iTask[]
 }

 export interface iTask {
  id: number
  title: string
  description: string
  status: string
  creationDate: string
  modificationDate: string
  project: iProject
  employee: iEmployee
 }
 export interface iProject {
  id: number
  title: string
  description: string
  creationDate: string
  modificationDate: string
 }
 export interface iProject {
  id: number
  title: string
  description: string
  creationDate: string
  modificationDate: string
 }
 export interface iEmployee {
  id: number
  userName: string
  imagePath: string
  email: string
  password: string
  country: string
  phoneNumber: string
  verificationCode: string
  isVerified: boolean
  isActivated: boolean
  creationDate: string
  modificationDate: string
 }
}
