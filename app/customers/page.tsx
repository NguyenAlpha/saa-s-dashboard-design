"use client"

import { useState, useMemo } from "react"
import {
  Search,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  ArrowUpDown,
  Users,
  Plus,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ShoppingBag,
  AlertCircle,
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

interface Order {
  id: string
  date: string
  total: number
  status: "completed" | "pending" | "cancelled"
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  debtBalance: number
  totalSpent: number
  orderCount: number
  status: "active" | "inactive"
  joinedDate: string
  lastOrderDate: string
  recentOrders: Order[]
}

const customers: Customer[] = [
  {
    id: "CUS-001",
    name: "Emily Chen",
    email: "emily.chen@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94102",
    debtBalance: 0,
    totalSpent: 2847.50,
    orderCount: 12,
    status: "active",
    joinedDate: "Mar 15, 2023",
    lastOrderDate: "Jan 15, 2024",
    recentOrders: [
      { id: "ORD-7892", date: "Jan 15, 2024", total: 342.00, status: "completed" },
      { id: "ORD-7756", date: "Dec 28, 2023", total: 189.00, status: "completed" },
      { id: "ORD-7623", date: "Dec 10, 2023", total: 567.00, status: "completed" },
    ],
  },
  {
    id: "CUS-002",
    name: "Michael Brown",
    email: "m.brown@email.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    debtBalance: 450.00,
    totalSpent: 1234.00,
    orderCount: 8,
    status: "active",
    joinedDate: "Jun 22, 2023",
    lastOrderDate: "Jan 15, 2024",
    recentOrders: [
      { id: "ORD-7891", date: "Jan 15, 2024", total: 125.00, status: "pending" },
      { id: "ORD-7702", date: "Dec 20, 2023", total: 325.00, status: "completed" },
    ],
  },
  {
    id: "CUS-003",
    name: "Sarah Wilson",
    email: "s.wilson@email.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine Rd, Seattle, WA 98101",
    debtBalance: 1250.00,
    totalSpent: 4567.00,
    orderCount: 23,
    status: "active",
    joinedDate: "Jan 10, 2023",
    lastOrderDate: "Jan 14, 2024",
    recentOrders: [
      { id: "ORD-7890", date: "Jan 14, 2024", total: 567.00, status: "completed" },
      { id: "ORD-7845", date: "Jan 05, 2024", total: 234.00, status: "completed" },
      { id: "ORD-7789", date: "Dec 18, 2023", total: 449.00, status: "completed" },
    ],
  },
  {
    id: "CUS-004",
    name: "James Miller",
    email: "j.miller@email.com",
    phone: "+1 (555) 456-7890",
    address: "321 Elm St, Chicago, IL 60601",
    debtBalance: 0,
    totalSpent: 567.00,
    orderCount: 3,
    status: "active",
    joinedDate: "Nov 05, 2023",
    lastOrderDate: "Jan 14, 2024",
    recentOrders: [
      { id: "ORD-7889", date: "Jan 14, 2024", total: 89.00, status: "pending" },
      { id: "ORD-7734", date: "Dec 22, 2023", total: 245.00, status: "completed" },
    ],
  },
  {
    id: "CUS-005",
    name: "Lisa Anderson",
    email: "l.anderson@email.com",
    phone: "+1 (555) 567-8901",
    address: "654 Maple Dr, Austin, TX 78701",
    debtBalance: 89.50,
    totalSpent: 1890.00,
    orderCount: 15,
    status: "active",
    joinedDate: "Apr 18, 2023",
    lastOrderDate: "Jan 13, 2024",
    recentOrders: [
      { id: "ORD-7888", date: "Jan 13, 2024", total: 234.00, status: "completed" },
      { id: "ORD-7812", date: "Jan 02, 2024", total: 178.00, status: "completed" },
    ],
  },
  {
    id: "CUS-006",
    name: "David Kim",
    email: "d.kim@email.com",
    phone: "+1 (555) 678-9012",
    address: "987 Cedar Ln, Denver, CO 80201",
    debtBalance: 0,
    totalSpent: 890.00,
    orderCount: 5,
    status: "inactive",
    joinedDate: "Aug 30, 2023",
    lastOrderDate: "Jan 12, 2024",
    recentOrders: [
      { id: "ORD-7887", date: "Jan 12, 2024", total: 459.00, status: "cancelled" },
    ],
  },
  {
    id: "CUS-007",
    name: "Jennifer Lopez",
    email: "j.lopez@email.com",
    phone: "+1 (555) 789-0123",
    address: "147 Birch Way, Miami, FL 33101",
    debtBalance: 2340.00,
    totalSpent: 5670.00,
    orderCount: 28,
    status: "active",
    joinedDate: "Feb 14, 2023",
    lastOrderDate: "Jan 12, 2024",
    recentOrders: [
      { id: "ORD-7886", date: "Jan 12, 2024", total: 178.00, status: "completed" },
      { id: "ORD-7834", date: "Jan 03, 2024", total: 567.00, status: "completed" },
      { id: "ORD-7798", date: "Dec 25, 2023", total: 345.00, status: "completed" },
    ],
  },
  {
    id: "CUS-008",
    name: "Robert Taylor",
    email: "r.taylor@email.com",
    phone: "+1 (555) 890-1234",
    address: "258 Spruce Ct, Boston, MA 02101",
    debtBalance: 0,
    totalSpent: 3456.00,
    orderCount: 18,
    status: "active",
    joinedDate: "May 20, 2023",
    lastOrderDate: "Jan 11, 2024",
    recentOrders: [
      { id: "ORD-7885", date: "Jan 11, 2024", total: 312.00, status: "pending" },
      { id: "ORD-7821", date: "Jan 01, 2024", total: 445.00, status: "completed" },
    ],
  },
  {
    id: "CUS-009",
    name: "Amanda White",
    email: "a.white@email.com",
    phone: "+1 (555) 901-2345",
    address: "369 Willow Rd, Portland, OR 97201",
    debtBalance: 567.00,
    totalSpent: 2345.00,
    orderCount: 11,
    status: "inactive",
    joinedDate: "Jul 08, 2023",
    lastOrderDate: "Dec 15, 2023",
    recentOrders: [
      { id: "ORD-7745", date: "Dec 15, 2023", total: 289.00, status: "completed" },
    ],
  },
  {
    id: "CUS-010",
    name: "Christopher Lee",
    email: "c.lee@email.com",
    phone: "+1 (555) 012-3456",
    address: "741 Aspen Blvd, Phoenix, AZ 85001",
    debtBalance: 0,
    totalSpent: 789.00,
    orderCount: 4,
    status: "active",
    joinedDate: "Oct 12, 2023",
    lastOrderDate: "Jan 10, 2024",
    recentOrders: [
      { id: "ORD-7878", date: "Jan 10, 2024", total: 234.00, status: "completed" },
      { id: "ORD-7756", date: "Dec 28, 2023", total: 156.00, status: "completed" },
    ],
  },
]

const statusStyles: Record<string, { label: string; className: string }> = {
  active: {
    label: "Active",
    className:
      "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400",
  },
  inactive: {
    label: "Inactive",
    className:
      "bg-gray-100 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400",
  },
}

const orderStatusStyles: Record<string, string> = {
  completed:
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  pending:
    "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  cancelled:
    "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
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

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [debtFilter, setDebtFilter] = useState<string>("all")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.phone.includes(searchQuery)
      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter
      const matchesDebt =
        debtFilter === "all" ||
        (debtFilter === "with_debt" && customer.debtBalance > 0) ||
        (debtFilter === "no_debt" && customer.debtBalance === 0)
      return matchesSearch && matchesStatus && matchesDebt
    })
  }, [searchQuery, statusFilter, debtFilter])

  const totalDebt = useMemo(() => {
    return customers.reduce((sum, c) => sum + c.debtBalance, 0)
  }, [])

  const customersWithDebt = useMemo(() => {
    return customers.filter((c) => c.debtBalance > 0).length
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-8 p-8 lg:p-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Customers
          </h1>
          <p className="text-base text-muted-foreground">
            Manage your customer relationships and track balances
          </p>
        </div>
        <Button className="gap-2 shadow-sm">
          <Plus className="size-4" />
          Add Customer
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
              <Users className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-muted-foreground">
                Total Customers
              </p>
              <p className="text-2xl font-semibold tracking-tight">
                {customers.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950">
              <AlertCircle className="size-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-muted-foreground">
                Customers with Debt
              </p>
              <p className="text-2xl font-semibold tracking-tight">
                {customersWithDebt}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-950">
              <span className="text-lg font-semibold text-red-600 dark:text-red-400">$</span>
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-muted-foreground">
                Total Outstanding
              </p>
              <p className="text-2xl font-semibold tracking-tight text-red-600 dark:text-red-400">
                {formatCurrency(totalDebt)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-10 w-full sm:w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={debtFilter} onValueChange={setDebtFilter}>
          <SelectTrigger className="h-10 w-full sm:w-[160px]">
            <SelectValue placeholder="Debt" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Balances</SelectItem>
            <SelectItem value="with_debt">With Debt</SelectItem>
            <SelectItem value="no_debt">No Debt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[30%] pl-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Customer
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Phone
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Orders
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Total Spent
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Debt Balance
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="w-[60px] pr-6 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="size-8 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">
                        No customers found
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className={`group cursor-pointer ${
                      customer.debtBalance > 1000
                        ? "bg-red-50/50 hover:bg-red-50 dark:bg-red-950/20 dark:hover:bg-red-950/30"
                        : customer.debtBalance > 0
                        ? "bg-amber-50/30 hover:bg-amber-50/50 dark:bg-amber-950/10 dark:hover:bg-amber-950/20"
                        : ""
                    }`}
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10 border">
                          <AvatarFallback className="bg-muted text-sm font-medium">
                            {getInitials(customer.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {customer.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {customer.email}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {customer.phone}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm">
                        {customer.orderCount}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm font-medium">
                        {formatCurrency(customer.totalSpent)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {customer.debtBalance > 0 && (
                          <AlertCircle className="size-4 text-red-500" />
                        )}
                        <span
                          className={`font-mono text-sm font-semibold ${
                            customer.debtBalance > 1000
                              ? "text-red-600 dark:text-red-400"
                              : customer.debtBalance > 0
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {formatCurrency(customer.debtBalance)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusStyles[customer.status].className}
                      >
                        {statusStyles[customer.status].label}
                      </Badge>
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
                        <DropdownMenuContent align="end" className="w-44">
                          <DropdownMenuItem
                            className="gap-2"
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedCustomer(customer)
                            }}
                          >
                            <Eye className="size-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Pencil className="size-4" />
                            Edit customer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600">
                            <Trash2 className="size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
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
            {filteredCustomers.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{customers.length}</span>{" "}
          customers
        </p>
      </div>

      {/* Customer Detail Modal */}
      <Dialog
        open={!!selectedCustomer}
        onOpenChange={() => setSelectedCustomer(null)}
      >
        <DialogContent className="max-w-2xl p-0">
          {selectedCustomer && (
            <>
              <DialogHeader className="border-b px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="size-12 border-2">
                      <AvatarFallback className="bg-muted text-base font-medium">
                        {getInitials(selectedCustomer.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <DialogTitle className="text-lg">
                        {selectedCustomer.name}
                      </DialogTitle>
                      <p className="text-sm text-muted-foreground">
                        Customer since {selectedCustomer.joinedDate}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => setSelectedCustomer(null)}
                  >
                    <X className="size-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-6 p-6">
                {/* Debt Alert */}
                {selectedCustomer.debtBalance > 0 && (
                  <div
                    className={`flex items-center gap-3 rounded-lg border p-4 ${
                      selectedCustomer.debtBalance > 1000
                        ? "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/50"
                        : "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/50"
                    }`}
                  >
                    <AlertCircle
                      className={`size-5 ${
                        selectedCustomer.debtBalance > 1000
                          ? "text-red-600 dark:text-red-400"
                          : "text-amber-600 dark:text-amber-400"
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          selectedCustomer.debtBalance > 1000
                            ? "text-red-800 dark:text-red-300"
                            : "text-amber-800 dark:text-amber-300"
                        }`}
                      >
                        Outstanding Balance
                      </p>
                      <p
                        className={`text-2xl font-bold ${
                          selectedCustomer.debtBalance > 1000
                            ? "text-red-600 dark:text-red-400"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      >
                        {formatCurrency(selectedCustomer.debtBalance)}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant={
                        selectedCustomer.debtBalance > 1000
                          ? "destructive"
                          : "outline"
                      }
                    >
                      Record Payment
                    </Button>
                  </div>
                )}

                {/* Contact & Stats */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Contact Information
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Mail className="size-4 text-muted-foreground" />
                        <span>{selectedCustomer.email}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Phone className="size-4 text-muted-foreground" />
                        <span>{selectedCustomer.phone}</span>
                      </div>
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="size-4 mt-0.5 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {selectedCustomer.address}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Customer Stats
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <ShoppingBag className="size-4" />
                          Total Orders
                        </div>
                        <p className="text-xl font-semibold">
                          {selectedCustomer.orderCount}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="text-sm">$</span>
                          Total Spent
                        </div>
                        <p className="text-xl font-semibold">
                          {formatCurrency(selectedCustomer.totalSpent)}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="size-4" />
                          Last Order
                        </div>
                        <p className="text-sm font-medium">
                          {selectedCustomer.lastOrderDate}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          Status
                        </div>
                        <Badge
                          variant="secondary"
                          className={statusStyles[selectedCustomer.status].className}
                        >
                          {statusStyles[selectedCustomer.status].label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Recent Orders */}
                <div className="space-y-4">
                  <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Recent Orders
                  </h4>
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="pl-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Order
                          </TableHead>
                          <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Date
                          </TableHead>
                          <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Status
                          </TableHead>
                          <TableHead className="pr-4 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Total
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedCustomer.recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="pl-4">
                              <span className="font-mono text-sm font-medium">
                                {order.id}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">
                                {order.date}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="secondary"
                                className={orderStatusStyles[order.status]}
                              >
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </Badge>
                            </TableCell>
                            <TableCell className="pr-4 text-right">
                              <span className="font-mono text-sm font-medium">
                                {formatCurrency(order.total)}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
                <Button variant="outline" onClick={() => setSelectedCustomer(null)}>
                  Close
                </Button>
                <Button>Edit Customer</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
