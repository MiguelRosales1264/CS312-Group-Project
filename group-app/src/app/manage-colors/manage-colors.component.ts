import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-colors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-colors.component.html',
  styleUrls: ['./manage-colors.component.css']
})
export class ManageColorsComponent {
  // List of colors with their associated hex values
  colorOptions: { name: string; hex: string }[] = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Orange', hex: '#FFA500' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Green', hex: '#008000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Grey', hex: '#808080' },
    { name: 'Brown', hex: '#A52A2A' },
    { name: 'Black', hex: '#000000' },
    { name: 'Teal', hex: '#008080' }
  ];

  newColorName: string = ''; // Stores the input for the new color name
  newHexValue: string = ''; // Stores the input for the new hex value
  selectedColorToDelete: string = ''; // Stores the selected color to delete
  selectedColorToEdit: string = ''; // Stores the selected color to edit
  editColorName: string = ''; // Stores the new color name
  editHexValue: string = ''; // Stores the new hex value

  // Function to add a new color
  addColor(name: string, hex: string): void {
    // Check if the color name or hex value already exists
    const duplicate = this.colorOptions.find(
      color => color.name.toLowerCase() === name.toLowerCase() || color.hex.toLowerCase() === hex.toLowerCase()
    );

    if (duplicate) {
      console.error('A color with this name or hex value already exists.');
      return;
    }

    // Add the new color to the list
    this.colorOptions.push({ name, hex });
    console.log(`Added color: ${name} (${hex})`);
    this.newColorName = ''; // Reset input fields
    this.newHexValue = '';
  }

  // Function to delete a color
  deleteColor(name: string): void {
    const initialLength = this.colorOptions.length;

    // Remove the color from the list
    this.colorOptions = this.colorOptions.filter(color => color.name.toLowerCase() !== name.toLowerCase());

    if (this.colorOptions.length === initialLength) {
      console.error(`Color "${name}" not found.`);
    } else {
      console.log(`Deleted color: ${name}`);
    }
  }

  // Function to populate the edit fields with the selected color's details
  populateEditFields(): void {
    const colorToEdit = this.colorOptions.find(color => color.name === this.selectedColorToEdit);
    if (colorToEdit) {
      this.editColorName = colorToEdit.name;
      this.editHexValue = colorToEdit.hex;
    }
  }

  // Function to edit an existing color
  editColor(oldName: string, newName: string, newHex: string): void {
    const colorToEdit = this.colorOptions.find(color => color.name.toLowerCase() === oldName.toLowerCase());

    if (!colorToEdit) {
      console.error(`Color "${oldName}" not found.`);
      return;
    }

    // Check if the new name or hex value conflicts with an existing color
    const duplicate = this.colorOptions.find(
      color => (color.name.toLowerCase() === newName.toLowerCase() || color.hex.toLowerCase() === newHex.toLowerCase()) &&
               color.name.toLowerCase() !== oldName.toLowerCase()
    );

    if (duplicate) {
      console.error('A color with this name or hex value already exists.');
      return;
    }

    // Update the color's name and hex value
    colorToEdit.name = newName;
    colorToEdit.hex = newHex;
    console.log(`Edited color: ${oldName} -> ${newName} (${newHex})`);

    // Clear the input fields
    this.editColorName = '';
    this.editHexValue = '';
  }
}
