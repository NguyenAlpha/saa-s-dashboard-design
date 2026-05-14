import { Category, Unit, Product, CreateProductInput, UpdateProductInput, Supplier, CreateSupplierInput, UpdateSupplierInput, PurchaseOrder, CreatePurchaseOrderInput, UpdatePurchaseOrderInput } from "./types"

// Mock data
const categories: Category[] = [
  { id: "cat-1", name: "Electronics", description: "Electronic devices and accessories" },
  { id: "cat-2", name: "Office Supplies", description: "Office and stationery items" },
  { id: "cat-3", name: "Furniture", description: "Office furniture" },
  { id: "cat-4", name: "Consumables", description: "Consumable items" },
  { id: "cat-5", name: "Tools", description: "Tools and equipment" },
]

const units: Unit[] = [
  { id: "unit-1", name: "Piece", abbreviation: "pcs" },
  { id: "unit-2", name: "Box", abbreviation: "box" },
  { id: "unit-3", name: "Kilogram", abbreviation: "kg" },
  { id: "unit-4", name: "Meter", abbreviation: "m" },
  { id: "unit-5", name: "Liter", abbreviation: "L" },
]

let products: Product[] = [
  {
    id: "prod-1",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with 2.4GHz connection",
    costPrice: 8.5,
    sellingPrice: 15.99,
    minimumStock: 20,
    currentStock: 45,
    categoryId: "cat-1",
    unitId: "unit-1",
    isActive: true,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-10",
  },
  {
    id: "prod-2",
    name: "USB-C Hub",
    description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader",
    costPrice: 12.5,
    sellingPrice: 24.99,
    minimumStock: 15,
    currentStock: 8,
    categoryId: "cat-1",
    unitId: "unit-1",
    isActive: true,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-12",
  },
  {
    id: "prod-3",
    name: "A4 Paper Ream",
    description: "500 sheets of 80gsm white paper",
    costPrice: 3.0,
    sellingPrice: 5.49,
    minimumStock: 50,
    currentStock: 120,
    categoryId: "cat-2",
    unitId: "unit-2",
    isActive: true,
    createdAt: "2024-01-11",
    updatedAt: "2024-01-11",
  },
]

// API functions
export async function getCategories(): Promise<Category[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), 300)
  })
}

export async function getUnits(): Promise<Unit[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(units), 300)
  })
}

export async function getProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500)
  })
}

export async function getProductById(id: string): Promise<Product | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = products.find((p) => p.id === id)
      resolve(product || null)
    }, 300)
  })
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        ...input,
        currentStock: 0,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      }
      products.push(newProduct)
      resolve(newProduct)
    }, 500)
  })
}

export async function updateProduct(input: UpdateProductInput): Promise<Product> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = products.findIndex((p) => p.id === input.id)
      if (index === -1) {
        reject(new Error("Product not found"))
        return
      }
      const updatedProduct: Product = {
        ...products[index],
        ...input,
        updatedAt: new Date().toISOString().split("T")[0],
      }
      products[index] = updatedProduct
      resolve(updatedProduct)
    }, 500)
  })
}

export async function deleteProduct(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = products.findIndex((p) => p.id === id)
      if (index === -1) {
        reject(new Error("Product not found"))
        return
      }
      products.splice(index, 1)
      resolve()
    }, 300)
  })
}

// Suppliers mock data
let suppliers: Supplier[] = [
  {
    id: "supp-1",
    name: "Tech Distributors Inc.",
    address: "123 Tech Park Avenue",
    city: "Ho Chi Minh City",
    phone: "+84 28 1234 5678",
    email: "sales@techdistrib.vn",
    contactPerson: "Nguyen Van A",
    paymentTerms: "Net 30",
    totalInvoiceValue: 45000,
    isActive: true,
    createdAt: "2024-01-01",
    updatedAt: "2024-01-01",
  },
  {
    id: "supp-2",
    name: "Office Solutions Ltd.",
    address: "456 Business Street",
    city: "Hanoi",
    phone: "+84 24 5678 9012",
    email: "contact@officesol.vn",
    contactPerson: "Tran Thi B",
    paymentTerms: "Net 45",
    totalInvoiceValue: 32500,
    isActive: true,
    createdAt: "2024-01-02",
    updatedAt: "2024-01-02",
  },
  {
    id: "supp-3",
    name: "Global Imports Co.",
    address: "789 International Boulevard",
    city: "Da Nang",
    phone: "+84 236 123 4567",
    email: "orders@globalimports.com",
    contactPerson: "Le Van C",
    paymentTerms: "Net 60",
    totalInvoiceValue: 78900,
    isActive: true,
    createdAt: "2024-01-03",
    updatedAt: "2024-01-03",
  },
]

// Purchase Orders mock data
let purchaseOrders: PurchaseOrder[] = [
  {
    id: "po-1",
    poNumber: "PO-2024-001",
    supplierId: "supp-1",
    supplierName: "Tech Distributors Inc.",
    orderDate: "2024-01-15",
    expectedDeliveryDate: "2024-01-25",
    status: "pending",
    totalAmount: 5400,
    notes: "Standard order for Q1",
    items: [
      { id: "poi-1", productId: "prod-1", productName: "Wireless Mouse", quantity: 100, unitPrice: 8.5, totalPrice: 850 },
      { id: "poi-2", productId: "prod-2", productName: "USB-C Hub", quantity: 200, unitPrice: 12.5, totalPrice: 2500 },
      { id: "poi-3", productId: "prod-3", productName: "A4 Paper Ream", quantity: 40, unitPrice: 3.0, totalPrice: 120 },
    ],
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "po-2",
    poNumber: "PO-2024-002",
    supplierId: "supp-2",
    supplierName: "Office Solutions Ltd.",
    orderDate: "2024-01-10",
    expectedDeliveryDate: "2024-01-20",
    status: "received",
    totalAmount: 3250,
    notes: "Urgent office supplies",
    items: [
      { id: "poi-4", productId: "prod-3", productName: "A4 Paper Ream", quantity: 100, unitPrice: 3.0, totalPrice: 300 },
    ],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
  },
  {
    id: "po-3",
    poNumber: "PO-2024-003",
    supplierId: "supp-3",
    supplierName: "Global Imports Co.",
    orderDate: "2024-01-05",
    expectedDeliveryDate: "2024-01-15",
    status: "completed",
    totalAmount: 7890,
    notes: "International shipment completed",
    items: [
      { id: "poi-5", productId: "prod-1", productName: "Wireless Mouse", quantity: 500, unitPrice: 8.5, totalPrice: 4250 },
      { id: "poi-6", productId: "prod-2", productName: "USB-C Hub", quantity: 300, unitPrice: 12.5, totalPrice: 3750 },
    ],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-15",
  },
]

// Supplier API functions
export async function getSuppliers(): Promise<Supplier[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(suppliers), 500)
  })
}

export async function getSupplierById(id: string): Promise<Supplier | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const supplier = suppliers.find((s) => s.id === id)
      resolve(supplier || null)
    }, 300)
  })
}

export async function createSupplier(input: CreateSupplierInput): Promise<Supplier> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newSupplier: Supplier = {
        id: `supp-${Date.now()}`,
        ...input,
        totalInvoiceValue: 0,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      }
      suppliers.push(newSupplier)
      resolve(newSupplier)
    }, 500)
  })
}

export async function updateSupplier(input: UpdateSupplierInput): Promise<Supplier> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = suppliers.findIndex((s) => s.id === input.id)
      if (index === -1) {
        reject(new Error("Supplier not found"))
        return
      }
      const updatedSupplier: Supplier = {
        ...suppliers[index],
        ...input,
        updatedAt: new Date().toISOString().split("T")[0],
      }
      suppliers[index] = updatedSupplier
      resolve(updatedSupplier)
    }, 500)
  })
}

export async function deleteSupplier(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = suppliers.findIndex((s) => s.id === id)
      if (index === -1) {
        reject(new Error("Supplier not found"))
        return
      }
      suppliers.splice(index, 1)
      resolve()
    }, 300)
  })
}

// Purchase Order API functions
export async function getPurchaseOrders(): Promise<PurchaseOrder[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(purchaseOrders), 500)
  })
}

export async function getPurchaseOrderById(id: string): Promise<PurchaseOrder | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const po = purchaseOrders.find((p) => p.id === id)
      resolve(po || null)
    }, 300)
  })
}

export async function createPurchaseOrder(input: CreatePurchaseOrderInput): Promise<PurchaseOrder> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const supplier = suppliers.find((s) => s.id === input.supplierId)
      if (!supplier) throw new Error("Supplier not found")

      const totalAmount = input.items.reduce((sum, item) => sum + item.totalPrice, 0)
      const poNumber = `PO-${new Date().getFullYear()}-${String(purchaseOrders.length + 1).padStart(3, "0")}`

      const newPO: PurchaseOrder = {
        id: `po-${Date.now()}`,
        poNumber,
        supplierId: input.supplierId,
        supplierName: supplier.name,
        orderDate: input.orderDate,
        expectedDeliveryDate: input.expectedDeliveryDate,
        status: input.status,
        totalAmount,
        notes: input.notes,
        items: input.items.map((item, idx) => ({ ...item, id: `poi-${Date.now()}-${idx}` })),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      }
      purchaseOrders.push(newPO)
      resolve(newPO)
    }, 500)
  })
}

export async function updatePurchaseOrderStatus(id: string, status: "pending" | "received" | "completed"): Promise<PurchaseOrder> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = purchaseOrders.findIndex((p) => p.id === id)
      if (index === -1) {
        reject(new Error("Purchase order not found"))
        return
      }
      purchaseOrders[index].status = status
      purchaseOrders[index].updatedAt = new Date().toISOString().split("T")[0]
      resolve(purchaseOrders[index])
    }, 300)
  })
}

export async function deletePurchaseOrder(id: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = purchaseOrders.findIndex((p) => p.id === id)
      if (index === -1) {
        reject(new Error("Purchase order not found"))
        return
      }
      purchaseOrders.splice(index, 1)
      resolve()
    }, 300)
  })
}
