import { Component } from '@angular/core';

@Component({
  selector: 'app-trainers',
  standalone: false,
  
  templateUrl: './trainers.component.html',
  styleUrl: './trainers.component.css'
})
export class TrainersComponent {
  teamMembers = [
    {
      name: 'Johnathan',
      role: 'Graphic Designer',
      description: 'Coffee nerd, explorer, romance lover, beer fanatic, art addicted.',
      image: 'assets/images/t1.jpg'
    },
    {
      name: 'Anastasia',
      role: 'Project Manager',
      description: 'Social media scholar, music evangelist, communicator.',
      image: 'assets/images/t2.jpg'
    },
    {
      name: 'Michael',
      role: 'Art Director',
      description: 'Creator, gamer, food fanatic, problem solver, coffee guru.',
      image: 'assets/images/t3.jpg'
    },
    {
      name: 'Alessandro',
      role: 'Graphic Designer',
      description: 'Devoted reader, introvert, pop culture guru, writer, dreamer.',
      image: 'assets/images/t4.jpg'
    }
  ];
}
