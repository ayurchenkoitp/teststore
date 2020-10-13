import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule, MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatSelectModule
  ]

})
export class MaterialModule { }
