import { ERROR_API_CALL } from '../utils/error.ts';

const API_END_POINT = 'https://kdt-frontend.programmers.co.kr';
const USERNAME = 'kal';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    throw new Error(e);
  }
};
