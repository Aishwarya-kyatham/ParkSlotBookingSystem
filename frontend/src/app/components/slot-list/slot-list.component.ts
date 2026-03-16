import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ParkingService } from '../../services/parking.service';

@Component({
  selector: 'app-slot-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.css']
})
export class SlotListComponent implements OnInit {
  slots: any[] = [];
  
  get availableSlots(): any[] {
    return this.slots.filter(slot => slot.status === 'available');
  }

  get bookedSlots(): any[] {
    return this.slots.filter(slot => slot.status === 'occupied');
  }
  loading: boolean = true;
  error: string | null = null;

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.loadSlots();
  }

  loadSlots(): void {
    this.parkingService.getSlots().subscribe({
      next: (data) => {
        this.slots = data;
        this.loadActiveBookings(); // Load bookings after slots are fetched to map the IDs
      },
      error: (err) => {
        this.error = 'Failed to load slots. Make sure backend is running.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadActiveBookings(): void {
    const temporaryUserId = '654321098765432109876543'; // Matching dashboard logic
    this.parkingService.getUserBookings(temporaryUserId).subscribe({
      next: (bookings) => {
        // Map active booking IDs to their corresponding occupied slots
        bookings.forEach((b: any) => {
          if (b.status === 'active') {
            const slotIndex = this.slots.findIndex(s => s._id === b.slotId._id);
            if (slotIndex !== -1) {
              this.slots[slotIndex].activeBookingId = b._id;
            }
          }
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load bookings for slot mapping', err);
        this.loading = false;
      }
    });
  }

  cancelAndFreeSlot(bookingId: string | undefined): void {
    if (!bookingId) return;
    
    if (confirm('Are you sure you want to cancel this booking and free up the slot?')) {
      this.parkingService.cancelBooking(bookingId).subscribe({
        next: () => {
          // Permanently delete it so it completely resets the slot instantly without clutter
          this.parkingService.deleteBooking(bookingId).subscribe({
             next: () => this.loadSlots(), // Reload everything to refresh the UI
             error: (err) => console.error(err)
          });
        },
        error: (err) => alert('Failed to cancel booking.')
      });
    }
  }
}
