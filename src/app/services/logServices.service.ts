import {Task} from '../models/task.model';
import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogServicesService {
  tasks = new EventEmitter<Task>();
}
