import { ERROR_API_CALL } from '../utils/error.ts';

const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';
const USERNAME = 'shin';

export const request = async (url: string, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': `${USERNAME}`,
      },
    });

    if (res.ok) {
      return await res.json();
    }

    throw new Error(ERROR_API_CALL);
  } catch (e: unknown) {
    throw new Error(e as string | undefined);
  }
};
