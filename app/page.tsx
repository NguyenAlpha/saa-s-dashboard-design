import { KpiCards } from "@/components/kpi-cards"
import { SalesChart } from "@/components/sales-chart"
import { RecentOrders } from "@/components/recent-orders"
import { LowStockAlert } from "@/components/low-stock-alert"

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-8 lg:p-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-base text-muted-foreground">
          Welcome back! Here&apos;s an overview of your inventory and sales.
        </p>
      </div>

      <KpiCards />

      <div className="grid gap-8 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <SalesChart />
        </div>
        <div className="lg:col-span-3">
          <LowStockAlert />
        </div>
      </div>

      <RecentOrders />
    </div>
  )
}
