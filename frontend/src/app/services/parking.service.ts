import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private apiUrl = 'https://parkslotbookingsystem.onrender.com/api'; // Backend API URL

  constructor(private http: HttpClient) { }

  getSlots(): Observable<any> {
    return this.http.get(`${this.apiUrl}/slots`);
  }

  getAvailableSlots(): Observable<any> {
    return this.http.get(`${this.apiUrl}/slots/available`);
  }

  bookSlot(bookingData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bookings`, bookingData);
  }

  getUserBookings(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/bookings/${userId}`);
  }

  cancelBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookings/${bookingId}`);
  }

  deleteBooking(bookingId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookings/${bookingId}/permanent`);
  }
}
