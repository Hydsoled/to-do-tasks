import {Task} from '../models/task.model';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  saveTask(task: any): Observable<any> {
    return this.http.post(`${environment.BASE_URL}${environment.PORT}/api/saveTask`, task)
      .pipe(map((tasks: any) => {
        tasks = [tasks].map(tsk => {
          tsk.date = tsk.dueDate;
          return tsk;
        });
        return tasks;
      }));
  }

  getTasks(): Observable<any> {
    return this.http.get(`${environment.BASE_URL}${environment.PORT}/api/getTasks`)
      .pipe(map((tasks: any) => {
        tasks = tasks.map(task => {
          task.date = task.dueDate;
          return task;
        });
        return tasks;
      }));
  }

  updateTask(task: Task): Observable<any> {
    return this.http.post(`${environment.BASE_URL}${environment.PORT}/api/updateTask`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.post(`${environment.BASE_URL}${environment.PORT}/api/deleteTask`, {_id: id});
  }
}
