// /graphql/resolvers.ts
export const resolvers = {
  Query: {
    tasks: (_parent, _args, ctx) => {
      return ctx.prisma.task.findMany()
    },
  },
}

// export const resolvers = {
//   Query: {
//     users: () => {
//       return [
//         {
//           id: '2a3121b2-363b-4a4f-ad26-d6c35b41bad',
//           username: 'Kate',
//           email: 'kate@hotones.com',
//           createdAt: new Date(Date.now()),
//           updatedAt: new Date(Date.now()),
//         },
//       ]
//     },
//     tasks: () => {
//       return [
//         {
//           id: '8a9020b2-363b-4a4f-ad26-d6d55b51bqes',
//           title: 'Note from resolver',
//           subtitle: 'Subtitle form resolver',
//           notes: 'Notes stuff',
//           completed: false,

//           createdAt: new Date(Date.now()),
//           updatedAt: new Date(Date.now()),

//           authorId: '2a3121b2-363b-4a4f-ad26-d6c35b41bad',
//         },
//         {
//           id: '2ea8cfb0-44a3-4c07-bdc2-31ffa135ea78',
//           title: 'Note 2 from resolver',
//           subtitle: 'Subtitle 2 form resolver',
//           notes: 'Notes stuff',
//           completed: true,

//           createdAt: new Date(Date.now()),
//           updatedAt: new Date(Date.now()),

//           authorId: '2a3121b2-363b-4a4f-ad26-d6c35b41bad',
//         },
//       ]
//     },
//   },
// }
