import React, { useState, useEffect, useRef } from 'react';
import solaimanPortrait from './solaiman.jpeg';
import { 
  Menu, X, Sun, Moon, ArrowUp, ChevronLeft, ChevronRight, 
  Github, Linkedin, Mail, Code, Cpu, BookOpen, Heart, Activity
} from 'lucide-react';

const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@300;400;600&family=Caveat:wght@400;700&display=swap');
    
    :root {
      --sage: #CCD5AE;
      --olive: #E9EDC9;
      --cornsilk: #FEFAE0;
      --papaya: #FAEDCD;
      --bronze: #D4A373;
    }

    body {
      margin: 0;
      font-family: 'Space Grotesk', sans-serif;
      overflow-x: hidden;
      transition: background-color 0.3s ease, color 0.3s ease;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Playfair Display', serif;
    }

    .font-handwriting {
      font-family: 'Caveat', cursive;
    }

    .texture-light {
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
    }

    .texture-dark {
      background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
    }

    .parallax-bg {
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  `}} />
);

const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Lightbox = ({ isOpen, image, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity" onClick={onClose}>
      <button className="absolute top-6 right-6 text-white hover:text-[#D4A373] transition-colors" onClick={onClose}>
        <X size={32} />
      </button>
      <img 
        src={image} 
        alt="Enlarged view" 
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border-2 border-[#D4A373]" 
        onClick={(e) => e.stopPropagation()} 
      />
    </div>
  );
};

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-xl border border-[#D4A373]/30 shadow-lg group bg-black/5 dark:bg-white/5">
      <div 
        className="flex transition-transform duration-500 ease-in-out" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div key={index} className="w-full flex-shrink-0 p-8 md:p-12 flex flex-col items-center text-center">
            <Heart className="text-[#D4A373] mb-4" size={32} />
            <p className="text-xl md:text-2xl font-serif italic mb-6 dark:text-[#FEFAE0] text-gray-800">"{item.text}"</p>
            <h4 className="font-bold text-[#D4A373] tracking-wider uppercase text-sm">{item.author}</h4>
          </div>
        ))}
      </div>
      
      <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FAEDCD]/50 dark:bg-black/50 text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-all opacity-0 group-hover:opacity-100">
        <ChevronLeft size={24} />
      </button>
      <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-[#FAEDCD]/50 dark:bg-black/50 text-[#D4A373] hover:bg-[#D4A373] hover:text-white transition-all opacity-0 group-hover:opacity-100">
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-y-1/2 flex gap-2 -translate-x-1/2">
        {items.map((_, idx) => (
          <button 
            key={idx} 
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-[#D4A373] w-6' : 'bg-[#D4A373]/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

const Home = ({ navigate }) => {
  return (
    <div className="w-full">
      <section className="min-h-screen flex items-center pt-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 w-full">
          <div className="w-full md:w-1/2 space-y-6">
            <RevealOnScroll delay={0}>
              <span className="font-handwriting text-2xl md:text-3xl text-[#D4A373]">Assalamu Alaikum, I am</span>
            </RevealOnScroll>
            <RevealOnScroll delay={100}>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900 dark:text-[#FEFAE0]">
                MD. Solaiman Hossen
              </h1>
            </RevealOnScroll>
            <RevealOnScroll delay={200}>
              <h2 className="text-xl md:text-2xl text-[#D4A373] font-light">
                EEE Student & Systems Enthusiast
              </h2>
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
              <p className="text-lg text-gray-700 dark:text-[#E9EDC9] max-w-lg leading-relaxed">
                Bridging the gap between physical circuits and digital logic. Passionate about microcontrollers, PCB design, and embedding Islamic ethics into technological innovation.
              </p>
            </RevealOnScroll>
            <RevealOnScroll delay={400}>
              <div className="flex gap-4 pt-4">
                <button onClick={() => navigate('projects')} className="px-8 py-3 bg-[#D4A373] text-[#FEFAE0] rounded shadow-md hover:bg-[#b88c61] transition-colors font-medium tracking-wide">
                  View Projects
                </button>
                <button onClick={() => navigate('contact')} className="px-8 py-3 border-2 border-[#D4A373] text-[#D4A373] rounded hover:bg-[#D4A373] hover:text-[#FEFAE0] transition-colors font-medium tracking-wide">
                  Contact Me
                </button>
              </div>
            </RevealOnScroll>
          </div>
          <div className="w-full md:w-1/2">
            <RevealOnScroll delay={300} className="relative">
              <div className="absolute inset-0 bg-[#CCD5AE] rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <img 
                src={solaimanPortrait}
                alt="MD. Solaiman Hossen"
                className="relative z-10 w-full h-[500px] object-cover rounded-2xl shadow-2xl border-4 border-[#FAEDCD] dark:border-[#CCD5AE]/20 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#FEFAE0] dark:bg-[#1a2015] p-4 rounded-lg shadow-xl border border-[#D4A373]/30 z-20">
                <p className="font-handwriting text-xl text-[#D4A373]">"In the name of Allah..."</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#FAEDCD]/30 dark:bg-[#CCD5AE]/5 border-y border-[#E9EDC9] dark:border-[#CCD5AE]/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <RevealOnScroll>
            <Activity className="mx-auto text-[#D4A373] mb-6" size={40} />
            <h2 className="text-4xl font-bold mb-6 dark:text-[#FEFAE0]">Engineering with Purpose</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <p className="text-xl text-gray-700 dark:text-[#E9EDC9] leading-relaxed">
              As a student of Electrical and Electronic Engineering, I view the universe as a magnificent circuit designed by the Creator. My goal is to build sustainable, efficient systems that serve humanity while maintaining the delicate balance of our world.
            </p>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
};

const Projects = () => {
  const [lightboxImg, setLightboxImg] = useState(null);

  const projects = [
    {
      title: "Smart Irrigation via ESP32",
      category: "Microcontroller",
      desc: "An automated irrigation system utilizing soil moisture sensors and an ESP32 microcontroller to optimize water usage in arid regions. Features a real-time dashboard.",
      img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=800",
      tech: ["ESP32", "C++", "IoT", "Sensors"]
    },
    {
      title: "Buck-Boost Converter Simulation",
      category: "Circuit Simulation",
      desc: "Detailed LTspice simulation and physical prototype of a high-efficiency buck-boost converter for solar panel applications. Analyzed transient responses and thermal dissipation.",
      img: "https://images.unsplash.com/photo-1631557077673-059a7a9e334a?auto=format&fit=crop&q=80&w=800",
      tech: ["LTspice", "Proteus", "Power Electronics"]
    },
    {
      title: "Arduino-based Braille Display",
      category: "Embedded Systems",
      desc: "A low-cost, open-source refreshable Braille display aimed at making digital text accessible. Uses an Arduino Mega and micro-solenoids.",
      img: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
      tech: ["Arduino", "Hardware Design", "Accessibility"]
    }
  ];

  return (
    <div className="w-full pt-24 pb-20">
      <div 
        className="w-full h-[40vh] flex items-center justify-center parallax-bg relative mb-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=1920')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 text-center space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-[#FEFAE0]">My Projects</h1>
          <p className="text-xl text-[#E9EDC9] font-handwriting">Circuits, Code, and Creativity</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {projects.map((proj, idx) => (
          <RevealOnScroll key={idx} className={`flex flex-col gap-12 items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
            <div className="w-full md:w-1/2 cursor-pointer group relative overflow-hidden rounded-xl border border-[#D4A373]/20 shadow-lg" onClick={() => setLightboxImg(proj.img)}>
              <div className="absolute inset-0 bg-[#D4A373]/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <span className="text-[#FEFAE0] font-bold tracking-wider bg-black/50 px-4 py-2 rounded">VIEW SCHEMATIC</span>
              </div>
              <img src={proj.img} alt={proj.title} className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105 filter sepia-[0.3] dark:sepia-[0.5]" />
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block px-3 py-1 bg-[#CCD5AE] dark:bg-[#CCD5AE]/20 text-[#1a2015] dark:text-[#E9EDC9] rounded-full text-sm font-semibold tracking-wide">
                {proj.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold dark:text-[#FEFAE0]">{proj.title}</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {proj.desc}
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {proj.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 border border-[#D4A373] text-[#D4A373] rounded text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
      <Lightbox isOpen={!!lightboxImg} image={lightboxImg} onClose={() => setLightboxImg(null)} />
    </div>
  );
};

const About = () => {
  return (
    <div className="w-full pt-32 pb-20 px-6 max-w-5xl mx-auto">
      <RevealOnScroll>
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-[#FEFAE0]">About Me</h1>
          <p className="text-[#D4A373] text-xl font-handwriting">The journey of a lifelong learner</p>
        </div>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <RevealOnScroll delay={100} className="space-y-8 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          <p>
            Greetings! I am MD. Solaiman Hossen, a dedicated student of Electrical and Electronic Engineering. My fascination with technology began not with screens, but with broken radios and tangled copper wires. 
          </p>
          <p>
            I specialize in bridging the gap between low-level hardware and functional software. Whether it's configuring an ESP32 for IoT applications or designing complex schematics in Proteus, I thrive in the intersection of logic and physics.
          </p>
          <div className="p-6 bg-[#FAEDCD] dark:bg-[#1a2015] border-l-4 border-[#D4A373] rounded-r shadow-sm">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-[#FEFAE0]">Core Competencies</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><Cpu size={18} className="text-[#D4A373]"/> Embedded C / C++</li>
              <li className="flex items-center gap-2"><Code size={18} className="text-[#D4A373]"/> Arduino, ESP32, STM32</li>
              <li className="flex items-center gap-2"><Activity size={18} className="text-[#D4A373]"/> Proteus, LTspice, Altium Designer</li>
            </ul>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <div className="relative">
            <div className="absolute inset-0 bg-[#D4A373] translate-x-4 translate-y-4 rounded-lg -z-10"></div>
            <img 
              src={solaimanPortrait}
              alt="MD. Solaiman Hossen"
              className="w-full h-auto rounded-lg shadow-xl sepia-[0.2]"
            />
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

const Reflections = () => {
  const verses = [
    { text: "And He has subjected to you whatever is in the heavens and whatever is on the earth - all from Him. Indeed in that are signs for a people who give thought.", author: "Qur'an 45:13" },
    { text: "He grants wisdom to whom He pleases, and whoever is granted wisdom is indeed given abundant wealth.", author: "Qur'an 2:269" },
    { text: "Seek knowledge from the cradle to the grave.", author: "Prophetic Tradition (Hadith)" }
  ];

  return (
    <div className="w-full pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <RevealOnScroll>
        <div className="text-center mb-16 space-y-4">
          <BookOpen className="mx-auto text-[#D4A373] mb-4" size={48} />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-[#FEFAE0]">Reflections</h1>
          <p className="text-gray-600 dark:text-[#E9EDC9] max-w-2xl mx-auto text-lg">
            Finding balance between worldly knowledge and spiritual wisdom. Technology is a tool provided by the Creator; how we use it defines our purpose.
          </p>
        </div>
      </RevealOnScroll>

      <RevealOnScroll delay={200} className="mb-24">
        <Carousel items={verses} />
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 gap-12">
        <RevealOnScroll delay={300} className="bg-[#FEFAE0] dark:bg-[#1a2015]/80 p-8 rounded-xl border border-[#CCD5AE] shadow-lg">
          <h3 className="text-2xl font-serif font-bold mb-4 text-[#D4A373]">Science & Faith</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            In studying Electrical Engineering, I am constantly reminded of the intricate laws that govern our universe. The precise behavior of electrons, the mathematical elegance of electromagnetism—these are not random occurrences, but signs of a grand design.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Every simulation that runs successfully, every circuit that powers on, reinforces my belief in the ultimate Order established by Allah.
          </p>
        </RevealOnScroll>
        
        <RevealOnScroll delay={400} className="bg-[#FEFAE0] dark:bg-[#1a2015]/80 p-8 rounded-xl border border-[#CCD5AE] shadow-lg">
          <h3 className="text-2xl font-serif font-bold mb-4 text-[#D4A373]">Ethics in Engineering</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The Prophet Muhammad (peace be upon him) emphasized doing things with 'Ihsan' (excellence and beauty). As an engineer, Ihsan translates to writing clean code, designing safe circuits, and building products that genuinely benefit society rather than cause harm.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Integrity in testing, honesty in reporting results, and dedication to continuous learning are deeply rooted in my faith.
          </p>
        </RevealOnScroll>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formStatus, setFormStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('sent');
      e.target.reset();
      setTimeout(() => setFormStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="w-full pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      <RevealOnScroll>
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-[#FEFAE0]">Get in Touch</h1>
          <p className="text-[#D4A373] text-xl font-handwriting">Let's build something meaningful together.</p>
        </div>
      </RevealOnScroll>

      <div className="bg-[#FAEDCD]/50 dark:bg-[#1a2015]/60 p-8 md:p-12 rounded-2xl border border-[#D4A373]/30 shadow-xl backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-[#E9EDC9]">Name</label>
              <input required type="text" className="w-full p-4 bg-[#FEFAE0] dark:bg-black/20 border border-[#CCD5AE] rounded focus:outline-none focus:border-[#D4A373] transition-colors dark:text-white" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-[#E9EDC9]">Email</label>
              <input required type="email" className="w-full p-4 bg-[#FEFAE0] dark:bg-black/20 border border-[#CCD5AE] rounded focus:outline-none focus:border-[#D4A373] transition-colors dark:text-white" placeholder="john@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-[#E9EDC9]">Message</label>
            <textarea required rows="5" className="w-full p-4 bg-[#FEFAE0] dark:bg-black/20 border border-[#CCD5AE] rounded focus:outline-none focus:border-[#D4A373] transition-colors dark:text-white resize-none" placeholder="Assalamu Alaikum, I would like to discuss a project..."></textarea>
          </div>
          <button 
            disabled={formStatus === 'sending'}
            type="submit" 
            className="w-full py-4 bg-[#D4A373] text-[#FEFAE0] font-bold tracking-widest uppercase rounded hover:bg-[#b88c61] transition-colors disabled:opacity-70"
          >
            {formStatus === 'sending' ? 'Sending...' : formStatus === 'sent' ? 'Message Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPath, setCurrentPath] = useState('home');
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = (path) => {
    setCurrentPath(path);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('texture-dark', 'bg-[#12160f]');
      document.body.classList.remove('texture-light', 'bg-[#FEFAE0]');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.add('texture-light', 'bg-[#FEFAE0]');
      document.body.classList.remove('texture-dark', 'bg-[#12160f]');
    }
  }, [isDark]);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'reflections', label: 'Reflections' },
    { id: 'contact', label: 'Contact' }
  ];

  const renderPage = () => {
    switch (currentPath) {
      case 'home': return <Home navigate={navigate} />;
      case 'projects': return <Projects />;
      case 'about': return <About />;
      case 'reflections': return <Reflections />;
      case 'contact': return <Contact />;
      default: return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col text-gray-800 dark:text-[#E9EDC9]">
      <GlobalStyles />
      
      <nav className="fixed top-0 w-full z-40 transition-all duration-300 bg-[#FEFAE0]/90 dark:bg-[#12160f]/90 backdrop-blur-md border-b border-[#D4A373]/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="text-2xl font-serif font-bold text-[#D4A373] cursor-pointer tracking-wide flex items-center gap-2"
            onClick={() => navigate('home')}
          >
            <Cpu size={28} />
            MD. Solaiman Hossen
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`text-sm font-semibold tracking-widest uppercase transition-colors relative pb-1 group
                  ${currentPath === link.id ? 'text-[#D4A373]' : 'hover:text-[#D4A373]'}
                `}
              >
                {link.label}
                <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-[#D4A373] transform origin-left transition-transform duration-300 ${currentPath === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </button>
            ))}
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-[#D4A373]">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsDark(!isDark)} className="text-[#D4A373]">
              {isDark ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#D4A373]">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <div className={`md:hidden absolute top-20 left-0 w-full bg-[#FEFAE0] dark:bg-[#12160f] border-b border-[#D4A373]/20 shadow-xl transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}>
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigate(link.id)}
                className={`text-lg font-serif tracking-widest uppercase ${currentPath === link.id ? 'text-[#D4A373] font-bold' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-grow flex flex-col relative z-10">
        <div key={currentPath}>
          {renderPage()}
        </div>
      </main>

      <footer className="w-full bg-[#FAEDCD] dark:bg-black/40 border-t border-[#D4A373]/30 py-8 relative z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-medium">
          <p className="text-gray-600 dark:text-[#E9EDC9]">
            © {new Date().getFullYear()} MD. Solaiman Hossen. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 dark:text-[#E9EDC9] hover:text-[#D4A373] transition-colors"><Github size={20} /></a>
            <a href="#" className="text-gray-600 dark:text-[#E9EDC9] hover:text-[#D4A373] transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-gray-600 dark:text-[#E9EDC9] hover:text-[#D4A373] transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-[#D4A373] text-[#FEFAE0] shadow-lg hover:-translate-y-2 transition-all duration-300 z-50 ${showBackTop ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <ArrowUp size={24} />
      </button>

    </div>
  );
}