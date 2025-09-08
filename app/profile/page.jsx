
'use client';
import { useEffect, useState } from 'react';
import { getProfile } from '../../lib/api';
import ProfileCard from '../components/ProfileCard';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                const p = await getProfile();
                setProfile(p);
            } catch (err) {
                Swal.fire({ icon: 'error', title: 'Failed to load profile', text: err.message || 'Check your API' });
            }
        })();
    }, []);
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 24 }}>
            <ProfileCard profile={profile} />
            <div className="card mt-8">
                {/* Projects */}
                {profile?.projects?.length > 0 ? (
                    <>
                        <h3 style={{ marginTop: 0, marginBottom: 8 }}>Projects</h3>
                        <div style={{ display: 'grid', gap: 12 }}>
                            {profile.projects.map((p, i) => {
                                
                                const mainLink = p.links?.live || p.links?.github || p.links?.other || null;

                                return (
                                    <div
                                        key={i}
                                        className="project-card"
                                        style={{
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: 8,
                                            padding: 12
                                        }}
                                    >
                                        {/* Project title */}
                                        <div
                                            style={{
                                                fontWeight: 700,
                                                fontSize: '1.1rem',
                                                marginBottom: 4
                                            }}
                                        >
                                            {mainLink ? (
                                                <a
                                                    href={mainLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{ color: 'var(--link)' }}
                                                >
                                                    {p.title}
                                                </a>
                                            ) : (
                                                p.title
                                            )}
                                        </div>

                                        {/* Description */}
                                        <div className="text-muted" style={{ marginBottom: 6 }}>
                                            {p.description}
                                        </div>

                                        {/* Skills */}
                                        {p.skills?.length > 0 && (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    gap: 6,
                                                    marginBottom: 6
                                                }}
                                            >
                                                {p.skills.map((s, idx) => (
                                                    <span key={idx} className="skill">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Project links */}
                                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                            {p.links?.github && (
                                                <a
                                                    className="link-badge"
                                                    href={p.links.github}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    GitHub
                                                </a>
                                            )}
                                            {p.links?.live && (
                                                <a
                                                    className="link-badge"
                                                    href={p.links.live}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Live
                                                </a>
                                            )}
                                            {p.links?.other && (
                                                <a
                                                    className="link-badge"
                                                    href={p.links.other}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    Other
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <div className="text-muted">No projects</div>
                )}
            </div>

        </div>
    );
}
