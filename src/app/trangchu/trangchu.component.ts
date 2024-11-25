import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { error, log } from 'console';
export interface OderDetail {
  quantity: number
  menuItemID: string
  orderID: string
}
interface SelectedMenuItem {
  menuItemID: string;
  quantity: number;
}
export interface Customer {
  name: string
  phoneNumber: string
}

export interface BookingToAdd {
  numberOfGuests: number
  customerId: string
  oderId: string
  tableId: string
}



@Component({
  selector: 'app-trangchu',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TrangchuComponent implements OnInit {

  orderDetail : OderDetail = {
    quantity: 0,
    menuItemID: "",
    orderID: "",
  }

  customer : Customer = {
    name: "",
    phoneNumber: ""
  }

  bookingadd : BookingToAdd = {
    numberOfGuests: 0,
    customerId: '',
    oderId: '',
    tableId: '',
  }

 



  showReservation: boolean = false;
  showReservationForm() {
    this.showReservation = !this.showReservation;
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
      reservationForm.classList.toggle('show');
    }
    this.http.post("https://localhost:7097/api/Order", {}).subscribe((res: any) => {
      localStorage.setItem("oderId", res.orderID)
      console.log(res.orderID);

    })

  }

  tables: any[] = []
  appetizers: any[] = []
  mainDishes: any[] = []
  drinks: any[] = []
  desserts: any[] = []


  orderDetails: { [key: string]: number } = {};
  increaseQuantity(item: any) {
    if (this.orderDetails[item.menuItemID]) {
      this.orderDetails[item.menuItemID]++;
    } else {
      this.orderDetails[item.menuItemID] = 1;
    }
  }
  
  decreaseQuantity(item: any) {
    if (this.orderDetails[item.menuItemID]) {
      if (this.orderDetails[item.menuItemID] > 0) {
        this.orderDetails[item.menuItemID]--;
      }
      if (this.orderDetails[item.menuItemID] === 0) {
        delete this.orderDetails[item.menuItemID];
      }
    }
  }
  slides = [
    { img: 'assets/img/baner1.jpg' },
    { img: 'assets/img/baner2.jpg' },
    { img: 'assets/img/baner3.jpg' },
    { img: 'assets/img/baner4.jpg' }
  ];

  MenuItemlist: any[] = []

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.getAllMenuItem()
    this.GetAllAppetizer()
    this.GetAllDesserts()
    this.GetAllDrinks()
    this.GetAllMainDishes()
    this.GetAllTables()
  }

  getAllMenuItem(): void {
    this.http.get("https://localhost:7097/api/MenuItem").subscribe((res: any) => {
      this.MenuItemlist = res.$values;
      console.log(this.MenuItemlist);
    }, error => {
      console.error(error);
    });
  }

  GetAllAppetizer() {
    this.http.get("https://localhost:7097/api/BookingListInfo/get_khaivi").subscribe((res: any) => {
      this.appetizers = res.$values
    })
  }

  GetAllMainDishes() {
    this.http.get("https://localhost:7097/api/BookingListInfo/getAll_Thit").subscribe((res: any) => {
      this.mainDishes = res.$values
    })
  }

  GetAllDrinks() {
    this.http.get("https://localhost:7097/api/BookingListInfo/getAll_NuocUong").subscribe((res: any) => {
      this.drinks = res.$values
    })
  }

  GetAllDesserts() {
    this.http.get("https://localhost:7097/api/BookingListInfo/get_Trangmieng").subscribe((res: any) => {
      this.desserts = res.$values
    })
  }

  GetAllTables() {
    this.http.get("https://localhost:7097/api/Table").subscribe((res: any) => {
      this.tables = res.$values
    })
  }

  Order(){
    this.http.post("https://localhost:7097/api/Customer/",this.customer).subscribe((res : any) =>{
      
    })
  }

}
