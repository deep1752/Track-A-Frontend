'use client';
import { useEffect, useState } from 'react';
import { getProjects, getTopSkills } from '../../lib/api';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    loadAllProjects();
  }, []);

  async function loadAllProjects() {
    try {
      const projs = await getProjects();
      setProjects(projs || []);
      const sk = await getTopSkills();
      setSkills(sk || []);
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Load failed', text: err.message || 'Check API' });
    }
  }

  async function onSearch(q) {
    if (!q) {
      loadAllProjects();
      return;
    }
    try {
      const projs = await getProjects(`skill=${encodeURIComponent(q)}&page=1&limit=10`);
      setProjects(projs || []);
      if (!projs || projs.length === 0) {
        Swal.fire({ icon: 'info', title: 'No matches', text: `No projects for "${q}"` });
      }
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Search failed', text: err.message || 'Check API' });
    }
  }

  return (
    <div>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Projects</h3>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <SearchBar onSearch={onSearch} placeholder="Search by skill (ex: Node.js) or keyword..." />
          <button onClick={loadAllProjects} className="skill" style={{ background: 'var(--danger)', color: '#fff' }}>
            Reset
          </button>
        </div>

        {/* Top skills */}
        <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {skills.map((s, i) => (
            <button key={i} onClick={() => onSearch(s.skill)} className="skill">
              {s.skill} ({s.count})
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="projects-grid">
          {projects.length
            ? projects.map((p, i) => <ProjectCard key={i} p={p} />)
            : <div className="card">No projects found</div>}
        </div>
      </div>
    </div>
  );
}
