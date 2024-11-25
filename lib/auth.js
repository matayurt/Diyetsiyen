// lib/auth.js
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { nanoid } from "nanoid";

// 32 karakterlik güvenli bir secret key oluşturun ve .env dosyasına ekleyin
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY environment variable is not set");
}

// Admin credentials'ları environment variable'dan alıyoruz
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
  throw new Error("Admin credentials are not properly configured");
}

export const createToken = async () => {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(new TextEncoder().encode(JWT_SECRET_KEY));

  return token;
};

export const verifyToken = async (token) => {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET_KEY)
    );
    return verified.payload;
  } catch (err) {
    return null;
  }
};

export const setAuthCookie = async () => {
  const token = await createToken();
  cookies().set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24, // 24 saat
  });
};

export const clearAuthCookie = () => {
  cookies().delete("admin_token");
};

export const verifyAuth = async () => {
  const token = cookies().get("admin_token")?.value;
  if (!token) return false;

  const payload = await verifyToken(token);
  return !!payload;
};

export const validateCredentials = (username, password) => {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
};
