import {Task} from '../models/task.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  saveTask(task: any): Observable<any> {
    return this.http.post('http://localhost:4200/api/saveTask', task)
      .pipe(map((tasks: any) => {
      tasks = [tasks].map(tsk => {
        tsk.date = tsk.dueDate;
        return tsk;
      });
      return tasks;
    }));
  }

  getTasks(): Observable<any> {
    return this.http.get('http://localhost:4200/api/getTasks')
      .pipe(map((tasks: any) => {
        tasks = tasks.map(task => {
          task.date = task.dueDate;
          return task;
        });
        return tasks;
      }));
  }

  updateTask(task: Task): Observable<any> {
    return this.http.post('http://localhost:4200/api/updateTask', task);
  }
}
