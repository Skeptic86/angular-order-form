import { IBankCards } from './bank-cards.interface';
export interface IPayment {
    paymentMethods: [{
        name: string, id:number, type:string, bankCards:IBankCards[]
    }] 
}