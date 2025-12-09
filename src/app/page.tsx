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

const others = {
  grants: [
    {
      id: "grant-001",
      title: {
        ja: "学術情報処理のための責任あるAI基盤",
        en: "Responsible AI Platform for Scholarly NLP",
      },
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
      title: {
        ja: "生成AIと学術研究の未来",
        en: "Future of Generative AI in Academic Research",
      },
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

  const sectionTitle = (id: keyof typeof sectionLabels) => sectionLabels[id][lang];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <title>
        {lang === "ja" ? "研究者ホームページ" : "Research Portfolio"} |{" "}
        {profile.name[lang]}
      </title>

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
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 transition hover:text-blue-600"
                    aria-label="Twitter"
                  >
                    X
                  </a>
                  <a
                    href={profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 transition hover:text-blue-600"
                    aria-label="Facebook"
                  >
                    Fb
                  </a>
                  <a
                    href={profile.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 transition hover:text-blue-600"
                    aria-label="GitHub"
                  >
                    Gh
                  </a>
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

            <div className="mb-12">
              <h3 className="mb-4 text-2xl font-bold text-slate-800">
                {lang === "ja" ? "Grants & Funding" : "Grants & Funding"}
              </h3>
              <ul className="space-y-6">
                {others.grants.map((grant) => (
                  <li key={grant.id} className="rounded-lg bg-white p-6">
                    <h4 className="mb-2 text-xl font-semibold text-slate-900">
                      {grant.title[lang]} ({grant.startYear}–{grant.endYear})
                    </h4>
                    <p className="mb-2 text-sm font-medium text-slate-600">
                      {grant.funder[lang]} / {grant.role[lang]}
                    </p>
                    <p className="mb-2 text-sm font-semibold text-blue-700">{grant.amount}</p>
                    <p className="mb-3 text-slate-700">{grant.description[lang]}</p>
                    {grant.links && (
                      <div className="flex flex-wrap gap-2">
                        {grant.links.map((link) => (
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

            <div>
              <h3 className="mb-4 text-2xl font-bold text-slate-800">
                {lang === "ja" ? "Media / Interviews" : "Media / Interviews"}
              </h3>
              <ul className="space-y-6">
                {others.media.map((media) => (
                  <li key={media.id} className="rounded-lg bg-white p-6">
                    <h4 className="mb-2 text-xl font-semibold text-slate-900">
                      {media.title[lang]} ({media.date})
                    </h4>
                    <p className="mb-2 text-sm font-medium text-slate-600">{media.outlet[lang]}</p>
                    <p className="mb-3 text-slate-700">{media.description[lang]}</p>
                    {media.links && (
                      <div className="flex flex-wrap gap-2">
                        {media.links.map((link) => (
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
            <a
              href={profile.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-blue-600"
            >
              Twitter
            </a>
            <a
              href={profile.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-blue-600"
            >
              Facebook
            </a>
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-blue-600"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
