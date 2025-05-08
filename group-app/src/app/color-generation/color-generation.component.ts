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
  colorOptions: { id: number; name: string; hex: string }[] = [
    { id: 1, name: 'Red', hex: '#FF0000' },
    { id: 2, name: 'Orange', hex: '#FFA500' },
    { id: 3, name: 'Yellow', hex: '#FFFF00' },
    { id: 4, name: 'Green', hex: '#008000' },
    { id: 5, name: 'Blue', hex: '#0000FF' },
    { id: 6, name: 'Purple', hex: '#800080' },
    { id: 7, name: 'Grey', hex: '#808080' },
    { id: 8, name: 'Brown', hex: '#A52A2A' },
    { id: 9, name: 'Black', hex: '#000000' },
    { id: 10, name: 'Teal', hex: '#008080' }
  ];
  selectedRow: number | null = null;
  errorMessage: string = '';
  rows: number | null = null;
  columns: number | null = null;
  colorsInput: number | null = null;
  inputErrorMessage: string = '';
  tableData: string[][] = [];
  selectedCell: { row: number; col: number } = { row: 0, col: 0 }; // Default to top-left corner
  cellColors: string[][] = [];
  // colorAssignments: { [color: string]: string[] } = {}; // Tracks cells assigned to each color
  colorAssignments: { color: string; hex: string; cells: string[] }[] = [];
  selectedColor: string[] = [];

  // Initialize color assignments
  constructor() {
    this.colorOptions.forEach(color => {
      this.colorAssignments.push({ color: '', hex: 'hex',  cells: [] }); // Initialize with empty color
    });
    this.selectedColor = [...this.colorOptions.map(option => option.name)]; // Extract names for the dropdown
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
      this.colorArray = this.colorOptions.slice(0, this.colors).map(option => option.name);
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
    this.colorAssignments.forEach(assignment => {
      assignment.cells = []; // Reset the cells array for each color
    });
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
  
    // Force color update when the row is selected
    if (this.selectedRow !== null) {
      const selectedColor = this.colorAssignments[this.selectedRow].color;
      this.colorAssignments[this.selectedRow].cells.forEach(cellLabel => {
        const match = cellLabel.match(/[A-Z]+|[0-9]+/g);
        if (match && match.length === 2) {
          const [colLabel, row] = match;
          const col = this.getColumnIndex(colLabel);
          const rowIndex = parseInt(row, 10);
  
          this.cellColors[rowIndex][col] = selectedColor.toLowerCase(); 
        }
      });
    }
  } 

  updateColor(index: number, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const newColor = selectElement.value;
    
    // Update the color for the selected row
    const assignment = this.colorAssignments[index];
    if (assignment) {
      assignment.color = newColor;
      assignment.hex = this.colorOptions.find(opt => opt.name === newColor)?.hex || '';
    }
  
    // Update the colors for the cells assigned to this row
    assignment.cells.forEach(cellLabel => {
      const match = cellLabel.match(/[A-Z]+|[0-9]+/g);
      if (match && match.length === 2) {
        const [colLabel, row] = match;
        const col = this.getColumnIndex(colLabel);
        const rowIndex = parseInt(row, 10);
    
        // Apply color to the selected row's cells
        this.cellColors[rowIndex][col] = newColor.toLowerCase();
      }
    });
  }

  isColorDisabled(color: string, currentIndex: number): boolean {
    // Disable the color if it is already selected in another row
    return this.colorAssignments.some((assignment, index) => {
      return assignment.color === color && index !== currentIndex;
    });
  }

  fillCell(row: number, col: number): void {
    if (row === 0 || col === 0) return;
  
    if (this.selectedRow !== null && this.colorAssignments[this.selectedRow]) {
      const selectedColor = this.colorAssignments[this.selectedRow].color;
      const cellLabel = `${this.getColumnLabel(col)}${row}`;
      
      // Remove the cell from all other colors
      this.colorAssignments.forEach(assignment => {
        const index = assignment.cells.indexOf(cellLabel);
        if (index !== -1) {
          assignment.cells.splice(index, 1);
        }
      });
  
      const assignment = this.colorAssignments[this.selectedRow];
      if (assignment) {
        assignment.cells.push(cellLabel);
      }
  
      // Paint the cell in the generated table
      this.cellColors[row][col] = selectedColor.toLowerCase();
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

  getHexValueByColor(name: string): string {
    const colorOption = this.colorOptions.find(option => option.name === name);
    return colorOption ? colorOption.hex : 'No hex value found';
  }

}