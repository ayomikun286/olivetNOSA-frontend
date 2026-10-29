import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

import Navbar from "../../components/public/Navbar";
import Footer from "../../components/public/footer";
import PageTitle from "../../components/common/PageTitle.jsx";

const privacySections = [
  {
    id: "introduction",
    title: "Introduction",
    paragraphs: [
      "Olivet Baptist High School Global Old Students' Association (NOSA) respects your privacy and is committed to the responsible collection, use, protection and management of your personal information.",
      "This Privacy Policy explains how we handle personal data when you visit our website, register as an alumnus, use the membership portal, make payments, donate, contact the Association or participate in activities offered through our digital platform.",
      "Our approach is guided by the Nigeria Data Protection Act 2023, relevant regulatory guidance and other applicable data-protection requirements.",
      "By using our services, you acknowledge that you have been informed about our data-processing practices as described in this Policy. Where consent is legally required, we will request it separately.",
    ],
  },
  {
    id: "who-we-are",
    title: "Who We Are",
    paragraphs: [
      "For the purposes of this Policy, OlivetNOSA is the Association responsible for determining how and why personal information is processed through the platform, subject to confirmation of the appropriate legal data controller.",
    ],
    details: [
      ["Data Controller", "Global Old Students' Association (NOSA)"],
      ["Website", "https://olivetbhsnosa.org/"],
      ["Official Address", "The Secretariat, NOSA Lagos, Nigeria"],
      ["Privacy Contact", "olivetgosasupport@olivetbhsnosa.org"],
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    paragraphs: [
      "Depending on your interactions with the website, we may collect the following categories of information.",
    ],
    subsections: [
      {
        title: "A. Personal and Membership Information",
        bullets: [
          "Full name.",
          "Email address.",
          "Telephone number, where provided.",
          "Student number or approved alumni identifier.",
          "Year Set.",
          "Chapter affiliation or location.",
          "Other information necessary to establish alumni eligibility.",
          "Profile information voluntarily submitted by members.",
        ],
      },
      {
        title: "B. Account and Authentication Information",
        bullets: [
          "Account registration details.",
          "Securely protected password credentials.",
          "Email verification status.",
          "Membership approval status.",
          "Login and account-security records.",
          "Password reset and authentication activity.",
        ],
      },
      {
        title: "C. Financial and Transaction Information",
        bullets: [
          "Membership dues and levies.",
          "Payment amounts and dates.",
          "Transaction references.",
          "Outstanding balances.",
          "Payment confirmation and receipt records.",
          "Donation information.",
          "Insurance payment selection, where applicable.",
        ],
        after: [
          "Payment card information is processed through authorised payment providers according to their respective arrangements.",
          "We do not intend to store complete payment card details within the alumni membership database.",
        ],
      },
      {
        title: "D. Technical and Website Information",
        paragraphs: [
          "Depending on the technology deployed, we may collect:",
        ],
        bullets: [
          "Internet Protocol (IP) address.",
          "Browser and device information.",
          "Website access and usage records.",
          "Security and diagnostic logs.",
          "Cookie preferences and associated technical identifiers.",
        ],
      },
      {
        title: "E. Communications and Contributions",
        paragraphs: ["We may process information provided through:"],
        bullets: [
          "Contact forms.",
          "Membership enquiries.",
          "Profile correction requests.",
          "Complaints and whistleblowing reports.",
          "Event registrations.",
          "Articles and other member contributions.",
          "Direct member-contact requests.",
          "Photographs or other materials submitted for approved publication.",
        ],
      },
    ],
    ending:
      "We seek to collect only information reasonably necessary for legitimate Association purposes.",
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    paragraphs: ["We use personal information for the following purposes:"],
    subsections: [
      {
        title: "Membership Administration",
        paragraphs: [
          "To receive membership applications, verify alumni eligibility, approve registrations, allocate authorised member identifiers and maintain membership records.",
        ],
      },
      {
        title: "Account Management",
        paragraphs: [
          "To create accounts, authenticate users, restore account access and protect the platform from unauthorised activity.",
        ],
      },
      {
        title: "Financial Administration",
        paragraphs: [
          "To process dues, levies and contributions, reconcile transactions, monitor outstanding obligations and maintain financial records.",
        ],
      },
      {
        title: "Alumni Engagement",
        paragraphs: [
          "To support member directories, alumni networking, announcements, Chapter activities and Year Set coordination.",
        ],
      },
      {
        title: "Communications",
        paragraphs: [
          "To send relevant service notifications, verification messages, receipts, membership updates and Association announcements.",
        ],
      },
      {
        title: "Community Programmes",
        paragraphs: [
          "To facilitate authorised events, mentorship, opportunities and development initiatives.",
        ],
      },
      {
        title: "Website Improvement",
        paragraphs: [
          "To understand platform performance, resolve technical issues and improve accessibility, usability and security.",
        ],
      },
      {
        title: "Governance and Legal Compliance",
        paragraphs: [
          "To maintain appropriate records, respond to legitimate requests, investigate complaints and meet applicable legal obligations.",
        ],
      },
    ],
  },
  {
    id: "legal-bases",
    title: "Legal Bases for Processing",
    paragraphs: [
      "We process personal information only where an appropriate lawful basis applies. Depending on the circumstances, these may include:",
    ],
    bullets: [
      "Contractual or membership-related necessity: Where processing is necessary to provide requested membership services or fulfil applicable obligations.",
      "Legal obligation: Where financial, regulatory or other laws require information to be maintained or disclosed.",
      "Legitimate interests: Where permitted, to support reasonable Association administration, fraud prevention, platform protection or other legitimate purposes that do not override individuals' rights.",
      "Consent: Where individuals voluntarily authorise optional communications, non-essential cookies, certain publications or other activities requiring consent.",
      "Other lawful bases: Where specifically permitted under applicable legislation.",
    ],
    ending:
      "Where we rely on consent, individuals may withdraw that consent through the relevant mechanism, without affecting processing already lawfully undertaken.",
  },
  {
    id: "membership-verification",
    title: "Membership Verification and Information Accuracy",
    paragraphs: [
      "Membership applicants must provide information reasonably necessary to establish their connection with Olivet Baptist High School.",
      "An applicant's information may be reviewed by designated administrators and authorised Chapter or Year Set officials for verification. Until verification is complete, the applicant's membership status may remain pending.",
      "Only authorised personnel will be permitted to access the information necessary to perform their responsibilities.",
      "Where information is inaccurate, individuals may submit a correction request. Corrections will be processed through an appropriate verification procedure to preserve the integrity of official alumni records.",
    ],
  },
  {
    id: "alumni-directory",
    title: "Alumni Directory and Information Visibility",
    paragraphs: [
      "The OlivetNOSA directory is intended to support alumni identification and reconnection.",
      "The approved directory information is limited to:",
    ],
    bullets: [
      "Name.",
      "Student number or approved identifier.",
      "Year Set.",
    ],
    ending: [
      "The directory is restricted to authenticated members with appropriate access permissions. Approved directory search functions may use surname, student number, Year Set or Chapter location.",
      "Full contact information, private financial records and account-security information will not be displayed in the directory merely because an individual is registered.",
      "Members must not extract or misuse directory information for unauthorised commercial activities, harassment or unsolicited communication.",
      "Any request concerning directory information will be assessed in accordance with applicable privacy rights and Association requirements.",
    ],
  },
  {
    id: "payments-and-providers",
    title: "Payments, Donations and Third-Party Providers",
    paragraphs: [
      "The OlivetNOSA platform is designed to support secure financial transactions. Approved third-party services include:",
    ],
    subsections: [
      {
        title: "Paystack",
        paragraphs: [
          "Paystack is the selected payment gateway for processing eligible electronic payments when the payment integration is activated. Transaction information may be shared with Paystack as necessary to process and verify payments.",
        ],
      },
      {
        title: "Resend",
        paragraphs: [
          "Resend is the approved provider for transactional email services, including account verification, password reset messages, receipts and payment notifications.",
        ],
      },
    ],
    ending: [
      "We may also use authorised website-hosting, infrastructure, security or support providers where necessary.",
      "Information is shared only where there is an appropriate purpose and lawful basis, subject to applicable contractual and security safeguards.",
      "Members should consult the relevant service providers' privacy notices for information about their independent processing activities.",
    ],
  },
  {
    id: "donations",
    title: "Donations and Donor Privacy",
    paragraphs: [
      "Where enabled, members and non-members may make contributions towards authorised Association projects.",
      "Donation records may include the contribution amount, date, payment reference and information necessary for payment verification.",
      "Where anonymous giving is offered, the Association will respect the donor's choice not to be publicly identified. However, limited identifying information may still be processed by payment providers or authorised personnel when required for financial reconciliation, fraud prevention or legal compliance.",
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing and Disclosure",
    paragraphs: ["We may share personal information with:"],
    bullets: [
      "Authorised Association administrators.",
      "Designated Treasurer, Secretary and other approved officials.",
      "Relevant Year Set or Chapter representatives for legitimate verification or administration.",
      "Approved payment and communications providers.",
      "Authorised technology and security service providers.",
      "Professional advisers acting under appropriate confidentiality duties.",
      "Regulators, courts or law-enforcement authorities where disclosure is legally required.",
    ],
    ending: [
      "We do not sell members' personal data.",
      "We do not permit unrestricted public access to the alumni membership database. Access is limited according to legitimate responsibilities and appropriate authorisation.",
    ],
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    paragraphs: [
      "OlivetNOSA serves an alumni community that may include members residing outside Nigeria. Some authorised technology providers may also process information using infrastructure located outside Nigeria.",
      "Where personal information is transferred internationally, the Association will assess the applicable legal requirements and implement any safeguards required by Nigerian data-protection law and other applicable legislation.",
      "Individuals may contact the Association for further information about relevant transfers and safeguards.",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    paragraphs: [
      "We take reasonable organisational and technical measures to protect personal information against unauthorised access, misuse, alteration, disclosure or loss.",
      "Security measures may include:",
    ],
    bullets: [
      "Protected account authentication.",
      "Secure password storage.",
      "Email verification.",
      "Role-based access permissions.",
      "Restricted administrative access.",
      "Secure communication protocols.",
      "Monitoring and review of suspicious activity.",
      "Backup and recovery procedures.",
      "Additional authentication controls where implemented.",
    ],
    ending: [
      "Although reasonable precautions are taken, no internet-based system can guarantee absolute security.",
      "Members are encouraged to protect their login credentials and report suspected security incidents promptly.",
      "Where a personal-data breach occurs, the Association will assess and fulfil applicable notification and response obligations.",
    ],
  },
  {
    id: "retention-and-deletion",
    title: "Data Retention and Deletion",
    paragraphs: [
      "OlivetNOSA retains personal information only for as long as reasonably necessary for the purposes for which it was collected, subject to applicable legal obligations.",
      "Retention may depend on:",
    ],
    bullets: [
      "The duration of membership or account activity.",
      "The need to maintain accurate alumni records.",
      "Financial reporting and accounting obligations.",
      "Outstanding transactions or disputes.",
      "Security, fraud-prevention and investigation requirements.",
      "Other applicable legal retention obligations.",
    ],
    ending: [
      "Where information is no longer required, it will be securely deleted, anonymised or otherwise disposed of in accordance with an approved retention procedure.",
      "Members may request account closure or deletion of personal data, subject to lawful retention requirements.",
      "Closing an account does not necessarily require deletion of financial records or other information that the Association must legally retain.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Similar Technologies",
    paragraphs: [
      "Cookies are small data files that may be stored on your device when you visit our website.",
      "OlivetNOSA may use the following categories of cookies, depending on the technology enabled.",
    ],
    subsections: [
      {
        title: "Essential Cookies",
        paragraphs: [
          "Necessary for basic website operation, secure login, authentication, accessibility and session management.",
        ],
      },
      {
        title: "Preference Cookies",
        paragraphs: [
          "Used to remember selected user preferences or settings.",
        ],
      },
      {
        title: "Analytics Cookies",
        paragraphs: [
          "Where enabled, these may help us understand website usage and improve platform performance.",
        ],
      },
      {
        title: "Third-Party Cookies",
        paragraphs: [
          "Certain integrated services may use cookies or similar technologies to provide their functions.",
        ],
      },
    ],
    ending: [
      "Where consent is required, non-essential cookies will not be activated until the visitor makes an appropriate choice.",
      "Users will be provided with clear cookie information and appropriate options to accept, reject or manage non-essential cookies.",
      "Users may also manage or withdraw their cookie choices through the available website controls.",
      "Disabling essential cookies may affect website functionality.",
    ],
  },
  {
    id: "communication-preferences",
    title: "Communication Preferences",
    paragraphs: [
      "OlivetNOSA may send service-related communications such as:",
    ],
    bullets: [
      "Email verification messages.",
      "Password reset instructions.",
      "Payment receipts.",
      "Important membership notices.",
      "Security notifications.",
      "Updates necessary for Association administration.",
    ],
    ending: [
      "These communications may be necessary for the provision of membership services.",
      "Optional promotional communications, where offered, will be managed in accordance with applicable consent and marketing requirements.",
      "Users will be given an appropriate way to withdraw consent or unsubscribe from optional promotional messages.",
    ],
  },
  {
    id: "member-content",
    title: "Member-Contributed Content and Photographs",
    paragraphs: [
      "Where members submit photographs, articles, professional profiles or other materials, the Association may process and publish that information for the purposes disclosed at submission.",
      "Where permission or consent is legally required, the Association will seek it before publication.",
      "Individuals should not submit another person's personal information or image without appropriate authority or another lawful basis.",
      "Requests relating to removal or correction of published personal information will be reviewed in accordance with applicable rights and legal obligations.",
    ],
  },
  {
    id: "complaints",
    title: "Complaints and Whistleblowing Information",
    paragraphs: [
      "The Association may collect information submitted through its designated complaints and whistleblowing channels. Such information will be handled with appropriate confidentiality and access restrictions.",
      "Reports may be shared with authorised investigators, advisers or relevant authorities where necessary and lawful.",
      "The Association will not publish the identities of whistleblowers through its public website merely because they submitted a report.",
      "Confidentiality may be subject to legal disclosure obligations and the requirements of a fair investigation.",
    ],
  },
  {
    id: "data-protection-rights",
    title: "Your Data Protection Rights",
    paragraphs: [
      "Subject to applicable law and relevant conditions, individuals may have the right to:",
    ],
    bullets: [
      "Be informed about the collection and use of their personal data.",
      "Request access to personal data held about them.",
      "Request correction of inaccurate or incomplete personal information.",
      "Request deletion of personal information where legally appropriate.",
      "Object to certain processing activities.",
      "Request restriction of processing in applicable circumstances.",
      "Withdraw consent where processing relies on consent.",
      "Request data portability where the legal conditions apply.",
      "Exercise applicable rights concerning significant automated decision-making.",
      "Submit a complaint to the Nigeria Data Protection Commission.",
    ],
    ending: [
      "Requests may be submitted through the Association's designated privacy contact.",
      "We may request reasonable information to verify the identity and authority of the person making a request.",
      "Requests will be considered and answered within applicable legal timeframes.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    paragraphs: [
      "The alumni portal is intended primarily for eligible former students and authorised Association participants.",
      "Where personal information relating to a minor is processed, the Association will apply the relevant consent, authorisation and protection requirements under applicable law.",
      "The website should not be used to submit a child's personal information without an appropriate lawful basis.",
    ],
  },
  {
    id: "external-websites",
    title: "External Websites",
    paragraphs: [
      "The OlivetNOSA website may contain links to independent third-party websites. We do not control the privacy practices of those websites.",
      "Users are encouraged to review the privacy policies of external services before providing personal information.",
    ],
  },
  {
    id: "policy-changes",
    title: "Changes to This Privacy Policy",
    paragraphs: [
      "We may update this Policy to reflect changes in legislation, Association operations, digital services or data-protection practices.",
      "The latest version will be published on the website with its effective date.",
      "Where a change materially affects the processing of personal information, we will provide any additional notice or obtain any further consent required by law.",
    ],
  },
  {
    id: "contact",
    title: "Contact and Privacy Enquiries",
    paragraphs: [
      "For questions, requests or complaints concerning personal information, please contact:",
      "Olivet Baptist High School Global Old Students' Association (NOSA)",
    ],
    details: [
      ["Website", "https://olivetbhsnosa.org/"],
      ["Privacy Email", "olivetgosasupport@olivetbhsnosa.org"],
    ],
    ending: [
      "Individuals may also raise concerns with the Nigeria Data Protection Commission (NDPC) through its official website: https://ndpc.gov.ng/",
      "OlivetNOSA is committed to protecting the personal information entrusted to the Association and supporting responsible, secure alumni engagement.",
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <>
      <PageTitle title="Privacy Policy | OlivetNOSA" />
      <Navbar />

      <main className="bg-white text-[var(--primary-dark)]">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[var(--background-soft)] pt-32 sm:pt-36 lg:pt-40">
          <div className="mx-auto max-w-7xl px-6 pb-14 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
            <div className="max-w-4xl" data-aos="fade-up">
              <div className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--secondary)]">
                <ShieldCheck size={17} strokeWidth={1.7} />
                Privacy & Data Protection
              </div>

              <h1 className="text-4xl font-light leading-[1.08] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                Your privacy matters.
              </h1>

              <p className="mt-7 max-w-2xl text-base font-light leading-8 text-[var(--text-muted)] sm:text-lg">
                Learn how OlivetNOSA collects, uses, protects and manages your
                personal information when you use our website and alumni
                services.
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

        {/* Policy content */}
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
                  aria-label="Privacy Policy contents"
                  className="mt-6 space-y-1"
                >
                  {privacySections.map((section, index) => (
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
                  Have a privacy question?
                </p>
                <a
                  href="mailto:olivetgosasupport@olivetbhsnosa.org"
                  className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-[var(--primary)] hover:underline"
                >
                  Contact our team <ArrowRight size={15} />
                </a>
              </div>
            </aside>

            {/* Main policy */}
            <div className="min-w-0">
              <div className="mb-12 max-w-3xl">
                <p className="text-base leading-8 text-[var(--text-muted)]">
                  This Policy describes the information we may process, why we
                  use it, how we protect it and the rights available to
                  individuals under applicable data-protection requirements.
                </p>
              </div>

              <div className="divide-y divide-slate-200">
                {privacySections.map((section, index) => (
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
                                  ) : label === "Privacy Contact" ||
                                    label === "Privacy Email" ? (
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

                        {section.bullets && (
                          <ul className="mt-5 space-y-3 pl-5 text-[15px] leading-7 text-[var(--text-muted)] marker:text-[var(--secondary)]">
                            {section.bullets.map((item, i) => (
                              <li key={i} className="list-disc pl-1">
                                {item}
                              </li>
                            ))}
                          </ul>
                        )}

                        {section.subsections?.map((subsection) => (
                          <div key={subsection.title} className="mt-7">
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

                            {subsection.after?.map((paragraph, i) => (
                              <p
                                key={i}
                                className="mt-3 text-[15px] leading-8 text-[var(--text-muted)]"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        ))}

                        {section.ending &&
                          (Array.isArray(section.ending)
                            ? section.ending
                            : [section.ending]
                          ).map((paragraph, i) => (
                            <p
                              key={i}
                              className="mt-5 text-[15px] leading-8 text-[var(--text-muted)]"
                            >
                              {paragraph.includes("https://ndpc.gov.ng/") ? (
                                <>
                                  Individuals may also raise concerns with the
                                  Nigeria Data Protection Commission (NDPC)
                                  through its official website:{" "}
                                  <a
                                    href="https://ndpc.gov.ng/"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="break-all text-[var(--primary)] hover:underline"
                                  >
                                    https://ndpc.gov.ng/
                                  </a>
                                </>
                              ) : (
                                paragraph
                              )}
                            </p>
                          ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-8 border border-slate-200 bg-[var(--background-soft)] p-6 sm:p-8">
                <h2 className="text-xl font-medium">
                  Questions about your personal information?
                </h2>
                <p className="mt-3 text-sm leading-7 text-[var(--text-muted)]">
                  For privacy enquiries, correction requests or other
                  data-protection concerns, contact OlivetNOSA using the email
                  address below.
                </p>
                <a
                  href="mailto:olivetgosasupport@olivetbhsnosa.org"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline"
                >
                  olivetgosasupport@olivetbhsnosa.org
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

export default PrivacyPolicy;