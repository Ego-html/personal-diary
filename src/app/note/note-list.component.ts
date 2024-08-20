import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Note} from "../models/note.model";
import {DatePipe, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {ToDoService} from "../service/to-do-service.service";

@Component({
  selector: 'app-tasks-editor-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    RouterLink
  ],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent {
  @Input() note!: Note;
  @Output() delete = new EventEmitter<string>();

  constructor(private todoService: ToDoService) {}

  handleDelete(id: string): void {
    this.todoService.deleteTodoById(this.note.id);
    this.delete.emit(this.note.id);
  }
}
