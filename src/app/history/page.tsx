import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import styles from "./history.module.css";

export const metadata: Metadata = {
  title: "History · Ben Speedy",
  description:
    "Curriculum vitae. Architect with over 10 years' experience across residential and exhibition design.",
};

export default function HistoryPage() {
  return (
    <SiteChrome
      topLeft="BS · History · 2015–2026"
      bottomLeft="Scroll for full history"
      bottomRight="CV · Updated May 2026"
    >
      <div className={`${styles.gridBg} ${styles.page}`}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <div className={styles.heroEyebrow}>
              Curriculum Vitae · Benjamin Thomas Thorn Speedy
            </div>
            <h1 className={styles.heroTitle}>Ben Speedy</h1>
            <p className={styles.heroIntro}>
              Architect with over 10 years&apos; experience delivering residential projects ranging from high-end bespoke homes to cost-sensitive investment developments. I currently lead The Development Collective, a development-led architecture studio where I work across site assessment, feasibility, planning, design, and delivery.
            </p>
            <div className={styles.heroContact}>
              <a href="mailto:bnspeedy@gmail.com">bnspeedy@gmail.com</a>
              <a href="tel:+61487958188">+61 487 958 188</a>
              <span>Auckland / March 1994</span>
            </div>
          </div>

          {/* Work Experience */}
          <div className={styles.timelineGrid}>
            <div className={styles.sectionTitle}>Work Experience</div>
            <div className={styles.sectionContent}>
              <Entry
                dates="Oct 2020 — Current"
                title="Design Director"
                org="The Development Collective · Auckland"
              >
                <p>
                  The Development Collective is a boutique architecture and development firm that I lead, delivering high-quality residential and commercial projects for clients and internal ventures.
                </p>
                <p>
                  <strong>Key Roles:</strong>
                </p>
                <ul>
                  <li>
                    <strong>Studio Leadership:</strong> Lead studio operations and project delivery across multiple concurrent projects, balancing design leadership with commercial, program, and resourcing requirements.
                  </li>
                  <li>
                    <strong>Client and Stakeholder Engagement:</strong> As the primary point of contact, I foster strong relationships with clients and consultants, ensuring effective communication throughout each project. I drive the delivery of community-focused, site-responsive designs that align with market demands.
                  </li>
                  <li>
                    <strong>Design and Sustainability:</strong> I lead the firm&apos;s design initiatives, focusing on inventive, sustainable solutions that reflect both client objectives and our commitment to thoughtful architecture. I oversee all design phases, from concept through to completion.
                  </li>
                  <li>
                    <strong>Financial Management:</strong> Lead development feasibility planning across early site assessment and scheme testing, including cost modelling, yield analysis, cash flow forecasting, and sensitivity testing to inform design, approvals, and delivery decisions.
                  </li>
                  <li>
                    <strong>Team Leadership and Mentorship:</strong> I manage a team of junior architects, guiding them in sustainable design, project management, and creative problem-solving.
                  </li>
                </ul>
              </Entry>

              <Entry
                dates="Oct 2019 — Sept 2020"
                title="Architecture Consultant"
                org="Kossmanndejong · Amsterdam + Dubai"
              >
                <p>
                  Kossmanndejong is an exhibition-focused design firm, world-renowned for their work for museums and galleries. KDJ brought me on to help realise their project for the UAE Pavilion at the World Expo, a $500m+ design by Calatrava.
                </p>
                <p>
                  I was part of a two-person team responsible for aligning the exhibition design intent with the ongoing construction of the building, whilst managing prototyping and detailed design development across the exhibition team of various designers and technical consultants.
                </p>
              </Entry>

              <Entry
                dates="Jan 2016 — Jun 2019"
                title="Graduate Architect"
                org="Jessop Architects · Auckland"
              >
                <p>
                  Working on high-end residential new build and renovation projects, including both small and larger scales. Responsible for projects through all design stages from concept development to consents and onsite administration. Client facing and management, progressed to managing all concept work for the studio.
                </p>
              </Entry>

              <Entry
                dates="2015"
                title="Graduate Position"
                org="Athfield Architects · Wellington + Auckland"
              >
                <p>
                  Working on a long-term master plan for the Motat museum next to the Zoo in Auckland. My responsibilities included building both an extensive context model of Western Springs and a detailed existing and proposed digital model of the sites. Also produced the proposals to be used at meetings with the client.
                </p>
              </Entry>

              <Entry
                dates="2014 — 2016"
                title="Student Tutor"
                org="Victoria University School of Architecture · Wellington"
              >
                <p>
                  I tutored in both my third, fourth and fifth years at VUW. 15 hours a week tutoring first and second year students studying design communication, a core paper in the BArch degree. Focusing on developing the students&apos; presentation techniques and design methods. I have also tutored second year students in the core structure course, with heavy focus on engineering equations and NZ building codes and standards.
                </p>
              </Entry>

              <Entry
                dates="2011 — 2012 (3 months)"
                title="Student Internship"
                org="SGA, Strachan Group Architects · Wellington"
              >
                <p>
                  Responsibilities included taking minutes on site visits, developing and creating the firm&apos;s stamp, model making. Every Friday (8hrs) once a week for a full term whilst at high school.
                </p>
              </Entry>
            </div>
          </div>

          {/* Education */}
          <div className={styles.timelineGrid}>
            <div className={styles.sectionTitle}>Education</div>
            <div className={styles.sectionContent}>
              <Entry
                dates="Feb 2015 — Feb 2017"
                title="Master of Architecture (Prof. Hons)"
                org="Victoria University School of Architecture · Wellington"
              />
              <Entry
                dates="2012 — 2015"
                title="Bachelor of Architectural Studies"
                org="Victoria University School of Architecture · Wellington"
              />
            </div>
          </div>

          {/* Notable Achievements */}
          <div className={styles.timelineGrid}>
            <div className={styles.sectionTitle}>Notable Achievements</div>
            <div className={styles.sectionContent}>
              <div className={styles.achievements}>
                <div className={styles.achievement}>
                  <div className={styles.achievementYear}>2022</div>
                  <h3 className={styles.achievementTitle}>Winner of The Block NZ</h3>
                  <div className={styles.achievementBody}>
                    A two-time contestant on The Block NZ, first in 2018 and invited back in 2022 as a fan favorite, where I was crowned champion. During the season, we set a record for the most room wins and earned the coveted title of &quot;Best House&quot; in the finale. While the experience might seem a bit unconventional, I look back on it fondly. It provided invaluable experience in working under immense pressure with incredibly tight budgets, which has greatly influenced my approach to architecture and design and client relations.
                  </div>
                </div>

                <div className={styles.achievement}>
                  <div className={styles.achievementYear}>2024</div>
                  <h3 className={styles.achievementTitle}>
                    Autex&apos;s Young Designers Spotlight
                  </h3>
                  <div className={styles.achievementBody}>
                    Featured in Autex&apos;s Young Designers Spotlight: recognised for design excellence and sustainable architecture.
                  </div>
                  <a
                    href="https://www.autexacoustics.co.nz/resources/news/young-designers-spotlight-ben-speedy"
                    className={styles.achievementLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Article →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Skills */}
          <div className={styles.timelineGrid}>
            <div className={styles.sectionTitle}>Professional Skills</div>
            <div className={styles.sectionContent}>
              <div className={styles.skillsGrid}>
                <Skill name="Sketchup Pro" years="15 yrs" />
                <Skill name="Adobe Suite" years="12 yrs" />
                <Skill name="Archicad" years="8 yrs" />
                <Skill name="Revit" years="1 yr" />
                <Skill name="Lumion / D5 / Twinmotion" years="4 yrs" />
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className={`${styles.timelineGrid} ${styles.aboutMe}`}>
            <div className={styles.sectionTitle}>About Me</div>
            <div className={styles.sectionContent}>
              <div className={styles.aboutBody}>
                <p>
                  <strong>What do I enjoy?</strong> All things two wheels. Whether it&apos;s my road bike, mountain bike, or motorbike, you&apos;ll find me on two wheels whenever I can. I&apos;m also passionate about travel, food, and of course, all things design and architecture.
                </p>
                <p>
                  <strong>Best travel experience?</strong> I took part in a brilliant trip called the Mongol Rally, a charity drive from London to Mongolia. Along with two mates across 12 weeks, I covered 30 countries, 35,000 km in a 2-door, $1,000, 900cc Suzuki Swift, one of the most challenging and rewarding adventures of my life.
                </p>
                <div className={styles.rallyGrid}>
                  <div className={styles.rallyCard}>
                    <img src="/history/mongol-rally/01.jpg" alt="Mongol Rally, mountain pass" />
                  </div>
                  <div className={styles.rallyCard}>
                    <img src="/history/mongol-rally/02.jpg" alt="Mongol Rally, storm rolling in" />
                  </div>
                  <div className={styles.rallyCard}>
                    <img src="/history/mongol-rally/03.jpg" alt="Mongol Rally, cloud-wrapped switchback" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteChrome>
  );
}

function Entry({
  dates,
  title,
  org,
  children,
}: {
  dates: string;
  title: string;
  org: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={styles.entry}>
      <div className={styles.entryHeader}>
        <div className={styles.entryDates}>{dates}</div>
        <h3 className={styles.entryTitle}>{title}</h3>
        <div className={styles.entryOrg}>{org}</div>
      </div>
      {children && <div className={styles.entryBody}>{children}</div>}
    </div>
  );
}

function Skill({ name, years }: { name: string; years: string }) {
  return (
    <div className={styles.skillItem}>
      <span className={styles.skillName}>{name}</span>
      <span className={styles.skillYears}>{years}</span>
    </div>
  );
}
