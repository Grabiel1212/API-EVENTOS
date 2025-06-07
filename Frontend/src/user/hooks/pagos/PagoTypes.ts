export interface CardData {
  number: string;
  name: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export interface FormData {
  cardNumber: string;
  cardHolder: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export interface FormErrors {
  cardNumber?: string;
  cardHolder?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
}