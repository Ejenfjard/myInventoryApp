export function object404Response(response, model = "") {
    return response.json({
        message: `${model} not found`
    }, {
        status: 404
    })
}


export async function validateJSONData(req) {
    let body;
    try {
        body = await req.json(); // Parse incoming data to JSON
        return { hasError: false, data: body }; // Return an object instead of an array
    } catch (error) {
        return { hasError: true, data: null }; // Use an object to clearly indicate the error
    }
}

export function validateItemData(data) {
    let errors = {};

    // Validate name (required and must be a string)
    if (!data.name || typeof data.name !== "string") {
        errors.name = "Name is required and must be a string";
    }

    // Validate description (optional but must be a string if provided)
    if (data.description && typeof data.description !== "string") {
        errors.description = "Description must be a string";
    }

    // Validate quantity (required and must be a number)
    if (data.quantity === undefined || typeof data.quantity !== "number") {
        errors.quantity = "Quantity is required and must be a number";
    }

    // Validate category (required and must be a string)
    if (!data.category || typeof data.category !== "string") {
        errors.category = "Category is required and must be a string";
    }

    // Determine if there are any errors
    const hasErrors = Object.keys(errors).length > 0;
    return [hasErrors, errors];
}