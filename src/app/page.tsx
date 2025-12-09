"use client";

import { useMemo, useState } from "react";

type Lang = "ja" | "en";
type Localized = { ja: string; en: string };

type Publication = {
  id: string;
  category: "journal" | "international_conference" | "domestic_conference";
  title: Localized;
  authors: string;
  venue: Localized;
  year: number;
  peerReviewed: boolean;
  links?: { label: Localized; url: string }[];
  description: Localized;
};

const profile = {
  name: { ja: "植田 雄士", en: "Yuji Ueda" },
  title: {
    ja: "XX大学YY研究科 助教",
    en: "Assistant Professor, YY Graduate School, XX University",
  },
  affiliation: {
    ja: "ZZ専攻 / 情報科学分野",
    en: "Department of ZZ, Information Science",
  },
  researchAreas: {
    ja: ["機械学習", "自然言語処理", "情報検索"],
    en: ["Machine Learning", "Natural Language Processing", "Information Retrieval"],
  },
  keywords: ["Representation Learning", "Multimodal", "Evaluation", "Academic NLP"],
  bio: {
    ja: "機械学習と言語モデルを軸に、学術情報処理や評価指標の設計に取り組んでいます。大規模モデルと人間の協働をどのようにデザインするか、社会的インパクトに配慮した研究を進めています。",
    en: "I study machine learning and language models, focusing on scholarly NLP, evaluation design, and human–AI collaboration. My work explores how large models can be deployed responsibly with attention to social impact.",
  },
  email: "example@uni.ac.jp",
  location: "Tokyo, Japan",
  social: {
    twitter: "https://twitter.com/xxxx",
    facebook: "https://www.facebook.com/xxxx",
    github: "https://github.com/xxxx",
  },
};

const education = [
  {
    id: "phd",
    startYear: 2021,
    endYear: 2024,
    degree: { ja: "博士（情報科学）", en: "Ph.D. in Information Science" },
    institution: {
      ja: "XX大学 YY研究科",
      en: "YY Graduate School, XX University",
    },
    department: { ja: "ZZ専攻", en: "Department of ZZ" },
    note: { ja: "指導教員: AAA 教授", en: "Supervisor: Prof. AAA" },
  },
  {
    id: "ms",
    startYear: 2019,
    endYear: 2021,
    degree: { ja: "修士（情報科学）", en: "M.S. in Information Science" },
    institution: {
      ja: "XX大学 YY研究科",
      en: "YY Graduate School, XX University",
    },
    department: { ja: "ZZ専攻", en: "Department of ZZ" },
    note: { ja: "研究テーマ: 言語モデルの評価", en: "Topic: Evaluation of language models" },
  },
];

const publications: Publication[] = [
  {
    id: "paper-001",
    category: "journal",
    title: { ja: "大規模言語モデルの評価指標設計", en: "Designing Evaluation Metrics for Large Language Models" },
    authors: "Yuji Ueda, First Author, Colleagues",
    venue: { ja: "情報処理学会論文誌", en: "Journal of Information Processing Society of Japan" },
    year: 2024,
    peerReviewed: true,
    links: [
      { label: { ja: "出版社サイト", en: "Publisher" }, url: "https://example.com" },
      { label: { ja: "DOI", en: "DOI" }, url: "https://doi.org/xxxx" },
    ],
    description: {
      ja: "言語モデルの自動評価指標を体系化し、信頼できる実験プロトコルを提案。複数のベンチマークで再現性と妥当性を検証。",
      en: "Systematizes automatic metrics for language models and proposes reliable experimental protocols, validated across multiple benchmarks.",
    },
  },
  {
    id: "paper-002",
    category: "international_conference",
    title: {
      ja: "学術論文検索のための多言語表現学習",
      en: "Multilingual Representation Learning for Scholarly Paper Search",
    },
    authors: "First Author, Yuji Ueda, Team",
    venue: { ja: "ACL", en: "ACL" },
    year: 2023,
    peerReviewed: true,
    links: [{ label: { ja: "arXiv", en: "arXiv" }, url: "https://arxiv.org/xxxx" }],
    description: {
      ja: "多言語の学術コーパスで訓練したエンコーダを用い、クロスリンガルな論文検索性能を向上。",
      en: "Improves cross-lingual paper retrieval with encoders trained on multilingual scholarly corpora.",
    },
  },
  {
    id: "paper-003",
    category: "domestic_conference",
    title: { ja: "研究者向けインタラクティブ要約の検討", en: "Interactive Summarization for Academic Workflows" },
    authors: "Yuji Ueda, Collaborators",
    venue: { ja: "言語処理学会", en: "NLP Japan" },
    year: 2022,
    peerReviewed: false,
    links: [{ label: { ja: "スライド", en: "Slides" }, url: "https://example.com/slides" }],
    description: {
      ja: "研究者が実務で使える要約システムのプロトタイプを設計し、ユーザ調査を実施。",
      en: "Designs a prototype summarization tool for researchers and reports findings from user studies.",
    },
  },
];

const others = {
  grants: [
    {
      id: "grant-001",
      title: { ja: "学術情報処理のための責任あるAI基盤", en: "Responsible AI Platform for Scholarly NLP" },
      funder: { ja: "日本学術振興会 科研費", en: "JSPS KAKENHI" },
      role: { ja: "研究代表者", en: "Principal Investigator" },
      startYear: 2022,
      endYear: 2025,
      amount: "500万円",
      links: [{ label: { ja: "プロジェクトページ", en: "Project page" }, url: "https://example.com" }],
      description: {
        ja: "大規模モデルを活用した学術情報処理の研究基盤を整備し、公開データセットと評価手法を提供。",
        en: "Building a research platform for scholarly NLP with large models, releasing datasets and evaluation protocols.",
      },
    },
  ],
  media: [
    {
      id: "media-001",
      title: { ja: "生成AIと学術研究の未来", en: "Future of Generative AI in Academic Research" },
      outlet: { ja: "科学技術ジャーナル", en: "Science & Tech Journal" },
      date: "2024-04-01",
      links: [{ label: { ja: "記事を見る", en: "Read article" }, url: "https://example.com/interview" }],
      description: {
        ja: "研究現場での生成AI活用や、倫理的な運用についてコメント。",
        en: "Comments on practical use of generative AI in research and the associated ethical considerations.",
      },
    },
  ],
};

const contact = {
  email: profile.email,
  addressJa: "〒000-0000 東京都XX区1-2-3 XX大学YY研究科",
  addressEn: "YY Graduate School, XX University, 1-2-3 Tokyo",
  labUrl: "https://example.com/lab",
};

const categoryLabels: Record<Publication["category"], Localized> = {
  journal: { ja: "Journals", en: "Journals" },
  international_conference: { ja: "International Conferences", en: "International Conferences" },
  domestic_conference: { ja: "Domestic Conferences", en: "Domestic Conferences" },
};

const sectionLabels: Record<string, Localized> = {
  about: { ja: "About", en: "About" },
  education: { ja: "Education", en: "Education" },
  publications: { ja: "Publications", en: "Publications" },
  others: { ja: "Others", en: "Others" },
  contact: { ja: "Contact", en: "Contact" },
};

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <div id={id} className="mb-8 flex items-center gap-2">
      <div className="h-6 w-1 rounded-full bg-blue-500" />
      <h2 className="text-2xl font-semibold text-slate-900">{children}</h2>
    </div>
  );
}

function PeerReviewBadge({ lang }: { lang: Lang }) {
  return (
    <span className="inline-block rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
      {lang === "ja" ? "査読有" : "Peer-reviewed"}
    </span>
  );
}

function PublicationItem({ item, lang }: { item: Publication; lang: Lang }) {
  return (
    <li className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold text-blue-700">{item.venue[lang]}</p>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>{item.year}</span>
          {item.peerReviewed && <PeerReviewBadge lang={lang} />}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-900">{item.title[lang]}</h3>
      <p className="text-sm text-slate-700">{item.authors}</p>
      <p className="text-sm text-slate-600">{item.description[lang]}</p>
      {item.links && (
        <div className="flex flex-wrap gap-3 text-sm">
          {item.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-3 py-1 font-medium text-blue-700 transition hover:border-blue-500 hover:text-blue-800"
            >
              {link.label[lang]}
              <span aria-hidden>↗</span>
            </a>
          ))}
        </div>
      )}
    </li>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("ja");

  const publicationsByCategory = useMemo(() => {
    return publications.reduce<Record<Publication["category"], Publication[]>>(
      (acc, item) => {
        acc[item.category] = [...(acc[item.category] ?? []), item];
        return acc;
      },
      { journal: [], international_conference: [], domestic_conference: [] },
    );
  }, []);

  const navItems = [
    { id: "about", label: sectionLabels.about[lang] },
    { id: "education", label: sectionLabels.education[lang] },
    { id: "publications", label: sectionLabels.publications[lang] },
    { id: "others", label: sectionLabels.others[lang] },
    { id: "contact", label: sectionLabels.contact[lang] },
  ];

  const sectionTitle = (id: keyof typeof sectionLabels) => sectionLabels[id][lang];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-blue-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex flex-col">
            <span className="text-xs font-semibold tracking-wide text-blue-600">
              {lang === "ja" ? "研究者ホームページ" : "Research Portfolio"}
            </span>
            <span className="text-lg font-bold text-slate-900">{profile.name[lang]}</span>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden items-center gap-4 text-sm font-medium text-slate-700 md:flex">
              {navItems.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="transition hover:text-blue-700">
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1 text-xs font-semibold">
              {(["ja", "en"] as Lang[]).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setLang(value)}
                  className={`rounded-full px-3 py-1 transition ${lang === value ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-white"}`}
                  aria-pressed={lang === value}
                >
                  {value.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-700">
              <a className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 transition hover:border-blue-500 hover:text-blue-800" href={profile.social.twitter} target="_blank" rel="noreferrer">
                X
              </a>
              <a className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 transition hover:border-blue-500 hover:text-blue-800" href={profile.social.facebook} target="_blank" rel="noreferrer">
                Fb
              </a>
              <a className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 transition hover:border-blue-500 hover:text-blue-800" href={profile.social.github} target="_blank" rel="noreferrer">
                Gh
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-12">
        <section className="grid gap-8 rounded-2xl bg-white px-6 py-10 shadow-lg shadow-blue-100 md:grid-cols-[1.4fr,1fr] md:px-10">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              {lang === "ja" ? "Introduction" : "Introduction"}
            </p>
            <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-4xl">{profile.name[lang]}</h1>
            <p className="text-lg font-semibold text-slate-800">{profile.title[lang]}</p>
            <p className="text-sm text-slate-600">{profile.affiliation[lang]}</p>
            <p className="text-base leading-relaxed text-slate-700">{profile.bio[lang]}</p>
            <div className="flex flex-wrap gap-2">
              {profile.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50 px-5 py-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {lang === "ja" ? "研究分野" : "Research Areas"}
              </p>
              <p className="text-sm text-slate-800">{profile.researchAreas[lang].join(" / ")}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {lang === "ja" ? "拠点" : "Location"}
              </p>
              <p className="text-sm text-slate-800">{profile.location}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {lang === "ja" ? "メール" : "Email"}
              </p>
              <a className="text-sm font-semibold text-blue-700 hover:underline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </div>
          </div>
        </section>

        <section className="pt-16">
          <SectionTitle id="about">{sectionTitle("about")}</SectionTitle>
          <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-slate-800">{profile.title[lang]}</p>
              <p className="text-sm text-slate-600">{profile.affiliation[lang]}</p>
            </div>
            <p className="text-base leading-relaxed text-slate-700">{profile.bio[lang]}</p>
          </div>
        </section>

        <section className="pt-16">
          <SectionTitle id="education">{sectionTitle("education")}</SectionTitle>
          <div className="grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <div key={item.id} className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>
                    {item.startYear} — {item.endYear}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {item.degree[lang]}
                  </span>
                </div>
                <p className="text-base font-semibold text-slate-900">{item.institution[lang]}</p>
                <p className="text-sm text-slate-600">{item.department[lang]}</p>
                <p className="text-sm text-slate-600">{item.note[lang]}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-16">
          <SectionTitle id="publications">{sectionTitle("publications")}</SectionTitle>
          <div className="flex flex-col gap-8">
            {(Object.keys(publicationsByCategory) as Publication["category"][]).map((category) => (
              <div key={category} className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-800">{categoryLabels[category][lang]}</h3>
                <ul className="space-y-4">
                  {publicationsByCategory[category].map((item) => (
                    <PublicationItem key={item.id} item={item} lang={lang} />
                  ))}
                  {publicationsByCategory[category].length === 0 && (
                    <li className="rounded-lg border border-dashed border-slate-200 bg-white p-4 text-sm text-slate-500">
                      {lang === "ja" ? "準備中" : "Coming soon"}
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="pt-16">
          <SectionTitle id="others">{sectionTitle("others")}</SectionTitle>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                {lang === "ja" ? "Grants & Funding" : "Grants & Funding"}
              </h3>
              <div className="space-y-4">
                {others.grants.map((grant) => (
                  <div key={grant.id} className="flex flex-col gap-2 rounded-md border border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-700">
                      <span className="font-semibold text-blue-800">{grant.title[lang]}</span>
                      <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-blue-700">
                        {grant.startYear}–{grant.endYear}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700">
                      {grant.funder[lang]} / {grant.role[lang]}
                    </p>
                    <p className="text-sm text-slate-700">{grant.amount}</p>
                    <p className="text-sm text-slate-700">{grant.description[lang]}</p>
                    {grant.links && (
                      <div className="flex flex-wrap gap-2 text-sm">
                        {grant.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-white px-3 py-1 font-semibold text-blue-700 transition hover:border-blue-500"
                          >
                            {link.label[lang]}
                            <span aria-hidden>↗</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                {lang === "ja" ? "Media / Interviews" : "Media / Interviews"}
              </h3>
              <div className="space-y-4">
                {others.media.map((media) => (
                  <div key={media.id} className="flex flex-col gap-2 rounded-md border border-slate-100 bg-slate-50 p-4">
                    <div className="flex items-center justify-between text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">{media.title[lang]}</span>
                      <span className="text-xs text-slate-500">{media.date}</span>
                    </div>
                    <p className="text-sm text-slate-700">{media.outlet[lang]}</p>
                    <p className="text-sm text-slate-700">{media.description[lang]}</p>
                    {media.links && (
                      <div className="flex flex-wrap gap-2 text-sm">
                        {media.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1 font-semibold text-blue-700 transition hover:border-blue-500"
                          >
                            {link.label[lang]}
                            <span aria-hidden>↗</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pt-16">
          <SectionTitle id="contact">{sectionTitle("contact")}</SectionTitle>
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-base font-semibold text-slate-900">
                {lang === "ja" ? "ご連絡はこちらから" : "Get in touch"}
              </p>
              <p className="text-sm text-slate-600">{lang === "ja" ? contact.addressJa : contact.addressEn}</p>
              <a className="text-sm font-semibold text-blue-700 hover:underline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              <div>
                <a className="text-sm font-semibold text-blue-700 hover:underline" href={contact.labUrl} target="_blank" rel="noreferrer">
                  {lang === "ja" ? "研究室ページ" : "Lab page"} ↗
                </a>
              </div>
            </div>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700"
            >
              {lang === "ja" ? "メールを送る" : "Email me"}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} {profile.name[lang]}</span>
          <div className="flex items-center gap-3 text-blue-700">
            <a className="transition hover:underline" href={profile.social.twitter} target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a className="transition hover:underline" href={profile.social.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a className="transition hover:underline" href={profile.social.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
