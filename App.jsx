import { useState, useEffect, useRef } from "react";
import Loader from "./Loader";
import Countdown from "./Countdown";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ScrollToHash from "./ScrollToHash";

export default function App() {
  const [loading, setLoading] = useState(
    !sessionStorage.getItem("synfest-loader")
  );

  const finishLoading = () => {
    sessionStorage.setItem("synfest-loader", "true");
    setLoading(false);
  };

  if (loading) {
    return <Loader onFinish={finishLoading} />;
  }

  return (
    <>
      <Navbar />
      <ScrollToHash />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Schedule />
              <Team />
            </>
          }
        />

        <Route path="/events" element={<Events />} />
      </Routes>

      <Footer />
    </>
  );
}

/* ================= NAVBAR ================= */

function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-top">
        <div className="logo">SYNFEST 2028</div>

        <a href="/events" className="btn nav-register">
          Register
        </a>
      </div>

      <div className="nav-bottom">
        <a href="/#about">About</a>
        <a href="/events">Events</a>
        <a href="/#schedule">Schedule</a>
        <a href="/#team">Team</a>
      </div>
    </nav>
  );
}

/* ================= HERO ================= */

function Hero() {
  useEffect(() => {
    const glow = document.querySelector(".mouse-glow");

    const move = (e) => {
      if (!glow) return;
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="hero">
      <div className="particles"></div>
      <div className="mouse-glow"></div>

      <div className="container hero-content">
        <h1>𝓢𝓨𝓝𝓕𝓔𝓢𝓣 2𝓚28</h1>
        <p>The Ultimate Tech & Cultural Festival</p>

        <Countdown />

        <a href="/events" className="btn hero-btn">
          Register Now
        </a>
      </div>
    </section>
  );
}

/* ================= ABOUT ULTRA ================= */

function About() {
  const ref = useRef();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("visible"),
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about-ultra" ref={ref}>
      <div className="about-grid">
        <div className="about-text">
          <h2 className="about-title">
            WHERE INNOVATION
            <br />
            MEETS TRADITION
          </h2>

          <p>
            Synergy Institute of Engineering & Technology, Dhenkanal,
            invites you to witness the grandest spectacle of the year.
            <b> Synfest 2028</b> is not just a fest; it's a celebration
            of talent, technology, and culture.
          </p>

          <p>
            From coding marathons to electrifying dance battles,
            from robotics to ramp walks — we have it all.
            Join us for 3 days of non-stop energy.
          </p>

          <div className="about-stats">
            <span>3 DAYS</span>
            <span>50+ EVENTS</span>
            <span>1000+ PARTICIPANTS</span>
          </div>
        </div>

        <div className="about-emblem">
          <img src="/synergy-logo.png" alt="Synergy" />
          <div className="since">Since 1999</div>
          <div className="synergy-badge">SYNERGY</div>
          <div className="tag">A Modern Day Gurukul</div>
        </div>
      </div>
    </section>
  );
}

/* ================= EVENTS ================= */

function Events() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("ALL");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCoords, setShowCoords] = useState(false);

  const categories = ["ALL", "FORMAL", "INFORMAL", "GAMES"];
  const events = [
    { id: 1, title: "CODE CHEF", desc: "Competitive programming contest to solve algorithmic challenges.", cat: "FORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" ,
      coordinators: [
        { name: "Ashit Kumar Jena", phone: "+91 70087 19268" },
        { name: "Biswaranjan Mantry", phone: "+91 63710 16014" }
      ],
      venue: "Computer Lab 1",
      date: "01.03.2026",
      time: "03:30 PM" },
    { id: 2, title: "MOBILE APP DEVELOPMENT", desc: "Showcase your app development skills.", cat: "FORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 3, title: "ROBOTICS COMPETITION", desc: "Design and build robots for tasks.", cat: "FORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 4, title: "DRONE COMPETITION", desc: "Design drone systems for challenges.", cat: "FORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/drone-competition-group",
      form: "https://forms.gle/drone-competition-register" },
    { id: 5, title: "MATH OLYMPIAD", desc: "Test your mathematical prowess.", cat: "FORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of mathematical problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/math-olympiad-group",
      form: "https://forms.gle/math-olympiad-register" },
    { id: 6, title: "TECHNICAL QUIZ", desc: "Quiz on technical domains.", cat: "FORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of technical questions",
        "Submit answers before time"
      ],
      whatsapp: "https://chat.whatsapp.com/technical-quiz-group",
      form: "https://forms.gle/technical-quiz-register" },
    { id: 7, title: "TECH INNOVATION CHALLENGE", desc: "Present innovative solutions.", cat: "FORMAL", 
      team: "Team of 2-4 members", 
      entry: "$50 per team", 
      rules: [
        "Team size between 2 and 4 members", 
        "Duration of 2 hours", 
        "Present innovative ideas in tech domain", 
        "Submit project before deadline"
      ],
      whatsapp:"https://chat.whatsapp.com/tech-innovation-challenge-group",
      form:"https://forms.gle/tech-innovation-challenge-register" },
    { id: 8, title: "BUSINESS PLAN", desc: "Pitch your startup ideas.", cat: "FORMAL", 
      team:"Team of 3-5 members", 
      entry:"$75 per team", 
      rules:[
        "Team size between 3 and 5 members", 
        "Duration of 1 hour", 
        "Present business plan in detail", 
        "Submit plan before deadline"
      ],
      whatsapp:"https://chat.whatsapp.com/business-plan-group",
      form:"https://forms.gle/business-plan-register" },
    { id: 9, title:"TECHNICAL POSTER", desc:"Present concepts via posters.", cat:"FORMAL",
      team:"Individual or Team of up to 3 members", 
      entry:"Free for individuals, $25 for teams of up to 3 members.",
      rules:[
       	"Poster must be submitted in A1 size paper format.",
       	"Poster must be submitted within the deadline.",
       	"Poster must be original work.",
       	"Poster must be related to technical concepts."
      ],
      whatsapp:"https://chat.whatsapp.com/technical-poster-group",
      form:"https://forms.gle/technical-poster-register"},
    { id :10, title : 'FIT & FAB', desc : 'Mechanical fabrication challenge.', cat : 'FORMAL',
      team : 'Team of up to 4 members',
      entry : '$100 per team',
      rules : [
        'Team size between 2 and 4 members',
        'Duration of 2 hours',
        'Fabricate a mechanical device',
        'Submit device before deadline'
      ],
      whatsapp : 'https://chat.whatsapp.com/fit-and-fab-group',
      form : 'https://forms.gle/fit-and-fab-register'},
    { id :11, title : 'PICK & SPEAK', desc : 'Extempore speaking challenge.', cat : 'FORMAL',
      team : 'Individual',
      entry : '$25 per participant',
      rules : [
        'Participant must be an individual',
        'Duration of 3 minutes',
        'Speak on a random topic given at the spot',
        'Judging based on clarity and fluency'
      ],
      whatsapp : 'https://chat.whatsapp.com/pick-and-speak-group',
      form : 'https://forms.gle/pick-and-speak-register'},
    { id :12, title :'DIGITAL DOODLE', desc :'Create digital artwork.', cat :'FORMAL',
      team :'Individual or Team of up to 3 members',  
      entry :'Free for individuals, $25 for teams of up to 3 members.',
      rules:[
       	'Digital artwork must be original.',
       	'Artwork must be submitted in PNG or JPG format.',
       	'Artwork must be submitted within the deadline.',
       	'Artwork must be related to a theme.'
      ],
      whatsapp:'https://chat.whatsapp.com/digital-doodle-group',
      form:'https://forms.gle/digital-doodle-register'},
    { id: 13, title: "ODIA ESSAY", desc: "Express thoughts in Odia.", cat: "FORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 14, title: "ENGLISH ESSAY", desc: "Creative writing in English.", cat: "FORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 15, title: "ODIA DEBATE", desc: "Verbal debate in Odia.", cat: "FORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 16, title: "ENGLISH DEBATE", desc: "Debate in English.", cat: "FORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 17, title: "CTF", desc: "Capture the Flag cybersecurity competition.", cat: "FORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 18, title: "SOLO SONG", desc: "Showcase vocal talent.", cat: "INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 19, title: "ANTAKSHARI", desc: "Song competition.", cat: "INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 20, title: "SOLO DANCE", desc: "Express through dance.", cat: "INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 21, title: "GROUP DANCE", desc: "Group dance performance.", cat: "INFORMAL",
      team: "Group of 3-5 members",
      entry: "Free",
      rules: [
        "Participant Group of 3-5 members.",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 22, title: "RANGOLI", desc: "Traditional art competition.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 23, title: "JHOTI", desc: "Traditional floor art.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 24, title: "MONO ACTING", desc:"Act solo scene.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 25, title: "GROUP ACTING", desc: "Perform skit.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 26, title: "GENERAL PAINTING", desc: "Artwork on theme.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 27, title: "FACE PAINTING", desc: "Artistic face painting.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 28, title: "INSTITUTE PHOTOGRAPHY", desc: "Photography contest.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 29, title: "DOCUMENTARY MOVIE", desc: "Storytelling film.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 30, title: "BOTTLE PAINTING", desc: "Paint bottles.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 31, title: "BRIDAL MAKE-UP", desc: "Makeup artistry.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 32, title: "MEHENDI", desc: "Henna art.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 33, title: "DUMB CHARADES", desc: "Guess game.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 34, title: "TREASURE HUNT", desc: "Find clues.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 35, title: "BE BRAVE ENOUGH", desc: "Daring challenge.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 36, title: "FOOD FEST", desc: "Cook & serve.", cat:"INFORMAL",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 37, title: "CHESS", desc: "Strategic game.", cat:"GAMES",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 38, title: "CARROM", desc: "Tabletop game.", cat:"GAMES",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 39, title: "BADMINTON (BOYS)", desc: "Racquet sport.", cat:"GAMES",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 40, title: "BADMINTON (GIRLS)", desc: "Racquet sport.", cat:"GAMES",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 41, title: "VOLLEYBALL", desc: "Team sport.", cat:"GAMES",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 42, title: "BASKETBALL", desc: "Hoops & dribbles.", cat:"GAMES",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 43, title: "CRICKET", desc: "The gentleman's game.", cat:"GAMES",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 44, title: "CYBER BATTLE", desc: "Free Fire tournament.", cat:"GAMES",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
    { id: 45, title: "YOGA", desc: "Asana performance.", cat:"GAMES",
      team: "Individual",
      entry: "Free",
      rules: [
        "Participant: Individual",
        "Duration: 1 hour",
        "Series of algorithmic problems",
        "Submit solutions before time"
      ],
      whatsapp: "https://chat.whatsapp.com/codechef-group",
      form: "https://forms.gle/codechef-register" },
  ];
  /* ===== FILTER ===== */
  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCat === "ALL" || e.cat === activeCat;
    return matchSearch && matchCat;
  });

  return (
    <section id="events" className="events-ultra" data-animate>
      <div className="events-header">

      {/* TITLE ROW */}
      <div className="events-title-row">
        <h2 className="events-title">THE EVENTS</h2>

        <button
          className="help-btn"
          onClick={() => {
            window.location.href = "/#team";
          }}
        >
          📞 HELP
        </button>
        <button
          className="help-btn"
          onClick={() => {window.location.href = "/";}}
        >
          ← BACK
        </button>
      </div>

      {/* CONTROLS ROW */}
      <div className="events-controls">

        <div className="events-search">
          <input
            type="text"
            placeholder="Search all events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="events-cats">
          {categories.map(c => (
            <button
              key={c}
              className={`cat-btn ${activeCat === c ? "active" : ""}`}
              onClick={() => setActiveCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

      </div>

    </div>
      <div className="events-grid">
        {filtered.map((e) => (
          <div key={e.id} className="event-card">
            {/* ULTRA FX overlays */}
            <div className="holo"></div>
           <div className="scan"></div>

            <div className="event-number">
              {String(e.id).padStart(2, "0")}
            </div>

            <div className="event-content">
              <h3>{e.title}</h3>
              <p>{e.desc}</p>
              <button
                className="event-btn"
                onClick={() => setSelectedEvent(e)}
              >
                EXPLORE
              </button>
            </div>
            <div className="event-watermark-text">
              SYNFEST 2K28
            </div>
          </div>
        ))}
      </div>
      {selectedEvent && (
      <div
        className="event-modal-overlay"
        onClick={() => setSelectedEvent(null)}
      >
        <div
          className="event-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="modal-close"
            onClick={() => setSelectedEvent(null)}
          >
            ✕
          </button>

          <h2 className="modal-title">
            🎓 {selectedEvent.title}
          </h2>

          <p className="modal-desc">
            {selectedEvent.desc}
          </p>

          {/* BADGES */}
          <div className="modal-badges">
            <span>Team: {selectedEvent.team}</span>
            <span>Entry: {selectedEvent.entry}</span>
          </div>

          {/* RULES */}
          <div className="modal-rules">
            <h4>Rules & Regulations</h4>
            <ul>
              {selectedEvent.rules?.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          {/* COORDINATORS DROPDOWN */}
          <div className="modal-coords">
            <div
              className="coords-header"
              onClick={() => setShowCoords(!showCoords)}
            >
              👥 EVENT COORDINATORS
              <span className={`arrow ${showCoords ? "rotate" : ""}`}>🔽</span>
            </div>

            {showCoords && (
              <div className="coords-list">
                {selectedEvent.coordinators?.map((c, i) => (
                  <div key={i} className="coord-row">
                    <span>{c.name}</span>
                    <span>📞 {c.phone}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="modal-meta">
            <div>
              <div className="meta-label">📍 VENUE</div>
              <div>{selectedEvent.venue}</div>
            </div>

            <div>
              <div className="meta-label">📅 DATE</div>
              <div>{selectedEvent.date}</div>
            </div>

            <div>
              <div className="meta-label">⏰ TIME</div>
              <div>{selectedEvent.time}</div>
            </div>
          </div>

          {/* FOOTER BUTTONS */}
          <div className="modal-footer">
            <a
              href={selectedEvent.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn"
            >
              WhatsApp Group
            </a>

            <a
              href={selectedEvent.form}
              target="_blank"
              rel="noreferrer"
              className="register-btn"
            >
              Register Now
            </a>
          </div>
        </div>
      </div>
    )}
    </section>
  );
}

/* ================= SCHEDULE ================= */

function Schedule() {
  const days = [
    {
      day: "DAY 1",
      subtitle: "Alumni & Cultural Day",
      events: [
        "Alumni Meet — 10:00 AM to 1:00 PM",
        "Cultural Session — 5:00 PM to 10:00 PM",
        "Diploma in Engg. & B.Sc Nursing",
      ],
    },
    {
      day: "DAY 2",
      subtitle: "Graduation & Cultural Day",
      events: [
        "Graduation Ceremony — 4:00 PM to 6:00 PM",
        "Cultural Session — 6:00 PM to 10:00 PM",
        "B.Tech & B.Sc",
      ],
    },
    {
      day: "DAY 3",
      subtitle: "Star Night",
      events: [
        "Abhijeet Majumdar Live",
        "Sugyani Mohapatra",
        "From 6:00 PM onwards",
      ],
    },
  ];

  return (
    <section id="schedule" className="schedule-ultra">
      <div className="schedule-grid">
        {days.map((d, i) => (
          <div
  key={i}
  className={`schedule-card ultra-day ${i === 2 ? "star-night" : ""}`}
>
            <div className="schedule-day">{d.day}</div>
            <div className="schedule-sub">{d.subtitle}</div>

            <div className="schedule-events">
              {d.events.map((e, j) => (
                <div key={j} className="schedule-event">{e}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================= TEAM ================= */

function Team() {
  /* ================= CORE TEAM ================= */
  const core = [
    {
      name: "ASUTOSH SAHU",
      role: "Organising Secretary",
      dept: "B.Tech",
      phone: "+91 79780 88266",
      img: "/team/asutosh.jpg",
    },
    {
      name: "SWARUPA LAXMI BEHERA",
      role: "Organising Secretary",
      dept: "B.Tech",
      phone: "+91 00000 00000",
      img: "/team/swarupa.jpg",
    },
    {
      name: "ASHIT KUMAR JENA",
      role: "Cultural Secretary",
      dept: "B.Tech",
      phone: "+91 70087 19268",
      img: "/team/ashit.jpg",
    },
    {
      name: "SANDEEP SAHOO",
      role: "Cultural Secretary",
      dept: "B.Tech",
      phone: "+91 00000 00000",
      img: "/team/sandeep.jpg",
    },
    {
      name: "PRITI MOHAN PRATIHARI",
      role: "Coordinator",
      dept: "B.Tech",
      phone: "+91 72054 13331",
      img: "/team/priti.jpg",
    },
    {
      name: "ASHISH PRUSTY",
      role: "Co-Coordinator",
      dept: "B.Tech",
      phone: "+91 96920 11029",
      img: "/team/ashish.jpg",
    },
    {
      name: "ATAL BIHARI GOCHHAYAT",
      role: "Co-Coordinator",
      dept: "B.Tech",
      phone: "+91 99388 42760",
      img: "/team/atal.jpg",
    },
    {
      name: "PRAGYAN LENKA",
      role: "Coordinator",
      dept: "B.Sc",
      phone: "+91 78480 21286",
      img: "/team/pragyan.jpg",
    },
    {
      name: "NEELAM MALLICK",
      role: "Coordinator",
      dept: "Nursing",
      phone: "+91 00000 00000",
      img: "/team/neelam.jpg",
    },
    {
      name: "MRUTYUNJAY PARIDA",
      role: "Coordinator",
      dept: "Diploma",
      phone: "+91 81445 51174",
      img: "/team/mrutyunjay.jpg",
    },
  ];

  /* ================= DROPDOWN STATE ================= */
  const [openDept, setOpenDept] = useState(null);

  /* ================= DEPARTMENTS ================= */
  const departments = [
    {
      name: "Computer Science & Engineering",
      members: 48,
      people: [
        { name: "Ashit Kumar Jena", role: "Co-Ordinator", year: "4th", phone: "+91 70087 19268" },
        { name: "Biswaranjan Mantry", role: "Co-Ordinator", year: "4th", phone: "+91 63710 16014" },
        { name: "Jagmohan Pal", role: "Co-Ordinator", year: "4th", phone: "+91 93484 72106" },
        { name: "Pabitra Mohan Behera", role: "Co-Ordinator", year: "4th", phone: "+91 78480 90838" },
      ],
    },
    {
      name: "Electrical Engineering",
      members: 13,
      people: [
        { name: "Member 1", role: "Coordinator", year: "3rd", phone: "+91 XXXXX XXXXX" },
      ],
    },
    {
      name: "Mechanical Engineering",
      members: 10,
      people: [],
    },
    {
      name: "Civil Engineering",
      members: 13,
      people: [
        { name: "Member 1", role: "Coordinator", year: "3rd", phone: "+91 XXXXX XXXXX" },
      ],
    },
    {
      name: "B.sc Nursing",
      members: 13,
      people: [
        { name: "Member 1", role: "Coordinator", year: "3rd", phone: "+91 XXXXX XXXXX" },
      ],
    },
    {
      name: "Diploma Engineering",
      members: 13,
      people: [
        { name: "Member 1", role: "Coordinator", year: "3rd", phone: "+91 XXXXX XXXXX" },
      ],
    },
  ];

  return (
    <section id="team" className="team-ultra">

      {/* ===== CORE TEAM ===== */}
      <h2 className="team-title">
        <span></span> CORE TEAM
      </h2>

      <div className="team-grid">
        {core.map((m, i) => (
          <div className="team-card">
            <img src={m.img} className="team-photo" />

            <div className="team-info">
              <div className="team-name">{m.name}</div>

              <div className="team-tags">
                <span className="role">{m.role}</span>
                <span className="dept">{m.dept}</span>
              </div>

              <div className="team-phone">
                📞 {m.phone}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== DEPARTMENTS ===== */}
      <h2 className="team-title sub">
        <span></span> DEPARTMENT COORDINATORS & VOLUNTEERS
      </h2>

      <div className="dept-list">
        {departments.map((d, i) => {
          const open = openDept === i;

          return (
            <div key={i} className={`dept-accordion ${open ? "open" : ""}`}>

              {/* HEADER */}
              <div
                className="dept-header"
                onClick={() => setOpenDept(open ? null : i)}
              >
                <div className="dept-name">{d.name}</div>

                <div className="dept-right">
                  <span className="members">{d.members} MEMBERS</span>
                  <span className={`arrow ${open ? "rotate" : ""}`}>🔽</span>
                </div>
              </div>

              {/* BODY */}
              {open && (
                <div className="dept-body">
                  <div className="dept-table-head">
                    <span>NAME</span>
                    <span>ROLE</span>
                    <span>YEAR</span>
                    <span>PHONE</span>
                  </div>

                  {d.people.map((p, idx) => (
                    <div key={idx} className="dept-row">
                      <span>{p.name}</span>
                      <span>{p.role}</span>
                      <span>{p.year}</span>
                      <span>📞 {p.phone}</span>
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </section>
  );
}

/* ================= CONTACT ULTRA ================= */

function ContactUltra() {
  return (
    <section className="contact-ultra" id="contact">

      <h2 className="contact-title">
        <span></span> CONTACT & LOCATION
      </h2>

      <div className="contact-grid">

        {/* VISIT */}
        <div className="contact-card visit">
          <div className="icon">📍</div>
          <h3>VISIT CAMPUS</h3>

          <p>
            Synergy Institute of Engineering & Technology<br/>
            Banamali Prasad, NH-55<br/>
            Dhenkanal, Odisha – 759001
          </p>

          <a
            href="https://maps.google.com/?q=Synergy+Institute+Dhenkanal"
            target="_blank"
            rel="noreferrer"
            className="contact-btn"
          >
            GET DIRECTIONS →
          </a>
        </div>

        {/* MAP */}
        <div className="contact-map">
          <iframe
            title="Synergy Map"
            src="https://www.google.com/maps?q=Synergy+Institute+of+Engineering+%26+Technology+Dhenkanal&output=embed"
            loading="lazy"
          />
        </div>

        {/* CONTACT */}
        <div className="contact-card info">
          <div className="icon">📞</div>
          <h3>CONTACT US</h3>

          <p>
            General Enquiry<br/>
            <b>+91 67622 25905</b>
          </p>

          <p>
            Fest Team<br/>
            <b>+91 79780 88266</b>
          </p>

          <p>
            Email<br/>
            <b>sietdkl@synergyinstitute.net</b>
          </p>

          <a href="mailto:sietdkl@synergyinstitute.net" className="contact-btn">
            SEND EMAIL →
          </a>
        </div>

      </div>
    </section>
  );
}

/* ================= REGISTER ================= */

function Register() {
  return (
    <section id="register" className="register">
      <div className="container">
        <h2>Join SYNFEST 2028</h2>
        <p>Register now to participate in events.</p>
        <a href="#" className="btn big">
          Register Now
        </a>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */

function Footer() {
  return (
    <footer className="footer-ultra-pro">

      <div className="footer-glow-line"></div>

      <div className="footer-top-pro">

        {/* LEFT */}
        <div className="footer-brand-pro">
          <div className="footer-logo-pro">
            SYNFEST<span> 2k28</span>
          </div>

          <p>
            The annual techno-cultural fest of Synergy Institute of
            Engineering & Technology. Where innovation meets tradition.
          </p>
        </div>

        {/* CENTER */}
        <div className="footer-links-pro">
          <h4>EXPLORE</h4>
          <a href="/events">All Events</a>
          <a href="/#about">About Us</a>
          <a href="/#team">Contact Team</a>
          <a href="/#">Home</a>
        </div>

        {/* RIGHT */}
        <div className="footer-contact-pro">
          <h4>CONTACT</h4>
          <p>Synergy Institute,<br/>Dhenkanal, Odisha 759001</p>
          <p>sietdkl@synergyinstitute.net</p>
          <p>+91 67622 25905</p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom-pro">
        <div>© 2028 Synfest</div>

        <div className="made-pro">
          Made with 💜 by Asutosh
        </div>

        <div className="socials-pro">
          <a href="https://www.linkedin.com/school/synergy-institute-of-engineering-and-technology-siet-dhenkanal/posts/?feedView=all" target="_blank" rel="noreferrer">IG</a>
          <a href="https://www.instagram.com/synergygroupofinstitutions?igsh=dmNpNXZnamlqeDI5" target="_blank" rel="noreferrer">IN</a>
          <a href="https://www.facebook.com/synergygroupofinstitutions" target="_blank" rel="noreferrer">FB</a>
          <a href="https://www.youtube.com/user/synergydhenkanal" target="_blank" rel="noreferrer">YT</a>
        </div>
      </div>

    </footer>
  );
}
