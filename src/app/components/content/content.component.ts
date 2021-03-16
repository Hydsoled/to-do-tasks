import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {MainService} from '../../services/main.service';
import {Task} from '../../models/task.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from '../../models/board-model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {HttpService} from '../../services/http-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  board: Board;
  modalRef: BsModalRef;
  subTasks: Subscription;
  deleteTask: Subscription;

  constructor(private mainServices: MainService, private modalService: BsModalService, private httpService: HttpService) {
    this.board = this.mainServices.board;
    this.mainServices.tasks.subscribe(
      (taskArr: Task[]) => {
        taskArr.map((task) => {
          this.board.columns.filter((col => {
            if (col.name === task.status) {
              col.tasks.push(task);
              this.modalService.hide();
            }
          }));
        });
      });
    this.mainServices.deleteTask.subscribe((taskId) => {
      for (let i = 0; i < this.board.columns.length; i++) {
        for (let j = 0; j < this.board.columns[i].tasks.length; j++) {
          if (this.board.columns[i].tasks[j]._id === taskId) {
            this.board.columns[i].tasks.splice(j, 1);
          }
        }
      }
      this.deleteTask = this.httpService.deleteTask(taskId).subscribe((val) => {
        if (val) {
          this.modalRef.hide();
        }
      });
    });
  }

  ngOnInit(): void {
    this.subTasks = this.httpService.getTasks()
      .subscribe((allTask: Task[]) => {
        this.mainServices.tasks.next(allTask);
      });
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
      event.container.data[event.currentIndex].status = event.container.element.nativeElement.innerText.split('\n')[0].toLowerCase();
      const updatedTask = event.container.data[event.currentIndex];
      this.httpService.updateTask(updatedTask)
        .subscribe((value: string) => {
          console.log(value);
        });
    }
  }

  public openModal(template: TemplateRef<any>, task?): void {
    this.modalRef = this.modalService.show(template);
    this.mainServices.getUpdateTask.next(task);
  }

  ngOnDestroy(): void {
    if (this.subTasks) {
      this.subTasks.unsubscribe();
    }
    if (this.deleteTask) {
      this.deleteTask.unsubscribe();
    }
  }
}
