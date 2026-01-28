export type Token = { 
    currency: string 
    date: string 
    price: number
}

export type ModalType = {
    open: boolean 
    type?: 'from' | 'to'
}