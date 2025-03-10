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
  employeeProoject: 'Project/employee',
 }
 public static Tasks = {
  Tasks: 'Task',
  ManagerTasks: 'Task/manager',
  TaskCount: 'Task/count',
  updateTask: '',

 }
 public static Users = {
  Users: 'Users',
  ManagerTasks: 'Task/manager',
  TaskCount: 'Task/count',
 }
}

