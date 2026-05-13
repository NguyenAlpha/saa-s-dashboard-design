"use client"

import { useState, useMemo } from "react"
import {
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  ArrowUpDown,
  Package,
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

const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    price: 149.99,
    stock: 234,
    status: "active",
    category: "Electronics",
  },
  {
    id: "2",
    name: "Organic Cotton T-Shirt",
    sku: "OCT-042",
    price: 29.99,
    stock: 567,
    status: "active",
    category: "Apparel",
  },
  {
    id: "3",
    name: "Stainless Steel Water Bottle",
    sku: "SSW-103",
    price: 24.99,
    stock: 12,
    status: "low_stock",
    category: "Accessories",
  },
  {
    id: "4",
    name: "Premium Leather Wallet",
    sku: "PLW-089",
    price: 79.99,
    stock: 89,
    status: "active",
    category: "Accessories",
  },
  {
    id: "5",
    name: "Smart Watch Series X",
    sku: "SWX-201",
    price: 299.99,
    stock: 0,
    status: "out_of_stock",
    category: "Electronics",
  },
  {
    id: "6",
    name: "Yoga Mat Premium",
    sku: "YMP-055",
    price: 45.99,
    stock: 156,
    status: "active",
    category: "Fitness",
  },
  {
    id: "7",
    name: "Ceramic Coffee Mug Set",
    sku: "CCM-022",
    price: 34.99,
    stock: 8,
    status: "low_stock",
    category: "Home",
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    sku: "WCP-078",
    price: 39.99,
    stock: 423,
    status: "active",
    category: "Electronics",
  },
  {
    id: "9",
    name: "Running Shoes Pro",
    sku: "RSP-156",
    price: 129.99,
    stock: 67,
    status: "active",
    category: "Footwear",
  },
  {
    id: "10",
    name: "Desk Organizer Set",
    sku: "DOS-033",
    price: 49.99,
    stock: 0,
    status: "discontinued",
    category: "Office",
  },
]

const statusStyles: Record<
  string,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className:
      "bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:bg-emerald-950 dark:text-emerald-400",
  },
  low_stock: {
    label: "Low Stock",
    className:
      "bg-amber-50 text-amber-700 hover:bg-amber-50 dark:bg-amber-950 dark:text-amber-400",
  },
  out_of_stock: {
    label: "Out of Stock",
    className:
      "bg-red-50 text-red-700 hover:bg-red-50 dark:bg-red-950 dark:text-red-400",
  },
  discontinued: {
    label: "Discontinued",
    className:
      "bg-gray-100 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400",
  },
}

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesStatus =
        statusFilter === "all" || product.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchQuery, statusFilter])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-8 lg:p-10">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            Products
          </h1>
          <p className="text-base text-muted-foreground">
            Manage your product catalog and inventory levels
          </p>
        </div>
        <Button className="gap-2 shadow-sm">
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="low_stock">Low Stock</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
            <SelectItem value="discontinued">Discontinued</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-[40%] pl-6 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Product
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  SKU
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Price
                    <ArrowUpDown className="size-3.5" />
                  </button>
                </TableHead>
                <TableHead className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <button className="flex items-center gap-1.5 hover:text-foreground">
                    Stock
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
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Package className="size-8 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">
                        No products found
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id} className="group">
                    <TableCell className="pl-6">
                      <div className="flex flex-col">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {product.category}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm text-muted-foreground">
                        {product.sku}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-sm font-medium">
                        {formatPrice(product.price)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-mono text-sm ${
                          product.stock === 0
                            ? "text-red-600 dark:text-red-400"
                            : product.stock < 20
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-foreground"
                        }`}
                      >
                        {product.stock.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={statusStyles[product.status].className}
                      >
                        {statusStyles[product.status].label}
                      </Badge>
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
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem className="gap-2">
                            <Pencil className="size-4" />
                            Edit
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
            {filteredProducts.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-foreground">{products.length}</span>{" "}
          products
        </p>
      </div>
    </div>
  )
}
