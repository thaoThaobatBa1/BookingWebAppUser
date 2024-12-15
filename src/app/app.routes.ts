import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { TrangchuComponent } from './trangchu/trangchu.component';
import { DatbanComponent } from './datban/datban.component';
import { ThucdonComponent } from './thucdon/thucdon.component';
import { LienheComponent } from './lienhe/lienhe.component';
import { DanhgiaComponent } from './danhgia/danhgia.component';
import { DangkiComponent } from '../dangki/dangki.component';
import { PaymentResultComponent } from './payment-result/payment-result.component';

export const routes: Routes = [
    { path: 'payment-result', component: PaymentResultComponent },
    {
        path: "",
        redirectTo: 'layout/trangchu',
        pathMatch: 'full'
    },
    {
        path : "layout",
        component : LayoutComponent,
        children : [
            
            {path : "trangchu", component : TrangchuComponent},
            {path : "datban", component : DatbanComponent},
            {path : "thucdon", component : ThucdonComponent},
            {path : "lienhe", component : LienheComponent},
            {path : "danhgia", component : DanhgiaComponent},

        ]
    },
    {path : "login", component : LoginComponent},
    {path : "dangki", component : DangkiComponent},
    { path: "**", redirectTo: 'layout/trangchu' }
    
    
    




];
