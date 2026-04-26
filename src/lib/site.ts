/** A small, share-everywhere registry of CUSB site links and contact info.
 *  Update once here and every page reflects the change. */
export const SITE = {
  name: "Central University of South Bihar",
  abbr: "CUSB",
  motto: "Collective Reasoning",
  established: 2009,
  campusAcres: 300,
  address: "Panchanpur, Gaya, Bihar – 824236",
  phone: "0631-2229 530",
  phoneTel: "+916312229530",
  emails: {
    admission: "admission@cusb.ac.in",
    webmaster: "webmaster@cusb.ac.in",
  },
  external: {
    cuet: "https://cuet.samarth.ac.in/",
    rti: "https://rtionline.gov.in/",
    naac: "http://naac.gov.in/",
    antiRagging: "https://www.antiragging.in/",
    scholarships: "https://scholarships.gov.in/",
    samarthStudent: "https://cusb.samarth.edu.in/index.php/site/login",
    samarthEmployee: "https://cusb.samarth.ac.in/index.php/site/login",
  },
  social: {
    facebook: "https://www.facebook.com/cusbofficial/",
    twitter: "https://x.com/CUSBofficial",
    instagram: "https://www.instagram.com/cusbofficialpage/?hl=en",
    youtube: "https://www.youtube.com/user/CUBofficialchannel",
    linkedin: "https://in.linkedin.com/school/cusbofficial/",
  },
  mapUrl:
    "https://www.google.com/maps?q=Central+University+of+South+Bihar+Gaya",
} as const;

/** Top navbar primary links. */
export const NAV_LINKS: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Administration", to: "/administration" },
  { label: "Courses", to: "/courses" },
  { label: "Campus", to: "/campus" },
  { label: "Notices", to: "/notices" },
  { label: "Students", to: "/students" },
  { label: "Contact", to: "/contact" },
];

/** Centralised "ticker" announcements — change here, shown sitewide. */
export const TICKER_ITEMS: { text: string; href: string; isNew?: boolean }[] = [
  { text: "CUSB Admission Bulletin 2026 (CUET-PG)", href: "/notices", isNew: true },
  { text: "NCET-2026 — 4-Year Integrated Teacher Education Programme", href: "/courses/teacher-edu", isNew: true },
  { text: "Admissions Open 2026–27 — Apply Now →", href: "/admissions" },
  { text: "45th INCA International Congress — CUSB, March 2026", href: "/notices" },
  { text: "Competition on Smart Design for Website Development — Register from 14 Feb 2026", href: "/notices" },
  { text: "Ph.D. Admission Notice — All Departments", href: "/notices" },
  { text: "Recruitment Notification — Non-Teaching Posts", href: "/notices" },
  { text: "CUSB · Established 2009 · Panchanpur, Gaya, Bihar", href: "/about" },
  { text: "Semester Exam Schedule — Even Semester 2025–26", href: "/exam-schedule" },
];
