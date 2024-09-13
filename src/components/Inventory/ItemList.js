import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/InventoryPage/ItemList.module.css'
import { useRouter } from 'next/navigation';

const ItemsList = ({ items, onEdit, onDelete }) => {

    const router = useRouter();

    // Funktion för att hantera åtgärder med tokenkontroll
    const handleAction = (action, item) => {
        const token = localStorage.getItem('token'); // Kontrollera om token finns
        if (!token) {
            if (confirm('You must be logged in to add or edit an item. Click OK to go to the login page.')) {
                router.push('/login'); // Navigera användaren till inloggningssidan
            }
        }
        action(item); // Utför åtgärden om token finns
    };

    return (
        <div>
            <div className={styles.headerRow}>
                <span className={styles.nameHeader}>Name</span>
                <span className={styles.quantityHeader}>Quantity</span>
                <span className={styles.categoryHeader}>Category</span>
                <span className={styles.descriptionHeader}>Description</span>
            </div>
            <ul className={styles.itemList}>
                {items.map((item) => (
                    <Item
                        key={item.id}
                        item={item}
                        onEdit={(item) => handleAction(onEdit, item)}
                        onDelete={(itemId) => handleAction(() => onDelete(itemId), item)}
                    />
                ))}
            </ul>
        </div>
    );
};

const Item = ({ item, onEdit, onDelete }) => {
    return (
        <li className={styles.item}>
            <div className={styles.itemDetails}>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemQuantity}>{item.quantity}</span>
                <span className={styles.itemCategory}>{item.category}</span>
                <span className={styles.itemDescription}>{item.description}</span>
            </div>

            <div className={styles.itemActions}>
                <button onClick={() => onEdit(item)}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => onDelete(item.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
        </li>
    )
}

export default ItemsList;
