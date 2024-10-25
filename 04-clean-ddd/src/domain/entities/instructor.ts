import { randomUUID } from "node:crypto"

interface InstructorProps {
  name: string
}

export class Instructor {
  public id: string
  public name: string

  constructor(props: InstructorProps, id?: string) {
    this.id = id ??  randomUUID()
    this.name = props.name
  }
}