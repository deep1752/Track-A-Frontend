
'use client';
import React from 'react';

export default function ProjectCard({ p }){
  return (
    <div className="project card">
      <div style={{display:'flex', justifyContent:'space-between', gap:10}}>
        <h3>{p.title}</h3>
        <div style={{display:'flex', gap:8}}>
          {p.links?.github && <a href={p.links.github} target="_blank" rel="noreferrer" className="chip">GH</a>}
          {p.links?.live && <a href={p.links.live} target="_blank" rel="noreferrer" className="chip">Live</a>}
        </div>
      </div>
      <p>{p.description}</p>
      <div style={{display:'flex', gap:8, flexWrap:'wrap', marginTop:8}}>
        {p.skills?.map((s, i)=> <div key={i} className="chip">{s}</div>)}
      </div>
    </div>
  );
}
