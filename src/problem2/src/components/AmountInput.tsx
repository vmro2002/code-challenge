import { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AmountInputProps } from "@/utils/interfaces";
import { getTokenIcon } from "@/utils/function";

export const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
  (
    {
      label,
      currency,
      onCurrencyClick,
      error,
      readOnly,
      className,
      ...props
    },
    ref
  ) => {

    return (
      <div
        className={cn(
          "bg-secondary/50 rounded-xl p-4 transition-all duration-200",
          error && "ring-2 ring-destructive/50",
          !readOnly && "hover:bg-secondary/70",
          className
        )}
      >
        <div className="flex mb-2">
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>

        <div className="flex items-center justify-between">
          <input
            ref={ref}
            type="number"
            step="any"
            min="0"
            placeholder="0.00"
            readOnly={readOnly}
            className={cn(
              "w-full bg-transparent text-3xl font-medium outline-none text-white pe-2",
              "placeholder:text-white/50",
              "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
              readOnly && "cursor-default text-white/80"
            )}
            {...props}
          />
          <button
            type="button"
            onClick={onCurrencyClick}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-full",
              "bg-background/50 hover:bg-background/80",
              "border border-border/50 hover:border-primary/50",
              "transition-all duration-200",
              "group"
            )}
          >
            <div className="w-6 h-6 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
              <img
                src={getTokenIcon(currency)}
                alt={currency}
                className="w-5 h-5"
                onError={(e) => {
                  // Fallback to first letter if icon fails to load
                  e.currentTarget.style.display = "none";
                  e.currentTarget.nextElementSibling?.classList.remove(
                    "hidden"
                  );
                }}
              />
              <span className="hidden text-xs font-bold text-primary">
                {currency.charAt(0)}
              </span>
            </div>
            <span className="font-semibold text-white">{currency}</span>
            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>
        </div>

        {error && (
          <p className="mt-2 text-sm text-destructive animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

AmountInput.displayName = "CurrencyInput";
