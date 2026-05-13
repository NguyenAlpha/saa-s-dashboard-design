"use client"

import { useState, useMemo } from "react"
import {
  Search,
  MoreHorizontal,
  Eye,
  Trash2,
  ArrowUpDown,
  Plus,
  X,
  ArrowDownLeft,
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
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
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface Payment {
  id: string
  type: "income" | "expense"
  amount: number
  category: string
  description: string
  contactName: string
  contactType: "customer" | "supplier"
  date: string
  reference: string
  method: "cash" | "bank_transfer" | "credit_card" | "check"
}

const payments: Payment[] = [
  {
    id: "PAY-001",
    type: "income",
    amount: 2450.00,
    category: "Sales",
    description: "Payment for order ORD-7892",
    contactName: "Emily Chen",
    contactType: "customer",
    date: "Jan 15, 2024",
    reference: "ORD-7892",
    method: "credit_card",
  },
  {
    id: "PAY-002",
    type: "expense",
    amount: 1850.00,
    category: "Inventory",
    description: "Inventory restock - Electronics",
    contactName: "TechSupply Co.",
    contactType: "supplier",
    date: "Jan 15, 2024",
    reference: "INV-4521",
    method: "bank_transfer",
  },
  {
    id: "PAY-003",
    type: "income",
    amount: 567.00,
    category: "Sales",
    description: "Payment for order ORD-7890",
    contactName: "Sarah Wilson",
    contactType: "customer",
    date: "Jan 14, 2024",
    reference: "ORD-7890",
    method: "bank_transfer",
  },
  {
    id: "PAY-004",
    type: "expense",
    amount: 450.00,
    category: "Utilities",
    description: "Monthly electricity bill",
    contactName: "City Power Co.",
    contactType: "supplier",
    date: "Jan 14, 2024",
    reference: "BILL-2024-01",
    method: "bank_transfer",
  },
  {
    id: "PAY-005",
    type: "income",
    amount: 1234.00,
    category: "Sales",
    description: "Partial payment for order ORD-7891",
    contactName: "Michael Brown",
    contactType: "customer",
    date: "Jan 13, 2024",
    reference: "ORD-7891",
    method: "cash",
  },
  {
    id: "PAY-006",
    type: "expense",
    amount: 3200.00,
    category: "Inventory",
    description: "Bulk order - Apparel items",
    contactName: "Fashion Wholesale Inc.",
    contactType: "supplier",
    date: "Jan 13, 2024",
    reference: "PO-8834",
    method: "check",
  },
  {
    id: "PAY-007",
    type: "income",
    amount: 890.00,
    category: "Sales",
    description: "Payment for order ORD-7888",
    contactName: "Lisa Anderson",
    contactType: "customer",
    date: "Jan 12, 2024",
    reference: "ORD-7888",
    method: "credit_card",
  },
  {
    id: "PAY-008",
    type: "expense",
    amount: 125.00,
    category: "Office Supplies",
    description: "Printer paper and stationery",
    contactName: "Office Depot",
    contactType: "supplier",
    date: "Jan 12, 2024",
    reference: "REC-9912",
    method: "credit_card",
  },
  {
    id: "PAY-009",
    type: "income",
    amount: 3456.00,
    category: "Sales",
    description: "Bulk order payment",
    contactName: "Robert Taylor",
    contactType: "customer",
    date: "Jan 11, 2024",
    reference: "ORD-7885",
    method: "bank_transfer",
  },
  {
    id: "PAY-010",
    type: "expense",
    amount: 780.00,
    category: "Shipping",
    description: "Monthly shipping charges",
    contactName: "FastShip Logistics",
    contactType: "supplier",
    date: "Jan 11, 2024",
    reference: "SHP-2024-01",
    method: "bank_transfer",
  },
  {
    id: "PAY-011",
    type: "income",
    amount: 178.00,
    category: "Sales",
    description: "Payment for order ORD-7886",
    contactName: "Jennifer Lopez",
    contactType: "customer",
    date: "Jan 10, 2024",
    reference: "ORD-7886",
    method: "cash",
  },
  {
    id: "PAY-012",
    type: "expense",
    amount: 2100.00,
    category: "Rent",
    description: "Monthly warehouse rent",
    contactName: "Metro Properties LLC",
    contactType: "supplier",
    date: "Jan 10, 2024",
    reference: "RENT-2024-01",
    method: "bank_transfer",
  },
]

const typeStyles = {
  income: {
    label: "Income",
    className:
      "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400",
    icon: ArrowDownLeft,
    iconClass: "text-emerald-600 dark:text-emerald-400",
  },
  expense: {
    label: "Expense",
    className:
      "bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-950 dark:text-red-400",
    icon: ArrowUpRight,
    iconClass: "text-red-600 dark:text-red-400",
  },
}

const methodLabels: Record<string, string> = {
  cash: "Cash",
  bank_transfer: "Bank Transfer",
  credit_card: "Credit Card",
  check: "Check",
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newPayment, setNewPayment] = useState({
    type: "income" as "income" | "expense",
    amount: "",
    category: "",
    description: "",
    contactName: "",
    contactType: "customer" as "customer" | "supplier",
    method: "bank_transfer" as Payment["method"],
    reference: "",
  })

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesSearch =
        payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.reference.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesType =
        typeFilter === "all" || payment.type === typeFilter
      return matchesSearch && matchesType
    })
  }, [searchQuery, typeFilter])

  const totalIncome = useMemo(() => {
    return payments
      .filter((p) => p.type === "income")
      .reduce((sum, p) => sum + p.amount, 0)
  }, [])

  const totalExpenses = useMemo(() => {
    return payments
      .filter((p) => p.type === "expense")
      .reduce((sum, p) => sum + p.amount, 0)
  }, [])

  const netBalance = totalIncome - totalExpenses

  const handleAddPayment = () => {
    setIsAddModalOpen(false)
    setNewPayment({
      type: "income",
      amount: "",
      category: "",
      description: "",
      contactName: "",
      contactType: "customer",
      method: "bank_transfer",
      reference: "",
    })
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-8 lg:p-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Payments
          </h1>
          <p className="text-base text-muted-foreground">
            Track income, expenses, and financial transactions
          </p>
        </div>
        <Button className="gap-2 shadow-sm" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="size-4" />
          Add Payment
        </Button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950">
              <TrendingUp className="size-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-muted-foreground">
                Total Income
              </p>
              <p className="text-2xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400">
                {formatCurrency(totalIncome)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-950">
              <TrendingDown className="size-5 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-muted-foreground">
                Total Expenses
              </p>
              <p className="text-2xl font-semibold tracking-tight text-red-600 dark:text-red-400">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-5">
            <div className={`flex size-12 items-center justify-center rounded-full ${
              netBalance >= 0 
                ? "bg-blue-50 dark:bg-blue-950" 
                : "bg-amber-50 dark:bg-amber-950"
            }`}>
              <Wallet className={`size-5 ${
                netBalance >= 0 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-amber-600 dark:text-amber-400"
              }`} />
            </div>
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-muted-foreground">
                Net Balance
              </p>
              <p className={`text-2xl font-semibold tracking-tight ${
                netBalance >= 0 
                  ? "text-blue-600 dark:text-blue-400" 
                  : "text-amber-600 dark:text-amber-400"
              }`}>
                {formatCurrency(netBalance)}
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
            placeholder="Search payments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-9"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="h-10 w-full sm:w-[160px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[12%] pl-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    ID
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="w-[10%] text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Type
                </TableHead>
                <TableHead className="w-[20%] text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Contact
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Description
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Date
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Method
                </TableHead>
                <TableHead className="text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 justify-end hover:text-foreground">
                    Amount
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="w-[60px] pr-6 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Receipt className="size-8 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">
                        No payments found
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => {
                  const TypeIcon = typeStyles[payment.type].icon
                  return (
                    <TableRow
                      key={payment.id}
                      className="group cursor-pointer"
                      onClick={() => setSelectedPayment(payment)}
                    >
                      <TableCell className="pl-6">
                        <span className="font-mono text-sm font-medium">
                          {payment.id}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`gap-1.5 ${typeStyles[payment.type].className}`}
                        >
                          <TypeIcon className="size-3" />
                          {typeStyles[payment.type].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="size-9 border">
                            <AvatarFallback className="bg-muted text-xs font-medium">
                              {getInitials(payment.contactName)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {payment.contactName}
                            </span>
                            <span className="text-xs capitalize text-muted-foreground">
                              {payment.contactType}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm line-clamp-1">
                            {payment.description}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {payment.reference}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {payment.date}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {methodLabels[payment.method]}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <TypeIcon className={`size-4 ${typeStyles[payment.type].iconClass}`} />
                          <span className={`font-mono text-sm font-semibold ${
                            payment.type === "income"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-red-600 dark:text-red-400"
                          }`}>
                            {payment.type === "income" ? "+" : "-"}
                            {formatCurrency(payment.amount)}
                          </span>
                        </div>
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
                                setSelectedPayment(payment)
                              }}
                            >
                              <Eye className="size-4" />
                              View details
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
            {filteredPayments.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{payments.length}</span>{" "}
          payments
        </p>
      </div>

      {/* Payment Detail Modal */}
      <Dialog open={!!selectedPayment} onOpenChange={() => setSelectedPayment(null)}>
        <DialogContent className="max-w-md p-0">
          {selectedPayment && (
            <>
              <DialogHeader className="border-b px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`flex size-10 items-center justify-center rounded-full ${
                      selectedPayment.type === "income"
                        ? "bg-emerald-50 dark:bg-emerald-950"
                        : "bg-red-50 dark:bg-red-950"
                    }`}>
                      {selectedPayment.type === "income" ? (
                        <ArrowDownLeft className="size-5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <ArrowUpRight className="size-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div>
                      <DialogTitle className="font-mono text-base">
                        {selectedPayment.id}
                      </DialogTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedPayment.date}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => setSelectedPayment(null)}
                  >
                    <X className="size-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-6 p-6">
                {/* Amount */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Amount</p>
                  <p className={`text-3xl font-semibold tracking-tight ${
                    selectedPayment.type === "income"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {selectedPayment.type === "income" ? "+" : "-"}
                    {formatCurrency(selectedPayment.amount)}
                  </p>
                  <Badge
                    variant="secondary"
                    className={`mt-2 ${typeStyles[selectedPayment.type].className}`}
                  >
                    {typeStyles[selectedPayment.type].label}
                  </Badge>
                </div>

                <Separator />

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Contact</span>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6 border">
                        <AvatarFallback className="bg-muted text-[10px] font-medium">
                          {getInitials(selectedPayment.contactName)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{selectedPayment.contactName}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Type</span>
                    <span className="text-sm capitalize">{selectedPayment.contactType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <span className="text-sm">{selectedPayment.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Method</span>
                    <span className="text-sm">{methodLabels[selectedPayment.method]}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Reference</span>
                    <span className="font-mono text-sm">{selectedPayment.reference}</span>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-sm">{selectedPayment.description}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Payment Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Payment</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Payment Type */}
            <div className="space-y-2">
              <Label>Payment Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setNewPayment({ ...newPayment, type: "income", contactType: "customer" })}
                  className={`flex items-center justify-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-colors ${
                    newPayment.type === "income"
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <ArrowDownLeft className="size-4" />
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => setNewPayment({ ...newPayment, type: "expense", contactType: "supplier" })}
                  className={`flex items-center justify-center gap-2 rounded-lg border-2 p-3 text-sm font-medium transition-colors ${
                    newPayment.type === "expense"
                      ? "border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                      : "border-border hover:bg-muted"
                  }`}
                >
                  <ArrowUpRight className="size-4" />
                  Expense
                </button>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  className="pl-7"
                />
              </div>
            </div>

            {/* Contact Name */}
            <div className="space-y-2">
              <Label htmlFor="contactName">
                {newPayment.type === "income" ? "Customer" : "Supplier"} Name
              </Label>
              <Input
                id="contactName"
                placeholder={`Enter ${newPayment.type === "income" ? "customer" : "supplier"} name`}
                value={newPayment.contactName}
                onChange={(e) => setNewPayment({ ...newPayment, contactName: e.target.value })}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newPayment.category}
                onValueChange={(value) => setNewPayment({ ...newPayment, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {newPayment.type === "income" ? (
                    <>
                      <SelectItem value="Sales">Sales</SelectItem>
                      <SelectItem value="Services">Services</SelectItem>
                      <SelectItem value="Refund">Refund</SelectItem>
                      <SelectItem value="Other Income">Other Income</SelectItem>
                    </>
                  ) : (
                    <>
                      <SelectItem value="Inventory">Inventory</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Rent">Rent</SelectItem>
                      <SelectItem value="Shipping">Shipping</SelectItem>
                      <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                      <SelectItem value="Other Expense">Other Expense</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Payment Method */}
            <div className="space-y-2">
              <Label htmlFor="method">Payment Method</Label>
              <Select
                value={newPayment.method}
                onValueChange={(value: Payment["method"]) => setNewPayment({ ...newPayment, method: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reference */}
            <div className="space-y-2">
              <Label htmlFor="reference">Reference (Optional)</Label>
              <Input
                id="reference"
                placeholder="e.g., Invoice number, Order ID"
                value={newPayment.reference}
                onChange={(e) => setNewPayment({ ...newPayment, reference: e.target.value })}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add a description..."
                value={newPayment.description}
                onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddPayment}>
              Add Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
