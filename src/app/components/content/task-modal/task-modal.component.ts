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
  date: Date;
  httpResponse: Subscription;

  constructor(private httpService: HttpService, private mainService: MainService) {
  }

  ngOnInit(): void {
  }

  saveTask(): void {
    const task = {user: this.user, status: this.status, date: this.date};
    this.httpResponse = this.httpService.saveTask(task)
      .subscribe((res: Task[]) => {
        this.mainService.tasks.next(res);
      }, error => {
        this.mainService.tasks.next([error]);
      });
  }

  ngOnDestroy(): void {
    this.httpResponse.unsubscribe();
  }

}
