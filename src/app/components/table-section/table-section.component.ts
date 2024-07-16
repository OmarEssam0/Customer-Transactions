import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CustomerData } from 'src/app/core/interface/customer-data';
import { TransactionData } from 'src/app/core/interface/transaction-data';
import { GetDataService } from 'src/app/core/services/get-data.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-table-section',
  templateUrl: './table-section.component.html',
  styleUrls: ['./table-section.component.css']
})
export class TableSectionComponent {
  allCustomers!:CustomerData[]
  allTransactions!:TransactionData[]
  customerTransactions!:any[]
  selectedCustomerTransactions: any[] = [];
  nameFilter: string = '';
  amountFilter: string = "";
  chart: Chart | undefined;
  @ViewChild('transactionsChart') transactionsChart!: ElementRef;
  constructor(private getData:GetDataService){}
  ngOnInit(): void {
    this.getAllCustomers()
    this.getAllTransactions()

  }

  getAllCustomers(){
    this.getData.getCustomers().subscribe({
      next: res => {
        this.allCustomers = res
      }
    });


  }
  getAllTransactions(){
    this.getData.getTransaction().subscribe(res => {
      this.allTransactions = res;
      this.calcTotalAmount()
    });

  }

  calcTotalAmount(){
    this.customerTransactions =this.allCustomers.map(customer => {
      const customerTransactions = this.allTransactions.filter(
        transaction => transaction.customer_id == customer.id
      )
      const totalAmount = customerTransactions.reduce(
        (sum , transaction) => sum + transaction.amount , 0
      )
      return{
        id: customer.id,
        name: customer.name,
        totalAmount: totalAmount
      }
    })
  }

 nameeFilter(){
    if (this.nameFilter.toLowerCase() != '') {
      this.customerTransactions = this.customerTransactions.filter(
        customer => customer.name.toLowerCase().includes(this.nameFilter.toLowerCase())
      );
    } else {
      this.calcTotalAmount();
    }
  }

amounttFilter(){
    if (this.amountFilter) {
      console.log(this.amountFilter);

      this.customerTransactions = this.customerTransactions.filter(
        customer => customer.totalAmount === this.amountFilter

      );
    }else{
      this.calcTotalAmount();
    }
  }
  showTransactions(customerId: number) {
    this.selectedCustomerTransactions = this.allTransactions.filter(
      transaction => transaction.customer_id == customerId
    );
    if (this.chart) {
      this.chart.destroy();
    }
    setTimeout(() => {
      this.renderChart();
    }, 0);

  }

  renderChart(): void {
    const ctx = (this.transactionsChart.nativeElement as HTMLCanvasElement).getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.selectedCustomerTransactions.map(t => t.date),
        datasets: [{
          label: 'Amount',
          data: this.selectedCustomerTransactions.map(t => t.amount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
