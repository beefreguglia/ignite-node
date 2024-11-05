import { Module } from '@nestjs/common'
import { compare, hash } from 'bcrypt'

import { HashGenerator } from '@/domain/forum/application/cryptography/hash-generator'
import { HashComparer } from '@/domain/forum/application/cryptography/hash-comparer'

@Module({})
export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGTH = 8

  hash(plainText: string): Promise<string> {
    return hash(plainText, this.HASH_SALT_LENGTH)
  }

  compare(plainText: string, hash: string): Promise<boolean> {
    return compare(plainText, hash)
  }
}
