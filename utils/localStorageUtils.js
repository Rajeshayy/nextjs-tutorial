
export const KEYS = {
  USERS: 'users',
  ADMIN: 'admin',
  PRODUCTS: 'products',
  ORDERS: 'orders',
  CURRENT_USER: 'currentUser',
  CURRENT_ADMIN: 'currentAdmin',
};

export const getFromLS = (key) => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveToLS = (key, data) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
};

export const initDB = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(KEYS.USERS)) {
    saveToLS(KEYS.USERS, []);
  }

  if (!localStorage.getItem(KEYS.ADMIN)) {
    saveToLS(KEYS.ADMIN, { email: 'admin@myntra.com', password: 'admin' });
  }

  if (!localStorage.getItem(KEYS.PRODUCTS)) {
    const dummyProducts = [
      {
        id: '1',
        name: 'Floral Print A-Line Dress',
        category: 'WOMEN',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L', 'XL'],
        description: 'A beautiful floral print dress, perfect for summer outings.'
      },
      {
        id: '2',
        name: 'Slim Fit Cotton Shirt',
        category: 'MEN',
        price: 999,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
        sizes: ['M', 'L', 'XL'],
        description: 'Pure cotton slim fit shirt for a sharp look.'
      },
      {
        id: '3',
        name: 'Maxi Wrap Dress',
        category: 'WOMEN',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L'],
        description: 'Elegant wrap dress with a flowy silhouette.'
      },
      {
        id: '4',
        name: 'Denim Trucker Jacket',
        category: 'MEN',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1576905341935-4db242759450?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: 'Classic denim jacket for a rugged style.'
      },
      {
        id: '5',
        name: 'Boho Mini Dress',
        category: 'WOMEN',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
        sizes: ['S', 'M'],
        description: 'Chic boho style mini dress with intricate patterns.'
      },
      {
        id: '6',
        name: 'Chino Trousers',
        category: 'MEN',
        price: 1599,
        image: 'https://images.unsplash.com/photo-1624371414361-e6e8ea02c1e0?auto=format&fit=crop&q=80&w=800',
        sizes: ['30', '32', '34', '36'],
        description: 'Comfortable and stylish chino trousers for everyday wear.'
      }
    ];
    saveToLS(KEYS.PRODUCTS, dummyProducts);
  }

  if (!localStorage.getItem(KEYS.ORDERS)) {
    saveToLS(KEYS.ORDERS, []);
  }
};
