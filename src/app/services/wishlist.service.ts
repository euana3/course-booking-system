import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable ({
    providedIn: 'root'
})

export class WishlistService {
    //Set for uniqueness for courseId. 'Set' automatically rejects duplicates
    private wishlist = new Set<string>();

    private wishlistSubject = new BehaviorSubject<string[]>([]);

    wishlist$ = this.wishlistSubject.asObservable();

    //Service manages state -  checks 'has(courseId) before adding and 
    // returns true of false so component knows if it succeeded
    addToWishList(courseId: string): boolean {
        if (this.wishlist.has(courseId)) {
            return false; // Already in wishlist - prevent duplicates
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

