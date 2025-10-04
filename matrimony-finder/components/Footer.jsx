import React from "react";

// --- Home Page Footer (Original Design) ---

const LocationPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 flex-shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 flex-shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 flex-shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
  </svg>
);

export const HomeFooter = () => {
  const socialLinks = [
    { label: "Dr", title: "Dribbble", href: "#" },
    { label: "Be", title: "Behance", href: "#" },
    { label: "Ig", title: "Instagram", href: "#" },
    { label: "Tw", title: "Twitter", href: "#" },
  ];
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-xl mb-4">MATRIMONY</h4>
            <p className="text-sm text-primary-light">
              India’s trusted platform for serious marriage seekers. Verified
              profiles, private photo controls, and culture-aware matching.
            </p>
            <p className="text-sm text-primary-light mt-8">
              © {new Date().getFullYear()} Shopping Sto Matrimony
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <LocationPinIcon />
                <span>
                  2nd Floor, Anna Nagar West, Chennai – 600040, Tamil Nadu,
                  India
                </span>
              </li>
              <li className="flex items-start space-x-3">
                <MailIcon />
                <a
                  href="mailto:support@matrimony.example"
                  className="hover:underline"
                >
                  support@matrimony.example
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <PhoneIcon />
                <a href="tel:+91-98765-43210" className="hover:underline">
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 & 4 */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <div className="flex space-x-3 mb-4">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      title={s.title}
                      className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center font-bold text-sm hover:opacity-80 transition-opacity"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
                <p className="text-sm text-primary-light">
                  Success stories, tips & events—follow us for updates from our
                  community.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-4">
                  Join our Newsletter
                </h4>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label
                      htmlFor="email-newsletter"
                      className="text-sm text-primary-light font-medium"
                    >
                      Your Email
                    </label>
                    <input
                      id="email-newsletter"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full mt-2 p-3 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white border-none text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-4 bg-white text-primary font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Subscribe
                  </button>
                  <p className="text-xs text-primary-light mt-2">
                    By subscribing you agree to our updates & privacy policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Profile Page Footer (New Design) ---

const socialIcons = [
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
  </svg>,
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm2.5 7.5a.5.5 0 0 1 0 1H5.5a.5.5 0 0 1 0-1h5z" />
  </svg>,
];

const AppStoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M11.528 10.146a2.537 2.537 0 0 1-1.41 2.464 2.65 2.65 0 0 1-2.537-.562.035.035 0 0 0-.05-.043c-.66-.632-1.12.104-1.12.104s-.46.736-1.12.104c-.66-.632-.66-1.769-.66-1.769s0-1.137.66-1.769c.66-.632 1.12.104 1.12.104s.46-.736 1.12.104a2.59 2.59 0 0 1 2.537-.562 2.537 2.537 0 0 1 1.41 2.464zM10.12 4.152a3.426 3.426 0 0 0-1.295 1.487c-.42.756-.42 1.769-.42 1.769s0 1.013.42 1.769c.046.083.098.163.155.239.06.078.125.15.196.216.71.649 1.419.82 1.958.82.539 0 1.248-.171 1.958-.82.07-.066.136-.138.196-.216a3.7 3.7 0 0 0 .155-.239c.42-.756.42-1.769.42-1.769s0-1.013-.42-1.769A3.426 3.426 0 0 0 10.12 4.152zM8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM5.181 4.152a3.426 3.426 0 0 0-1.295 1.487c-.42.756-.42 1.769-.42 1.769s0 1.013.42 1.769c.046.083.098.163.155.239.06.078.125.15.196.216.71.649 1.419.82 1.958.82.539 0 1.248-.171 1.958-.82.07-.066.136-.138.196-.216.057-.076.109-.156.155-.239.42-.756.42-1.769.42-1.769s0-1.013-.42-1.769A3.426 3.426 0 0 0 5.181 4.152z" />
  </svg>
);
const PlayStoreIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M13.52 7.994l-5.138-2.966a.823.823 0 0 0-1.2.695v5.932a.823.823 0 0 0 1.2.695l5.138-2.966a.823.823 0 0 0 0-1.39z" />
    <path d="M2.034 15.143A8 8 0 1 1 15.143 2.034 8 8 0 0 1 2.034 15.143zM1.18 1.99a1 1 0 0 0-.8.4L6.05 8 0.38 13.61a1 1 0 0 0 .8.4l13.06-7.54a1 1 0 0 0 0-1.732L1.18 1.99z" />
  </svg>
);
const WindowsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
  >
    <path d="M6.555 1.375 0 2.237v5.45h6.555V1.375zM0 8.29h6.555V13.75L0 14.625V8.29zm7.448 0v5.456l8.01-1.012V8.29H7.448zM15.463 1.2l-8.015.933V7.227h8.015V1.2z" />
  </svg>
);

export const ProfileFooter = ({
  onNavigateToAbout,
  onNavigateToContact,
  onNavigateToWishlist,
}) => {
  return (
    <>
      <footer className="bg-gray-800 text-gray-300 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* About Section */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg">MATRIMONY</h4>
              <p className="text-sm leading-relaxed">
                India’s trusted platform for serious marriage seekers. Verified
                profiles, private photo controls, and culture-aware matching.
              </p>
              <div className="flex space-x-3 pt-2">
                {socialIcons.map((icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-9 h-9 border border-gray-600 rounded-full flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-colors"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Useful Link Section */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Useful Link</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={onNavigateToAbout}
                    className="hover:text-primary transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={onNavigateToContact}
                    className="hover:text-primary transition-colors"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={onNavigateToWishlist}
                    className="hover:text-primary transition-colors"
                  >
                    Saved Profiles
                  </button>
                </li>
              </ul>
            </div>

            {/* Download Section */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Download</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <AppStoreIcon />{" "}
                  <a href="#" className="hover:text-primary transition-colors">
                    App Store
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <PlayStoreIcon />{" "}
                  <a href="#" className="hover:text-primary transition-colors">
                    Google Play
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <WindowsIcon />{" "}
                  <a href="#" className="hover:text-primary transition-colors">
                    Windows
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold text-lg">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="tel:+919876543210"
                    className="hover:text-primary transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@matrimony.example"
                    className="hover:text-primary transition-colors"
                  >
                    support@matrimony.example
                  </a>
                </li>
              </ul>
              <div className="pt-2">
                <h5 className="text-white text-md mb-2">Payments</h5>
                <div className="flex flex-wrap gap-2 items-center">
                  {/* VISA */}
                  <span
                    className="inline-flex h-6 items-center rounded-sm bg-white/90 px-2"
                    title="Visa"
                    aria-label="Visa"
                  >
                    <svg
                      width="28"
                      height="12"
                      viewBox="0 0 28 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-800"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="28"
                        height="12"
                        rx="2"
                        fill="transparent"
                      />
                      <text
                        x="4"
                        y="9"
                        fontSize="8"
                        fontFamily="ui-sans-serif, system-ui, -apple-system"
                        fill="currentColor"
                        fontWeight="700"
                      >
                        VISA
                      </text>
                    </svg>
                  </span>

                  {/* MasterCard */}
                  <span
                    className="inline-flex h-6 items-center rounded-sm bg-white/90 px-2"
                    title="MasterCard"
                    aria-label="MasterCard"
                  >
                    <svg
                      width="28"
                      height="12"
                      viewBox="0 0 28 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="28" height="12" rx="2" fill="transparent" />
                      <g transform="translate(6,2)">
                        <circle cx="4" cy="4" r="4" fill="#EB001B" />
                        <circle
                          cx="8"
                          cy="4"
                          r="4"
                          fill="#F79E1B"
                          fillOpacity="0.9"
                        />
                      </g>
                    </svg>
                  </span>

                  {/* RuPay */}
                  <span
                    className="inline-flex h-6 items-center rounded-sm bg-white/90 px-2"
                    title="RuPay"
                    aria-label="RuPay"
                  >
                    <svg
                      width="34"
                      height="12"
                      viewBox="0 0 34 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-800"
                    >
                      <rect width="34" height="12" rx="2" fill="transparent" />
                      <text
                        x="5"
                        y="9"
                        fontSize="8"
                        fontFamily="ui-sans-serif, system-ui, -apple-system"
                        fill="currentColor"
                        fontWeight="800"
                      >
                        RuPay
                      </text>
                    </svg>
                  </span>

                  {/* UPI */}
                  <span
                    className="inline-flex h-6 items-center rounded-sm bg-white/90 px-2"
                    title="UPI"
                    aria-label="UPI"
                  >
                    <svg
                      width="28"
                      height="12"
                      viewBox="0 0 28 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-800"
                    >
                      <rect width="28" height="12" rx="2" fill="transparent" />
                      <text
                        x="6"
                        y="9"
                        fontSize="8"
                        fontFamily="ui-sans-serif, system-ui, -apple-system"
                        fill="currentColor"
                        fontWeight="800"
                      >
                        UPI
                      </text>
                    </svg>
                  </span>

                  {/* NetBanking (bank icon) */}
                  <span
                    className="inline-flex h-6 items-center rounded-sm bg-white/90 px-2"
                    title="NetBanking"
                    aria-label="NetBanking"
                  >
                    <svg
                      width="28"
                      height="12"
                      viewBox="0 0 28 12"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-800"
                    >
                      <rect width="28" height="12" rx="2" fill="transparent" />
                      <g transform="translate(6,3)" fill="currentColor">
                        <path d="M8 0L0 3h16L8 0zM1 4h2v3H1V4zm3 0h2v3H4V4zm3 0h2v3H7V4zm3 0h2v3h-2V4zM0 8h16v1H0V8z" />
                      </g>
                    </svg>
                  </span>

                  {/* PayPal */}
                  <span
                    className="inline-flex h-6 items-center rounded-sm bg-white/90 px-2"
                    title="PayPal"
                    aria-label="PayPal"
                  >
                    <svg
                      width="32"
                      height="12"
                      viewBox="0 0 32 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-800"
                    >
                      <rect width="32" height="12" rx="2" fill="transparent" />
                      <text
                        x="5"
                        y="9"
                        fontSize="8"
                        fontFamily="ui-sans-serif, system-ui, -apple-system"
                        fill="currentColor"
                        fontWeight="800"
                      >
                        PayPal
                      </text>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()}{" "}
          <a href="#" className="text-primary hover:underline">
            Shopping Sto Matrimony
          </a>
          . All Rights Reserved.
        </div>
      </div>
    </>
  );
};
