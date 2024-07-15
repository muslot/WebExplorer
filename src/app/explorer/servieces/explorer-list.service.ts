import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IExplorer } from '../models/explorer';

@Injectable({
  providedIn: 'root'
})
export class ExplorerListService {

  constructor() { }
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getFolderList(): Observable<IExplorer[]>
  {
    return this.http.get<IExplorer[]>(`${this.apiUrl}tasks`);
  }

  updateFolderList(folderList: IExplorer[]): Observable<void>
  {
    return this.http.put<void>(`${this.apiUrl}tasks`, folderList);
  }
}
