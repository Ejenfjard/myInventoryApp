"use client";

import { useState, useEffect } from 'react';
import Header from '@/components/Inventory/Header';
import ItemForm from '@/components/Inventory/ItemForm';
import ItemList from '@/components/Inventory/ItemList';
import styles from '@/styles/InventoryPage/InventoryPage.module.css';
import { useRouter } from 'next/navigation';


const InventoryPage = () => {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    // Function to fetch items from the API
    const fetchItems = async () => {
        const response = await fetch('/api/items', {
            cache: "no-cache"
        });
        const data = await response.json();
        setItems(data);
    };

    useEffect(() => {
        // Fetch user data from localStorage or an API
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ name: 'John Doe' }); 
        }

        
        fetchItems();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login'); // Navigera till inloggningssidan
    };



    const handleSaveItem = async (item) => {
        const token = localStorage.getItem('token'); 
        console.log("Token från localStorage:", token); 

        try {
            if (item.id) {
                // PUT request för att uppdatera item
                const response = await fetch(`/api/items/${item.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Lägg till token i Authorization-headern
                    },
                    body: JSON.stringify(item),
                });

                // Kontrollera om svaret är OK eller om det uppstod ett problem
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
            } else {
                // POST request för att skapa nytt item
                console.log("token", token)
                const response = await fetch('/api/items', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(item),
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
            }
            // Hämta uppdaterade items efter att item har sparats
            fetchItems();
            setSelectedItem(null);
        } catch (error) {
            console.error('Error saving item:', error);
        }
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token'); 
        console.log("Token från localStorage:", token); 

        try {
            const response = await fetch(`/api/items/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            // Hämta uppdaterade items efter att item har tagits bort
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };


    return (
        <div className={styles.pageContainer}>
            <Header onLogout={handleLogout} />
            <main className={styles.mainContent}>
                <ItemForm item={selectedItem} onSave={handleSaveItem} />
                <ItemList items={items} onEdit={handleEdit} onDelete={handleDelete} />
            </main>
        </div>
    );
};

export default InventoryPage;