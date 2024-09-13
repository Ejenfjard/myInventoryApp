import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/InventoryPage/ItemForm.module.css';


const categories = ["Uniforms and Kits", "Footwear", "Match Equipment", "Training Equipment", "Medical Supplies"];

const ItemForm = ({ onSave, item = null }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(categories[0]);

    const router = useRouter();


    const checkTokenAndAlert = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            if (confirm('You must be logged in to add or edit an item. Click OK to go to the login page.')) {
                router.push('/login'); // Navigera användaren till inloggningssidan
            }
        }
    };

    // Använd useEffect för att uppdatera tillståndet när item ändras
    useEffect(() => {
        setName(item?.name || '');
        setQuantity(item?.quantity || '');
        setDescription(item?.description || '');
        setCategory(item?.category || categories[0]);

    }, [item]);

    const handleChange = (e, setterFunction) => {
        checkTokenAndAlert(); // Visa alert om token saknas
        setterFunction(e.target.value); // Sätt värdet på tillståndet
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You must be logged in to add or edit an item. Click OK to go to the login page.');
            return; // Avbryt om användaren inte är inloggad
        }

        const newItem = { name, quantity, description, category };
        if (item) {
            newItem.id = item.id;
        }

        console.log('Submitting item:', newItem); // Loggar item-objektet
        onSave(newItem);

        // Återställ tillståndet efter inskickning
        setName('');
        setQuantity('');
        setDescription('');
        setCategory(categories[0]);
    };

    return (
        <div className={styles.itemForm}>
            <h2>{item && item.id ? 'Edit Item' : 'Add Item'}</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => handleChange(e, setName)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                id="quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => handleChange(e, setQuantity)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => handleChange(e, setCategory)}
                                required
                            >
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={styles.descriptionGroup}>
                        <div className={styles.formGroup}>
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => handleChange(e, setDescription)}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.saveButton}>
                        {item && item.id ? 'Update Item' : 'Add Item'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ItemForm;