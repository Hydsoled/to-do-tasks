import {Task} from '../models/task.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Board} from '../models/board-model';
import {Column} from '../models/column-model';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  tasks = new Subject<Task>();
  board: Board = new Board('To do board', [
    new Column('to do', [
      {date: 'date', status: 'status', user: 'user1'}
    ]),
    new Column('in progress', [
      {date: 'date1', status: 'status', user: 'user2'}
    ]),
    new Column('done', [
      {date: 'date2', status: 'status', user: 'user3'}
    ]),
  ]);
  constructor() {
  }
}
