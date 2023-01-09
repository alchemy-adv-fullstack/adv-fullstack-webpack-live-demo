import { useState } from 'react';
import catImage from './cat-wikimedia-commons-01.svg';

export default function App() {
  const [ count , setCount] = useState(0);
  return <div>
    {count}
    <button onClick={() => setCount(count+1)}>increment</button>
    <img src={catImage} />
  </div>;
}