import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amountSearch'
})
export class AmountSearchPipe implements PipeTransform {

  transform(customerTransactions:any[], value:string):any {
    if(!customerTransactions || !value){
      return customerTransactions;
    }

    return customerTransactions.filter(ay7aga => ay7aga.totalAmount.toString().includes(value))
  }

}
