import React, { useState } from 'react';
import './App.css';

const MealGroup = ({ title, items, onAddItem }) => {
    return (
        <div className='meal-group'>
            <h3>{title}</h3>
            {items.map((item, index) => (
                <MealItem key={index} name={item} />
            ))}
            <AddMealItem onAdd={(newItem) => onAddItem(newItem)} />
        </div>
    );
};

const MealItem = ({ name }) => {
    return (
        <div className='meal-item'>
            <span>{name}</span>
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
    return (
        <div>
            {mealGroups.map((group, index) => (
                <MealGroup key={index} {...group} onAddItem={(name) => addMealItem(index, name)} />
            ))}
            <AddMealGroup onAdd={addMealGroup} />
        </div>
    );
};

export default App;