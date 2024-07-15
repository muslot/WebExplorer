import { Component, inject, OnInit } from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { IExplorer } from './models/explorer';
import { ExplorerListService } from './servieces/explorer-list.service';
import {MatInputModule} from '@angular/material/input'
import { FormsModule } from '@angular/forms';
import e from 'express';

@Component({
  selector: 'app-explorer',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, MatInputModule,FormsModule],
  templateUrl: './explorer.component.html',
  styleUrl: './explorer.component.scss'
})
export class ExplorerComponent implements OnInit {

  private explorerListService = inject(ExplorerListService);
  explorerlist !: IExplorer[];
  prevValue !: string | null;
  currentEditFolderListId!: number | null;
  currentEditFolderIdx!: number | null;
  ngOnInit(): void {
    this.getFolderList();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    this.updateFolder(this.explorerlist);
  }

  getFolderList() {
    this.explorerListService.getFolderList().subscribe({
      next: (data) => {
        this.explorerlist = data;
      },
      error: (err) =>{
         console.log(err);
      }
    });
  }

 

  addFolder(){

  }

  editFolder(id:number,idx:number){
    let listIndex = this.explorerlist.findIndex((list) => list.id === id);
    if (this.currentEditFolderListId == id && this.currentEditFolderIdx == idx)
    {
      return this.updateFolder(this.explorerlist);
    }

    this.prevValue = this.explorerlist[listIndex].list[idx];

    this.currentEditFolderListId = id;
    this.currentEditFolderIdx = idx;

    
    
  }
  resetFolder(id:number){
    let listIndex = this.explorerlist.findIndex((list) => list.id === id);
    if(this.prevValue !== null)
    {
    this.explorerlist[listIndex].list[id] = this.prevValue;
    }
    this.resetFolderValues();
    return;
  }

  updateFolder(explorerlist: IExplorer[]){
    this.explorerListService.updateFolderList(explorerlist).subscribe((data) => {
      this.resetFolderValues();
    });
  }
  saveValue(id:number, idx:number){
    return this.updateFolder(this.explorerlist);
  }
  resetFolderValues(){
    this.currentEditFolderListId = null;
    this.currentEditFolderIdx = null;
    this.prevValue = null;
  }

  deleteFolder(id:number,idx:number){
    let listIndex = this.explorerlist.findIndex((list) => list.id === id);
    this.explorerlist[listIndex].list.splice(idx,1);
    this.updateFolder(this.explorerlist);
  }
}
