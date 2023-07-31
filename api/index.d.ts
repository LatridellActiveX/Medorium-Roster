declare global {
  namespace Express {
    interface Locals {
      username: string;
    }
  }
}

export {};
