import {Component, OnInit} from '@angular/core';
import {MainService} from '../../services/main.service';
import {Task} from '../../models/task.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from '../../models/board-model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  tasks: Task[] = [];
  board: Board;

  constructor(private logServices: MainService) {
    this.board = this.logServices.board;
    this.logServices.tasks.subscribe(
      (task: Task) => {
        this.board.columns.filter((col => {
          if (col.name === 'to do') {
            col.tasks.push(task);
          }
        }));
      });
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
