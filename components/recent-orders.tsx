import { ArrowUpRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const recentOrders = [
  {
    id: "ORD-7892",
    customer: "Emily Chen",
    email: "emily.chen@email.com",
    status: "completed",
    total: "$342.00",
    date: "Jan 15, 2024",
  },
  {
    id: "ORD-7891",
    customer: "Michael Brown",
    email: "m.brown@email.com",
    status: "processing",
    total: "$125.00",
    date: "Jan 15, 2024",
  },
  {
    id: "ORD-7890",
    customer: "Sarah Wilson",
    email: "s.wilson@email.com",
    status: "completed",
    total: "$567.00",
    date: "Jan 14, 2024",
  },
  {
    id: "ORD-7889",
    customer: "James Miller",
    email: "j.miller@email.com",
    status: "pending",
    total: "$89.00",
    date: "Jan 14, 2024",
  },
  {
    id: "ORD-7888",
    customer: "Lisa Anderson",
    email: "l.anderson@email.com",
    status: "completed",
    total: "$234.00",
    date: "Jan 13, 2024",
  },
]

const statusStyles: Record<string, { variant: "default" | "secondary" | "outline"; className: string }> = {
  completed: { 
    variant: "secondary", 
    className: "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400" 
  },
  processing: { 
    variant: "secondary", 
    className: "bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950 dark:text-blue-400" 
  },
  pending: { 
    variant: "secondary", 
    className: "bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-950 dark:text-amber-400" 
  },
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

export function RecentOrders() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-medium">Recent Orders</CardTitle>
            <p className="text-sm text-muted-foreground">
              Latest orders from your stores
            </p>
          </div>
          <Button variant="ghost" size="sm" className="gap-1 text-sm text-muted-foreground hover:text-foreground">
            View all
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="pl-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Order
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Customer
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Date
              </TableHead>
              <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="pr-6 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow key={order.id} className="group cursor-pointer">
                <TableCell className="pl-6">
                  <span className="font-mono text-sm font-medium">{order.id}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-9 border">
                      <AvatarFallback className="bg-muted text-xs font-medium">
                        {getInitials(order.customer)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{order.customer}</span>
                      <span className="text-xs text-muted-foreground">{order.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{order.date}</span>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={statusStyles[order.status].variant} 
                    className={`capitalize ${statusStyles[order.status].className}`}
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="pr-6 text-right">
                  <span className="font-mono text-sm font-semibold">{order.total}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
