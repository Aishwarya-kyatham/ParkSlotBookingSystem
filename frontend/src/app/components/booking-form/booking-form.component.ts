import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ParkingService } from '../../services/parking.service';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm: FormGroup;
  slotId: string = '';
  submitting: boolean = false;
  error: string | null = null;
  success: string | null = null;

  // In a real app, you'd get this from auth context
  // Using a hardcoded ID for demonstration
  temporaryUserId = '654321098765432109876543'; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private parkingService: ParkingService
  ) {
    this.bookingForm = this.fb.group({
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('slotId');
    if (id) {
      this.slotId = id;
    } else {
      this.router.navigate(['/']);
    }
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    setTimeout(() => {
      const dateInput = document.getElementById('date') as HTMLInputElement;
      if (dateInput) dateInput.min = today;
    }, 0);
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      return;
    }

    this.submitting = true;
    this.error = null;
    this.success = null;

    const bookingData = {
      ...this.bookingForm.value,
      slotId: this.slotId,
      userId: this.temporaryUserId
    };

    this.parkingService.bookSlot(bookingData).subscribe({
      next: (res) => {
        this.success = 'Slot booked successfully!';
        this.submitting = false;
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (err) => {
        this.error = err.error?.message || 'Error occurred while booking the slot.';
        this.submitting = false;
      }
    });
  }
}
