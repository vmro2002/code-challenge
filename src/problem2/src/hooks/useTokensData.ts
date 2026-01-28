import { useQuery } from "@tanstack/react-query";
import { TOKENS_API_URL } from "@/utils/constants";
import type { Token } from "@/utils/types";

export const useTokensData = () => {
    const {data, isError, isPending, refetch} = useQuery({
        queryKey: ['tokens'],
        queryFn: async () => {
            const response = await fetch(TOKENS_API_URL, {
                method: 'GET'
            })

            if (!response.ok) {
                throw new Error()
            }

            const tokenMap = new Map<string, Token>()
            const json = await response.json() 

            // filter out USD as we will use it as the base currency
            // deduplicate tokens by keeping the one with the latest timestamp
            for (const token of json as Token[]) {
                if (token.currency === 'USD') {
                    continue
                }

                const existing = tokenMap.get(token.currency)

                if (existing) {
                    if (new Date(token.date).getTime() > new Date(existing.date).getTime()) {
                        tokenMap.set(token.currency, token)
                    }
                } else {
                    tokenMap.set(token.currency, token)
                }
            }

            return Array.from(tokenMap.values())
        }
    })

    return {
        tokensData: data,
        isTokensError: isError,
        isTokensPending: isPending,
        refetchTokensData: refetch
    }   
}