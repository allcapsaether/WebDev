import { sql } from "../config/db.js";

export const getProducts = async (req, res) => {
    try {
        const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;

        console.log("Products fetched", products)
        res.status(200).json({success: true, data: products });
    } catch (error) {  
        console.log("Error fetching products:", error);
        res.status(500).json({success:false, message: "Internal Server Error" })
    }

};

export const getProduct = async (req, res) => {
    try {
        await sql`
            SELECT * FROM products WHERE id = ${req.params.id}
        `;

        res.status(200).json({success: true, message: "Product fetched successfully"});
    } catch (error) {  
        console.log("Error fetching product:", error);
    }
};

export const createProduct = async (req, res) => {
    const {name, image, price} = req.body;

    if(!name || !image || !price) { 
        return res.status(400).json({success: false, message: "Please provide all required fields"});
    }

    try{
        const createProduct = await sql`
            INSERT INTO products (name, image, price)
            VALUES (${name}, ${image}, ${price})
            RETURNING *
        `;

        console.log("Product created", createProduct)

        res.status(201).json({success: true, message: "Product created successfully"});

    } catch (error) {
        console.log("Error creating product:", error);
        res.status(500).json({success: false, message: "Error creating product"});
    }

};

export const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await sql`
            DELETE FROM products WHERE id = ${req.params.id}
            RETURNING *
        `;

        if (deleteProduct.length === 0) {
            return res.status(404).json({success: false, message: "Product not found"});
        }

        res.status(200).json({success: true, message: "Product deleted successfully"});
    } catch (error) {
        console.log("Error deleting product:", error);
        res.status(500).json({success: false, message: "Error deleting product"});
    }


};

export const updateProduct = async (req, res) => {
    const {name, image, price} = req.body;

    try {
        const updateProduct = await sql`
            UPDATE products
            SET name = ${name}, image = ${image}, price = ${price}
            WHERE id = ${req.params.id}
            RETURNING *
        `;

        if (updateProduct.length === 0) {
            return res.status(404).json({success: false, message: "Product not found"});
        }

        res.status(200).json({success: true, message: "Product updated successfully", data: updateProduct[0]});
    } catch (error) {
        console.log("Error updating product:", error);
        res.status(500).json({success: false, message: "Error updating product"});
    }

};
