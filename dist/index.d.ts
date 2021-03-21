export function sm3(str: string): string;

export type sm4 = {
  encrypt: (str: string, key: string) => string;
  decrypt: (str: string, key: string) => string;
};
