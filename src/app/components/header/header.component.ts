import {Component, OnInit} from '@angular/core';
import {MainService} from '../../services/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private logService: MainService) {
  }

  ngOnInit(): void {
  }

  handTask(): void {
    this.logService.tasks.next({user: 'usr', status: 'stats', date: 'dat'});
  }
}
