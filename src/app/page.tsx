"use client";

import { useEffect, useMemo, useState } from "react";
import { Yuji_Boku } from "next/font/google";
import educationJson from "../../data/education.json";
import othersJson from "../../data/others.json";
import profileJson from "../../data/profile.json";
import publicationsJson from "../../data/publications.json";

type Lang = "ja" | "en";
type Localized = { ja: string; en: string };
type LocalizedList = { ja: string[]; en: string[] };

type Profile = {
  name: Localized;
  title: Localized;
  researchAreas: LocalizedList;
  keywords: LocalizedList | string[];
  bio: Localized;
  email: string;
  location: Localized | string;
  social: {
    twitter: string;
    facebook: string;
    github: string;
  };
};

type Publication = {
  id: string;
  category: "journal" | "international_conference" | "domestic_conference";
  title: Localized;
  authors: string;
  venue: Localized;
  year: number;
  peerReviewed: boolean;
  links?: { label: Localized; url: string }[];
};

type EducationItem = {
  id: string;
  startYear: number;
  endYear: number;
  degree: Localized;
  institution: Localized;
  department: Localized;
  note: Localized;
};

type OtherItem = {
  id: string;
  title: Localized;
  tag?: Localized;
  context?: Localized;
  timeframe?: string;
  date?: string;
  amount?: string;
  links?: { label: Localized; url: string }[];
  description: Localized;
};

const yujiBoku = Yuji_Boku({
  weight: "400",
  display: "swap",
});

type DataState = {
  profile: Profile;
  education: EducationItem[];
  publications: Publication[];
  others: OtherItem[];
};

const initialData: DataState = {
  profile: profileJson as Profile,
  education: educationJson as EducationItem[],
  publications: publicationsJson as Publication[],
  others: othersJson as OtherItem[],
};


const categoryLabels: Record<Publication["category"], Localized> = {
  journal: { ja: "ジャーナル", en: "Journals" },
  international_conference: {
    ja: "国際会議",
    en: "International Conferences",
  },
  domestic_conference: { ja: "国内学会", en: "Domestic Conferences" },
};

const sectionLabels: Record<string, Localized> = {
  about: { ja: "About", en: "About" },
  education: { ja: "学歴", en: "Education" },
  publications: { ja: "研究業績", en: "Publications" },
  others: { ja: "その他", en: "Others" },
};

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mb-6 text-2xl font-bold text-slate-900 sm:mb-8 sm:text-3xl">
      {children}
    </h2>
  );
}


function SocialIcon({ name }: { name: "twitter" | "facebook" | "github" }) {
  const commonProps = {
    className: "h-6 w-6",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": true,
  };

  if (name === "github") {
    return (
      <svg {...commonProps}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.086 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.137 3.004.404 2.291-1.552 3.297-1.23 3.297-1.23.654 1.653.242 2.874.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.624-5.48 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg {...commonProps}>
        <path d="M22.676 0H1.327C.593 0 0 .593 0 1.326v21.352C0 23.407.593 24 1.327 24h11.483v-9.294H9.847v-3.622h2.963V8.413c0-2.937 1.793-4.54 4.414-4.54 1.255 0 2.335.093 2.648.135v3.07h-1.82c-1.428 0-1.704.676-1.704 1.67v2.188h3.406l-.444 3.623h-2.962V24h5.805C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.676 0z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M3 3h2.79l5.15 6.91L16.8 3H21l-6.53 8.78L21.5 21h-3.3l-5.4-7.24L7.66 21H3l6.71-9.02L3 3Z" />
    </svg>
  );
}

function PeerReviewBadge({ lang }: { lang: Lang }) {
  return (
    <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-blue-800">
      {lang === "ja" ? "査読有" : "Peer-reviewed"}
    </span>
  );
}

function PublicationItem({ item, lang }: { item: Publication; lang: Lang }) {
  return (
    <li className="rounded-lg bg-white p-4">
      <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <span>• {item.venue[lang]}</span>
        <span>({item.year})</span>
        {item.peerReviewed && <PeerReviewBadge lang={lang} />}
      </div>
      <h4 className="mb-1 text-lg font-semibold text-slate-900">{item.title[lang]}</h4>
      <p className="mb-2 text-sm text-slate-600">{item.authors}</p>
      {item.links && (
        <div className="flex flex-wrap gap-2">
          {item.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {link.label[lang]} ↗
            </a>
          ))}
        </div>
      )}
    </li>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("ja");
  const [data, setData] = useState<DataState | null>(initialData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFn = typeof globalThis.fetch === "function" ? globalThis.fetch : null;
    if (!fetchFn) {
      return;
    }

    let isCancelled = false;

    const fetchJson = async <T,>(url: string): Promise<T> => {
      const res = await fetchFn(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }
      return res.json();
    };

    const loadData = async () => {
      try {
        const [profile, education, publications, others] = await Promise.all([
          fetchJson<Profile>("/api/data/profile"),
          fetchJson<EducationItem[]>("/api/data/education"),
          fetchJson<Publication[]>("/api/data/publications"),
          fetchJson<OtherItem[]>("/api/data/others"),
        ]);
        if (isCancelled) return;
        setData({ profile, education, publications, others });
      } catch (err) {
        console.error(err);
        setError("データの取得に失敗しました。");
      }
    };

    loadData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const publicationsByCategory = useMemo<Record<Publication["category"], Publication[]>>(() => {
    if (!data) {
      return { journal: [], international_conference: [], domestic_conference: [] };
    }
    return data.publications.reduce<Record<Publication["category"], Publication[]>>(
      (acc, item) => {
        acc[item.category] = [...(acc[item.category] ?? []), item];
        return acc;
      },
      { journal: [], international_conference: [], domestic_conference: [] },
    );
  }, [data]);

  const navItems = [
    { id: "about", label: sectionLabels.about[lang] },
    { id: "education", label: sectionLabels.education[lang] },
    { id: "publications", label: sectionLabels.publications[lang] },
    { id: "others", label: sectionLabels.others[lang] },
  ];

  const sectionTitle = (id: keyof typeof sectionLabels) => sectionLabels[id][lang];
  const pageTitle = data
    ? lang === "ja"
      ? `植田雄士のホームページ | ${data.profile.name[lang]}`
      : `Yuji Ueda's Page | ${data.profile.name[lang]}`
    : "Yuji Ueda's Page";

  if (!data) {
    return (
      <div className="min-h-screen bg-white text-slate-900">
        <title>{pageTitle}</title>
        <div className="flex h-screen items-center justify-center px-6 text-slate-600">
          {error ?? "Loading..."}
        </div>
      </div>
    );
  }

  const { profile, education, others } = data;

  const socialLinks = [
    { name: "github" as const, label: "GitHub", url: profile.social.github },
    { name: "facebook" as const, label: "Facebook", url: profile.social.facebook },
    { name: "twitter" as const, label: "X", url: profile.social.twitter },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <title>{pageTitle}</title>

      <header className="border-b border-slate-200 bg-white">
        <nav className="container mx-auto relative flex flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <a
            href="#"
            className={`nav-name ${lang === "en" ? "nav-name-en" : yujiBoku.className} text-xl font-bold text-slate-900 sm:text-2xl`}
          >
            {profile.name[lang]}
          </a>
          <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="font-medium text-slate-600 transition hover:text-blue-600"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="absolute right-4 top-4 flex items-center gap-2 text-sm sm:static sm:self-end sm:text-base lg:self-auto">
            {(["ja", "en"] as Lang[]).map((value) => (
              <button
                key={value}
                onClick={() => setLang(value)}
                className={`rounded-full px-3 py-1 text-sm sm:text-base ${lang === value ? "font-semibold text-blue-700" : "text-slate-600"}`}
                aria-pressed={lang === value}
              >
                {value.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden bg-white pb-2 pt-2 sm:pb-10 sm:pt-10 lg:pb-6 lg:pt-6">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid items-center gap-8 sm:gap-10 lg:gap-8 lg:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                  {lang === "ja" ? "Introduction" : "Introduction"}
                </p>
                <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  {profile.name[lang]}
                </h1>
                <p className="mb-2 text-lg font-medium text-slate-700 sm:text-xl lg:whitespace-nowrap lg:text-lg xl:text-xl">
                  {profile.title[lang]}
                </p>
                <p className="mb-6 text-base leading-relaxed text-slate-700 sm:text-lg">
                  {profile.bio[lang]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(profile.keywords)
                    ? profile.keywords
                    : profile.keywords[lang]
                  ).map((keyword) => (
                    <span
                      key={keyword}
                      className="text-sm font-medium text-slate-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6 rounded-lg bg-white p-5 sm:p-8">
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {lang === "ja" ? "研究分野" : "Research Areas"}
                  </h3>
                  <p className="text-base text-slate-700 sm:text-lg">
                    {profile.researchAreas[lang].join(" / ")}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {lang === "ja" ? "拠点" : "Location"}
                  </h3>
                  <p className="text-base text-slate-700 sm:text-lg">
                    {typeof profile.location === "string"
                      ? profile.location
                      : profile.location[lang]}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {lang === "ja" ? "メール" : "Email"}
                  </h3>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-base font-medium text-blue-600 hover:underline sm:text-lg"
                  >
                    {profile.email}
                  </a>
                </div>
                <div className="flex gap-4 pt-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 transition hover:text-blue-600"
                      aria-label={social.label}
                    >
                      <SocialIcon name={social.name} />
                      <span className="sr-only">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-white pb-6 pt-2 sm:pb-8 sm:pt-8 lg:pb-8 lg:pt-6">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionTitle id="about-title">{sectionTitle("about")}</SectionTitle>
            <div className="space-y-4 text-base leading-relaxed text-slate-700 sm:text-lg">
              <p className="font-medium">{profile.title[lang]}</p>
              <p>{profile.bio[lang]}</p>
            </div>
          </div>
        </section>

        <section id="education" className="bg-white py-6 sm:py-8 lg:py-8">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionTitle id="education-title">{sectionTitle("education")}</SectionTitle>
            <ul className="space-y-2 sm:space-y-3">
              {education.map((item) => (
                <li key={item.id} className="rounded-lg bg-white p-2 sm:p-3">
                  <div className="mb-1 text-sm font-semibold text-slate-500">
                    {item.startYear} — {item.endYear}
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-slate-900 sm:text-xl">
                    {item.degree[lang]}
                  </h3>
                  <p className="mb-1 text-base text-slate-700 sm:text-lg">
                    {item.institution[lang]}
                  </p>
                  <p className="mb-1 text-slate-600">{item.department[lang]}</p>
                  <p className="text-sm italic text-slate-500">{item.note[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="publications" className="bg-white py-6 sm:py-8 lg:py-8">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionTitle id="publications-title">{sectionTitle("publications")}</SectionTitle>
            <div className="space-y-12">
              {(Object.keys(publicationsByCategory) as Publication["category"][]).map((category) => (
                <div key={category}>
                  <h3 className="mb-4 text-xl font-bold text-slate-800 sm:text-2xl">
                    {categoryLabels[category][lang]}
                  </h3>
                  <ul className="space-y-4">
                    {publicationsByCategory[category].map((item) => (
                      <PublicationItem key={item.id} item={item} lang={lang} />
                    ))}
                    {publicationsByCategory[category].length === 0 && (
                      <li className="rounded-lg bg-white p-4 text-center text-slate-500">
                        {lang === "ja" ? "準備中" : "Coming soon"}
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="others" className="bg-white py-6 sm:py-8 lg:py-8">
          <div className="container mx-auto px-4 sm:px-6">
            <SectionTitle id="others-title">{sectionTitle("others")}</SectionTitle>

            <ul className="space-y-6">
              {others.map((item) => (
                <li key={item.id} className="rounded-lg bg-white p-4 sm:p-6">
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    {item.tag && (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {item.tag[lang]}
                      </span>
                    )}
                    <h4 className="text-lg font-semibold text-slate-900 sm:text-xl">
                      {item.title[lang]}
                    </h4>
                  </div>
                  <div className="mb-2 flex flex-wrap gap-3 text-sm text-slate-600">
                    {item.context && <span>{item.context[lang]}</span>}
                    {item.timeframe && <span>{item.timeframe}</span>}
                    {item.date && <span>{item.date}</span>}
                    {item.amount && <span className="font-semibold text-blue-700">{item.amount}</span>}
                  </div>
                  <p className="mb-3 text-slate-700">{item.description[lang]}</p>
                  {item.links && (
                    <div className="flex flex-wrap gap-2">
                      {item.links.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          {link.label[lang]} ↗
                        </a>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

      </main>

      <footer className="bg-white py-8 text-slate-800">
        <div className="container mx-auto px-4 text-center sm:px-6">
          <p className="mb-4">
            © {new Date().getFullYear()} {profile.name[lang]}
          </p>
        </div>
      </footer>
    </div>
  );
}
