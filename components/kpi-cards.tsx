import { DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const kpiData = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up",
    icon: DollarSign,
    description: "vs last month",
  },
  {
    title: "Orders",
    value: "2,350",
    change: "+15.2%",
    trend: "up",
    icon: ShoppingCart,
    description: "vs last month",
  },
  {
    title: "Inventory Value",
    value: "$128,430",
    change: "-4.5%",
    trend: "down",
    icon: Package,
    description: "vs last month",
  },
  {
    title: "Customers",
    value: "1,429",
    change: "+12.3%",
    trend: "up",
    icon: Users,
    description: "vs last month",
  },
]

export function KpiCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {kpiData.map((kpi) => (
        <Card key={kpi.title} className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </span>
              <div className="flex size-10 items-center justify-center rounded-full bg-muted/50">
                <kpi.icon className="size-5 text-muted-foreground" />
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <p className="text-3xl font-semibold tracking-tight">{kpi.value}</p>
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                    kpi.trend === "up"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                      : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                  }`}
                >
                  {kpi.trend === "up" ? (
                    <TrendingUp className="size-3" />
                  ) : (
                    <TrendingDown className="size-3" />
                  )}
                  {kpi.change}
                </span>
                <span className="text-xs text-muted-foreground">{kpi.description}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
