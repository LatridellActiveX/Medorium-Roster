declare global {
  namespace Express {
    interface Locals {
      username: string;
      isAdmin: boolean;
    }
  }
}

export {};
