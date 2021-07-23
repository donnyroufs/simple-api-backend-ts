import { Post } from '@prisma/client'

export class PostEntity implements Post {
  id: string
  title: string
  createdAt: Date
}
