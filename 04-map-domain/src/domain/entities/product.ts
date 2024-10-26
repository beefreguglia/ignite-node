import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'

interface ProductProps {
  description: string
  size: string
  color: string
  quantity: number
  min_quantity: number
  cost_price: string
  sold_price: string
  createdAt: Date
  updatedAt?: Date
}

export class Product extends Entity<ProductProps> {
  static create(
    props: Optional<ProductProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const product = new Product({
      ...props,
      createdAt: new Date(),
    }, id)

    return product
  }
}