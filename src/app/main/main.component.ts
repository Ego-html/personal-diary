// src/app/main/main.component.ts
import {Component, effect, OnInit, Signal, signal} from '@angular/core';
import { DatePipe, NgForOf } from "@angular/common";
import { Note } from '../models/note.model';
import { RouterLink, Router } from "@angular/router";
import { ToDoService } from "../services/to-do-service.service";
import { NoteListComponent } from "../note/note-list.component";
import { TasksEditorComponent } from "../tasks-editor/tasks-editor.component";
import { AuthService } from '../services/auth.service';

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
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  notes!: Signal<Note[]>;

  constructor(
    private todoService: ToDoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notes = this.todoService.todos;
  }

  handleDelete(noteToDelete: Note): void {
    this.todoService.deleteTodoById(noteToDelete.id);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
