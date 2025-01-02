import { getIronSession, getServerActionIronSession } from 'iron-session'
import { cookies } from 'next/headers';

export const sessionOptions = {
  password: process.env.SESSION_SECRET,
  cookieName: "joblog_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

const getSession = async (req, res) => {
  const session = getIronSession(req, res, sessionOptions)
  return session
}

const getServerActionSession = async () => {
  const session = getServerActionIronSession(sessionOptions, cookies())
  return session
}

export {
  getSession,
  getServerActionSession
}