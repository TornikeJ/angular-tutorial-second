import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared-module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: AuthComponent }])
    ]
})

export class AuthModule { }