"use client"

import { useState, useMemo } from "react"
import {
  Search,
  MoreHorizontal,
  Eye,
  Printer,
  XCircle,
  ArrowUpDown,
  ShoppingBag,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  X,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface OrderItem {
  name: string
  sku: string
  quantity: number
  price: number
}

interface Order {
  id: string
  customer: string
  email: string
  phone: string
  status: "pending" | "processing" | "shipped" | "completed" | "cancelled"
  total: number
  subtotal: number
  shipping: number
  tax: number
  date: string
  shippingAddress: string
  items: OrderItem[]
}

const orders: Order[] = [
  {
    id: "ORD-7892",
    customer: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "+1 (555) 123-4567",
    status: "completed",
    total: 342.0,
    subtotal: 299.0,
    shipping: 15.0,
    tax: 28.0,
    date: "Jan 15, 2024",
    shippingAddress: "123 Main St, San Francisco, CA 94102",
    items: [
      { name: "Wireless Bluetooth Headphones", sku: "WBH-001", quantity: 1, price: 149.99 },
      { name: "Premium Leather Wallet", sku: "PLW-089", quantity: 2, price: 79.99 },
    ],
  },
  {
    id: "ORD-7891",
    customer: "Michael Brown",
    email: "m.brown@email.com",
    phone: "+1 (555) 234-5678",
    status: "processing",
    total: 125.0,
    subtotal: 99.0,
    shipping: 12.0,
    tax: 14.0,
    date: "Jan 15, 2024",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
    items: [
      { name: "Organic Cotton T-Shirt", sku: "OCT-042", quantity: 3, price: 29.99 },
    ],
  },
  {
    id: "ORD-7890",
    customer: "Sarah Wilson",
    email: "s.wilson@email.com",
    phone: "+1 (555) 345-6789",
    status: "shipped",
    total: 567.0,
    subtotal: 499.0,
    shipping: 25.0,
    tax: 43.0,
    date: "Jan 14, 2024",
    shippingAddress: "789 Pine Rd, Seattle, WA 98101",
    items: [
      { name: "Smart Watch Series X", sku: "SWX-201", quantity: 1, price: 299.99 },
      { name: "Wireless Charging Pad", sku: "WCP-078", quantity: 2, price: 39.99 },
      { name: "Running Shoes Pro", sku: "RSP-156", quantity: 1, price: 129.99 },
    ],
  },
  {
    id: "ORD-7889",
    customer: "James Miller",
    email: "j.miller@email.com",
    phone: "+1 (555) 456-7890",
    status: "pending",
    total: 89.0,
    subtotal: 69.0,
    shipping: 10.0,
    tax: 10.0,
    date: "Jan 14, 2024",
    shippingAddress: "321 Elm St, Chicago, IL 60601",
    items: [
      { name: "Ceramic Coffee Mug Set", sku: "CCM-022", quantity: 2, price: 34.99 },
    ],
  },
  {
    id: "ORD-7888",
    customer: "Lisa Anderson",
    email: "l.anderson@email.com",
    phone: "+1 (555) 567-8901",
    status: "completed",
    total: 234.0,
    subtotal: 199.0,
    shipping: 15.0,
    tax: 20.0,
    date: "Jan 13, 2024",
    shippingAddress: "654 Maple Dr, Austin, TX 78701",
    items: [
      { name: "Yoga Mat Premium", sku: "YMP-055", quantity: 1, price: 45.99 },
      { name: "Wireless Bluetooth Headphones", sku: "WBH-001", quantity: 1, price: 149.99 },
    ],
  },
  {
    id: "ORD-7887",
    customer: "David Kim",
    email: "d.kim@email.com",
    phone: "+1 (555) 678-9012",
    status: "cancelled",
    total: 459.0,
    subtotal: 399.0,
    shipping: 20.0,
    tax: 40.0,
    date: "Jan 12, 2024",
    shippingAddress: "987 Cedar Ln, Denver, CO 80201",
    items: [
      { name: "Smart Watch Series X", sku: "SWX-201", quantity: 1, price: 299.99 },
      { name: "Desk Organizer Set", sku: "DOS-033", quantity: 2, price: 49.99 },
    ],
  },
  {
    id: "ORD-7886",
    customer: "Jennifer Lopez",
    email: "j.lopez@email.com",
    phone: "+1 (555) 789-0123",
    status: "shipped",
    total: 178.0,
    subtotal: 149.0,
    shipping: 12.0,
    tax: 17.0,
    date: "Jan 12, 2024",
    shippingAddress: "147 Birch Way, Miami, FL 33101",
    items: [
      { name: "Running Shoes Pro", sku: "RSP-156", quantity: 1, price: 129.99 },
      { name: "Stainless Steel Water Bottle", sku: "SSW-103", quantity: 1, price: 24.99 },
    ],
  },
  {
    id: "ORD-7885",
    customer: "Robert Taylor",
    email: "r.taylor@email.com",
    phone: "+1 (555) 890-1234",
    status: "processing",
    total: 312.0,
    subtotal: 269.0,
    shipping: 18.0,
    tax: 25.0,
    date: "Jan 11, 2024",
    shippingAddress: "258 Spruce Ct, Boston, MA 02101",
    items: [
      { name: "Premium Leather Wallet", sku: "PLW-089", quantity: 1, price: 79.99 },
      { name: "Wireless Bluetooth Headphones", sku: "WBH-001", quantity: 1, price: 149.99 },
      { name: "Wireless Charging Pad", sku: "WCP-078", quantity: 1, price: 39.99 },
    ],
  },
]

const statusConfig: Record<
  Order["status"],
  { label: string; className: string; icon: typeof Clock }
> = {
  pending: {
    label: "Pending",
    className:
      "bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-950 dark:text-amber-400",
    icon: Clock,
  },
  processing: {
    label: "Processing",
    className:
      "bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950 dark:text-blue-400",
    icon: Package,
  },
  shipped: {
    label: "Shipped",
    className:
      "bg-violet-50 text-violet-700 hover:bg-violet-50 dark:bg-violet-950 dark:text-violet-400",
    icon: Truck,
  },
  completed: {
    label: "Completed",
    className:
      "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    className:
      "bg-gray-100 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400",
    icon: XCircle,
  },
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  return (
    <div className="flex flex-1 flex-col gap-8 p-8 lg:p-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Orders
          </h1>
          <p className="text-base text-muted-foreground">
            View and manage customer orders
          </p>
        </div>
        <Button className="gap-2 shadow-sm">
          <Plus className="size-4" />
          Create Order
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-10 w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[15%] pl-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Order
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="w-[25%] text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Customer
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Date
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Total
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="w-[60px] pr-6 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <ShoppingBag className="size-8 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">
                        No orders found
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status].icon
                  return (
                    <TableRow
                      key={order.id}
                      className="group cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <TableCell className="pl-6">
                        <span className="font-mono text-sm font-medium">
                          {order.id}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9 border">
                            <AvatarFallback className="bg-muted text-xs font-medium">
                              {getInitials(order.customer)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {order.customer}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {order.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {order.date}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`gap-1.5 ${statusConfig[order.status].className}`}
                        >
                          <StatusIcon className="size-3" />
                          {statusConfig[order.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm font-semibold">
                          {formatCurrency(order.total)}
                        </span>
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              className="gap-2"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedOrder(order)
                              }}
                            >
                              <Eye className="size-4" />
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Printer className="size-4" />
                              Print invoice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
                              <XCircle className="size-4" />
                              Cancel order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Table Footer */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Showing{" "}
          <span className="font-medium text-foreground">
            {filteredOrders.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{orders.length}</span>{" "}
          orders
        </p>
      </div>

      {/* Order Detail Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl p-0">
          {selectedOrder && (
            <>
              <DialogHeader className="border-b px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <DialogTitle className="font-mono text-lg">
                      {selectedOrder.id}
                    </DialogTitle>
                    <Badge
                      variant="secondary"
                      className={`gap-1.5 ${statusConfig[selectedOrder.status].className}`}
                    >
                      {(() => {
                        const StatusIcon = statusConfig[selectedOrder.status].icon
                        return <StatusIcon className="size-3" />
                      })()}
                      {statusConfig[selectedOrder.status].label}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => setSelectedOrder(null)}
                  >
                    <X className="size-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-6 p-6">
                {/* Customer Info */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Customer
                    </h4>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-10 border">
                        <AvatarFallback className="bg-muted text-sm font-medium">
                          {getInitials(selectedOrder.customer)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{selectedOrder.customer}</span>
                        <span className="text-sm text-muted-foreground">
                          {selectedOrder.email}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {selectedOrder.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Shipping Address
                    </h4>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {selectedOrder.shippingAddress}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Order Items */}
                <div className="space-y-3">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Items
                  </h4>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="pl-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Product
                          </TableHead>
                          <TableHead className="text-center text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Qty
                          </TableHead>
                          <TableHead className="pr-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Price
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedOrder.items.map((item, index) => (
                          <TableRow key={index} className="hover:bg-transparent">
                            <TableCell className="pl-4">
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">{item.name}</span>
                                <span className="font-mono text-xs text-muted-foreground">
                                  {item.sku}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <span className="text-sm">{item.quantity}</span>
                            </TableCell>
                            <TableCell className="pr-4 text-right">
                              <span className="font-mono text-sm font-medium">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <Separator />

                {/* Order Summary */}
                <div className="space-y-3">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-mono">
                        {formatCurrency(selectedOrder.subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-mono">
                        {formatCurrency(selectedOrder.shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-mono">
                        {formatCurrency(selectedOrder.tax)}
                      </span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-base font-semibold">
                      <span>Total</span>
                      <span className="font-mono">
                        {formatCurrency(selectedOrder.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 border-t px-6 py-4">
                <Button variant="outline" className="gap-2">
                  <Printer className="size-4" />
                  Print Invoice
                </Button>
                {selectedOrder.status !== "cancelled" &&
                  selectedOrder.status !== "completed" && (
                    <Button variant="destructive" className="gap-2">
                      <XCircle className="size-4" />
                      Cancel Order
                    </Button>
                  )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
