import { Injectable } from '@angular/core';
import { RoleEnum } from '../Enums/RoleEnum..enum';
import { Router } from '@angular/router';
import { json } from '@rxweb/reactive-form-validators';
interface IUser {
  _id: string,
  userName: string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

}
