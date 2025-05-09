import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from 'src/app/manage-colors/color.model';

@Injectable({
    providedIn: 'root'
})

export class ColorService {
    private apiUrl = 'http://boston.cs.colostate.edu/~miguelrt/php-api';

    constructor(private http: HttpClient) {}

    getColors(): Observable<Color[]> {
        return this.http.get<Color[]>(`${this.apiUrl}/get-colors.php`);
    }

    addColor(color: Color): Observable<any> {
        return this.http.post(`${this.apiUrl}/add-color.php`, color);
    }

    updateColor(color: Color): Observable<any> {
        return this.http.post(`${this.apiUrl}/update-color.php`, color);
    }

    deleteColor(id: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/delete-color.php`, { id });
    }
}