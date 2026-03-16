import { Routes } from '@angular/router';
import { SlotListComponent } from './components/slot-list/slot-list.component';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', component: SlotListComponent },
  { path: 'book/:slotId', component: BookingFormComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];
