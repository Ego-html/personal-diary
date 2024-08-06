import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";
import { Note } from '../models/note.model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {
  note: Note | undefined;

  ngOnInit() {
    this.note = {
      createdAt: new Date(),
      text: 'This is a new main',
      imageUrl: '#'
    };
  }
}
