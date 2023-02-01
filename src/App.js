import React, { useState } from 'react';
import './App.css';

const MealGroup = ({ title, items, onAddItem, onDeleteItem }) => {
    return (
        <div className='meal-group'>
            <h3>meal group: {title}</h3>
            {items.map((item, itemIndex) => (
                <MealItem key={itemIndex} name={item} onDelete={(itemIndex) => onDeleteItem(itemIndex)} index={itemIndex} />
            ))}
            <AddMealItem onAdd={(newItem) => onAddItem(newItem)} />
        </div>
    );
};

const MealItem = ({ name, onDelete, index }) => {
    return (
        <div className='meal-item'>
            <span>{name}</span>
            <button onClick={() => onDelete(index)}>Delete</button>
        </div>
    );
};

const AddMealGroup = ({ onAdd }) => {
    const [newGroupName, setNewGroupName] = useState('');
    return (
        <div>
            <input
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
            />
            <button onClick={() => onAdd(newGroupName)}>Add Meal Group</button>
        </div>
    );
};

const AddMealItem = ({ onAdd }) => {
    const [newItemName, setNewItemName] = useState('');
    return (
        <div>
            <input
                className='input'
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
            />
            <button onClick={() => onAdd(newItemName)}>Add Meal Item</button>
        </div>
    );
};

const App = () => {
    const [mealGroups, setMealGroups] = useState([]);
    const addMealGroup = (title) => {
        setMealGroups([...mealGroups, { title, items: [] }]);
    };
    const addMealItem = (groupIndex, name) => {
        const newMealGroups = [...mealGroups];
        newMealGroups[groupIndex].items.push(name);
        setMealGroups(newMealGroups);
    };
    const deleteMealItem = (groupIndex, itemIndex) => {
        const newMealGroups = [...mealGroups];
        newMealGroups[groupIndex].items.splice(itemIndex, 1);
        setMealGroups(newMealGroups);
    };
    return (
        <div>
            {mealGroups.map((group, groupIndex) => (
                <MealGroup key={groupIndex} {...group}
                    onAddItem={(name) => addMealItem(groupIndex, name)}
                    onDeleteItem={(itemIndex) => deleteMealItem(groupIndex, itemIndex)} />
            ))}
            <AddMealGroup onAdd={addMealGroup} />
        </div>
    );
};

export default App;