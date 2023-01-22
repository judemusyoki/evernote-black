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

// graphql/types/Link.ts
// ... code above remains unchanged

builder.mutationField('createTask', (t) =>
  t.prismaField({
    type: 'Task',
    args: {
      title: t.arg.string({ required: true }),
      subtitle: t.arg.string({ required: false }),
      notes: t.arg.string({ required: false }),
      completed: t.arg.boolean({ required: false }),
      createdAt: t.arg({ type: 'DateTime', required: false }),
      updatedAt: t.arg({ type: 'DateTime', required: false }),
      authorId: t.arg.string({ required: true }),
    },
    //@ts-ignore
    resolve: async (query, _parent, args, ctx) => {
      const { title, subtitle, notes, completed, authorId } = args

      if (!(await ctx).user) {
        throw new Error('You have to be logged in to perform this action')
      }

      return prisma.task.create({
        ...query,
        data: {
          title,
          subtitle,
          notes,
          completed,
          authorId,
        },
      })
    },
  }),
)
