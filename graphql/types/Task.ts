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

builder.mutationField('createTask', (t) =>
  t.prismaField({
    type: 'Task',
    args: {
      title: t.arg.string({ required: true }),
      subtitle: t.arg.string({ required: false }),
      notes: t.arg.string({ required: false }),
      completed: t.arg.boolean({ required: true }),
      authorId: t.arg.string({ required: true }),
    },
    //@ts-ignore
    resolve: async (query, _parent, args, ctx) => {
      const { title, subtitle, notes, completed, authorId } = args

      if (!(await ctx).user) {
        throw new Error('You have to be logged in to perform this action')
      }

      //@ts-ignore
      if ((await ctx).user.id !== authorId) {
        throw new Error('You are not authorise to create this task')
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

builder.mutationField('updateTask', (t) =>
  t.prismaField({
    type: 'Task',
    args: {
      id: t.arg.string({ required: true }),
      title: t.arg.string({ required: true }),
      subtitle: t.arg.string({ required: false }),
      notes: t.arg.string({ required: false }),
      completed: t.arg.boolean({ required: true }),
      authorId: t.arg.string({ required: true }),
    },
    //@ts-ignore
    resolve: async (query, _parent, args, ctx) => {
      const { id, title, subtitle, notes, completed, authorId } = args

      if (!(await ctx).user) {
        throw new Error('You have to be logged in to perform this action')
      }

      //@ts-ignore
      if ((await ctx).user.id !== authorId) {
        throw new Error('You are not authorise to create this task')
      }

      return prisma.task.update({
        ...query,
        where: { id },
        data: {
          id,
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

builder.mutationField('deleteTask', (t) =>
  t.prismaField({
    type: 'Task',
    args: {
      id: t.arg.string({ required: true }),
    },
    //@ts-ignore
    resolve: async (query, _parent, args, ctx) => {
      const { id } = args

      if (!(await ctx).user) {
        throw new Error('You have to be logged in to perform this action')
      }

      return prisma.task.delete({
        ...query,
        where: { id },
      })
    },
  }),
)
