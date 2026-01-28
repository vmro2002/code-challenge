import { useState } from "react";
import { ArrowDownUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AmountInput } from "./AmountInput";
import { TokenSelectModal } from "./TokenSelectModal";
import { SwapSkeleton } from "./SwapSkeleton";
import { SwapError } from "./SwapError";
import { cn } from "@/lib/utils";
import { useTokensData } from "@/hooks/useTokensData";
import type { ModalType } from "@/utils/types";
import { useSwapForm } from "@/hooks/useSwapForm";


export function TokenSwapForm() {
  const [modal, setModal] = useState<ModalType>({open: false});
  const {
    tokensData, 
    isTokensError,
    isTokensPending,
    refetchTokensData,
  } = useTokensData()

  const {
    register,
    onSubmit,
    errors,
    toCurrency,
    fromCurrency,
    selectToken,
    swapSelection,
    rate,
    setRate,
    getReceiveAmount
  } = useSwapForm()

  // Show skeleton while loading prices
  if (isTokensPending) {
    return <SwapSkeleton />;
  }

  // Show error state if prices failed to load
  if (isTokensError) {
    return <SwapError onRetry={() => refetchTokensData()}/>
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={onSubmit}>
        <div className="glass rounded-2xl p-6 space-y-4 border border-primary/30">
          <h2 className="text-xl font-bold text-gradient">Swap</h2>

          {/* From input */}
          <AmountInput
            label="You pay"
            currency={fromCurrency}
            onCurrencyClick={() => setModal({open: true, type: 'from'})}
            error={errors.amount?.message || errors.fromCurrency?.message}
            {...register("amount", { setValueAs: (v) => v == ''? 0 : parseFloat(v) })}
          />

          {/* Swap button */}
          <div className="flex justify-center ">
            <button
              type="button"
              onClick={swapSelection}
              className={cn(
                "p-2.5 rounded-full bg-background border-4 border-card",
                "hover:bg-secondary transition-all duration-300",
                "hover:rotate-180 active:scale-95",
                "group"
              )}
              aria-label="Swap currencies"
            >
              <ArrowDownUp className="w-5 h-5 text-primary group-hover:text-foreground transition-colors" />
            </button>
          </div>

          {/* To input (read-only) */}
          <AmountInput
            label="You receive"
            currency={toCurrency}
            onCurrencyClick={() => setModal({open: true, type: 'to'})}
            value={getReceiveAmount()}
            error={errors.toCurrency?.message}
            readOnly
          />

          {/* Exchange rate */}
          {fromCurrency && toCurrency && (
            <div className="text-center text-sm text-white/60">
              {`1 ${fromCurrency === 'USD' ? toCurrency : fromCurrency} = $${rate}`}
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            className={cn(
              "w-full h-14 text-lg font-semibold rounded-xl",
              "bg-linear-to-r from-primary to-accent",
              "hover:opacity-90 transition-all duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {false ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Swapping...
              </span>
            ) : (
              "Swap"
            )}
          </Button>
        </div>
      </form>

      {/* Currency selection modals */}
      {modal.type && (
        <TokenSelectModal
        type={modal.type}
        open={modal.open}
        onClose={() => setModal({open: false})}
        tokensData={tokensData ?? []}
        onSelect={selectToken}
        selectedCurrency={modal.type == 'to'? toCurrency : fromCurrency}
        setRate={setRate}
        />
      )}
    </div>
  );
}
