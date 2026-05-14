import { Category, Unit, Product, CreateProductInput, UpdateProductInput } from "./types"

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
