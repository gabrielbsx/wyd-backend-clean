export const isValidUsername = (username: string): boolean => {
  const regex = /^[a-zA-Z0-9]{4,12}$/;
  return regex.test(username);
}

