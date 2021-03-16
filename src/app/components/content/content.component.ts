import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {MainService} from '../../services/main.service';
import {Task} from '../../models/task.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Board} from '../../models/board-model';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {HttpService} from '../../services/http-service';
import {Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
  board: Board;
  modalRef: BsModalRef;
  subTasks: Subscription;

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
    }
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  ngOnDestroy(): void {
    this.subTasks.unsubscribe();
  }
}
