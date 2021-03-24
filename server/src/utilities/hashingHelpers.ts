import * as bcrypt from "bcrypt";

export async function saltAndHash(
  password: string,
  rounds = 10,
): Promise<string> {
  const salt = await bcrypt.genSalt(rounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

export async function isMatch(
  inputPass: string,
  compareWith: string,
): Promise<boolean> {
  return await bcrypt.compare(inputPass, compareWith);
}
