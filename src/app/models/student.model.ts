//To generate student model -ng generate interface modesls/student --type=model
export interface Student {
    id: number;
    name: string;
    email?: string;  // optional
    enrolledCourseIds?: number[]; // references to courses
}
