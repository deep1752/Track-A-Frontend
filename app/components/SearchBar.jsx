
'use client';
import { useState } from 'react';

export default function SearchBar({ onSearch, placeholder='Search projects or skills...' }){
  const [q, setQ] = useState('');
  return (
    <div className="search-area">
      <input
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        className="search-input"
        placeholder={placeholder}
        onKeyDown={(e)=>{ if(e.key==='Enter'){ onSearch(q); } }}
      />
      <button className="btn" onClick={()=>onSearch(q)}>Search</button>
    </div>
  );
}
