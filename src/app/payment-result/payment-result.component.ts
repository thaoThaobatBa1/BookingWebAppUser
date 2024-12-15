import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { log } from 'console';
import { Router } from 'express';

@Component({
  selector: 'app-payment-result',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterLink],
  templateUrl: './payment-result.component.html',
  styleUrl: './payment-result.component.scss'
})
export class PaymentResultComponent implements OnInit {

  vnpResponseCode: string = '';
  vnpAmount: number = 0;
  vnpTxnRef: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const currentOrderId = localStorage.getItem("orderId")
    if (currentOrderId != null) {
      this.http.get(`https://localhost:7097/api/PaymentStatus/UpdateStatus?id=${currentOrderId}`).subscribe((res : any)=>{
        console.log("Thanh toán thành công")
      })
      localStorage.removeItem("orderId")
    } else {
      console.log("orderID rỗng")
    }


    this.route.queryParams.subscribe(params => {
      this.vnpResponseCode = params['vnp_ResponseCode'];
      this.vnpAmount = +params['vnp_Amount'] / 100;
      this.vnpTxnRef = params['vnp_TxnRef'];

      if (this.vnpResponseCode === '00') {
        console.log('Thanh toán thành công!', params);
      } else {
        console.error('Thanh toán thất bại!', params);
      }


      
    });
  }




}
