import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  standalone: false,
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {

  searchQuery: string = '';
  courses = [
    {
      id:1,
      name: 'Angular Basics',
      category: 'Web Development',
      description: 'Learn the basics of Angular framework.',
      image: 'assets/images/angular.png',
      tags: ['Angular', 'Web', 'Development'],
      rating: 4.5,
      badge: 'Trending'
    },
    {
      id:2,
      name: 'React Essentials',
      category: 'Web Development',
      description: 'Master the fundamentals of React.',
      image: 'assets/images/react.jpg',
      tags: ['React', 'JavaScript', 'Frontend'],
      rating: 4.7,
      badge: 'Hot'
    },
    {
      id:3,
      name: 'Vue.js for Beginners',
      category: 'Web Development',
      description: 'Get started with Vue.js and build dynamic web applications.',
      image: 'assets/images/vuejs.jpg',
      tags: ['Vue.js', 'JavaScript', 'Frontend'],
      rating: 4.6
    },
    {
      id:4,
      name: 'Node.js Fundamentals',
      category: 'Backend Development',
      description: 'Learn the basics of Node.js for backend development.',
      image: 'assets/images/nodejs.jpg',
      tags: ['Node.js', 'JavaScript', 'Backend'],
      rating: 4.8
    },
    {
      id:5,
      name: 'Python for Data Science',
      category: 'Data Science',
      description: 'Master Python programming for data science applications.',
      image: 'assets/images/ds.jpg',
      tags: ['Python', 'Data Science', 'Programming'],
      rating: 4.9
    },
    {
      id:6,
      name: 'Machine Learning with Python',
      category: 'Data Science',
      description: 'Learn machine learning concepts and techniques using Python.',
      image: 'assets/images/ml.jpg',
      tags: ['Machine Learning', 'Python', 'Data Science'],
      rating: 4.7
    },
    {
      id:7,
      name: 'Introduction to Cybersecurity',
      category: 'Security',
      description: 'Understand the fundamentals of cybersecurity.',
      image: 'assets/images/cybersecurity.jpg',
      tags: ['Cybersecurity', 'Security', 'IT'],
      rating: 4.6
    },
    {
      id:8,
      name: 'DevOps Essentials',
      category: 'DevOps',
      description: 'Learn the basics of DevOps practices and tools.',
      image: 'assets/images/devops.jpg',
      tags: ['DevOps', 'CI/CD', 'Automation'],
      rating: 4.5,
      badge: 'New'
    },
    {
      id:9,
      name: 'AWS Cloud Practitioner',
      category: 'Cloud Computing',
      description: 'Get started with AWS and cloud computing.',
      image: 'assets/images/aws.jpg',
      tags: ['AWS', 'Cloud', 'Computing'],
      rating: 4.8
    },
    {
      id:10,
      name: 'Kubernetes for Beginners',
      category: 'DevOps',
      description: 'Learn the basics of Kubernetes for container orchestration.',
      image: 'assets/images/kubernetes.jpg',
      tags: ['Kubernetes', 'Containers', 'DevOps'],
      rating: 4.7,
      badge: 'New'
    },
    {
      id:11,
      name: 'SQL for Data Analysis',
      category: 'Data Science',
      description: 'Master SQL for data analysis and manipulation.',
      image: 'assets/images/sql.jpg',
      tags: ['SQL', 'Data Analysis', 'Database'],
      rating: 4.6
    },
    {
      id:12,
      name: 'Java Programming',
      category: 'Programming',
      description: 'Learn Java programming from scratch.',
      image: 'assets/images/java.jpg',
      tags: ['Java', 'Programming', 'Backend'],
      rating: 4.7
    }
  ];

  onSearch(value: any) {
    console.log('Search query:', value.search);
    // Implement search functionality here
  }
}