import { useState, useEffect } from 'react';
import styles from '@/styles/InventoryPage/ItemForm.module.css';


const categories = ["Uniforms and Kits", "Footwear", "Match Equipment", "Training Equipment", "Medical Supplies"];

const ItemForm = ({ onSave, item = null }) => {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(categories[0]);

    // Använd useEffect för att uppdatera tillståndet när item ändras
    useEffect(() => {
        setName(item?.name || '');
        setQuantity(item?.quantity || '');
        setDescription(item?.description || '');
        setCategory(item?.category || categories[0]);

    }, [item]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = { name, quantity, description, category };
        if (item) {
            newItem.id = item.id
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
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="quantity">Quantity</label>
                            <input
                                id="quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
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
                                onChange={(e) => setDescription(e.target.value)}
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