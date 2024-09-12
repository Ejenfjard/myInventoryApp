import { NextResponse } from "next/server";
import { verifyJWT } from "/utils/helpers/authHelpers.js";



import {
    object404Response,
    validateJSONData,
    validateItemData
} from "/utils/helpers/apiHelpers.js";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();




export async function GET(req, options) {
    const id = options.params.id;

    try {
        const item = await prisma.item.findUniqueOrThrow({
            where: { id: Number(id) },
        });
        return NextResponse.json(item);
    } catch (error) {
        return object404Response(NextResponse, "item");
    }
}



export async function PUT(req, options) {
    const id = options.params.id;

    // Validate incoming JSON data
    const { hasError, data: body } = await validateJSONData(req);
    if (hasError) {
        return NextResponse.json(
            { message: "A valid JSON object has to be sent" },
            { status: 400 }
        );
    }

    // Validate item data
    const [hasErrors, errors] = validateItemData(body);
    if (hasErrors) {
        return NextResponse.json(
            { message: errors },
            { status: 400 }
        );
    }

    try {
        // Update item in the database
        const updatedItem = await prisma.item.update({
            where: { id: Number(id) },
            data: {
                name: body.name,
                description: body.description,
                quantity: body.quantity,
                category: body.category,
            },
        });

        // Return updated item
        return NextResponse.json(updatedItem, { status: 200 });
    } catch (error) {
        // Handle case where the item is not found
        return object404Response(NextResponse, "Item");
    }
}

export async function DELETE(req, options) {
    const id = options.params.id;

    // Verifiera JWT-token
    try {
        const bearer = req.headers.get("Authorization") || "";
        const token = bearer.split(" ")?.[1];

        if (!token) {
            throw new Error("No token submitted");
        }

        // Verifiera token
        const jwtPayload = await verifyJWT(token);
        console.log("JWT Payload:", jwtPayload);

        // Hantera DELETE-operationen
        await prisma.item.delete({ where: { id: Number(id) } });

        return new Response(null, { status: 204 });
    } catch (error) {
        console.error("Error in DELETE handler:", error.message);
        return object404Response(NextResponse, "Item");
    }
}
