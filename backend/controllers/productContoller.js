import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';


const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})

    res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// Delete Product
// DELETE /api/products/:id
// Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// Create Product
// POST /api/products/
// Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'brand',
        category: 'category',
        countInStock: 0,
        numReviews: 0,
        description: 'description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)    
})

// Update Product
// PUT /api/products/:id
// Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name, 
        price, 
        description, 
        image, 
        brand, 
        category, 
        countInStock
    } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updateProduct = await product.save()
        res.json(updateProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}