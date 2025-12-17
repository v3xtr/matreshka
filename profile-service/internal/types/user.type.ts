import { User } from "src/prisma/index.js";

export type TypeUserWithoutPassword = Omit<User, 'password'>;
