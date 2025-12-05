import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../models/course.model';
import { Router } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';

@Component({
  selector: 'app-course-card',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {
  @Input() course?: Course;
  @Output() courseBooked = new EventEmitter<any>();
  @Output() wishlistAdded = new EventEmitter<any>();


  isInWishlist: boolean = false;

  constructor(private router: Router, private wishlistService: WishlistService) {}
  onCourseBooked(): void {
    this.courseBooked.emit(this.course);
  }

  // Component Uses Service to add to wishlist
  onAddToWishlist() {
    if (this.wishlistService.addToWishList(this.course!.id.toString())) {
      this.wishlistAdded.emit(this.course);
    } else {
      alert('Course is already in your wishlist');
    }
  }

  goToDetails(courseId: number): void {
    this.router.navigate(['/courses', courseId])
  }
}
