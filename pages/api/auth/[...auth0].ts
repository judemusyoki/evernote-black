import { AfterCallback, handleAuth, handleCallback } from '@auth0/nextjs-auth0'
import { User } from '@prisma/client'

import { createUserByEmailFromDb } from '@/lib/createUserByEmailFromDb'

const afterCallback: AfterCallback = async (_req, res, session, _state) => {
  let user: User
  try {
    // TODO: check for email_verified
    // TODO: don't implicitly link accounts
    const { email, sub: auth0ProviderId } = session.user
    const currentUser = await createUserByEmailFromDb({
      email,
      auth0ProviderId,
    })
    user = {
      ...currentUser,
    }
  } catch (error) {
    throw error
  }

  return {
    ...session,
    user,
  }
}

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback })
    } catch (error) {
      //@ts-ignore
      res.status(error.status || 500).send(error.message)
    }
  },
})
