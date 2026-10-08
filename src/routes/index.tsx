import { useEffect, useId, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Wifi, Snowflake, BatteryCharging, Armchair, VolumeX, Users, Droplets, Sparkles, Lightbulb, BookOpen,
  Phone, Mail, MapPin, Clock, Send, Youtube, MessageCircle, Link2, ArrowRight, Play, Navigation, ShieldCheck,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RR Digital Library – Bandipatti's #1 Study Hub (AC + WiFi)" },
      { name: "description", content: "AC self-study library in Bandipatti, Bhadohi. 24/7 open, free WiFi, flexible monthly shifts from ₹330. Book a free trial." },
      { property: "og:title", content: "RR Digital Library – Bandipatti's #1 Study Hub" },
      { property: "og:description", content: "24/7 AC study hub with WiFi and flexible monthly plans. Book a free trial." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const TRIAL = "https://forms.gle/MKM4MMUdF33Kw2ER9";
const WIFI = "/site/wifi_ka_password_yaha_milega_.html";
const NOTICE = "/site/IMP%20LINKS%20FOR%20LIBRARY.html";
const MAPS = "https://maps.app.goo.gl/2LMBrHJzoaCYkeaK7";
// Same place the MAPS short link resolves to (Abhay General Store, next door to the library)
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent("Abhay General Store, Bandipatti, Faudipur, Uttar Pradesh 221304")}&z=16&output=embed`;
const PHONE = "+919118329760";

const plans = [
  { name: "Morning Shift", hi: "सुबह", time: "06:00 AM – 12:00 PM", fee: 400 },
  { name: "Afternoon Shift", hi: "दोपहर", time: "12:00 PM – 06:00 PM", fee: 400 },
  { name: "Evening Shift", hi: "शाम", time: "04:00 PM – 10:00 PM", fee: 400 },
  { name: "Full Day Power Plan", hi: "पूरा दिन · सुबह + दोपहर एक साथ", time: "06:00 AM – 06:00 PM", fee: 600, featured: true },
  { name: "Night Shift", hi: "पूरी रात", time: "08:00 PM – 05:00 AM", fee: 330 },
];

const features = [
  { icon: Snowflake, t: "एसी हॉल", d: "Fully air-conditioned hall" },
  { icon: Wifi, t: "फ्री Wi-Fi", d: "High-speed internet" },
  { icon: BatteryCharging, t: "चार्जिंग पॉइंट", d: "At every seat" },
  { icon: Armchair, t: "Individual सीटें", d: "Comfortable private desks" },
  { icon: VolumeX, t: "शांत माहौल", d: "Silent study zone" },
  { icon: Users, t: "लड़कियों के लिए अलग", d: "Separate seating" },
  { icon: Droplets, t: "RO पानी", d: "Clean drinking water" },
  { icon: Sparkles, t: "दैनिक सफाई", d: "Cleaned every day" },
  { icon: Lightbulb, t: "उचित रोशनी", d: "Eye-friendly lighting" },
  { icon: BookOpen, t: "ज़रूरी पुस्तकें", d: "Reference books available" },
];

// Facility list as printed on the library's own poster (public/images/poster_blue1.png)
const highlights = ["AC Hall", "Hi-Speed Wi-Fi", "Individual Seats", "Open 24/7", "Separate Seats for Girls", "RO Water Facility", "CCTV Surveillance", "5 Days Free Trial", "Daily Newspaper & Magazines", "Charging at Every Seat"];

const rules: [string, string, (string | undefined)?][] = [
  ["शांति बनाए रखें", "कृपया बिल्कुल शांत रहें ताकि सब ध्यान से पढ़ सकें।"],
  ["मोबाइल फोन", "फोन साइलेंट/वाइब्रेशन पर रखें, बात बाहर जाकर करें।", "साइलेंट/वाइब्रेशन"],
  ["खाना-पीना मना", "पढ़ने की टेबल पर कुछ भी खाने-पीने की इजाज़त नहीं है।"],
  ["सामान का ध्यान", "कुर्सी, टेबल, बिजली और वाई-फाई का ध्यान से इस्तेमाल करें।"],
  ["दूसरों का ध्यान", "ग्रुप में बातें या तेज़ आवाज़ में बोलना मना है।"],
  ["सफाई रखें", "अपनी जगह साफ रखें, कचरा डस्टबिन में डालें।"],
  ["वाई-फाई", "सिर्फ पढ़ाई के लिए; गैर-ज़रूरी डाउनलोड से बचें।"],
  ["अपने सामान की सुरक्षा", "आपका सामान आपकी अपनी ज़िम्मेदारी है।"],
  ["सीट का नियम", "सीट सिर्फ आपकी शिफ्ट के लिए — पहले आओ, पहले पाओ।"],
  ["फुटवियर", "जूते/चप्पल बाहर निर्धारित स्थान पर रखें।"],
  ["जाते समय", "सीट की लाइट OFF करें और सामान व्यवस्थित रखें।"],
  ["नियमों का पालन", "नियम न मानने पर सदस्यता समाप्त की जा सकती है।"],
];

const heroVideo = { id: "fbhfJQTK17k", title: "Library khul gayi — intro video" };
const tourVideos = [
  { id: "B4ptm0wiZus", title: "Interior tour" },
  { id: "2Sr1d_UtrEg", title: "Seats & study hall" },
  { id: "-LISKqTCN5w", title: "RR Digital Library, Bandipatti" },
];
const gallery = [
  { src: "mix_image1.png", large: true },
  { src: "cover_image.png" },
  { src: "replaced_image.png" },
  { src: "long_image.jpg" },
  { src: "poster_blue1.png" },
];

const TelegramLogo = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
);
const WhatsAppLogo = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
);
const YouTubeLogo = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
);
const LinktreeLogo = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13.5 0h-3v8.15L4.1 4.75 2 6.85l6.4 3.4L2 13.65l2.1 2.1 6.4-3.4V24h3v-11.7l6.4 3.4 2.1-2.1-6.4-3.4 6.4-3.4-2.1-2.1-6.4 3.4V0z"/></svg>
);

/* App-style 3D tile icons for the footer (redrawn as crisp SVG from the user's reference images). */
type TileProps = { from: string; to: string; children: React.ReactNode; light?: boolean; className?: string | undefined };
function AppTile({ from, to, children, light, className }: TileProps) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`bg${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
        <linearGradient id={`gl${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity={light ? 0.9 : 0.45} />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* depth / side of the tile */}
      <rect x="4" y="7" width="56" height="54" rx="15" fill={to} opacity={light ? 0.35 : 0.9} />
      <rect x="4" y="3" width="56" height="54" rx="15" fill={`url(#bg${id})`} />
      <rect x="4" y="3" width="56" height="54" rx="15" fill={`url(#gl${id})`} />
      <rect x="4.5" y="3.5" width="55" height="53" rx="14.5" fill="none" stroke="#fff" strokeOpacity={light ? 0.9 : 0.35} />
      {children}
    </svg>
  );
}
const GmailTile = (p: { className?: string }) => (
  <AppTile from="#FFFFFF" to="#D9DDE3" light className={p.className}>
    <g transform="translate(14 17) scale(1.5)">
      <path d="M0 4.5v13A1.5 1.5 0 0 0 1.5 19H5V8.6L0 4.5z" fill="#4285F4" />
      <path d="M19 19h3.5a1.5 1.5 0 0 0 1.5-1.5v-13l-5 4.1V19z" fill="#34A853" />
      <path d="M19 2.6v6l5-4.1V3c0-1.6-1.9-2.5-3.1-1.5L19 2.6z" fill="#FBBC04" />
      <path d="M5 8.6V2.6l7 5.3 7-5.3v6l-7 5.3-7-5.3z" fill="#EA4335" />
      <path d="M0 3v1.5l5 4.1V2.6L3.1 1.5C1.9.5 0 1.4 0 3z" fill="#C5221F" />
    </g>
  </AppTile>
);
const TelegramTile = (p: { className?: string }) => (
  <AppTile from="#5BC4F5" to="#1E88D6" className={p.className}>
    <path d="M15 29.5 46 17.6c1.5-.5 2.8.4 2.3 2.6l-5.3 25c-.4 1.8-1.5 2.2-3 1.4l-8.2-6-4 3.8c-.4.4-.8.8-1.7.8l.6-8.4 15.3-13.8c.7-.6-.1-.9-1-.4L22 36.4l-8.1-2.5c-1.8-.6-1.8-1.8.4-2.6z" fill="#fff" />
  </AppTile>
);
const WhatsAppTile = (p: { className?: string }) => (
  <AppTile from="#5BE584" to="#14B856" className={p.className}>
    <g transform="translate(16 14) scale(1.333)" fill="#fff">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </g>
  </AppTile>
);
const YouTubeTile = (p: { className?: string }) => (
  <AppTile from="#FF5A5A" to="#D90000" className={p.className}>
    <rect x="15" y="19" width="34" height="23" rx="7" fill="#fff" />
    <path d="M28.5 24.5v12l10-6z" fill="#E00000" />
  </AppTile>
);
const LinktreeTile = (p: { className?: string }) => (
  <AppTile from="#6BF07F" to="#2BC145" className={p.className}>
    <g transform="translate(18 16) scale(1.17)" fill="#fff">
      <path d="M13.5 0h-3v8.15L4.1 4.75 2 6.85l6.4 3.4L2 13.65l2.1 2.1 6.4-3.4V24h3v-11.7l6.4 3.4 2.1-2.1-6.4-3.4 6.4-3.4-2.1-2.1-6.4 3.4V0z" />
    </g>
  </AppTile>
);

const community = [
  { icon: TelegramLogo, color: "#229ED9", name: "Telegram Quiz Group", stat: "260k+ members", href: "https://t.me/ALL_15SEC_QUIZ" },
  { icon: WhatsAppLogo, color: "#25D366", name: "WhatsApp Channel", stat: "10k+ followers", href: "https://whatsapp.com/channel/0029Va5pYsZIiRomfKXQan3Q" },
  { icon: YouTubeLogo, color: "#FF0000", name: "YouTube Channel", stat: "Tours & strategies", href: "https://youtube.com/@rr_digital_library" },
];

const goldBtn = "inline-flex items-center justify-center gap-2 rounded-full bg-gold-gradient font-bold text-accent-foreground shadow-gold transition duration-300 hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} style={delay ? { transitionDelay: `${delay}s` } : undefined} className={`reveal ${shown ? "reveal-in" : ""} ${className}`}>{children}</div>;
}

function VideoEmbed({ id, title, poster, eager = false, captionTop = false, className = "" }: { id: string; title: string; poster?: string; eager?: boolean; captionTop?: boolean; className?: string }) {
  const [play, setPlay] = useState(false);
  const thumb = poster ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  return (
    <div className={`relative aspect-video overflow-hidden bg-ink ${className}`}>
      {play ? (
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button type="button" onClick={() => setPlay(true)} aria-label={`Play video: ${title}`} className="group relative block h-full w-full text-left">
          <img src={thumb} alt="" loading={eager ? "eager" : "lazy"} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-accent/40 [animation-duration:2.4s]" />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient shadow-gold transition duration-300 group-hover:scale-110 md:h-16 md:w-16">
              <Play className="ml-1 h-6 w-6 fill-current text-accent-foreground" />
            </span>
          </span>
          {captionTop ? (
            <span className="absolute left-4 top-4 inline-flex max-w-[70%] items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-semibold text-ink-foreground backdrop-blur">
              <Youtube className="h-3.5 w-3.5 shrink-0 text-accent" /> <span className="truncate">{title}</span>
            </span>
          ) : (
            <span className="absolute inset-x-4 bottom-4 flex items-center gap-2 text-sm font-semibold text-ink-foreground">
              <Youtube className="h-4 w-4 shrink-0 text-accent" /> <span className="truncate">{title}</span>
            </span>
          )}
        </button>
      )}
    </div>
  );
}

function Section({ id, eyebrow, title, intro, children, className = "" }: { id?: string; eyebrow: string; title: string; intro?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`px-5 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-gold-line" />
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent">{eyebrow}</p>
        </div>
        <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight md:text-5xl">{title}</h2>
        {intro && <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">{intro}</p>}
        <Reveal className="mt-12">{children}</Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-accent/20 bg-ink/95 text-ink-foreground backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#" className="flex items-center gap-3">
            <img src="/images/rr-digital-library-logo.png" alt="RR Digital Library logo" className="h-10 w-10 rounded-full object-cover ring-2 ring-accent/40" />
            <span className="font-display text-lg font-bold">RR Digital Library</span>
          </a>
          <nav className="hidden gap-8 text-sm text-ink-foreground/80 md:flex">
            {[["#plans", "Plans"], ["#facilities", "Facilities"], ["#tour", "Tour"], ["#contact", "Contact"]].map(([href, label]) => (
              <a key={href} href={href} className="relative transition hover:text-accent after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full">
                {label}
              </a>
            ))}
          </nav>
          <a href={TRIAL} target="_blank" rel="noreferrer" className={`${goldBtn} px-4 py-2 text-sm`}>
            Free Trial
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-hero px-5 pb-28 pt-16 text-ink-foreground md:pb-32 md:pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2 md:gap-12">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/20 px-3 py-1 text-xs uppercase tracking-widest text-accent">
                <Clock className="h-3.5 w-3.5" /> Open 24/7 · Bandipatti, Bhadohi
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-gold-gradient px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-foreground" /> Admission Open
              </span>
            </div>
            <h1 className="mt-6 font-display text-4xl leading-[1.08] md:text-6xl">
              Bandipatti की शान. <span className="italic text-gold-gradient pr-1">Your study hub</span> for competitive exams.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-ink-foreground/75">
              AC hall, free WiFi, individual seats and a calm, focused environment — आपकी सफलता का अंतिम साथी।
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={TRIAL} target="_blank" rel="noreferrer" className={`${goldBtn} px-6 py-3`}>
                Book Free Trial <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#plans" className="inline-flex items-center rounded-full border border-ink-foreground/30 px-6 py-3 font-medium transition hover:border-accent/60 hover:bg-ink-foreground/10">
                View Plans
              </a>
            </div>
            <div className="mt-10 flex divide-x divide-ink-foreground/15 text-sm">
              {[["₹330", "from / month"], ["260k+", "quiz community"], ["7", "days a week"]].map(([v, l]) => (
                <div key={l} className="pr-6 pl-6 first:pl-0 last:pr-0">
                  <p className="font-display text-3xl font-bold text-accent">{v}</p>
                  <p className="text-ink-foreground/60">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl md:max-w-none">
            <div aria-hidden className="absolute -inset-3 rounded-3xl border border-accent/25 md:-inset-4" />
            <div aria-hidden className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gold-gradient opacity-40 blur-2xl" />
            <VideoEmbed id={heroVideo.id} title={heroVideo.title} poster="/images/cover_image.png" eager captionTop className="rounded-2xl shadow-2xl ring-1 ring-ink-foreground/15" />
            <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-xl bg-card px-4 py-3 text-foreground shadow-card md:-left-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold">Open now · 24/7</p>
                <p className="text-xs text-muted-foreground">AC hall · Free Wi-Fi · Silent zone</p>
              </div>
            </div>
            <div className="absolute -top-5 right-4 rounded-xl bg-ink px-4 py-2.5 text-ink-foreground shadow-card ring-1 ring-accent/40 md:-right-5">
              <p className="font-display text-xl font-bold text-accent">₹330<span className="text-xs font-normal text-ink-foreground/60">/mo</span></p>
              <p className="text-[11px] uppercase tracking-widest text-ink-foreground/60">se shuru</p>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights marquee */}
      <div className="marquee overflow-hidden border-y border-accent/25 bg-ink py-3.5 text-ink-foreground" aria-label="Library highlights">
        <div className="marquee-track gap-10 pr-10">
          {[...highlights, ...highlights].map((h, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 text-xs font-semibold uppercase tracking-[0.22em] text-ink-foreground/85">
              {h}
              <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-accent" />
            </span>
          ))}
        </div>
      </div>

      {/* Plans */}
      <Section id="plans" eyebrow="Timings & Fees" title="Apna perfect study slot chunein" intro="सभी plans monthly हैं — अपनी सुविधा के हिसाब से शिफ्ट चुनें और 5 दिन का free trial लें।">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`group relative flex flex-col overflow-hidden rounded-2xl border p-5 shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-lg md:p-6 ${
                p.featured
                  ? "order-first col-span-2 border-accent bg-ink text-ink-foreground ring-1 ring-accent/50 lg:order-none lg:col-span-1"
                  : "bg-card hover:border-accent/40"
              }`}
            >
              <span aria-hidden className={`absolute inset-x-0 top-0 h-0.5 bg-gold-gradient transition-opacity duration-300 ${p.featured ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
              {p.featured && (
                <span className="mb-3 inline-flex items-center gap-1.5 self-start rounded-full bg-gold-gradient px-2.5 py-0.5 text-xs font-bold text-accent-foreground">
                  <Sparkles className="h-3 w-3" /> Most popular
                </span>
              )}
              <h3 className="text-base font-bold md:text-lg">{p.name}</h3>
              <p className={`text-sm ${p.featured ? "text-ink-foreground/60" : "text-muted-foreground"}`}>{p.hi}</p>
              <p className={`mt-5 font-display text-3xl font-bold md:text-4xl ${p.featured ? "text-gold-gradient" : ""}`}>
                ₹{p.fee}<span className="text-sm font-normal opacity-60 md:text-base">*/mo</span>
              </p>
              <p className={`mt-3 inline-flex items-center gap-1.5 text-xs md:text-sm ${p.featured ? "text-ink-foreground/75" : "text-muted-foreground"}`}>
                <Clock className="h-3.5 w-3.5 shrink-0 text-accent" /> {p.time}
              </p>
              <a href={TRIAL} target="_blank" rel="noreferrer" className={`mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold ${p.featured ? "text-accent" : "text-primary"}`}>
                बुक करें <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-accent/20 bg-muted p-6 md:flex-row md:items-center">
          <p className="text-sm text-muted-foreground">*शुल्क परिवर्तन के अधीन हैं। नवीनतम जानकारी के लिए नोटिस देखें या काउंटर पर संपर्क करें।</p>
          <a href={NOTICE} className="inline-flex shrink-0 items-center gap-2 font-bold text-primary hover:underline">
            ज़रूरी सूचना (WiFi, Fees, Links) <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </Section>

      {/* Facilities */}
      <Section id="facilities" eyebrow="मुख्य सुविधाएँ" title="Everything you need to focus" className="bg-muted">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
          {features.map(({ icon: I, t, d }) => (
            <div key={t} className="group rounded-2xl bg-card p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lg">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/20 transition duration-300 group-hover:bg-gold-gradient group-hover:shadow-gold">
                <I className="h-5 w-5 text-accent transition group-hover:text-accent-foreground" />
              </span>
              <p className="mt-4 font-bold">{t}</p>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          WiFi password चाहिए? <a href={WIFI} className="font-bold text-primary hover:underline">यहाँ देखें</a>
        </p>
      </Section>

      {/* Tour */}
      <Section id="tour" eyebrow="Interior Look" title="Library ka virtual tour" intro="Photos aur videos mein dekhiye — individual cabins, AC hall aur shaant padhai ka mahaul.">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {gallery.map(({ src, large }) => (
            <div key={src} className={`group relative overflow-hidden rounded-2xl shadow-card ${large ? "col-span-2 row-span-2" : ""}`}>
              <img src={`/images/${src}`} alt="RR Digital Library interior" loading="lazy" className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${large ? "aspect-square md:aspect-auto" : "aspect-square"}`} />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {tourVideos.map((v) => (
            <VideoEmbed key={v.id} id={v.id} title={v.title} className="rounded-2xl shadow-card ring-1 ring-border" />
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          और videos के लिए <a href="https://youtube.com/@rr_digital_library" target="_blank" rel="noreferrer" className="font-bold text-primary hover:underline">YouTube channel</a> देखें।
        </p>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-hero px-5 py-20 text-ink-foreground md:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-dots [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/15" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 h-px w-24 bg-gold-line" />
          <h2 className="font-display text-3xl md:text-5xl">Seats तेज़ी से भर रही हैं</h2>
          <p className="mt-4 text-ink-foreground/75">Last few spots left — aaj hi online FREE trial book karein.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href={TRIAL} target="_blank" rel="noreferrer" className={`${goldBtn} px-8 py-4`}>
              Book Free Trial Now <ArrowRight className="h-4 w-4" />
            </a>
            <a href={`tel:${PHONE}`} className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/30 px-6 py-4 font-medium transition hover:border-accent/60 hover:bg-ink-foreground/10">
              <Phone className="h-4 w-4 text-accent" /> 91183 29760
            </a>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ink-foreground/55">
            <ShieldCheck className="h-4 w-4 text-accent" /> 5 days free trial · Limited seats
          </p>
        </div>
      </section>

      {/* Community */}
      <Section eyebrow="Online Community" title="Daily quiz, study material & exam updates">
        <div className="grid gap-5 md:grid-cols-3">
          {community.map(({ icon: I, color, name, stat, href }) => (
            <a key={name} href={href} target="_blank" rel="noreferrer" className="group rounded-2xl border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg">
              <span className="flex h-12 w-12 items-center justify-center rounded-full ring-1 transition duration-300 group-hover:scale-110" style={{ backgroundColor: `${color}1A`, color, borderColor: `${color}33` }}>
                <I className="h-6 w-6" />
              </span>
              <p className="mt-5 text-lg font-bold">{name}</p>
              <p className="text-sm text-muted-foreground">{stat}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">Join <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </a>
          ))}
        </div>
      </Section>

      {/* Rules */}
      <Section eyebrow="लाइब्रेरी के नियम" title="सबके आराम के लिए ज़रूरी नियम" className="bg-muted">
        <ol className="grid gap-3 md:grid-cols-2 md:gap-4">
          {rules.map(([t, d, hi], i) => (
            <Reveal key={t} delay={0.05 * (i % 6)}>
              <li className="group relative flex h-full gap-4 overflow-hidden rounded-2xl bg-card p-4 shadow-card ring-1 ring-transparent transition duration-300 hover:translate-x-1.5 hover:shadow-lg hover:ring-accent/40 md:p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-bold text-accent ring-1 ring-accent/20 transition duration-300 group-hover:rotate-[10deg] group-hover:scale-115 group-hover:bg-gold-gradient group-hover:text-accent-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="leading-relaxed">
                  <span className="font-bold">{t}:</span>{" "}
                  <span className="text-muted-foreground">
                    {hi ? (
                      <>
                        {d.split(hi)[0]}
                        <mark className="rounded bg-accent/20 px-1 font-semibold text-accent">{hi}</mark>
                        {d.split(hi)[1]}
                      </>
                    ) : (
                      d
                    )}
                  </span>
                </p>
                <span className="absolute bottom-0 left-16 right-4 h-0.5 origin-left scale-x-0 rounded-full bg-gold-gradient transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="Get in touch" title="यहाँ मिलेगी Success की perfect location">
        <div className="grid gap-5 md:grid-cols-3">
          <a href={MAPS} target="_blank" rel="noreferrer" className="group rounded-2xl border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/50">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/20"><MapPin className="h-6 w-6 text-accent" /></span>
            <p className="mt-5 font-bold">Address</p>
            <p className="text-sm text-muted-foreground">बिल्डिंग नं. 163, बंदीपट्टी, पोस्ट रामापुर (निकट ज्ञानपुर), भदोही, उत्तर प्रदेश – 221304. अभय जनरल स्टोर के बगल में।</p>
            <p className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary">Google Maps पर देखें <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></p>
          </a>
          <a href={`tel:${PHONE}`} className="group rounded-2xl border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/50">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/20"><Phone className="h-6 w-6 text-accent" /></span>
            <p className="mt-5 font-bold">Call</p>
            <p className="font-display text-2xl font-bold">91183 29760</p>
            <p className="text-sm text-muted-foreground">Owner: Rajveer Yadav</p>
          </a>
          <a href="mailto:rr.digital.library@gmail.com" className="group rounded-2xl border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/50">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 ring-1 ring-accent/20"><Mail className="h-6 w-6 text-accent" /></span>
            <p className="mt-5 font-bold">Support & Feedback</p>
            <p className="break-all text-sm font-semibold text-primary">rr.digital.library@gmail.com</p>
            <p className="mt-2 text-sm text-muted-foreground">Support, complaint या feedback के लिए ईमेल करें।</p>
          </a>
        </div>
        <div className="relative mt-5 overflow-hidden rounded-2xl border shadow-card">
          <iframe
            src={MAP_EMBED}
            title="RR Digital Library location map"
            className="h-72 w-full md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a href={MAPS} target="_blank" rel="noreferrer" className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-ink-foreground shadow-lg ring-1 ring-accent/40 transition hover:brightness-110">
            <Navigation className="h-4 w-4 text-accent" /> Directions
          </a>
        </div>
      </Section>

      <footer className="border-t border-accent/25 bg-ink px-5 pb-28 pt-12 text-ink-foreground/70 md:pb-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <img src="/images/rr-digital-library-logo.png" alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-accent/40" />
              <p className="font-display text-lg font-bold text-ink-foreground">RR Digital Library</p>
            </div>
            <p className="mt-3 text-sm">© {new Date().getFullYear()} R.R. Digital Library, Bandipatti. सर्वाधिकार सुरक्षित।</p>
            <p className="text-sm">सहयोगी केंद्र: अभय जनरल स्टोर · सत्य प्रकाश यादव (मुलायम) सहज जन सेवा केंद्र (CSC)</p>
          </div>
          <div className="flex flex-col gap-3 text-sm md:items-end">
            <div className="flex gap-3">
              {([
                ["https://youtube.com/@rr_digital_library", "YouTube", YouTubeTile, "#FF0000"],
                ["https://t.me/RRLIBRARY1", "Telegram", TelegramTile, "#229ED9"],
                ["https://whatsapp.com/channel/0029Va5pYsZIiRomfKXQan3Q", "WhatsApp", WhatsAppTile, "#25D366"],
                ["mailto:rr.digital.library@gmail.com", "Gmail", GmailTile, "#EA4335"],
                ["https://linktr.ee/RRLIBRARY", "Linktree", LinktreeTile, "#43E55E"],
              ] as const).map(([href, label, Icon, color]) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="block h-11 w-11 rounded-2xl transition duration-300 hover:-translate-y-1 hover:scale-110"
                  onMouseEnter={(e) => { e.currentTarget.style.filter = `drop-shadow(0 6px 14px ${color}99)`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = ""; }}
                >
                  <Icon className="h-full w-full" />
                </a>
              ))}
            </div>
            <p>Website by <a href="https://mranujyadav.netlify.app/" target="_blank" rel="noreferrer" className="text-accent hover:underline">अनुज यादव</a></p>
          </div>
        </div>
      </footer>

      {/* Sticky mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-accent/25 bg-ink/95 p-3 shadow-[0_-10px_30px_-12px_oklch(0.22_0.06_262/0.6)] backdrop-blur md:hidden">
        <a href={TRIAL} target="_blank" rel="noreferrer" className={`${goldBtn} flex-1 py-3 text-sm`}>
          Book Free Trial
        </a>
        <a href={`tel:${PHONE}`} className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-ink-foreground/25 py-3 text-sm font-bold text-ink-foreground">
          <Phone className="h-4 w-4 text-accent" /> Call Now
        </a>
      </div>
    </div>
  );
}
