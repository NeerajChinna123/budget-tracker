import React, { useState } from 'react';

function ItemForm({ onNewItem }) {
    const [showForm, setShowForm] = useState(false);
    const [itemName, setItemName] = useState('');
    const [itemBudget, setItemBudget] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        onNewItem({ name: itemName, budget: itemBudget });
        setShowForm(false);
        setItemName('');
        setItemBudget(0);
    };

    return (
        <div>
            <button 
                className="mb-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                onClick={() => setShowForm(true)}
            >
                Add New Item
            </button>

            {showForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                    <form onSubmit={handleSubmit} className="bg-gray-700 p-5 rounded">
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">Item Name</label>
                            <input 
                                type="text"
                                value={itemName}
                                onChange={(e) => setItemName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2">Budget (USD)</label>
                            <div className="flex items-center">
                                <button type="button" onClick={() => setItemBudget(itemBudget - 1)}>-</button>
                                <input 
                                    type="text"
                                    value={itemBudget}
                                    onChange={(e) => setItemBudget(Number(e.target.value))}
                                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mx-2 w-20 text-center"
                                />
                                <button type="button" onClick={() => setItemBudget(itemBudget + 1)}>+</button>
                            </div>
                        </div>
                        <button 
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add Item
                        </button>
                        <button 
                            type="button"
                            className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ItemForm;
