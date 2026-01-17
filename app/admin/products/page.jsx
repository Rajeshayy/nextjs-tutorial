
"use client";
import React, { useEffect, useState } from 'react';
import { getAllProducts, addProduct, deleteProduct } from '@/utils/firebaseStore';
import AdminRoute from '@/components/AdminRoute';

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: 'MEN',
        price: '',
        image: '',
        sizes: 'S,M,L,XL',
        description: ''
    });

    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const data = await getAllProducts();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const productData = {
            ...newProduct,
            price: parseInt(newProduct.price),
            sizes: newProduct.sizes.split(',').map(s => s.trim())
        };

        const added = await addProduct(productData, imageFile);
        setProducts([...products, added]);
        setShowModal(false);
        setNewProduct({ name: '', category: 'MEN', price: '', image: '', sizes: 'S,M,L,XL', description: '' });
        setImageFile(null);
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        const updated = products.filter(p => p.id !== id);
        setProducts(updated);
    };

    const handleSeed = async () => {
        if (!confirm('This will add 10 dummy products to your inventory. Continue?')) return;

        const dummyProducts = [
            {
                name: "Men's Classic T-Shirt",
                category: "MEN",
                price: 799,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
                sizes: ["S", "M", "L", "XL"],
                description: "A comfortable classic cotton t-shirt for everyday wear."
            },
            {
                name: "Women's Floral Dress",
                category: "WOMEN",
                price: 2499,
                image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
                sizes: ["XS", "S", "M"],
                description: "Beautiful floral print dress perfect for summer outings."
            },
            {
                name: "Men's Denim Jacket",
                category: "MEN",
                price: 3499,
                image: "https://images.unsplash.com/photo-1516257984877-a03a804703ae?auto=format&fit=crop&q=80&w=800",
                sizes: ["M", "L", "XL"],
                description: "Rugged denim jacket that goes with everything."
            },
            {
                name: "Women's High Heels",
                category: "WOMEN",
                price: 1999,
                image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
                sizes: ["36", "37", "38", "39"],
                description: "Elegant high heels for formal occasions."
            },
            {
                name: "Men's Sneakers",
                category: "MEN",
                price: 2999,
                image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800",
                sizes: ["8", "9", "10", "11"],
                description: "Comfortable and stylish sneakers for active lifestyles."
            },
            {
                name: "Women's Handbag",
                category: "WOMEN",
                price: 1599,
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
                sizes: ["One Size"],
                description: "Chic handbag to carry your essentials in style."
            },
            {
                name: "Men's Formal Shirt",
                category: "MEN",
                price: 1299,
                image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
                sizes: ["M", "L", "XL", "XXL"],
                description: "Crisp formal shirt for office and events."
            },
            {
                name: "Women's Jeans",
                category: "WOMEN",
                price: 1899,
                image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800",
                sizes: ["26", "28", "30", "32"],
                description: "Perfect fit jeans that flatter your figure."
            },
            {
                name: "Men's Sunglasses",
                category: "MEN",
                price: 999,
                image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
                sizes: ["One Size"],
                description: "Cool sunglasses to protect your eyes and look great."
            },
            {
                name: "Women's Scarf",
                category: "WOMEN",
                price: 699,
                image: "https://images.unsplash.com/photo-1585556216912-3264c7cf329f?auto=format&fit=crop&q=80&w=800",
                sizes: ["One Size"],
                description: "Soft and cozy scarf to add a pop of color."
            }
        ];

        for (const p of dummyProducts) {
            // Pass null for imageFile as we are providing a URL directly
            // Note: addProduct logic might need a tweak if it strictly expects a file for 'image' logic
            // Let's modify addProduct or just handle it here.
            // Looking at addProduct: 
            // let imageUrl = productData.image; 
            // if (imageFile) { ...upload... }
            // So if we pass productData.image as string and imageFile as null, it works!
            await addProduct(p, null);
        }

        // Refresh
        const data = await getAllProducts();
        setProducts(data);
        alert('Products added successfully!');
    };

    return (
        <AdminRoute>
            <div className="max-w-[1200px] mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-black uppercase text-dark">Product Management</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={handleSeed}
                            className="bg-gray-800 text-white font-black text-xs px-6 py-3 rounded-sm hover:bg-gray-700 transition-colors"
                        >
                            SEED DUMMY PRODUCTS
                        </button>
                        <button
                            onClick={() => setShowModal(true)}
                            className="myntra-btn font-black text-xs px-8"
                        >
                            ADD NEW PRODUCT
                        </button>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 card-shadow overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="p-4 text-[10px] font-black uppercase">Product</th>
                                <th className="p-4 text-[10px] font-black uppercase">Category</th>
                                <th className="p-4 text-[10px] font-black uppercase">Price</th>
                                <th className="p-4 text-[10px] font-black uppercase">Sizes</th>
                                <th className="p-4 text-[10px] font-black uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map(p => (
                                <tr key={p.id}>
                                    <td className="p-4 flex items-center gap-3">
                                        <img src={p.image} className="w-10 h-14 object-cover rounded-sm" />
                                        <div>
                                            <p className="text-sm font-bold text-dark">{p.name}</p>
                                            <p className="text-[10px] text-muted">ID: {p.id}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-xs font-bold">{p.category}</td>
                                    <td className="p-4 text-xs font-bold text-primary">Rs. {p.price}</td>
                                    <td className="p-4 text-[10px] text-muted">{p.sizes.join(', ')}</td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => handleDelete(p.id)} className="text-primary font-bold text-[10px] hover:underline">DELETE</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {showModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-[100]">
                        <div className="bg-white w-full max-w-lg rounded-sm p-8 max-h-[90vh] overflow-y-auto">
                            <h2 className="text-xl font-black mb-6 border-b pb-2">ADD NEW PRODUCT</h2>
                            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
                                <input
                                    placeholder="Product Name"
                                    className="border p-3 text-sm focus:outline-primary"
                                    value={newProduct.name}
                                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                    required
                                />
                                <select
                                    className="border p-3 text-sm focus:outline-primary"
                                    value={newProduct.category}
                                    onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                >
                                    <option value="MEN">MEN</option>
                                    <option value="WOMEN">WOMEN</option>
                                </select>
                                <input
                                    placeholder="Price"
                                    type="number"
                                    className="border p-3 text-sm focus:outline-primary"
                                    value={newProduct.price}
                                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                    required
                                />
                                <div className="flex flex-col gap-1">
                                    <label className="text-[10px] font-bold text-muted ml-1">PRODUCT IMAGE</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="border p-2 text-xs focus:outline-primary"
                                        onChange={e => setImageFile(e.target.files[0])}
                                        required
                                    />
                                </div>
                                <input
                                    placeholder="Sizes (comma separated: S, M, L)"
                                    className="border p-3 text-sm focus:outline-primary"
                                    value={newProduct.sizes}
                                    onChange={e => setNewProduct({ ...newProduct, sizes: e.target.value })}
                                    required
                                />
                                <textarea
                                    placeholder="Description"
                                    className="border p-3 text-sm focus:outline-primary h-24"
                                    value={newProduct.description}
                                    onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                    required
                                />
                                <div className="flex gap-4 mt-4">
                                    <button type="button" onClick={() => setShowModal(false)} className="flex-1 font-bold text-sm text-muted">CANCEL</button>
                                    <button type="submit" className="flex-1 myntra-btn py-3 text-sm">SAVE PRODUCT</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </AdminRoute>
    );
}
