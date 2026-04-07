import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Education from '@/components/sections/Education';
import GitHubActivity from '@/components/sections/GitHubActivity';
import Testimonials from '@/components/sections/Testimonials';
import Resume from '@/components/sections/Resume';
import Contact from '@/components/sections/Contact';
import AIChatBot from '@/components/sections/AIChatBot';
import FloatingScrollArrow from '@/components/ui/FloatingScrollArrow';

export default function Home() {
  return (
    <>
      {/*
        Navbar is sticky at top (z-50).
        Each section has a matching id= that the navbar links to.
        IntersectionObserver in Navbar tracks which section is in view
        and highlights the corresponding nav link automatically.
      */}
      <Navbar />

      <main>
        {/* Each section id must match NAV_LINKS in Navbar.tsx */}
        <section id="home">
          <Hero />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="skills">
          <Skills />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="projects">
          <Projects />
        </section>

        <section id="education">
          <Education />
        </section>

        <section id="github">
          <GitHubActivity />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>

        <section id="resume">
          <Resume />
        </section>

        <section id="contact">
          <Contact />
        </section>
      </main>

      <Footer />

      {/* Floating next-section cue */}
      <FloatingScrollArrow />

      {/* Floating AI Chat Bot — renders on top of everything */}
      <AIChatBot />
    </>
  );
}
