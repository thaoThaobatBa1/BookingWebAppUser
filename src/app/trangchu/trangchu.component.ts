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

  orderDetail: OderDetail = {
    quantity: 0,
    menuItemID: "",
    orderID: "",
  }

  customer: Customer = {
    name: "",
    phoneNumber: ""
  }

  bookingadd: BookingToAdd = {
    numberOfGuests: 0,
    customerId: '',
    oderId: "",
    tableId: '',
  }

  showReservation: boolean = false;

  tables: any[] = []
  appetizers: any[] = []
  mainDishes: any[] = []
  drinks: any[] = []
  desserts: any[] = []

  slides = [
    { img: 'assets/img/baner1.jpg' },
    { img: 'assets/img/baner2.jpg' },
    { img: 'assets/img/baner3.jpg' },
    { img: 'assets/img/baner4.jpg' }
  ];

  MenuItemlist: any[] = []

  constructor(private http: HttpClient) {

  }

  increaseQuantity(item: any): void {
    if (item.quantity < 10) {
      item.quantity++;
      console.log(item.menuItemID)
    }
  }

  decreaseQuantity(item: any): void {
    if (item.quantity > 0) {
      item.quantity--;
      console.log(item.menuItemID)
    }
  }

  ngOnInit(): void {
    this.getAllMenuItem()
    this.GetAllAppetizer()
    this.GetAllDesserts()
    this.GetAllDrinks()
    this.GetAllMainDishes()
    this.GetAllTables()
    const userId = localStorage.getItem("userId")
    const userName = localStorage.getItem("userName")
    if (userId != null && userName != null) {
      this.http.get(`https://localhost:7097/api/Customer/withUser${userId}`).subscribe((res: any) => {
        this.customer.name = res.name
        this.customer.phoneNumber = res.phoneNumber
      }, error => {
        this.customer.name = userName
      })
    }
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
    this.http.get("https://localhost:7097/api/BookingManagament/get_khaivi").subscribe((res: any) => {
      this.appetizers = res.$values
    })
  }

  GetAllMainDishes() {
    this.http.get("https://localhost:7097/api/BookingManagament/getAll_Thit").subscribe((res: any) => {
      this.mainDishes = res.$values
    })
  }

  GetAllDrinks() {
    this.http.get("https://localhost:7097/api/BookingManagament/getAll_NuocUong").subscribe((res: any) => {
      this.drinks = res.$values
    })
  }

  GetAllDesserts() {
    this.http.get("https://localhost:7097/api/BookingManagament/get_Trangmieng").subscribe((res: any) => {
      this.desserts = res.$values
    })
  }

  GetAllTables() {
    this.http.get("https://localhost:7097/api/Table").subscribe((res: any) => {
      this.tables = res.$values
    })
  }
  showReservationForm() {
    this.showReservation = !this.showReservation;
    const reservationForm = document.querySelector('.reservation-form');
    if (reservationForm) {
      reservationForm.classList.toggle('show');
    }
  }
  Order() {
    this.http.post("https://localhost:7097/api/Order", {}).subscribe((res: any) => {
      const OrderId = res.orderID
      localStorage.setItem("orderId", res.orderID)
      const UserId = localStorage.getItem("userId")

      if (UserId != null) {
        const customerWithUser = {
          name: this.customer.name,
          phoneNumber: this.customer.phoneNumber,
          userId: UserId
        }
        this.http.post("https://localhost:7097/api/Customer/WithUser", customerWithUser).subscribe((res: any) => {
          this.AddMenuItem(OrderId, res.customerID)
          alert("đặt hàng thành công")
        })
      } else {
        this.http.post("https://localhost:7097/api/Customer/", this.customer).subscribe((res: any) => {
          this.AddMenuItem(OrderId, res.customerID)
          alert("đặt hàng thành công")
        });
      }
    })

  }

  AddMenuItem(orderId: any, customerId: any) {
    const combineMenu = this.appetizers.concat(this.desserts, this.mainDishes, this.drinks);
    this.bookingadd.customerId = customerId;
    this.bookingadd.oderId = orderId
    this.http.post("https://localhost:7097/api/Booking", this.bookingadd).subscribe(() => {
      combineMenu.forEach((menuItem: any) => {
        if (menuItem.quantity > 0) {
          const oderDetail = {
            quantity: menuItem.quantity,
            menuItemID: menuItem.menuItemID,
            orderID: orderId
          };

          this.http.post("https://localhost:7097/api/OrderDetail/", oderDetail).subscribe(
            (res: any) => { },

          );
        }
      });
    });
  }

  isPay: boolean = false
  Pay() {
    const oderId = localStorage.getItem("orderId")
    if (oderId != null) {
      this.http.get("https://localhost:7097/api/BookingManagament").subscribe((res: any) => {
        res.$values.forEach((item : any)=>{
          if(item.orderID == oderId){
            const paymentInfomation = {
              orderType: "other",
              amount: item.deposit,
              orderDescription: "Thanh toán hoá đơn cọc đặt bàn",
              name: item.nameOfGuest
            }

            this.http.post("https://localhost:7097/api/Payment/VnPay", paymentInfomation).subscribe((res: any) => {
          
              window.location.href = res.paymentUrl;
            
          }, error => {
            console.error("Lỗi khi gửi yêu cầu thanh toán:", error);
          })
          }
        })
        
        
      })
    }

  }
}
