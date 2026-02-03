import { SwapFormSchema } from "@/schemas/swap-form"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Decimal from 'decimal.js'
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"


export const useSwapForm = () => {
    const {
        handleSubmit, 
        formState: {errors}, 
        register,
        control,
        setValue,
        reset
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

    const mutation = useMutation({
        mutationFn:  async () => {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            return { txHash: `0x${Math.random().toString(16).slice(2)}` }
          },
        onSuccess: () => {
            reset()
            toast.success("Swap completed successfully")
        },
    })

    const onSubmit = handleSubmit(() => mutation.mutate())

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
        isPending: mutation.isPending,
    }
}