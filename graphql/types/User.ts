import { prisma } from '@/prisma/index'

import { builder } from '../builder'

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email', { nullable: true }),
    image: t.exposeString('image', { nullable: true }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
  }),
})

// builder.queryField('user', (t) =>
//   t.prismaField({
//     type: 'User',
//     resolve: async (query, _parent, _args, _ctx, _info) =>
//       prisma.user.findUniqueOrThrow({
//         ...query,
//         where: { id: ctx.user.id},
//       }),
//   }),
// )
