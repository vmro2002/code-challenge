import { Button } from "./ui/button"
import type { SwapErrorProps } from "@/utils/interfaces"

export const SwapError: React.FC<SwapErrorProps> = ({onRetry}) => {
    return (
        <div className="w-full max-w-md mx-auto">
        <div className="glass rounded-2xl p-6 text-center space-y-4">
          <div className="text-destructive text-lg font-medium">
            Failed to load prices
          </div>
          <p className="text-muted-foreground text-sm">
            Please check your connection and try again.
          </p>
          <Button
            onClick={onRetry}
            variant="outline"
            className="border-primary/50 hover:bg-primary/10 text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    )
}


