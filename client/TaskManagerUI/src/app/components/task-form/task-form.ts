import { Component, OnInit, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskForm implements OnInit {
  private dataService = inject(DataService);
  private router = inject(Router);
  id = input<number | null>(null);

  taskForm = new FormGroup({
    Id: new FormControl(0),
    Title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Description: new FormControl(''),
    StatusId: new FormControl(null, Validators.required),
    CategoryId: new FormControl(null, Validators.required),
  });

  statuses: any[] = [];
  categories: any[] = [];
  isSaving = false;
  saveSuccess = false;

  ngOnInit() {
    this.dataService.execute('GetAllStatuses', {}).subscribe(res => this.statuses = res);
    this.dataService.execute('GetAllCategories', {}).subscribe(res => this.categories = res);
    if (this.id()) {
      this.dataService.execute('GetTaskById', { "@Id": this.id() }).subscribe(res => {
        if (res?.[0]) this.taskForm.patchValue(res[0]);
      });
    }
  }

  onSubmit() {
    if (this.taskForm.invalid) return;
    this.isSaving = true;
    const payload: any = { ...this.taskForm.value };
    if (!this.id()) delete payload.Id;

    this.dataService.execute(this.id() ? 'UpdateTask' : 'CreateTask', payload).subscribe(() => {
      this.saveSuccess = true;
      setTimeout(() => this.router.navigate(['/tasks']), 1500);
    });
  }

  goBack() { this.router.navigate(['/tasks']); }
}