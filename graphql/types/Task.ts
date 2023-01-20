import { prisma } from '@/prisma/index'

import { builder } from '../builder'

builder.prismaObject('Task', {
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    subtitle: t.exposeString('subtitle', { nullable: true }),
    notes: t.exposeString('notes', { nullable: true }),
    completed: t.exposeBoolean('completed'),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    authorId: t.exposeString('authorId'),
  }),
})

builder.queryField('tasks', (t) =>
  t.prismaField({
    type: ['Task'],
    resolve: (query, _parent, _args, _ctx, _info) =>
      prisma.task.findMany({ ...query }),
  }),
)
