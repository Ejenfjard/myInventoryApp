import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
    const url = new URL(req.url);
    const nameSearch = url.searchParams.get("name");
    const categorySearch = url.searchParams.get("category");

    // Build filter conditions
    const filters = {};
    if (nameSearch) {
        filters.name = {
            contains: nameSearch,
            mode: "insensitive"
        };
    }
    if (categorySearch) {
        filters.category = {
            contains: categorySearch,
            mode: "insensitive"
        };
    }

    let items = [];
    if (Object.keys(filters).length > 0) {
        items = await prisma.item.findMany({
            where: filters
        });
    } else {
        items = await prisma.item.findMany();
    }
    return NextResponse.json(items);
}





export async function POST(req) {
    const body = await req.json();
    const { name, description, quantity, category } = body;

    // Ensure all fields are provided
    if (!name || !description || !quantity || !category) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const quantityInt = parseInt(quantity, 10);

    if (isNaN(quantityInt)) {
        return NextResponse.json({ message: "Invalid quantity value" }, { status: 400 });
    }

    try {
        const newItem = await prisma.item.create({
            data: {
                name,
                description,
                quantity: quantityInt,
                category,
            }
        });

        // Return the created item
        return NextResponse.json({ message: 'Item created', item: newItem }, { status: 201 });
    } catch (error) {
        console.error('Error creating item:', error);
        return NextResponse.json({ error: 'Failed to create item', details: error.message }, { status: 500 });
    }
}