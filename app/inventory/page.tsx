"use client"

import { useState, useMemo } from "react"
import {
  Search,
  MoreHorizontal,
  ArrowUpDown,
  Boxes,
  Minus,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  History,
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface InventoryItem {
  id: string
  productName: string
  sku: string
  warehouse: string
  quantity: number
  unit: string
  minStock: number
  maxStock: number
  lastUpdated: string
}

const inventoryData: InventoryItem[] = [
  {
    id: "1",
    productName: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    warehouse: "Main Warehouse",
    quantity: 234,
    unit: "pcs",
    minStock: 50,
    maxStock: 500,
    lastUpdated: "Jan 15, 2024",
  },
  {
    id: "2",
    productName: "Organic Cotton T-Shirt",
    sku: "OCT-042",
    warehouse: "East Distribution",
    quantity: 567,
    unit: "pcs",
    minStock: 100,
    maxStock: 800,
    lastUpdated: "Jan 15, 2024",
  },
  {
    id: "3",
    productName: "Stainless Steel Water Bottle",
    sku: "SSW-103",
    warehouse: "Main Warehouse",
    quantity: 12,
    unit: "pcs",
    minStock: 50,
    maxStock: 300,
    lastUpdated: "Jan 14, 2024",
  },
  {
    id: "4",
    productName: "Premium Leather Wallet",
    sku: "PLW-089",
    warehouse: "West Hub",
    quantity: 89,
    unit: "pcs",
    minStock: 30,
    maxStock: 200,
    lastUpdated: "Jan 14, 2024",
  },
  {
    id: "5",
    productName: "Smart Watch Series X",
    sku: "SWX-201",
    warehouse: "Main Warehouse",
    quantity: 0,
    unit: "pcs",
    minStock: 25,
    maxStock: 150,
    lastUpdated: "Jan 13, 2024",
  },
  {
    id: "6",
    productName: "Yoga Mat Premium",
    sku: "YMP-055",
    warehouse: "East Distribution",
    quantity: 156,
    unit: "pcs",
    minStock: 40,
    maxStock: 250,
    lastUpdated: "Jan 13, 2024",
  },
  {
    id: "7",
    productName: "Ceramic Coffee Mug Set",
    sku: "CCM-022",
    warehouse: "West Hub",
    quantity: 8,
    unit: "sets",
    minStock: 20,
    maxStock: 100,
    lastUpdated: "Jan 12, 2024",
  },
  {
    id: "8",
    productName: "Wireless Charging Pad",
    sku: "WCP-078",
    warehouse: "Main Warehouse",
    quantity: 423,
    unit: "pcs",
    minStock: 80,
    maxStock: 600,
    lastUpdated: "Jan 12, 2024",
  },
  {
    id: "9",
    productName: "Running Shoes Pro",
    sku: "RSP-156",
    warehouse: "East Distribution",
    quantity: 67,
    unit: "pairs",
    minStock: 50,
    maxStock: 200,
    lastUpdated: "Jan 11, 2024",
  },
  {
    id: "10",
    productName: "Desk Organizer Set",
    sku: "DOS-033",
    warehouse: "West Hub",
    quantity: 245,
    unit: "sets",
    minStock: 30,
    maxStock: 300,
    lastUpdated: "Jan 11, 2024",
  },
]

const warehouses = ["Main Warehouse", "East Distribution", "West Hub"]

type StockStatus = "critical" | "low" | "normal" | "high"

function getStockStatus(item: InventoryItem): StockStatus {
  if (item.quantity === 0) return "critical"
  if (item.quantity < item.minStock) return "low"
  if (item.quantity > item.maxStock * 0.8) return "high"
  return "normal"
}

const stockStatusConfig: Record<
  StockStatus,
  { label: string; className: string; icon: typeof AlertTriangle }
> = {
  critical: {
    label: "Out of Stock",
    className:
      "bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-950 dark:text-red-400",
    icon: AlertTriangle,
  },
  low: {
    label: "Low Stock",
    className:
      "bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-950 dark:text-amber-400",
    icon: ArrowDownCircle,
  },
  normal: {
    label: "Normal",
    className:
      "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400",
    icon: CheckCircle2,
  },
  high: {
    label: "High Stock",
    className:
      "bg-blue-50 text-blue-700 hover:bg-blue-50 dark:bg-blue-950 dark:text-blue-400",
    icon: TrendingUp,
  },
}

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [warehouseFilter, setWarehouseFilter] = useState<string>("all")
  const [stockFilter, setStockFilter] = useState<string>("all")
  const [adjustmentModal, setAdjustmentModal] = useState<{
    open: boolean
    item: InventoryItem | null
    type: "add" | "remove"
  }>({ open: false, item: null, type: "add" })
  const [adjustmentQuantity, setAdjustmentQuantity] = useState("")
  const [adjustmentReason, setAdjustmentReason] = useState("")

  const filteredInventory = useMemo(() => {
    return inventoryData.filter((item) => {
      const matchesSearch =
        item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesWarehouse =
        warehouseFilter === "all" || item.warehouse === warehouseFilter
      const status = getStockStatus(item)
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" && (status === "low" || status === "critical")) ||
        (stockFilter === "normal" && status === "normal") ||
        (stockFilter === "high" && status === "high")
      return matchesSearch && matchesWarehouse && matchesStock
    })
  }, [searchQuery, warehouseFilter, stockFilter])

  const openAdjustmentModal = (item: InventoryItem, type: "add" | "remove") => {
    setAdjustmentModal({ open: true, item, type })
    setAdjustmentQuantity("")
    setAdjustmentReason("")
  }

  const closeAdjustmentModal = () => {
    setAdjustmentModal({ open: false, item: null, type: "add" })
    setAdjustmentQuantity("")
    setAdjustmentReason("")
  }

  const handleAdjustment = () => {
    // In a real app, this would make an API call
    closeAdjustmentModal()
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-8 lg:p-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Inventory
          </h1>
          <p className="text-base text-muted-foreground">
            Track stock levels across all warehouses
          </p>
        </div>
        <Button
          className="gap-2 shadow-sm"
          onClick={() => {
            if (filteredInventory.length > 0) {
              openAdjustmentModal(filteredInventory[0], "add")
            }
          }}
        >
          <ArrowUpCircle className="size-4" />
          Adjust Stock
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 pl-9"
          />
        </div>
        <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
          <SelectTrigger className="h-10 w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by warehouse" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Warehouses</SelectItem>
            {warehouses.map((warehouse) => (
              <SelectItem key={warehouse} value={warehouse}>
                {warehouse}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="h-10 w-full sm:w-[180px]">
            <SelectValue placeholder="Stock status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="low">Low / Critical</SelectItem>
            <SelectItem value="normal">Normal</SelectItem>
            <SelectItem value="high">High Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[30%] pl-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Product
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Warehouse
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Quantity
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Unit
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Last Updated
                </TableHead>
                <TableHead className="w-[60px] pr-6 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Boxes className="size-8 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">
                        No inventory items found
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredInventory.map((item) => {
                  const status = getStockStatus(item)
                  const StatusIcon = stockStatusConfig[status].icon
                  const isLowOrCritical = status === "low" || status === "critical"

                  return (
                    <TableRow
                      key={item.id}
                      className={`group ${
                        isLowOrCritical
                          ? "bg-red-50/30 hover:bg-red-50/50 dark:bg-red-950/10 dark:hover:bg-red-950/20"
                          : ""
                      }`}
                    >
                      <TableCell className="pl-6">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.productName}</span>
                            {isLowOrCritical && (
                              <AlertTriangle className="size-4 text-amber-500" />
                            )}
                          </div>
                          <span className="font-mono text-xs text-muted-foreground">
                            {item.sku}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{item.warehouse}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span
                            className={`font-mono text-sm font-semibold ${
                              status === "critical"
                                ? "text-red-600 dark:text-red-400"
                                : status === "low"
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-foreground"
                            }`}
                          >
                            {item.quantity.toLocaleString()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Min: {item.minStock} / Max: {item.maxStock}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {item.unit}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`gap-1.5 ${stockStatusConfig[status].className}`}
                        >
                          <StatusIcon className="size-3" />
                          {stockStatusConfig[status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {item.lastUpdated}
                        </span>
                      </TableCell>
                      <TableCell className="pr-6 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8 opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100"
                            >
                              <MoreHorizontal className="size-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem
                              className="gap-2"
                              onClick={() => openAdjustmentModal(item, "add")}
                            >
                              <Plus className="size-4" />
                              Add Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2"
                              onClick={() => openAdjustmentModal(item, "remove")}
                            >
                              <Minus className="size-4" />
                              Remove Stock
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2">
                              <History className="size-4" />
                              View History
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
            {filteredInventory.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">
            {inventoryData.length}
          </span>{" "}
          items
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-red-500" />
            <span className="text-xs">
              {
                inventoryData.filter(
                  (i) => getStockStatus(i) === "critical" || getStockStatus(i) === "low"
                ).length
              }{" "}
              low stock
            </span>
          </div>
        </div>
      </div>

      {/* Stock Adjustment Modal */}
      <Dialog open={adjustmentModal.open} onOpenChange={closeAdjustmentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {adjustmentModal.type === "add" ? (
                <ArrowUpCircle className="size-5 text-emerald-600" />
              ) : (
                <ArrowDownCircle className="size-5 text-red-600" />
              )}
              {adjustmentModal.type === "add" ? "Add Stock" : "Remove Stock"}
            </DialogTitle>
            <DialogDescription>
              {adjustmentModal.type === "add"
                ? "Increase stock quantity for this product"
                : "Decrease stock quantity for this product"}
            </DialogDescription>
          </DialogHeader>

          {adjustmentModal.item && (
            <div className="space-y-6 py-4">
              {/* Product Info */}
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">
                    {adjustmentModal.item.productName}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {adjustmentModal.item.sku}
                  </span>
                </div>
                <Separator className="my-3" />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Current Stock</span>
                  <span className="font-mono font-semibold">
                    {adjustmentModal.item.quantity.toLocaleString()}{" "}
                    {adjustmentModal.item.unit}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Warehouse</span>
                  <span>{adjustmentModal.item.warehouse}</span>
                </div>
              </div>

              {/* Adjustment Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity to {adjustmentModal.type}</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    placeholder="Enter quantity"
                    value={adjustmentQuantity}
                    onChange={(e) => setAdjustmentQuantity(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason (optional)</Label>
                  <Input
                    id="reason"
                    placeholder={
                      adjustmentModal.type === "add"
                        ? "e.g., New shipment received"
                        : "e.g., Damaged goods, Returns"
                    }
                    value={adjustmentReason}
                    onChange={(e) => setAdjustmentReason(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              {/* New Total Preview */}
              {adjustmentQuantity && parseInt(adjustmentQuantity) > 0 && (
                <div className="rounded-lg border border-dashed p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      New Total
                    </span>
                    <span
                      className={`font-mono text-lg font-semibold ${
                        adjustmentModal.type === "add"
                          ? "text-emerald-600 dark:text-emerald-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {adjustmentModal.type === "add"
                        ? (
                            adjustmentModal.item.quantity +
                            parseInt(adjustmentQuantity)
                          ).toLocaleString()
                        : Math.max(
                            0,
                            adjustmentModal.item.quantity -
                              parseInt(adjustmentQuantity)
                          ).toLocaleString()}{" "}
                      {adjustmentModal.item.unit}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={closeAdjustmentModal}>
              Cancel
            </Button>
            <Button
              onClick={handleAdjustment}
              disabled={!adjustmentQuantity || parseInt(adjustmentQuantity) <= 0}
              className={
                adjustmentModal.type === "add"
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-red-600 hover:bg-red-700"
              }
            >
              {adjustmentModal.type === "add" ? (
                <>
                  <Plus className="mr-2 size-4" />
                  Add Stock
                </>
              ) : (
                <>
                  <Minus className="mr-2 size-4" />
                  Remove Stock
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
