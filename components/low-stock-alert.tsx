import { AlertTriangle, ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

const lowStockProducts = [
  {
    name: "Wireless Headphones Pro",
    sku: "WHP-001",
    current: 5,
    minimum: 20,
  },
  {
    name: "USB-C Hub 7-in-1",
    sku: "UCH-007",
    current: 8,
    minimum: 25,
  },
  {
    name: "Mechanical Keyboard",
    sku: "MKB-102",
    current: 3,
    minimum: 15,
  },
  {
    name: "4K Webcam",
    sku: "WEB-4K1",
    current: 12,
    minimum: 30,
  },
]

export function LowStockAlert() {
  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950">
              <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="space-y-0.5">
              <CardTitle className="text-base font-medium">Low Stock</CardTitle>
              <p className="text-sm text-muted-foreground">
                {lowStockProducts.length} items need attention
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-sm text-muted-foreground hover:text-foreground">
            View all
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-5">
          {lowStockProducts.map((product) => {
            const percentage = (product.current / product.minimum) * 100
            const isLow = percentage <= 25
            return (
              <div key={product.sku} className="space-y-2.5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium leading-none">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      SKU: {product.sku}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold tabular-nums ${isLow ? "text-red-600 dark:text-red-400" : ""}`}>
                      {product.current}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      of {product.minimum}
                    </p>
                  </div>
                </div>
                <Progress
                  value={percentage}
                  className={`h-1.5 ${isLow ? "[&>div]:bg-red-500" : "[&>div]:bg-amber-500"}`}
                />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
