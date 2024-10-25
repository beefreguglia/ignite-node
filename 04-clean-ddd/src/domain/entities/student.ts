import { randomUUID } from "node:crypto"

interface StudentProps {
  name: string
}

export class Student {
  public id: string
  public name: string

  constructor(props: StudentProps, id?: string) {
    this.id = id ?? randomUUID()
    this.name = props.name
  }
}