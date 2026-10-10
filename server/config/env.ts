export const PORT = process.env.PORT ?? 3001;

const jwtSecret = process.env.JWT_SECRET;
const hasNoSecret = !jwtSecret;
if (hasNoSecret) {
  throw new Error(
    "JWT_SECRET is missing. You can generate a secure secret using Node.js crypto with randomBytes(32), then convert it to hexadecimal (hex), and add it to your .env file.",
  );
}

export const JWT_SECRET = new TextEncoder().encode(jwtSecret);
