
'use client';
import React from 'react';

export default function ProfileCard({ profile }) {
  if (!profile) return (
    <div className="card">
      <div className="avatar">--</div>
      <div className="profile-name">No profile found</div>
    </div>
  );

  const initials = profile.name
    ? profile.name.split(' ').map(s => s[0]).slice(0, 2).join('').toUpperCase()
    : 'ME';

  return (
    <div className="card">
     
      <div style={{ display: 'flex', gap: 12 }}>
        <div className="avatar">{initials}</div>
        <div style={{ flex: 1 }}>
          <h2 className="profile-name">{profile.name}</h2>
          <div className="profile-email">{profile.email}</div>
          <div className="links" style={{ marginTop: 8 }}>
            {profile.links?.github && (
              <a className="link-badge" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
            )}
            {profile.links?.linkedin && (
              <a className="link-badge" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            )}
            {profile.links?.portfolio && (
              <a className="link-badge" href={profile.links.portfolio} target="_blank" rel="noreferrer">Portfolio</a>
            )}
          </div>
        </div>
      </div>

      {/* Education */}
      {profile.education?.length > 0 && (
        <>
          <h3 style={{ marginTop: 14, marginBottom: 8 }}>Education</h3>
          <div>
            {profile.education.map((ed, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <div style={{ fontWeight: 700 }}>{ed.degree || ed.school}</div>
                <div className="text-muted">
                  {ed.school} • {ed.from || ''}{ed.to ? ` — ${ed.to}` : ''}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Skills */}
      {profile.skills?.length > 0 && (
        <>
          <h3 style={{ marginTop: 14, marginBottom: 8 }}>Skills</h3>
          <div className="skills">
            {profile.skills.map((s, i) => (
              <div key={i} className="skill">{s}</div>
            ))}
          </div>
        </>
      )}

      {/* Work */}
      {profile.work?.length > 0 && (
        <>
          <h3 style={{ marginTop: 14, marginBottom: 8 }}>Work</h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {profile.work.map((w, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 8 }}>
                <div style={{ fontWeight: 700 }}>{w.role} @ {w.company}</div>
                <div className="text-muted">{w.from || ''}{w.to ? ` — ${w.to}` : ''}</div>
                <div style={{ marginTop: 6 }} className="text-muted">{w.description}</div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
}
