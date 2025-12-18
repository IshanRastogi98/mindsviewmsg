export const RATE_LIMITS = {
  SEND_MESSAGE: {
    windowMs: 60_000, // 1 minute
    max: 5,
  },

  AI_SUGGESTIONS: {
    windowMs: 60_000,
    max: 2,
  },

  USERNAME_CHECK: {
    windowMs: 60_000,
    max: 10,
  },
  // 🔐 AUTH-SENSITIVE ROUTES
  VERIFY_CODE: {
    windowMs: 10 * 60_000, // 10 minutes
    max: 5, // only 5 attempts
  },

  RESEND_CODE: {
    windowMs: 15 * 60_000, // 15 minutes
    max: 3, // max 3 resends
  },
} as const;
