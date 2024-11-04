import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UserDataService, Appointment } from '../../../../data/data';

@Component({
  selector: 'app-history-list',
  standalone: true,
  imports: [
    NzTableModule
  ],
  templateUrl: './history-list.component.html',
  styleUrl: './history-list.component.css'
})
export class HistoryListComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private userDataService: UserDataService) {}

  async ngOnInit() {
    await this.loadHistoryAppointments();
  }

  async loadHistoryAppointments() {
    this.appointments = await this.userDataService.getAppointments(true);
  }
}
