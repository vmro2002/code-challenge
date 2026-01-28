import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { TokenSelectModalProps } from "@/utils/interfaces";
import { getTokenIcon } from "@/utils/function";

export const TokenSelectModal: React.FC<TokenSelectModalProps> = ({
  type,
  open,
  onClose,
  tokensData,
  onSelect,
  selectedCurrency,
  setRate
}) => {

  return (
    <Dialog open={open}>
      <DialogContent className="glass max-w-md max-h-[80vh] flex flex-col border-primary/20" showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold text-white">
            {type == 'from' && <span>Select a currency to covert from</span>}
            {type == 'to' && <span>Select a currency to covert to</span>}
          </DialogTitle>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-secondary/50 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-white/70 hover:text-white" />
          </button>
        </DialogHeader>

        {/* Currency list */}
        <div className="flex-1 overflow-y-auto -mx-6 px-6 space-y-1 min-h-[300px] max-h-[400px]">
          {tokensData.map((token, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  onSelect(type, token.currency)
                  setRate(token.price)
                  onClose()
                }}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl",
                  "hover:bg-secondary/10 transition-all duration-200",
                  selectedCurrency === token.currency &&
                    "bg-primary/10 border border-primary"
                )}
              >
                {/* Token icon */}
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden">
                  <img
                    src={getTokenIcon(token.currency)}
                    alt={token.currency}
                    className="w-8 h-8"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.classList.remove(
                        "hidden"
                      );
                    }}
                  /> 
                  <span className="hidden text-sm font-bold text-white">
                    {token.currency[0].toUpperCase()}
                  </span>
                </div>

                {/* Token info */}
                <div className="flex-1 text-left">
                  <div className="font-semibold text-white">
                    {token.currency}
                  </div>
                  <div className="text-sm text-white/60">
                    {token.price}
                  </div>
                </div>

            
                {selectedCurrency === token.currency && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </button>
            ))
          }
        </div>
      </DialogContent>
    </Dialog>
  );
}
