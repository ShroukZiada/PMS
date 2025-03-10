import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { Tasks } from '../../models/tasks';
import { UserTask } from '../../models/user';
import { ToastrService } from 'ngx-toastr';
import { SharedDeleteComponent } from 'src/app/shared/components/shared-delete/shared-delete.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-tasks',
  templateUrl: './add-edit-tasks.component.html',
  styleUrls: ['./add-edit-tasks.component.scss']
})
export class AddEditTasksComponent implements OnInit {
  editTextHeader: string = 'Update this task';
  addTextHeader: string = 'Add a new task';
  mainTxTHeaderLink: string = 'View all tasks';
  viewTextHeader: string = 'View a task';
  addEditTaskForm!: FormGroup;
  isNonDisplay?: boolean;
  role: string = ''
  taskID: number = 0;
  ModePram: string = '';
  EditPram: string = '';
  constructor(private _TasksService: TasksService,
    private Fb: FormBuilder,
    private ActivatedRoute: ActivatedRoute,
    private _ToastrService: ToastrService,
    private _router: Router,
    public dialog: MatDialog,
  ) {


  }
  ngOnInit(): void {
    this.intialForm()
    this.getActiveRouter()
    if (this.taskID) {
      this.getTasksById()
    }
    this.modeForm()
  }

  intialForm() {
    this.addEditTaskForm = this.Fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      employeeId: ['', Validators.required],
      projectId: ['', Validators.required],
    });
  }
  getActiveRouter() {
    this.taskID = this.ActivatedRoute.snapshot.params['id'];
    this.ModePram = this.ActivatedRoute.snapshot.params['mode'];
    this.EditPram = this.ActivatedRoute.snapshot.params['edit'];
    this.role = this.ActivatedRoute.snapshot.params['role'];
    // console.log(this.role);
    if (this.role != 'isEmployee') {
      // console.log("manger")
      this.getUsers()
      this.getProjects()
    }
  }
  allUsers: UserTask.Users[] = [];
  allProjects: UserTask.projects[] = [];
  task: any;


  getUsers() {
    this._TasksService.getAllUsers().subscribe({
      next: res => {
        this.allUsers = res.data;
      },
      error: err => {
        // console.log(err);
        this._ToastrService.error(err)
      }
    });
  }

  getProjects() {
    this._TasksService.getAllProjects().subscribe({
      next: res => {
        this.allProjects = res.data;
        // console.log(this.allProjects);
      },
      error: err => {
        // console.log(err);
      },
    })
  }


  onAddEdietTask(TaskForm: FormGroup) {
    if (this.taskID) {
      // console.log(this.taskID);

      this._TasksService.updateTask(this.taskID, TaskForm.value).subscribe({
        next: res => {
          // console.log(res);
        },
        error: err => {
          // console.log(err);
          this._ToastrService.error(err)
        },
        complete: () => {
          this._router.navigate(['/dashboard/manager/tasks']);
          this._ToastrService.success('Task uploaded successfully', 'Done!')
        },
      }
      )
    } else {
      this._TasksService.AddTask(TaskForm.value).subscribe({
        next: res => {
          // console.log(res);
        },
        error: err => {
          // console.log(err);
          this._ToastrService.error(err)
        },
        complete: () => {
          this._router.navigate(['/dashboard/manager/tasks']);
          this._ToastrService.success('Task Added successfully', 'Done!')
        },
      }
      )
    }

  }

  getTasksById() {
    this._TasksService.getTasksById(this.taskID).subscribe({
      next: res => {
        // console.log(res);
        this.task = res
        // console.log(this.task);

      }, error(err) {
        // console.log(err);
      },
      complete: () => {
        this.addEditTaskForm.patchValue({
          title: this.task.title,
          description: this.task.description,
          employeeId: this.task.employee.id,
          projectId: this.task.project.id
        })
      }
    })
  }


  modeForm() {
    if (this.ModePram == 'disabled') {
      this.addEditTaskForm.disable();
      this.isNonDisplay = false;
      this.editTextHeader = 'View this task'
    } else {
      this.addEditTaskForm.enable()
      this.isNonDisplay = true;
    }
  }
}
