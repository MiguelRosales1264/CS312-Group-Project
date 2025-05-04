import { Component, OnInit } from '@angular/core';
import { ColorServices } from '../services/color-services.service';
import { Color } from '../models/color.model';  

@Component({
  selector: 'app-manage-colors',
  imports: [],
  templateUrl: './manage-colors.component.html',
  styleUrl: './manage-colors.component.css'
})

export class ManageColorsComponent implements OnInit {
  colors: Color[] = [];
  editColor: Color | null = null;
  newColor: { name: string; hex: string } = { name: '', hex: '' };
  errorMessage: string = '';

  constructor(private colorServices: ColorServices) { }

  ngOnInit(): void {
    this.loadColors();
  }

  loadColors(): void {
    this.colorServices.getColors().subscribe({
      next: (data: Color[]) => { this.colors = data; },
      error: () => { this.errorMessage = 'Error loading colors.'; }
    });
  }

  addColor() {
    this.colorServices.addColor(this.newColor).subscribe({
      next: (color: Color) => { 
        this.colors.push(color);
        this.newColor = { name: '', hex: '' }; // Reset the form
      },
      error: () => { this.errorMessage = 'Color name or hex already exists.'; }
    })
  }

  updateColor() {
    if (this.editColor) {
      this.colorServices.updateColor(this.editColor).subscribe({
        next: () => {
          this.editColor = null; // Reset the form
        },
        error: () => { this.errorMessage = 'Error updating color.'; }
      });
    }
  }

  deleteColor(id: number) {
    if (this.colors.length <= 2) {
      this.errorMessage = 'At least two colors are required.';
      return;
    }

    this.colorServices.deleteColor(id).subscribe({
      next: () => {
        this.colors = this.colors.filter(color => color.id !== id);
      },
      error: () => { this.errorMessage = 'Error deleting color.'; }
    });
  }

  startEdit(color: Color) {
    this.editColor = { ...color }; // Create a copy of the color to edit
  }
  
  cancelEdit() {
    this.editColor = null; // Reset the form
  }
}
