declare global {
  namespace Express {
    interface Locals {
      username: string;
      admin: boolean;
    }
  }
}

export {};
