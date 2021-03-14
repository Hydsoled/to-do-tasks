import {Component, OnInit} from '@angular/core';
import {LogServicesService} from '../../services/logServices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private logService: LogServicesService) {
  }

  ngOnInit(): void {
  }

  handTask(): void {
    this.logService.tasks.emit({user: 'usr', status: 'stats', date: 'dat'});
  }
}
