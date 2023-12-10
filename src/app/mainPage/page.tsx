'use client'
import React, { useState } from 'react';
import { Chart } from "react-google-charts";

const BudgetConfigPage = () => {
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemBudget, setItemBudget] = useState(0);
    const [spentAmount, setSpentAmount] = useState(0);
    const [displayedSpentAmount, setDisplayedSpentAmount] = useState(0);

    const handleAddItem = () => {
        if (itemName && itemBudget > 0) {
            setItems([...items, { name: itemName, budget: itemBudget }]);
            setItemName('');
            setItemBudget(0);
        }
    };

    const incrementBudget = () => setItemBudget(prev => prev + 1);
    const decrementBudget = () => setItemBudget(prev => (prev > 0 ? prev - 1 : 0));

    const handleSpentAmountSubmit = () => {
        setDisplayedSpentAmount(spentAmount);
    };

    const totalBudget = items.reduce((sum, item) => sum + item.budget, 0);

    const pieChartData = [
        ["Task", "Budget"],
        ...items.map(item => ([item.name, item.budget]))
    ];

    const barChartData = [
        ["Category", "Amount", { role: 'style' }],
        ["Total Budget", totalBudget, 'color: #3366CC'],
        ["Spent Amount", displayedSpentAmount, 'color: #DC3912']
    ];

    const pieChartOptions = {
        title: "My Daily Items",
        is3D: true,
    };

    const barChartOptions = {
        title: "Budget Overview",
        legend: { position: "none" },
        bar: { groupWidth: '95%' },
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white p-4">
            <button
                className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded"
                // onClick={handleLogout}
            >
                Logout
            </button>
            <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>

            <div className="mb-4 flex">
                <input
                    className="border p-2 mr-4 bg-gray-700"
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
                <div className="inline-flex items-center mr-4">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-l"
                            onClick={decrementBudget}>-</button>
                    <input
                        className="border p-2 bg-gray-700 text-center"
                        readOnly
                        type="text"
                        value={itemBudget}
                    />
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-r"
                            onClick={incrementBudget}>+</button>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-4"
                    onClick={handleAddItem}
                >
                    Add Item
                </button>
                <input
                    className="border p-2 mr-4 bg-gray-700"
                    type="number"
                    placeholder="Spent Amount"
                    value={spentAmount}
                    onChange={(e) => setSpentAmount(parseFloat(e.target.value))}
                />
                <button
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    onClick={handleSpentAmountSubmit}
                >
                    Submit Spent Amount
                </button>
            </div>

            <div className="flex flex-wrap justify-center mb-4">
                {items.length > 0 && (
                    <div className="m-2">
                        <Chart
                            chartType="PieChart"
                            data={pieChartData}
                            options={pieChartOptions}
                            width={"400px"}
                            height={"400px"}
                        />
                    </div>
                )}
                <div className="m-2">
                    <Chart
                        chartType="BarChart"
                        data={barChartData}
                        options={barChartOptions}
                        width={"400px"}
                        height={"400px"}
                    />
                </div>
            </div>
        </div>
    );
};

export default BudgetConfigPage;

