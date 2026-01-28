import type { Token } from "./types"
import type { InputHTMLAttributes } from "react"

export interface SwapErrorProps {
    onRetry: () => void
}

export interface AmountInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label: string;
    currency: string;
    onCurrencyClick: () => void;
    error?: string;
    readOnly?: boolean; 
}

export interface TokenSelectModalProps {
    type: 'from' | 'to'
    open: boolean
    onClose: () => void 
    tokensData: Token[]
    onSelect: (type: 'from' | 'to', token: string) => void
    setRate: (rate: number) => void
    selectedCurrency: string
}
