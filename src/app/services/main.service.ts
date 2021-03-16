import {Task} from '../models/task.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Board} from '../models/board-model';
import {Column} from '../models/column-model';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  tasks = new Subject<Task[]>();
  board: Board = new Board('To do board', [
    new Column('to do', [
    ]),
    new Column('in progress', [
    ]),
    new Column('done', [
    ]),
  ]);
  constructor() {
  }
}
