import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: false,
  
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  searchQuery: string = '';

  onSearch(value: any): void {
    if (value.search) {
      console.log('Searching for:', value.search);
      // Implement your search logic here
    }
  }

}
