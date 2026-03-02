import { useState } from 'react';

export default function Home() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1 className="text-8xl font-bold text-center">Welcome to Silitech</h1>
            <p className="mt-4">Cart Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Click me
            </button>

        </div>
    );
}