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

const profile = {
  name: { ja: "植田 雄士", en: "Yuji Ueda" },
  title: {
    ja: "奈良先端科学技術大学院大学　ユビキタスコンピューティングシステム研究室",
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
    twitter: "https://twitter.com/yujipinzu0417",
    facebook: "https://www.facebook.com/p/植田雄士-61577329245255/",
    github: "https://github.com/yujiponzu",
  },
};

const education = [
  {
    id: "phd",
    startYear: 2021,
    endYear: 2024,
    degree: { ja: "博士(情報科学)", en: "Ph.D. in Information Science" },
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
    degree: { ja: "修士(情報科学)", en: "M.S. in Information Science" },
    institution: {
      ja: "XX大学 YY研究科",
      en: "YY Graduate School, XX University",
    },
    department: { ja: "ZZ専攻", en: "Department of ZZ" },
    note: {
      ja: "研究テーマ: 言語モデルの評価",
      en: "Topic: Evaluation of language models",
    },
  },
];

const publications: Publication[] = [
  {
    id: "paper-001",
    category: "journal",
    title: {
      ja: "大規模言語モデルの評価指標設計",
      en: "Designing Evaluation Metrics for Large Language Models",
    },
    authors: "Yuji Ueda, First Author, Colleagues",
    venue: {
      ja: "情報処理学会論文誌",
      en: "Journal of Information Processing Society of Japan",
    },
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
    title: {
      ja: "研究者向けインタラクティブ要約の検討",
      en: "Interactive Summarization for Academic Workflows",
    },
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

const others: OtherItem[] = [
  {
    id: "grant-001",
    title: {
      ja: "学術情報処理のための責任あるAI基盤",
      en: "Responsible AI Platform for Scholarly NLP",
    },
    tag: { ja: "Grant", en: "Grant" },
    context: { ja: "日本学術振興会 科研費 / 研究代表者", en: "JSPS KAKENHI / Principal Investigator" },
    timeframe: "2022–2025",
    amount: "500万円",
    links: [{ label: { ja: "プロジェクトページ", en: "Project page" }, url: "https://example.com" }],
    description: {
      ja: "大規模モデルを活用した学術情報処理の研究基盤を整備し、公開データセットと評価手法を提供。",
      en: "Building a research platform for scholarly NLP with large models, releasing datasets and evaluation protocols.",
    },
  },
  {
    id: "media-001",
    title: {
      ja: "生成AIと学術研究の未来",
      en: "Future of Generative AI in Academic Research",
    },
    tag: { ja: "Media", en: "Media" },
    context: { ja: "科学技術ジャーナル", en: "Science & Tech Journal" },
    date: "2024-04-01",
    links: [{ label: { ja: "記事を見る", en: "Read article" }, url: "https://example.com/interview" }],
    description: {
      ja: "研究現場での生成AI活用や、倫理的な運用についてコメント。",
      en: "Comments on practical use of generative AI in research and the associated ethical considerations.",
    },
  },
];

const contact = {
  email: profile.email,
  addressJa: "〒000-0000 東京都XX区1-2-3 XX大学YY研究科",
  addressEn: "YY Graduate School, XX University, 1-2-3 Tokyo",
  labUrl: "https://example.com/lab",
};

const categoryLabels: Record<Publication["category"], Localized> = {
  journal: { ja: "Journals", en: "Journals" },
  international_conference: {
    ja: "International Conferences",
    en: "International Conferences",
  },
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
    <h2 id={id} className="mb-8 text-3xl font-bold text-slate-900">
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
      <p className="mb-3 text-sm leading-relaxed text-slate-700">{item.description[lang]}</p>
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

  const socialLinks = [
    { name: "github" as const, label: "GitHub", url: profile.social.github },
    { name: "facebook" as const, label: "Facebook", url: profile.social.facebook },
    { name: "twitter" as const, label: "X", url: profile.social.twitter },
  ];

  const sectionTitle = (id: keyof typeof sectionLabels) => sectionLabels[id][lang];
  const pageTitle =
    lang === "ja"
      ? `研究者ホームページ | ${profile.name[lang]}`
      : `Research Portfolio | ${profile.name[lang]}`;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <title>{pageTitle}</title>

      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <nav className="container mx-auto flex items-center justify-between px-6 py-4">
          <a href="#" className="text-xl font-bold text-slate-900">
            {profile.name[lang]}
          </a>
          <div className="flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {(["ja", "en"] as Lang[]).map((value) => (
              <button
                key={value}
                onClick={() => setLang(value)}
                className={`rounded-full px-3 py-1 ${lang === value ? "text-blue-700 font-semibold" : "text-slate-600"}`}
                aria-pressed={lang === value}
              >
                {value.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden bg-white py-24">
          <div className="container mx-auto px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600">
                  {lang === "ja" ? "Introduction" : "Introduction"}
                </p>
                <h1 className="mb-4 text-5xl font-bold leading-tight text-slate-900">
                  {profile.name[lang]}
                </h1>
                <p className="mb-2 text-xl font-medium text-slate-700">{profile.title[lang]}</p>
                <p className="mb-6 text-lg text-slate-600">{profile.affiliation[lang]}</p>
                <p className="mb-6 text-lg leading-relaxed text-slate-700">{profile.bio[lang]}</p>
                <div className="flex flex-wrap gap-2">
                  {profile.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="text-sm font-medium text-slate-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-6 rounded-lg bg-white p-8">
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {lang === "ja" ? "研究分野" : "Research Areas"}
                  </h3>
                  <p className="text-lg text-slate-700">
                    {profile.researchAreas[lang].join(" / ")}
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {lang === "ja" ? "拠点" : "Location"}
                  </h3>
                  <p className="text-lg text-slate-700">{profile.location}</p>
                </div>
                <div>
                  <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                    {lang === "ja" ? "メール" : "Email"}
                  </h3>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-lg font-medium text-blue-600 hover:underline"
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

        <section id="about" className="bg-white py-16">
          <div className="container mx-auto px-6">
            <SectionTitle id="about-title">{sectionTitle("about")}</SectionTitle>
            <div className="space-y-4 text-lg leading-relaxed text-slate-700">
              <p className="font-medium">{profile.title[lang]}</p>
              <p>{profile.affiliation[lang]}</p>
              <p>{profile.bio[lang]}</p>
            </div>
          </div>
        </section>

        <section id="education" className="bg-white py-16">
          <div className="container mx-auto px-6">
            <SectionTitle id="education-title">{sectionTitle("education")}</SectionTitle>
            <ul className="space-y-6">
              {education.map((item) => (
                <li key={item.id} className="rounded-lg bg-white p-6">
                  <div className="mb-2 text-sm font-semibold text-slate-500">
                    {item.startYear} — {item.endYear}
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-slate-900">{item.degree[lang]}</h3>
                  <p className="mb-1 text-lg text-slate-700">{item.institution[lang]}</p>
                  <p className="mb-2 text-slate-600">{item.department[lang]}</p>
                  <p className="text-sm italic text-slate-500">{item.note[lang]}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="publications" className="bg-white py-16">
          <div className="container mx-auto px-6">
            <SectionTitle id="publications-title">{sectionTitle("publications")}</SectionTitle>
            <div className="space-y-12">
              {(Object.keys(publicationsByCategory) as Publication["category"][]).map((category) => (
                <div key={category}>
                  <h3 className="mb-4 text-2xl font-bold text-slate-800">
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

        <section id="others" className="bg-white py-16">
          <div className="container mx-auto px-6">
            <SectionTitle id="others-title">{sectionTitle("others")}</SectionTitle>

            <ul className="space-y-6">
              {others.map((item) => (
                <li key={item.id} className="rounded-lg bg-white p-6">
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    {item.tag && (
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {item.tag[lang]}
                      </span>
                    )}
                    <h4 className="text-xl font-semibold text-slate-900">{item.title[lang]}</h4>
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

        <section id="contact" className="bg-white py-16">
          <div className="container mx-auto px-6">
            <SectionTitle id="contact-title">{sectionTitle("contact")}</SectionTitle>
            <div className="rounded-lg bg-white p-8">
              <h3 className="mb-4 text-2xl font-bold text-slate-900">
                {lang === "ja" ? "ご連絡はこちらから" : "Get in touch"}
              </h3>
              <p className="mb-4 text-slate-700">
                {lang === "ja" ? contact.addressJa : contact.addressEn}
              </p>
              <p className="mb-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-lg font-medium text-blue-600 hover:underline"
                >
                  {contact.email}
                </a>
              </p>
              <p className="mb-6">
                <a
                  href={contact.labUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blue-600 hover:underline"
                >
                  {lang === "ja" ? "研究室ページ" : "Lab page"} ↗
                </a>
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="inline-block rounded-lg px-6 py-3 font-semibold text-blue-700"
              >
                {lang === "ja" ? "メールを送る" : "Email me"}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white py-8 text-slate-800">
        <div className="container mx-auto px-6 text-center">
          <p className="mb-4">
            © {new Date().getFullYear()} {profile.name[lang]}
          </p>
          <div className="flex justify-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-blue-600"
                aria-label={social.label}
              >
                <SocialIcon name={social.name} />
                <span className="sr-only">{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
