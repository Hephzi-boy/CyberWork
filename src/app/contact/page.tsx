"use client";

import { ManualFlagControl } from "@/components/insider-threat/manual-flag-control";
import { useAppSelector } from "@/store/hooks";
import { selectDashboardMetrics, selectDepartmentPressure } from "@/store/slices/analysisSlice";

const contactLocations = [
  {
    title: "EMEA Headquarters",
    city: "London",
    address: "42 Innovation Way, Canary Wharf, London E14",
    details: "+44 20 7946 0101 / 09:00 - 18:00 GMT",
  },
  {
    title: "North America Hub",
    city: "Houston",
    address: "Energy Corridor, Houston, TX",
    details: "Enterprise operations and response advisory",
  },
  {
    title: "Asia-Pacific Center",
    city: "Singapore",
    address: "Marina Bay Technology Quarter",
    details: "Regional analytics and strategy enablement",
  },
];

export default function ContactPage() {
  const metrics = useAppSelector(selectDashboardMetrics);
  const departments = useAppSelector(selectDepartmentPressure);
  const leadDepartment = [...departments].sort((left, right) => right.avgRisk - left.avgRisk)[0];

  return (
    <main className="company-page">
      <section className="hero-banner hero-banner--compact hero-banner--contact">
        <div className="hero-banner__veil hero-banner__veil--flat" />
          <div className="hero-banner__content container-shell">
          <div className="hero-banner__copy hero-banner__copy--wide">
            <span className="eyebrow">Get In Touch</span>
            <h1>Connect with the team behind the Nexora platform and response model.</h1>
            <p>
              Whether the discussion is technical, strategic, or operational, the contact
              experience now matches the rest of the company-grade redesign.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell section-shell--tight">
        <div className="container-shell">
          <ManualFlagControl
            title="Flag an employee from the operations desk"
            description="Use this page-level action to raise a manual leak alert immediately. It will appear through the same top-banner alert flow as automatic detections."
          />
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell contact-layout">
          <div className="contact-form-card">
            <span className="eyebrow eyebrow--dark">Inquiry Submission</span>
            <h2>Request a conversation with the Nexora team.</h2>
            <form className="contact-form">
              <label>
                Full Name
                <input placeholder="John Doe" type="text" />
              </label>
              <label>
                Organization
                <input placeholder="Company Name" type="text" />
              </label>
              <label className="contact-form__wide">
                Inquiry Type
                <select defaultValue="General Research Cooperation">
                  <option>General Research Cooperation</option>
                  <option>Product Demonstration</option>
                  <option>Investor Relations</option>
                  <option>Media Inquiry</option>
                </select>
              </label>
              <label className="contact-form__wide">
                Message
                <textarea placeholder="How can our laboratory assist you?" rows={5} />
              </label>
              <div className="contact-form__wide">
                <button className="button button--dark" type="submit">
                  Send Inquiry
                </button>
              </div>
            </form>

            <div className="department-card-grid">
              <article>
                <span className="material-symbols-outlined">breaking_news</span>
                <h3>Media</h3>
                <p>Corporate communications and press briefing support.</p>
                <strong>media@nexora.tech</strong>
              </article>
              <article>
                <span className="material-symbols-outlined">finance_mode</span>
                <h3>Investors</h3>
                <p>Institutional updates, reporting, and governance material.</p>
                <strong>investors@nexora.tech</strong>
              </article>
              <article>
                <span className="material-symbols-outlined">lab_research</span>
                <h3>Research</h3>
                <p>Technical partnerships, pilots, and operating model design.</p>
                <strong>research@nexora.tech</strong>
              </article>
            </div>
          </div>

          <aside className="contact-sidebar">
            <div className="contact-map-card">
              <div className="contact-map-card__map">
                <div className="map-pulse" />
                <div className="map-dot" />
                <span>EMEA Headquarters</span>
              </div>
              <div className="contact-map-card__body">
                <h3>Nexora Plaza</h3>
                <p>42 Innovation Way, Canary Wharf, London E14</p>
                <div className="contact-map-card__meta">
                  <span>{metrics.totalEmployees} live specialists</span>
                  <span>{leadDepartment?.department ?? "Security Operations"} currently leads active monitoring</span>
                </div>
              </div>
            </div>

            <div className="office-list-card">
              <span className="eyebrow eyebrow--dark">Global Offices</span>
              <div className="office-list">
                {contactLocations.map((location) => (
                  <article key={location.title}>
                    <span className="material-symbols-outlined">location_on</span>
                    <div>
                      <h3>{location.title}</h3>
                      <p>{location.address}</p>
                      <span>{location.details}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="urgent-card">
              <div>
                <h3>Operational Priority</h3>
                <p>{metrics.highRiskEmployees} high-priority cases currently require active analyst review.</p>
              </div>
              <span className="material-symbols-outlined">emergency</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="newsletter-band">
        <div className="container-shell newsletter-band__inner">
          <div>
            <span className="eyebrow eyebrow--dark">Intelligence Briefing</span>
            <h2>Receive monthly research updates.</h2>
          </div>
          <form className="newsletter-form">
            <input placeholder="professional@email.com" type="email" />
            <button className="button button--dark" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
