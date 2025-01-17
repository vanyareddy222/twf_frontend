import {
    Button,
    TextField,
} from '@shopify/polaris';
import { useState } from 'react';


export default function Orders() {
    const products = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
    const [quantities, setQuantities] = useState(
        Object.fromEntries(products.map((product) => [product, 0]))
    );

    const [minCost, updateCost] = useState(0)

    const handleDecrement = (product) => {
        if (quantities[product] == 0) {
            alert("product quantity is already 0")
        }
        setQuantities((prev) => ({
            ...prev,
            [product]: Math.max(0, prev[product] - 1),
        }));
    };

    const handleIncrement = (product) => {
        
        setQuantities((prev) => ({
            ...prev,
            [product]: prev[product] + 1,
        }));
    };



    const MinCost = async () => {
        const response = await fetch(`http://13.60.222.119:8080/calculateMinCost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quantities)
        });

        if (response.status != 200 ){
            alert("api calculating MinCost failed")
        }

        var data = await response.json();
        updateCost(data)
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                minHeight: "100vh",  // Ensure the content is centered vertically
                padding: "20px",
                textAlign: "center", // Center the text inside each item
            }}
        >
            {products.map((product) => (
                <div key={product} style={{ marginBottom: "10px" }}>
                    {product + ": "}
                    <button onClick={() => handleDecrement(product)}>
                        -
                    </button>
    
                    <span
                        style={{
                            display: "inline-block",
                            width: "40px",
                            textAlign: "center",
                            border: "1px solid #ccc",
                            margin: "0 10px",
                            borderRadius: "4px",
                            padding: "4px",
                        }}
                    >
                        {quantities[product]}
                    </span>
                    <button onClick={() => handleIncrement(product)}>
                        +
                    </button>
                </div>
            ))}
            <button onClick={MinCost}>Submit</button>
            <span
                style={{
                    display: "inline-block",
                    width: "40px",
                    textAlign: "center",
                    border: "1px solid #ccc",
                    margin: "10px 10px",
                    borderRadius: "4px",
                    padding: "4px",
                }}
            >
                {minCost}
            </span>
        </div>
    );
}
