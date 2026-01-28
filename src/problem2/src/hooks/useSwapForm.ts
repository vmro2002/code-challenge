import { SwapFormSchema, type SwapFormType } from "@/schemas/swap-form"
import { useForm, type SubmitHandler, useWatch, type SubmitErrorHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Decimal from 'decimal.js'

export const useSwapForm = () => {
    const {
        handleSubmit, 
        formState: {errors}, 
        register,
        control,
        setValue
    } = useForm({
        resolver: zodResolver(SwapFormSchema),
        mode: 'onSubmit',
        defaultValues: {
            fromCurrency: 'USD',
            toCurrency: '',
            rate: 1
        }
    })

    const fromCurrency = useWatch({
        control: control,
        name: 'fromCurrency'
    })

    const toCurrency = useWatch({
        control: control,
        name: 'toCurrency'
    })

    const rate = useWatch({
        control: control,
        name: 'rate'
    })

    const amount = useWatch({
        control: control,
        name: 'amount'
    })

    const selectToken = (type: 'to' | 'from', token: string) => {
        if (type == 'to') {
            setValue('toCurrency', token, {shouldValidate: true})
            setValue('fromCurrency', 'USD',  {shouldValidate: true})
        } else {
            setValue('toCurrency', 'USD', {shouldValidate: true})
            setValue('fromCurrency', token, {shouldValidate: true})
        }
    }

    const swapSelection = () => {
        setValue('toCurrency', fromCurrency, {shouldValidate: true})
        setValue('fromCurrency', toCurrency, {shouldValidate: true})
    }

    const setRate = (rate: number) => {
        setValue('rate', rate)
    }

    const getReceiveAmount = (): string => {
        if (!fromCurrency || !toCurrency || !amount) {
            return ''
        }

        if (fromCurrency === 'USD') {
            return new Decimal(`${amount}`).div(`${rate}`).toFixed()
        } else {
            return new Decimal(`${amount}`).mul(`${rate}`).toFixed()
        }
    }

    const runOnSubmit: SubmitHandler<SwapFormType> = (data) => {
        console.log('submitted', data)
    }

    const onError: SubmitErrorHandler<SwapFormType> = () => {
        console.log('error')
    }

    const onSubmit = handleSubmit(runOnSubmit, onError)

    return {
        register,
        errors,
        fromCurrency,
        toCurrency,
        setValue,
        onSubmit,
        selectToken,
        swapSelection,
        rate,
        setRate,
        getReceiveAmount,
    }
}