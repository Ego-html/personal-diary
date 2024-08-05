import {Component, OnInit} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {
  note: { createdAt: Date; text: string; imageUrl?: string; } | undefined;

  ngOnInit() {
    this.note = {
      createdAt: new Date(),
      text: 'This is a new note',
      imageUrl: '#'
    };
  }
}
