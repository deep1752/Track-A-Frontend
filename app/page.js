'use client';
import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar';
import ProjectCard from './components/ProjectCard';
import { getProfile, getProjects, getTopSkills, search } from '../lib/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [topSkills, setTopSkills] = useState([]);
  const [allProjects, setAllProjects] = useState([]); 
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const p = await getProfile();
        setProfile(p);
        setProjects(p?.projects || []);
        setAllProjects(p?.projects || []);
      } catch (err) {
        console.error(err);
        Swal.fire({ icon: 'error', title: 'Profile load failed', text: err.message || 'Check API' });
      }

      try {
        const skills = await getTopSkills();
        setTopSkills(skills || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  async function handleSearch(q) {
    if (!q) {
      Swal.fire({ icon: 'info', title: 'Type something', text: 'Try a skill or keyword' });
      return;
    }

    try {
      const res = await search(q); 
      const filteredProjects = [];

      res.forEach(profileItem => {
        if (profileItem.projects && profileItem.projects.length > 0) {
          profileItem.projects.forEach(p => {
           
            const matchTitle = p.title.toLowerCase().includes(q.toLowerCase());
            const matchDesc = p.description.toLowerCase().includes(q.toLowerCase());
            const matchSkills = (p.skills || []).some(s => s.toLowerCase().includes(q.toLowerCase()));
            if (matchTitle || matchDesc || matchSkills) filteredProjects.push(p);
          });
        }
      });

      setProjects(filteredProjects);
      setSearched(true);
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Search failed', text: err.message || 'Search error' });
    }
  }

  function handleReset() {
    setProjects(allProjects);
    setSearched(false);
  }

  return (
    <div className="grid">
      <div>
        <div className="card" style={{ paddingBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0 }}>Welcome{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''}</h2>
              <div className="text-muted">Search your profile, projects or skills</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Top skill</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>
                {topSkills?.[0]?.skill || '—'}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <SearchBar onSearch={handleSearch} />
            <button
              onClick={handleReset}
              className="btn bg-gray-400 text-white mt-2"
              style={{ marginTop: 8 }}
            >
              Reset
            </button>

            <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
              {topSkills?.map((s, i) => (
                <button
                  key={i}
                  className="skill"
                  onClick={() => handleSearch(s.skill)}
                >
                  {s.skill} ({s.count})
                </button>
              ))}
            </div>
          </div>
        </div>

   
      </div>

      <div>
        <h3 style={{ marginTop: 0 }}>Projects</h3>
        <div className="projects-grid">
          {projects?.length ? projects.map((p, i) => <ProjectCard key={i} p={p} />)
            : searched
              ? <div className="card">No projects found for your search.</div>
              : <div className="card">No projects to show. Try searching or seed your profile.</div>
          }
        </div>

      
      </div>
    </div>
  );
}
