import type { Access } from "payload";

/** Authenticated editors see everything; anonymous requests only see published docs. */
export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) return true;
  return {
    _status: {
      equals: "published",
    },
  };
};

export const authenticated: Access = ({ req: { user } }) => Boolean(user);
