import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../../services/http-service';
import {Subscription} from 'rxjs';
import {MainService} from '../../../services/main.service';
import {Task} from '../../../models/task.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit, OnDestroy {
  user = '';
  status = '';
  _id = '';
  date: Date;
  httpResponse: Subscription;
  subTask: Subscription;
  public task;

  constructor(private httpService: HttpService, private mainService: MainService) {
    this.subTask = this.mainService.getUpdateTask.subscribe((value) => {
      if (value) {
        this.user = value.user;
        this.status = value.status;
        this.date = value.date;
        this._id = value._id;
      }
    });
  }

  ngOnInit(): void {
  }

  saveTask(): void {
    const task = {user: this.user, status: this.status, date: this.date, _id: this._id};
    this.task = task;
    if (!this._id) {
      this.httpResponse = this.httpService.saveTask(task)
        .subscribe((res: Task[]) => {
          this.mainService.tasks.next(res);
        }, error => {
          this.mainService.tasks.next([error]);
        });
    } else {
      this.httpResponse = this.httpService.updateTask(task)
        .subscribe((res: string) => {
          if (res) {
            this.mainService.deleteTask.next({_id: task._id, update: true});
            this.mainService.tasks.next([task]);
          }
        });
    }
  }

  deleteTask(): void {
    this.mainService.deleteTask.next({_id: this._id, update: false});
  }

  ngOnDestroy(): void {
    if (this.httpResponse) {
      this.httpResponse.unsubscribe();
    }
    if (this.subTask) {
      this.subTask.unsubscribe();
    }
  }

}
