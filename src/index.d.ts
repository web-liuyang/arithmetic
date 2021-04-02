export function sm3(str: string): string;

type sm4 = {
  encrypt: (str: string, key: string) => string;
  decrypt: (str: string, key: string) => string;
};

export const sm4: sm4;