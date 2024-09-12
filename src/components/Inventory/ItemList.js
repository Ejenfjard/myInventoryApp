import React, { useEffect, useState } from 'react';

import styles from '@/styles/InventoryPage/ItemList.module.css'

const ItemsList = ({ items, onEdit, onDelete }) => {

    return (
        <div >
            <h2>Items List</h2>
            <ul className={styles.itemList}>
                {items.map((item) => (
                    <Item key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
                ))}
            </ul>
        </div>
    );
};

const Item = ({ item, onEdit, onDelete }) => {
    return (
        <li key={item.id} className={styles.item}>
            <span>{item.name} - {item.quantity} - {item.category}</span>
            <button onClick={() => onEdit(item)}>Edit</button>
            <button onClick={() => onDelete(item.id)}>Delete</button>

        </li>
    )
}

export default ItemsList;