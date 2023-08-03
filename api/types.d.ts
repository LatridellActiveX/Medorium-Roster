export type User = {
  name: string;
  hash: string;
  timezone?: unknown;
  enlistedTimestamp?: number;
};

export type Character = {
  name: string;
  username: string;
  main: boolean;
  rank?: string;
  rankAcquisitionTimestamp?: number;
  division?: string;
  payGrade?: string;
};

export type ResponseErrorMessage = {
  error: string;
};

export type ResponseZodError = {
  code: string;
  minimum: number;
  type: string;
  inclusive: boolean;
  exact: boolean;
  message: string;
  path: string[];
}[];

export type ResponseFullRoster = Character[];
