import {Component, effect, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {Note} from '../models/note.model';
import {RouterLink} from "@angular/router";
import {ToDoService} from "../service/to-do-service.service";
import {NoteListComponent} from "../note/note-list.component";
import {TasksEditorComponent} from "../tasks-editor/tasks-editor.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    DatePipe,
    RouterLink,
    NgForOf,
    NoteListComponent,
    TasksEditorComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  notes: Note[] = [];

  constructor(private todoService: ToDoService) {
    effect(() => {
      this.notes = this.todoService.todoSignal();
    })
  }

  handleDelete(noteToDelete: Note): void {
    this.todoService.deleteTodoById(noteToDelete.id)
  }
}
