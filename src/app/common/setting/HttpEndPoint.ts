export class HttpEndPoint {

 public static Auth = {
  login: 'Users/Login',
  register: 'Users/Register',
  forgetPass: 'Users/Reset/Request',
  resetPass: 'Users/Reset',
  verifyAcc: 'Users/verify',
  currentUser: 'Users/currentUser',
  ChangePassword: 'Users/ChangePassword',
  usersCount: 'Users/count'
 }
 public static Projets = {
  Project: 'Project',
  ManagerProject: 'Project/manager?',
 }
 public static Tasks = {
  Tasks: 'Task',
  ManagerTasks: 'Task/manager',
  TaskCount: 'Task/count',

 }

 public static Users = {
  Users: 'users',
  ManagerTasks: 'Task/manager',
  TaskCount: 'Task/count',

 }
}

