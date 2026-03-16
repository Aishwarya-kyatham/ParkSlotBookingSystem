import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParkingService } from '../../services/parking.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  bookings: any[] = [];
  loading: boolean = true;
  error: string | null = null;
  
  // Hardcoded ID consistent with booking-form
  temporaryUserId = '654321098765432109876543'; 

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.loadUserBookings();
  }

  loadUserBookings(): void {
    this.loading = true;
    this.parkingService.getUserBookings(this.temporaryUserId).subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load user bookings.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  cancelBooking(bookingId: string): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.parkingService.cancelBooking(bookingId).subscribe({
        next: (res) => {
          // Update the UI
          this.loadUserBookings();
        },
        error: (err) => {
          alert('Failed to cancel booking.');
          console.error(err);
        }
      });
    }
  }

  deleteBooking(bookingId: string): void {
    if (confirm('Are you sure you want to permanently delete this booking record?')) {
      this.parkingService.deleteBooking(bookingId).subscribe({
        next: (res) => {
          this.loadUserBookings();
        },
        error: (err) => {
          alert('Failed to delete booking.');
          console.error(err);
        }
      });
    }
  }

  isPastBooking(bookingDate: string, endTime: string): boolean {
    const endDateTime = new Date(`${bookingDate}T${endTime}`);
    return endDateTime < new Date();
  }
}
