'use client';
import { useEffect, useState } from 'react';
import { getProjects, getTopSkills } from '../../lib/api';
import ProjectCard from '../components/ProjectCard';
import SearchBar from '../components/SearchBar';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the newly created LoadingSpinner component

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingSkills, setIsLoadingSkills] = useState(true);

  useEffect(() => {
    loadAllProjects();
  }, []);

  async function loadAllProjects() {
    setIsLoadingProjects(true);
    setIsLoadingSkills(true);
    try {
      const projs = await getProjects();
      setProjects(projs || []);
    } catch (err) {
      // Swal.fire({ icon: 'error', title: 'Load failed', text: err.message || 'Check API' });
    } finally {
      setIsLoadingProjects(false);
    }

    try {
      const sk = await getTopSkills();
      setSkills(sk || []);
    } catch (err) {
      // Swal.fire({ icon: 'error', title: 'Load failed', text: err.message || 'Check API' });
    } finally {
      setIsLoadingSkills(false);
    }
  }

  async function onSearch(q) {
    if (!q) {
      loadAllProjects();
      return;
    }
    setIsLoadingProjects(true);
    try {
      const projs = await getProjects(`skill=${encodeURIComponent(q)}&page=1&limit=10`);
      setProjects(projs || []);
      // if (!projs || projs.length === 0) {
      //   Swal.fire({ icon: 'info', title: 'No matches', text: `No projects for "${q}"` });
      // }
    } catch (err) {
      // Swal.fire({ icon: 'error', title: 'Search failed', text: err.message || 'Check API' });
    } finally {
      setIsLoadingProjects(false);
    }
  }

  return (
    <div>
      <div className="card">
        <h3 style={{ marginTop: 0 }}>Projects</h3>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <SearchBar onSearch={onSearch} placeholder="Search by skill (ex: Node.js) or keyword..." disabled={isLoadingProjects} />
          <button onClick={loadAllProjects} className="skill" style={{ background: 'var(--danger)', color: '#fff' }} disabled={isLoadingProjects}>
            Reset
          </button>
        </div>

        {/* Top skills */}
        <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {isLoadingSkills ? <LoadingSpinner /> : skills.map((s, i) => (
            <button key={i} onClick={() => onSearch(s.skill)} className="skill">
              {s.skill} ({s.count})
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <div className="projects-grid">
          {isLoadingProjects ? <LoadingSpinner /> : projects.length
            ? projects.map((p, i) => <ProjectCard key={i} p={p} />)
            : <div className="card">No projects found</div>}
        </div>
      </div>
    </div>
  );
}
