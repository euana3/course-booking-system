import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable ({
    providedIn: 'root'
})

export class WishlistService {
    private wishlist = new Set<string>();
    private wishlistSubject = new BehaviorSubject<string[]>([]);

    wishlist$ = this.wishlistSubject.asObservable();

    addToWishList(courseId: string): boolean {
        if (this.wishlist.has(courseId)) {
            return false; // Already in wishlist
        }

        this.wishlist.add(courseId);
        this.wishlistSubject.next(Array.from(this.wishlist));
        return true; // Successfully added in wishlist
    }

    removeFromWishlist(courseId: string): boolean {
        if (this.wishlist.delete(courseId)) {
            this.wishlistSubject.next(Array.from(this.wishlist));
            return true; // Successfully removed from wishlist
        }
        return false; // Not found in wishlist
    }

    isInWishlist(courseId: string): boolean {
        return this.wishlist.has(courseId);
    }
}

