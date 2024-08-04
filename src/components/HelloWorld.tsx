import React, { useState } from 'react';
import './HelloWorld.css'; // Assuming you have a corresponding CSS file for styles

const HelloWorld = ({ msg }) => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>{msg}</h1>

            <div className="card">
                <button type="button" onClick={() => setCount(count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>components/HelloWorld.jsx</code> to test HMR
                </p>
            </div>

            <p>
                Check out{' '}
                <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" rel="noopener noreferrer">
                    create-vue
                </a>
                , the official Vue + Vite starter
            </p>
            <p>
                Learn more about IDE Support for Vue in the{' '}
                <a
                    href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Vue Docs Scaling up Guide
                </a>
                .
            </p>
        </div>
    );
};

export default HelloWorld;