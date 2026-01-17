
import { db, storage } from './firebase';
import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    setDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const PRODUCTS_COLLECTION = 'products';
const ORDERS_COLLECTION = 'orders';
const USERS_COLLECTION = 'users';

// Products
export const getAllProducts = async () => {
    const querySnapshot = await getDocs(collection(db, PRODUCTS_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (id) => {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
};

export const addProduct = async (productData, imageFile) => {
    let imageUrl = productData.image;

    if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
    }

    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
        ...productData,
        image: imageUrl,
        createdAt: new Date().toISOString()
    });
    return { id: docRef.id, ...productData, image: imageUrl };
};

export const updateProduct = async (id, productData) => {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, productData);
};

export const deleteProduct = async (id) => {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
};

// Orders
export const createOrder = async (orderData) => {
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
        ...orderData,
        createdAt: new Date().toISOString()
    });
    return { id: docRef.id, ...orderData };
};

export const getOrdersByUser = async (userId) => {
    const q = query(collection(db, ORDERS_COLLECTION), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAllOrders = async () => {
    const querySnapshot = await getDocs(collection(db, ORDERS_COLLECTION));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getOrderById = async (id) => {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
};

// Analytics Helper
export const getStats = async () => {
    const [usersSize, ordersSnap, productsSnap] = await Promise.all([
        getDocs(collection(db, USERS_COLLECTION)),
        getDocs(collection(db, ORDERS_COLLECTION)),
        getDocs(collection(db, PRODUCTS_COLLECTION))
    ]);

    const orders = ordersSnap.docs.map(d => d.data());
    const totalSales = orders.reduce((sum, o) => sum + (Number(o.price) || 0), 0);

    return {
        users: usersSize.size,
        orders: ordersSnap.size,
        products: productsSnap.size,
        sales: totalSales
    };
};
