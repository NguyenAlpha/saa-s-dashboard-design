export interface Category {
  id: string
  name: string
  description: string
}

export interface Unit {
  id: string
  name: string
  abbreviation: string
}

export interface Product {
  id: string
  name: string
  description: string
  costPrice: number
  sellingPrice: number
  minimumStock: number
  currentStock: number
  categoryId: string
  unitId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateProductInput {
  name: string
  description: string
  costPrice: number
  sellingPrice: number
  minimumStock: number
  categoryId: string
  unitId: string
  isActive: boolean
}

export interface UpdateProductInput extends CreateProductInput {
  id: string
}
