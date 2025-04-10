import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => { 
            return import('./home/home.component').then(m => m.HomeComponent)},
    },
    {
        path: 'about',
        pathMatch: 'full',
        loadComponent: () => { 
            return import('./about/about.component').then(m => m.AboutComponent)},
    },
    {
        path: 'color-generation',
        pathMatch: 'full',
        loadComponent: () => { 
            return import('./color-generation/color-generation.component').then(m => m.ColorGenerationComponent)},
    }
];

@NgModule({ 
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
// This file defines the routes for the Angular application. It imports necessary modules and components,
