export class RoutePath {
 public static Auth = {
  Login: 'login',
  Register: 'register',
  ResetPass: 'reset-pass',
  forgetPass: 'forget-pass',
  verifyCode: 'verify-code'
 }
 public static project = {
  projects: 'projects',
  addProject: 'addProject',
  editProject: 'editProject/:id/edit',
  viewProject: 'view/:id/:mode',
  project: '/dashboard/manager/projects',
 }
 public static tasks = {
  tasks: 'tasks',
  addtask: 'addTask',
  edittask: 'edit-Task/:id/edit',
  viewtask: 'view/:id/:mode',
  project: '/dashboard/manager/projects',
 }

 public static users = {
  users: 'users',

 }
}
