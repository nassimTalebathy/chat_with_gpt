export const assertTrue = (
  condition: boolean | undefined | null,
  errorMessage: string
) => {
  if (Boolean(condition)) {
    return;
  } else {
    throw new Error(errorMessage);
  }
};
