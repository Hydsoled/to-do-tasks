import {Component, OnInit} from '@angular/core';
import {LogServicesService} from '../../services/logServices.service';
import {Task} from '../../models/task.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private logServices: LogServicesService) {
    this.logServices.tasks.subscribe(
      (task: Task) => {
        this.tasks.push(task);
      });
  }

  ngOnInit(): void {
  }
}
