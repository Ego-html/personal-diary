import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ToDoService} from "../services/to-do-service.service";
import {Note} from "../models/note.model";


class ToDo {
}

@Component({
  selector: 'app-tasks-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './tasks-editor.component.html',
  styleUrl: './tasks-editor.component.css'
})

export class TasksEditorComponent implements OnInit {
  todoForm!: FormGroup;
  editId!: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private todoService: ToDoService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.editId = this.route.snapshot.paramMap.get('id');

    const todos = this.todoService.todoSignal();
    const todo = todos.find(t => t.id == this.editId);

    this.todoForm = this.fb.group({
      id: [todo ? todo.id : this.generateNewId()],
      text: [todo ? todo.text : '', Validators.required],
      description: [todo ? todo.description : ''],
      completed: [todo ? todo.completed : false], // Инициализация completed
      image: [todo ? todo.image : ''],
      createdAt: [todo ? todo.createdAt : new Date()],
    });
  }

  generateNewId(): number {
    const todos = this.todoService.todoSignal();
    const lastTodo = todos[todos.length - 1];
    const lastId = lastTodo ? Number(lastTodo.id) : 0;
    return lastId + 1;
  }

  onSubmit(): void {
    if (this.todoForm.valid) {
      this.todoService.saveToDo(this.todoForm.value)
      // const todoData: Note = this.todoForm.value;
      //
      // const todos = this.todoService.todoSignal();
      //
      // const existingTodoIndex = todos.findIndex(t => t.id == todoData.id)
      //
      // if (existingTodoIndex > -1) {
      //   todos[existingTodoIndex] = todoData;
      // } else {
      //   todoData.id = String(this.generateNewId());
      //   todos.push(todoData);
      // }
      //
      // this.todoService.todoSignal.set(todos);
      this.todoForm.reset()
      this.router.navigate(['/']);
    }
  }


  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.todoForm.patchValue({
          image: e.target.result
        });
      };
      reader.readAsDataURL(file)
    }
  }
}
