import { RESPONSE } from "@constants/enums";

export interface ErrorObject {
  status?: string;
  title: string;
  detail: string;
  field?: string;
}

/**
 * Creates an error payload
 */
export default function createError(
  status: number | null,
  errors: ErrorObject[]
) {
  return {
    ...(status ? { status } : null),
    errors,
    // stack: new Error().stack
  };
}

createError.InternalServerError = (detail: string) =>
  createError(500, [
    {
      status: RESPONSE.ERROR,
      title: "Internal Server Error",
      detail,
    },
  ]);
