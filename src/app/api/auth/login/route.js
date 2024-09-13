import { NextResponse } from "next/server";
import { compare } from 'bcryptjs';
import { PrismaClient } from "@prisma/client";
import { signJWT } from "../../../../../utils/helpers/authHelpers";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET; // Din JWT-hemlighet

export async function POST(req) {
  let body;
  try {
    body = await req.json();
    if (!body.email || !body.password) {
      throw new Error("Missing required fields");
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await compare(body.password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Använd den deklarerade `secret` variabeln för att signera token
    const token = await signJWT({ userId: user.id })

    return NextResponse.json({ token });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
