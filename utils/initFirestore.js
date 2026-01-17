
import { db } from './firebase';
import { collection, getDocs, addDoc, setDoc, doc } from 'firebase/firestore';

const dummyProducts = [
    {
        name: 'Floral Print A-Line Dress',
        category: 'WOMEN',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'A beautiful floral print dress, perfect for summer outings.'
    },
    {
        name: 'Slim Fit Cotton Shirt',
        category: 'MEN',
        price: 999,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
        sizes: ['M', 'L', 'XL'],
        description: 'Pure cotton slim fit shirt for a sharp look.'
    },
    {
        name: 'Maxi Wrap Dress',
        category: 'WOMEN',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L'],
        description: 'Elegant wrap dress with a flowy silhouette.'
    },
    {
        name: 'Denim Trucker Jacket',
        category: 'MEN',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1576905341935-4db242759450?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Classic denim jacket for a rugged style.'
    },
    {
        name: 'Boho Mini Dress',
        category: 'WOMEN',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M'],
        description: 'Chic boho style mini dress with intricate patterns.'
    },
    {
        name: 'Chino Trousers',
        category: 'MEN',
        price: 1599,
        image: 'https://images.unsplash.com/photo-1624371414361-e6e8ea02c1e0?auto=format&fit=crop&q=80&w=800',
        sizes: ['30', '32', '34', '36'],
        description: 'Comfortable and stylish chino trousers for everyday wear.'
    }
];

export const initFirestore = async () => {
    // 1. Initial Products
    const productsSnap = await getDocs(collection(db, 'products'));
    if (productsSnap.empty) {
        console.log('Seeding products to Firestore...');
        for (const p of dummyProducts) {
            await addDoc(collection(db, 'products'), {
                ...p,
                createdAt: new Date().toISOString()
            });
        }
    }

    // 2. Initial Admin Role (Manual step required in Auth, but this prepares the doc)
    // We can't know the UID until the user signs up, so we'll have to handle this
    // by making the first specific email an admin or providing a tool.
    console.log('Firestore initialization check complete.');
};
