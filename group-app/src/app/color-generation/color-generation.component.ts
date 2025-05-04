import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-generation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './color-generation.component.html',
  styleUrls: ['./color-generation.component.css']
})
export class ColorGenerationComponent {
  colors: number = 0;
  colorArray: string[] = [];
  colorOptions: string[] = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple', 'Grey', 'Brown', 'Black', 'Teal'];
  selectedRow: number | null = null;
  errorMessage: string = '';
  rows: number | null = null;
  columns: number | null = null;
  colorsInput: number | null = null;
  inputErrorMessage: string = '';
  tableData: string[][] = [];
  selectedCell: { row: number; col: number } = { row: 0, col: 0 }; // Default to top-left corner
  cellColors: string[][] = [];
  colorAssignments: { [color: string]: string[] } = {}; // Tracks cells assigned to each color

  // Initialize color assignments
  constructor() {
    this.colorOptions.forEach(color => {
      this.colorAssignments[color] = [];
    });
  }

  validateInput(field: string): void {
    if (field === 'rows' && (this.rows === null || this.rows < 1 || this.rows > 1000)) {
      this.inputErrorMessage = 'Rows must be between 1 and 1000.';
      this.rows = null; // Clear the input
    } else if (field === 'columns' && (this.columns === null || this.columns < 1 || this.columns > 702)) {
      this.inputErrorMessage = 'Columns must be between 1 and 702.';
      this.columns = null; // Clear the input
    } else if (field === 'colors' && (this.colorsInput === null || this.colorsInput < 1 || this.colorsInput > 10)) {
      this.inputErrorMessage = 'Colors must be between 1 and 10.';
      this.colorsInput = null; // Clear the input
    } else {
      this.inputErrorMessage = ''; // Clear the error message if valid
    }
  }

  generateTables(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const colorsInput = form['colors'] as HTMLInputElement;

    this.colors = parseInt(colorsInput.value, 10);

    if (this.colors > 0) {
      this.colorArray = this.colorOptions.slice(0, this.colors);
      this.selectedRow = null;
      this.errorMessage = ''; // Clear any previous error message
    }

        this.tableData = [];
    for (let i = 0; i <= this.rows!; i++) {
      const row: string[] = [];
      for (let j = 0; j <= this.columns!; j++) {
        if (i === 0 && j === 0) {
          row.push('');
        } else if (i === 0) {
          // Column header (A, B, ..., Z, AA, AB, etc.)
          row.push(this.getColumnLabel(j));
        } else if (j === 0) {
          // Row header (1, 2, ...)
          row.push(i.toString());
        } else {
          row.push('');
        }
      }
      this.tableData.push(row);
    }

    this.cellColors = Array.from({ length: this.rows! + 1 }, () =>
      Array.from({ length: this.columns! + 1 }, () => 'white')
    );

    // Reset the selected cell to Row 1, Column A
    this.selectedCell = { row: 0, col: 0 };

    // Reset color assignments
    Object.keys(this.colorAssignments).forEach(color => { this.colorAssignments[color] = []; });
  }

  getColumnLabel(n: number): string {
    let label = '';
    while (n > 0) {
      const rem = (n - 1) % 26;
      label = String.fromCharCode(65 + rem) + label;
      n = Math.floor((n - 1) / 26);
    }
    return label;
  }
  
  getColumnIndex(label: string): number {
    let index = 0;
    for (let i = 0; i < label.length; i++) {
      index = index * 26 + (label.charCodeAt(i) - 65 + 1);
    }
    return index;
  }

  selectRow(index: number): void {
    this.selectedRow = this.selectedRow === index ? null : index;
  }

  updateColor(index: number, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newColor = selectElement.value;
    const oldColor = this.colorArray[index];

    // If the color hasn't changed, do nothing
    if (newColor === oldColor) return;

    // Update the color in the color array
    this.colorArray[index] = newColor;

    // Ensure the new color's list is initialized
    this.colorAssignments[newColor] = this.colorAssignments[newColor] || [];

    // Copy the old color's list of cells to the new color
    const cellsToUpdate = [...(this.colorAssignments[oldColor] || [])];
    this.colorAssignments[newColor].push(...cellsToUpdate);

    // Clear the old color's list
    this.colorAssignments[oldColor] = [];

    // Paint each cell with the new color
    cellsToUpdate.forEach(cellLabel => {
      const match = cellLabel.match(/[A-Z]+|[0-9]+/g);
      if (match && match.length === 2) {
        const [colLabel, row] = match;
        const col = this.getColumnIndex(colLabel);
        const rowIndex = parseInt(row, 10);

        // Update the cell's color in the cellColors array
        if (rowIndex > 0 && col > 0) {
          this.cellColors[rowIndex][col] = newColor.toLowerCase();
        }
      }
    });

    // Sort the new color's list lexicographically
    this.colorAssignments[newColor].sort();
  }

  isColorDisabled(color: string, currentIndex: number): boolean {
    // Disable the color if it is already selected in another row
    return this.colorArray.some((selectedColor, index) => selectedColor === color && index !== currentIndex);
  }

  fillCell(row: number, col: number): void {
    if (row === 0 || col === 0) return; // Ignore header cells
    if (this.selectedRow !== null && this.colorArray[this.selectedRow]) {
      const selectedColor = this.colorArray[this.selectedRow];
      const cellLabel = `${this.getColumnLabel(col)}${row}`;
      Object.keys(this.colorAssignments).forEach(color => {
        const index = this.colorAssignments[color].indexOf(cellLabel);
        if (index !== -1) {
          this.colorAssignments[color].splice(index, 1);
        }
      });
      this.cellColors[row][col] = selectedColor.toLowerCase();
      this.colorAssignments[selectedColor] = this.colorAssignments[selectedColor] || [];
      this.colorAssignments[selectedColor].push(cellLabel);
      this.colorAssignments[selectedColor].sort();
      this.selectedCell = { row, col };
    }
  }
  
  selectCell(row: number, col: number): void {
    if (row === 0 || col === 0) return; // Ignore header cells
    this.selectedCell = { row, col };
  }

  printPage(): void {
    window.print(); // Trigger the browser's print dialog
  }

}