import mongoose from 'mongoose';
import Product from './models/Products.js';

await mongoose.connect('mongodb://127.0.0.1:27017/bazaar-db');
console.log('✅ MongoDB connected');

// Clear existing products
await Product.deleteMany({});
console.log('🗑️  Cleared existing products');

const products = [
    {
        title: 'Apple MacBook Air M2',
        description: '13.6-inch Liquid Retina display, Apple M2 chip, 8GB RAM, 256GB SSD. Incredibly thin and light with all-day battery life.',
        price: 1099,
        image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80'
    },
    {
        title: 'Sony WH-1000XM5 Headphones',
        description: 'Industry-leading noise canceling with Auto NC Optimizer. Up to 30-hour battery life with quick charging.',
        price: 349,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&q=80'
    },
    {
        title: 'iPhone 15 Pro',
        description: 'Titanium design, A17 Pro chip, 48MP main camera with 5x optical zoom. USB-C with USB 3 speeds.',
        price: 999,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&q=80'
    },
    {
        title: 'Samsung 4K OLED TV 55"',
        description: 'Quantum HDR OLED, Neural Quantum Processor 4K, Dolby Atmos sound. Stunning picture quality for movies and gaming.',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600&q=80'
    },
    {
        title: 'Nike Air Max 270',
        description: 'Lightweight mesh upper with Max Air unit in the heel for all-day comfort. Available in multiple colorways.',
        price: 150,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80'
    },
    {
        title: 'Levi\'s 501 Original Jeans',
        description: 'The original straight fit jean. Button fly, 100% cotton denim. A timeless classic since 1873.',
        price: 69,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80'
    },
    {
        title: 'Canon EOS R50 Camera',
        description: '24.2MP APS-C sensor, 4K video, dual pixel autofocus. Perfect for content creators and photography enthusiasts.',
        price: 679,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80'
    },
    {
        title: 'Dyson V15 Detect Vacuum',
        description: 'Laser reveals microscopic dust. HEPA filtration captures 99.99% of particles. Up to 60 minutes of fade-free power.',
        price: 749,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
    },
    {
        title: 'Apple Watch Series 9',
        description: 'Advanced health sensors, crash detection, S9 chip with double tap gesture. Always-on Retina display.',
        price: 399,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80'
    },
    {
        title: 'Kindle Paperwhite',
        description: '6.8-inch display with adjustable warm light, waterproof, 3 months battery life. Holds thousands of books.',
        price: 139,
        image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600&q=80'
    },
    {
        title: 'Logitech MX Master 3S Mouse',
        description: 'Ultra-fast MagSpeed scrolling, 8K DPI sensor, ergonomic design. Works on any surface including glass.',
        price: 99,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80'
    },
    {
        title: 'Instant Pot Duo 7-in-1',
        description: 'Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker and warmer. 6-quart capacity.',
        price: 89,
        image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=600&q=80'
    }
];

await Product.insertMany(products);
console.log(`✅ Seeded ${products.length} products successfully`);

await mongoose.disconnect();
console.log('🔌 Disconnected from MongoDB');
process.exit(0);
