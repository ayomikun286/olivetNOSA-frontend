
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import PageTitle from "../../components/common/PageTitle.jsx";

const termsSections = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      'Welcome to the official website and alumni management portal of Olivet Baptist High School Global Old Students\' Association (NOSA), referred to in these Terms & Conditions as "OlivetNOSA", "the Association", "we", "us" or "our".',
      "These Terms & Conditions govern your access to and use of the OlivetNOSA website, alumni registration system, membership portal, payment facilities, directories, communications and other services made available through the platform.",
      "By accessing or using the website, you agree to comply with these Terms & Conditions and all applicable laws and regulations. If you do not agree with these Terms, please discontinue your use of the website.",
    ],
  },
  {
    id: "purpose",
    title: "Purpose of the Website",
    paragraphs: [
      "The OlivetNOSA website is established to:",
    ],
    bullets: [
      "Connect former students of Olivet Baptist High School.",
      "Facilitate alumni registration and membership verification.",
      "Maintain accurate membership records.",
      "Support National, Chapter and Year Set activities.",
      "Manage membership dues, levies, donations and financial contributions.",
      "Publish Association announcements, programmes and events.",
      "Promote professional networking, mentorship and community development.",
      "Support initiatives that advance the interests of the Association and its alma mater.",
    ],
    ending: [
      "Access to certain services is restricted to registered, verified or financially eligible members.",
    ],
  },
  {
    id: "membership",
    title: "Membership Eligibility and Registration",
    paragraphs: [
      "Membership registration is available to individuals eligible under the Constitution and approved membership rules of the Association.",
      "To register:",
    ],
    numbered: [
      "An applicant must complete the online registration form with accurate information.",
      "The applicant must provide a valid email address.",
      "The email address must be verified through the activation link provided.",
      "Submitted membership information will undergo administrative verification.",
      "Verification may involve the relevant Year Set or Chapter leadership.",
      "Final membership approval is granted through the Association's authorised administrative process.",
    ],
    ending: [
      "Successful email verification does not automatically confer approved membership status. Applicants awaiting approval may have restricted access to available platform features.",
      "The Association reserves the right to reject or request clarification of registrations that do not meet its membership requirements, subject to applicable laws and fair administrative procedures.",
    ],
  },
  {
    id: "accounts",
    title: "Member Accounts and Security",
    paragraphs: [
      "Registered users are responsible for maintaining the confidentiality of their login credentials. Members must:",
    ],
    bullets: [
      "Keep their passwords secure.",
      "Avoid sharing accounts with unauthorised individuals.",
      "Notify the Association of suspected unauthorised access.",
      "Provide truthful and up-to-date registration information.",
      "Follow any additional security verification requirements.",
    ],
    ending: [
      "The Association may apply email verification, password recovery, one-time passwords or other authentication measures to protect accounts.",
      "Accounts found to have been created fraudulently, compromised or used in serious breach of these Terms may be restricted, suspended or deactivated.",
    ],
  },
  {
    id: "records",
    title: "Membership Records and Profile Corrections",
    paragraphs: [
      "Member records are maintained to support accurate alumni identification and administration. Members are responsible for providing correct information during registration.",
      "Where a member identifies incorrect or outdated information, the member should submit a formal correction request through the designated support channel.",
      "The Association may verify the requested changes before updating official membership records. This administrative correction process does not limit any rights granted under applicable data-protection legislation.",
    ],
  },
  {
    id: "directory",
    title: "Alumni Directory and Member Privacy",
    paragraphs: [
      "The alumni directory is intended to help authenticated members reconnect and identify other registered alumni. Directory information may include:",
    ],
    bullets: [
      "Member's name.",
      "Student number or approved alumni identifier.",
      "Year Set.",
    ],
    ending: [
      "Members may be able to search using approved criteria such as surname, student number, Year Set or Chapter location.",
      "The directory is restricted to authenticated members with appropriate permissions.",
      "Directory information must not be collected, copied, sold, harvested, published externally or used for unsolicited commercial communication without appropriate authorisation.",
      "Member-to-member contact features must be used respectfully and only for legitimate alumni-related purposes.",
    ],
  },
  {
    id: "dues",
    title: "Membership Dues and Financial Obligations",
    paragraphs: [
      "Financial obligations are determined by the Association through its authorised governance procedures.",
      "The current approved individual payment structure is:",
    ],
    table: {
      headers: ["Payment category", "Amount", "Status"],
      rows: [
        ["Dues and development levy", "₦24,000", "Mandatory"],
        ["Insurance premium", "₦10,000", "Optional"],
        ["Total if insurance is selected", "₦34,000", "Where selected"],
      ],
    },
    subsections: [
      {
        title: "Year Set and Chapter Dues",
        paragraphs: [
          "Separate annual obligations apply to Year Sets and Chapters:",
        ],
        table: {
          headers: ["Group", "Annual dues"],
          rows: [
            ["Year Set", "₦50,000"],
            ["Chapter", "₦200,000"],
          ],
        },
      },
    ],
    ending: [
      "Additional authorised contributions or support obligations may apply to Year Sets or Chapters, as formally communicated by the Association.",
      "Payment amounts may be revised for future financial years following the appropriate approval process. Current and applicable charges will be displayed or communicated before payment.",
      "A separate recurring Development Fee facility may be activated only when formally authorised. No inactive fee shall be automatically collected.",
    ],
  },
  {
    id: "payments",
    title: "Payment Methods, Instalments and Outstanding Balances",
    paragraphs: [
      "Where enabled, payments may be processed through approved electronic payment providers, including Paystack. The platform may support bank transfers, card payments and other approved payment methods.",
      "Members may pay their financial obligations in full or through flexible partial payments where permitted. Outstanding balances may be displayed on the member's dashboard.",
      "Unpaid balances may be classified as overdue in accordance with the applicable payment schedule and Association rules. Previous years' unpaid obligations may be carried forward and reflected separately in the member's financial record.",
      "Payment records will be updated following successful transaction confirmation and reconciliation.",
      "Administrative users are not authorised to waive or alter legitimate outstanding balances arbitrarily. Any exceptional resolution must follow the Association's approved governance and financial procedures.",
    ],
  },
  {
    id: "insurance",
    title: "Optional Insurance",
    paragraphs: [
      "Participation in an insurance programme offered through the platform is voluntary unless an applicable, formally approved Association rule provides otherwise.",
      "Where insurance is available:",
    ],
    bullets: [
      "The premium must be clearly distinguished from mandatory membership obligations.",
      "Members must be given the opportunity to select or decline optional cover.",
      "Insurance benefits, exclusions, eligibility and claims are subject to the applicable insurance provider's terms.",
      "Payment of an insurance premium does not replace the need to meet the insurer's eligibility requirements.",
    ],
    ending: [
      "The Association will identify the applicable insurance arrangements before accepting insurance premiums.",
    ],
  },
  {
    id: "donations",
    title: "Donations and Voluntary Contributions",
    paragraphs: [
      "OlivetNOSA may accept donations and voluntary contributions from members, nonmembers, individuals and supporting organisations. Donations may support approved projects, programmes, alumni initiatives or institutional development.",
      "Donors may be offered the option to contribute anonymously. Anonymous donation preferences concern public acknowledgement and do not necessarily prevent the collection of information required for secure payment processing, legal compliance or financial recordkeeping.",
      "The Association will seek to apply designated donations to their stated purposes, subject to any clearly disclosed campaign terms.",
    ],
  },
  {
    id: "refunds",
    title: "Refunds and Payment Disputes",
    paragraphs: [
      "Requests concerning duplicate payments, incorrect charges, failed transactions or other disputed payments should be submitted through the Association's official contact channel.",
      "All refund requests will be reviewed against:",
    ],
    bullets: [
      "Verified transaction records.",
      "The nature and purpose of the payment.",
      "Applicable Association policies.",
      "Relevant third-party payment or insurance terms.",
      "Applicable legal requirements.",
    ],
    ending: [
      "Payments are not automatically refundable merely because a member chooses to discontinue use of the website.",
      "Nothing in these Terms excludes any refund or other legal right that cannot lawfully be excluded.",
    ],
  },
  {
    id: "conduct",
    title: "Content, Communication and Community Conduct",
    paragraphs: [
      "Members may access announcements, events, opportunities and other approved content through the platform.",
      "Users must not:",
    ],
    bullets: [
      "Publish abusive, defamatory, discriminatory or threatening material.",
      "Impersonate another person or misrepresent membership status.",
      "Share confidential membership information without permission.",
      "Use the platform to distribute spam or fraudulent material.",
      "Upload malicious software or attempt unauthorised access.",
      "Use the Association's name or identity for unauthorised fundraising or commercial activities.",
      "Disrupt the operation or security of the website.",
    ],
    ending: [
      "OlivetNOSA may moderate or remove content that violates these requirements, subject to applicable procedures.",
    ],
  },
  {
    id: "opportunities",
    title: "Employment, Mentorship and Networking Opportunities",
    paragraphs: [
      "Where available, the platform may provide professional networking, job vacancies, mentorship opportunities and member-contributed articles.",
      "These services are provided for community development and information-sharing. The Association does not guarantee employment, business results, mentorship placement or the accuracy of every third-party opportunity.",
      "Members should independently verify external opportunities before making financial or professional commitments.",
    ],
  },
  {
    id: "financial-reports",
    title: "Financial Reports and Association Information",
    paragraphs: [
      "Where enabled, authorised members may have access to Association financial statements, approved reports and other governance information. Access may depend on membership status, role permissions and relevant Association rules.",
      "Financial records may not be altered, redistributed or misrepresented without authorisation.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    paragraphs: [
      "Unless otherwise stated, the website's original text, branding, graphics, design elements, photographs and other Association-owned content are protected by applicable intellectual property laws.",
      "Users must not reproduce, commercially exploit or distribute protected materials without permission or another lawful basis.",
      "Members submitting original content retain their applicable ownership rights while granting the Association the permissions necessary to display or distribute that content for the purposes agreed at submission.",
    ],
  },
  {
    id: "third-party-services",
    title: "Third-Party Services and External Links",
    paragraphs: [
      "The website may connect to external services, payment gateways, email providers or third-party websites.",
      "OlivetNOSA is not responsible for the independent content, privacy policies or business practices of third-party websites outside its control. Users should review relevant third-party terms before using those services.",
    ],
  },
  {
    id: "availability",
    title: "Website Availability and Liability",
    paragraphs: [
      "The Association aims to maintain a secure and reliable platform but cannot guarantee uninterrupted or error-free access. Maintenance, technical faults, network interruptions or security incidents may temporarily affect service availability.",
      "To the extent permitted by law, OlivetNOSA is not responsible for losses caused solely by circumstances outside its reasonable control.",
      "Nothing in these Terms excludes liability that cannot lawfully be excluded, including liability arising from fraud or other legally protected claims.",
    ],
  },
  {
    id: "complaints",
    title: "Complaints and Whistleblowing",
    paragraphs: [
      "Members and website visitors may submit concerns, complaints or reports of suspected wrongdoing through the designated contact or whistleblowing channels.",
      "Reports will be handled in accordance with applicable Association procedures and legal obligations. The Association will seek to protect the confidentiality of reporting individuals, subject to any disclosure necessary for lawful investigation or regulatory requirements.",
      "Knowingly false or malicious reports may be subject to appropriate action, without discouraging genuine reports made in good faith.",
    ],
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    paragraphs: [
      "OlivetNOSA may amend these Terms to reflect changes in platform functionality, Association requirements or applicable law. The revised version will be published with its effective date.",
      "Material changes affecting members' rights or obligations will be communicated where required.",
      "Changes do not automatically impose new financial obligations retrospectively.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    paragraphs: [
      "These Terms are governed by the applicable laws of the Federal Republic of Nigeria.",
      "Disputes arising from website use should first be raised through the Association's designated complaints process. Where unresolved, disputes may be referred to a court or other competent dispute-resolution body in accordance with applicable law.",
      "The Association's Constitution and validly adopted governance rules continue to govern Association membership matters. These website Terms do not replace or override the Constitution.",
    ],
  },
  {
    id: "contact",
    title: "Contact Information",
    paragraphs: [
      "For membership enquiries, technical support, payment concerns or complaints, contact:",
      "Olivet Baptist High School Global Old Students' Association (NOSA)",
    ],
    details: [
      ["Website", "https://olivetbhsnosa.org/"],
      ["Email", "olivetNOSAsupport@olivetbhsnosa.org"],
      ["Contact Address", "Lagos, Nigeria"],
    ],
    ending: [
      "By registering or using the OlivetNOSA website, you acknowledge that you have read and understood these Terms & Conditions.",
    ],
  },
];

function LegalTable({ table }) {
  return (
    <div className="mt-5 overflow-x-auto border border-slate-200">
      <table className="w-full min-w-[400px] border-collapse text-left text-sm">
        <thead className="bg-[var(--background-soft)]">
          <tr>
            {table.headers.map((header) => (
              <th
                key={header}
                className="border-b border-slate-200 px-4 py-4 font-semibold text-[var(--primary-dark)]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, index) => (
            <tr
              key={`${row[0]}-${index}`}
              className={
                index === table.rows.length - 1 &&
                row[0].startsWith("Total")
                  ? "bg-[var(--background-soft)]"
                  : ""
              }
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`${cell}-${cellIndex}`}
                  className={`border-b border-slate-100 px-4 py-4 leading-6 text-[var(--text-muted)] last:border-b-0 ${
                    cellIndex === 1
                      ? "whitespace-nowrap font-medium text-[var(--primary-dark)]"
                      : ""
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TermsAndConditions = () => {
  return (
    <>
      <PageTitle title="Terms & Conditions | OlivetNOSA" />
      <Navbar />

      <main className="bg-white text-[var(--primary-dark)]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[var(--background-soft)] pt-32 sm:pt-36 lg:pt-40">
          <div className="mx-auto max-w-7xl px-6 pb-14 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
            <div className="max-w-4xl" data-aos="fade-up">
              <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                <FileText size={17} strokeWidth={1.7} />
                Website Terms & Policies
              </div>

              <h1 className="text-4xl font-light leading-[1.08] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                Terms & Conditions
              </h1>

              <p className="mt-7 max-w-2xl text-base font-light leading-8 text-[var(--text-muted)] sm:text-lg">
                Please review the terms governing your access to and use of
                the Olivet Baptist High School Global Old Students'
                Association website and alumni management portal.
              </p>

              <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-6 text-sm text-[var(--text-muted)]">
                <p>
                  <span className="font-medium text-[var(--primary-dark)]">
                    Effective Date:
                  </span>{" "}
                  20th October 2026
                </p>
                <p>
                  <span className="font-medium text-[var(--primary-dark)]">
                    Last Updated:
                  </span>{" "}
                  20th October 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms content */}
        <section className="py-14 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 lg:px-12">
            {/* Contents */}
            <aside className="h-fit lg:sticky lg:top-28">
              <div className="border border-slate-200 bg-white p-6 sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--secondary)]">
                  On this page
                </p>

                <h2 className="mt-3 text-xl font-medium">Contents</h2>

                <nav
                  aria-label="Terms and Conditions contents"
                  className="mt-6 space-y-1"
                >
                  {termsSections.map((section, index) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="group flex items-start gap-3 py-2 text-sm leading-5 text-[var(--text-muted)] transition-colors hover:text-[var(--primary)]"
                    >
                      <span className="mt-px w-5 shrink-0 text-xs text-slate-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="transition-transform group-hover:translate-x-1">
                        {section.title}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="mt-5 border-l-2 border-[var(--primary)] bg-[var(--background-soft)] p-5">
                <p className="text-sm leading-6 text-[var(--text-muted)]">
                  Need help with membership, payments or these terms?
                </p>
                <a
                  href="mailto:olivetNOSAsupport@olivetbhsnosa.org"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
                >
                  Contact our team <ArrowRight size={15} />
                </a>
              </div>
            </aside>

            {/* Main terms */}
            <div className="min-w-0">
              <div className="mb-12 max-w-3xl">
                <p className="text-base leading-8 text-[var(--text-muted)]">
                  These Terms explain the rules for using our website,
                  registering as an alumnus, accessing membership services,
                  making payments and participating in the OlivetNOSA
                  community. They operate alongside the Association's
                  Constitution and applicable laws.
                </p>
              </div>

              <div className="divide-y divide-slate-200">
                {termsSections.map((section, index) => (
                  <article
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 py-10 first:pt-0 sm:py-12"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span className="pt-1 text-sm font-medium tabular-nums text-[var(--secondary)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h2 className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                          {section.title}
                        </h2>

                        {section.paragraphs?.map((paragraph, i) => (
                          <p
                            key={i}
                            className="mt-5 text-[15px] leading-8 text-[var(--text-muted)]"
                          >
                            {paragraph}
                          </p>
                        ))}

                        {section.details && (
                          <dl className="mt-6 divide-y divide-slate-100 border-y border-slate-200">
                            {section.details.map(([label, value]) => (
                              <div
                                key={label}
                                className="grid gap-1 py-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-5"
                              >
                                <dt className="text-sm font-medium text-[var(--primary-dark)]">
                                  {label}
                                </dt>
                                <dd className="break-words text-sm leading-7 text-[var(--text-muted)]">
                                  {label === "Website" ? (
                                    <a
                                      href={value}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[var(--primary)] hover:underline"
                                    >
                                      {value}
                                    </a>
                                  ) : label === "Email" ? (
                                    <a
                                      href={`mailto:${value}`}
                                      className="text-[var(--primary)] hover:underline"
                                    >
                                      {value}
                                    </a>
                                  ) : (
                                    value
                                  )}
                                </dd>
                              </div>
                            ))}
                          </dl>
                        )}

                        {section.numbered && (
                          <ol className="mt-5 list-decimal space-y-3 pl-5 text-[15px] leading-7 text-[var(--text-muted)] marker:text-[var(--secondary)]">
                            {section.numbered.map((item, i) => (
                              <li key={i} className="pl-1">
                                {item}
                              </li>
                            ))}
                          </ol>
                        )}

                        {section.bullets && (
                          <ul className="mt-5 space-y-3 pl-5 text-[15px] leading-7 text-[var(--text-muted)] marker:text-[var(--secondary)]">
                            {section.bullets.map((item, i) => (
                              <li key={i} className="list-disc pl-1">
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.table && (
                          <LegalTable table={section.table} />
                        )}

                        {section.subsections?.map((subsection) => (
                          <div key={subsection.title} className="mt-8">
                            <h3 className="text-base font-semibold text-[var(--primary-dark)]">
                              {subsection.title}
                            </h3>

                            {subsection.paragraphs?.map((paragraph, i) => (
                              <p
                                key={i}
                                className="mt-3 text-[15px] leading-8 text-[var(--text-muted)]"
                              >
                                {paragraph}
                              </p>
                            ))}

                            {subsection.bullets && (
                              <ul className="mt-4 space-y-3 pl-5 text-[15px] leading-7 text-[var(--text-muted)] marker:text-[var(--secondary)]">
                                {subsection.bullets.map((item, i) => (
                                  <li key={i} className="list-disc pl-1">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            )}

                            {subsection.table && (
                              <LegalTable table={subsection.table} />
                            )}

                            {subsection.ending?.map((paragraph, i) => (
                              <p
                                key={i}
                                className="mt-3 text-[15px] leading-8 text-[var(--text-muted)]"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        ))}

                        {section.ending?.map((paragraph, i) => (
                          <p
                            key={i}
                            className="mt-5 text-[15px] leading-8 text-[var(--text-muted)]"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Closing contact panel */}
              <div className="mt-8 border border-slate-200 bg-[var(--background-soft)] p-6 sm:p-8">
                <h2 className="text-xl font-medium">
                  Need clarification about these terms?
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                  For membership enquiries, technical support, payment
                  concerns or complaints, please contact OlivetNOSA.
                </p>
                <a
                  href="mailto:olivetNOSAsupport@olivetbhsnosa.org"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline"
                >
                  olivetNOSAsupport@olivetbhsnosa.org
                  <ArrowRight size={16} />
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
                <p className="text-xs leading-6 text-[var(--text-muted)]">
                  Last updated: 20th October 2026
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
                >
                  Back to home <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TermsAndConditions;
