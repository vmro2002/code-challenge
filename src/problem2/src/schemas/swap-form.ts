import { z } from "zod";

export const SwapFormSchema = z
  .object({
    amount: z.number().min(1, {error: 'Please enter a value greater than 0'}),
    fromCurrency: z.string().min(1, {error: 'Please select a token'}),
    toCurrency: z.string().min(1, {error: 'Please select a token'}),
    rate: z.number(),
  })

export type SwapFormType = z.infer<typeof SwapFormSchema>;
