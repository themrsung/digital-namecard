import { useEffect, useMemo, useState } from 'react';
import './App.css';

const assetPath = (file) => {
  const base = (process.env.PUBLIC_URL || '').replace(/\/+$/, '');
  return `${base}/${file}`;
};

const profile = {
  name: '서준',
  phone: '010-1234-5678',
  company: '미래 리서치',
  title: '대표',
  team: '디지털팀',
  headline: '데이터 인사이트로 미래를 설계합니다.',
  description:
    '디지털 경험과 리서치를 결합해 미래 비즈니스의 기회를 탐색합니다. 언제든 편하게 연락 주세요.',
  photo: assetPath('profile-photo.png'),
  photoAlt: '미래 리서치 대표 서준 프로필 사진',
};

const formatPhoneForTel = (phoneNumber) => phoneNumber.replace(/[^0-9+]/g, '');

const socialLinks = [
  {
    platform: 'instagram',
    label: 'Instagram',
    handle: '@sjun.me',
    href: 'https://www.instagram.com/sjun.me',
  },
  {
    platform: 'youtube',
    label: 'YouTube',
    handle: '@themrsung',
    href: 'https://www.youtube.com/@themrsung',
  },
  {
    platform: 'telegram',
    label: 'Telegram',
    handle: 't.me/themrsung',
    href: 'https://t.me/themrsung',
  },
  {
    platform: 'mail',
    label: 'Email',
    handle: 'biz@sjun.me',
    href: 'mailto:biz@sjun.me',
  },
];

const socialIcons = {
  instagram: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="6" width="19" height="12" rx="3" />
      <path d="M10.5 9.5L15 12l-4.5 2.5v-5z" fill="currentColor" stroke="none" />
    </svg>
  ),
  telegram: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="none"
    >
      <path d="M20.6 4.5L3.8 11.3c-.8.3-.8 1.5-.1 1.8l3.9 1.5 1.5 4c.3.7 1.3.8 1.8.2l2.4-2.6 4.1 3c.6.4 1.4.1 1.6-.6l3-13c.3-.9-.6-1.6-1.4-1.1z" />
    </svg>
  ),
  mail: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4.5 7l7.5 6 7.5-6" />
    </svg>
  ),
};

const linkIcons = {
  call: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 3.5h3l2 4-2 2a12 12 0 0 0 6 6l2-2 4 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 3.5 7.7 2 2 0 0 1 5.5 3.5z" />
    </svg>
  ),
  vcard: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2.2" />
      <path d="M15 9h4M15 13h4M7 16h4" />
    </svg>
  ),
  company: (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20V6a1 1 0 0 1 1-1h6l2 2h6a1 1 0 0 1 1 1v12" />
      <path d="M4 20h16" />
      <path d="M10 14h4" />
      <path d="M10 11h4" />
    </svg>
  ),
};

const prefersDarkMode = () => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => prefersDarkMode());

  useEffect(() => {
    const root = document.documentElement;
    const theme = isDarkMode ? 'dark' : 'light';
    root.setAttribute('data-theme', theme);
    return () => {
      root.removeAttribute('data-theme');
    };
  }, [isDarkMode]);

  const vcardUri = useMemo(() => {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${profile.name}`,
      `ORG:${profile.company};${profile.team}`,
      `TITLE:${profile.title}`,
      `TEL;TYPE=CELL:${profile.phone}`,
      'END:VCARD',
    ];

    return `data:text/vcard;charset=utf-8,${encodeURIComponent(lines.join('\n'))}`;
  }, []);

  const links = useMemo(
    () => [
      {
        type: 'call',
        label: '전화 바로 걸기',
        href: `tel:${formatPhoneForTel(profile.phone)}`,
        description: profile.phone,
      },
      {
        type: 'vcard',
        label: '연락처 저장 (vCard)',
        href: vcardUri,
        description: '디지털 명함을 휴대폰 주소록에 저장',
        download: `${profile.name}-business-card.vcf`,
      },
      {
        type: 'company',
        label: '회사 소개 보기',
        href: 'https://finance.sjun.me/',
        description: '미래 리서치 디지털팀의 프로젝트와 인사이트',
      },
    ],
    [vcardUri]
  );

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className="app-shell">
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />
      <main className="glass-card">
        <section className="profile">
          <div className="avatar">
            <img src={profile.photo} alt={profile.photoAlt} loading="lazy" />
          </div>
          <div className="profile-info">
            <div className="profile-heading">
              <h1 className="profile-name">{profile.name}</h1>
              <button
                type="button"
                className="mode-toggle"
                onClick={handleToggleTheme}
                aria-pressed={isDarkMode}
              >
                <span className="mode-icon" aria-hidden="true">
                  <svg
                    className="icon-sun"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <line x1="12" y1="2" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="22" />
                    <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                    <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                    <line x1="2" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="22" y2="12" />
                    <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                    <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                  </svg>
                  <svg
                    className="icon-moon"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M21 14.5A8.5 8.5 0 0 1 9.5 3.04a8 8 0 1 0 11.46 11.46A8.6 8.6 0 0 1 21 14.5z" />
                  </svg>
                </span>
                <span className="mode-label">
                  {isDarkMode ? '라이트 모드' : '다크 모드'}
                </span>
              </button>
            </div>
            <p className="profile-role">
              {profile.company} · {profile.title}
            </p>
            <div className="profile-tags">
              <span className="tag">{profile.team}</span>
              <span className="tag">{profile.phone}</span>
            </div>
          </div>
        </section>

        <section className="intro">
          <p className="headline">{profile.headline}</p>
          <p className="description">{profile.description}</p>
        </section>

        <nav className="link-row" aria-label="주요 링크">
          {links.map((link) => {
            const isExternal =
              link.href.startsWith('http://') || link.href.startsWith('https://');
            const ariaLabel = link.description
              ? `${link.label} - ${link.description}`
              : link.label;
            return (
              <a
                key={link.label}
                className="link-chip"
                href={link.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                download={link.download}
                aria-label={ariaLabel}
                title={link.description}
              >
                <span className="chip-icon" aria-hidden="true">
                  {linkIcons[link.type]}
                </span>
              </a>
            );
          })}
        </nav>

        <section className="social-links" aria-label="소셜 미디어 연결">
          {socialLinks.map((item) => {
            const isExternal =
              item.href.startsWith('http://') || item.href.startsWith('https://');
            return (
              <a
                key={item.platform}
                className="social-button"
                href={item.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                <span
                  className="social-icon"
                  data-platform={item.platform}
                  aria-hidden="true"
                >
                  {socialIcons[item.platform]}
                </span>
                <span className="social-meta">
                  <span className="social-label">{item.label}</span>
                  <span className="social-handle">{item.handle}</span>
                </span>
              </a>
            );
          })}
        </section>

        <section className="contact-grid" aria-label="직접 연락">
          <div className="contact-item">
            <span className="contact-label">전화</span>
            <a
              className="contact-value"
              href={`tel:${formatPhoneForTel(profile.phone)}`}
            >
              {profile.phone}
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">회사</span>
            <span className="contact-value">{profile.company}</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">직위</span>
            <span className="contact-value">{profile.title}</span>
          </div>
          <div className="contact-item">
            <span className="contact-label">팀</span>
            <span className="contact-value">{profile.team}</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
