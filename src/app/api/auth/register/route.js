import { NextResponse } from "next/server";
import { hash } from 'bcryptjs';
import { signJWT } from "/utils/helpers/authHelpers.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    let body;
    try {
        body = await req.json();
        if (!body.email || !body.password || !body.name) {
            throw new Error("Missing required fields");
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: body.email },
        });
        if (existingUser) {
            return NextResponse.json({
                message: "Email already in use",
            }, {
                status: 400,
            });
        }

        const hashedPassword = await hash(body.password, 12);

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body.name,
            }
        });

        const token = await signJWT({ userId: user.id });

        return NextResponse.json({
            user,
            token,
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: error.message,
        }, {
            status: 400,
        });
    }
}

