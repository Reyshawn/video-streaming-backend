import * as crypto from 'crypto'

const salt = 'a123'

export function hash(data: string) {
  return crypto
    .createHash('sha256')
    .update(data + salt)
    .digest('hex')
}