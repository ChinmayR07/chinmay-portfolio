'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import { fadeUp, staggerContainer } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { SOCIAL_LINKS } from '@/data';
import type { ContactForm, FormStatus } from '@/types';

const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'chinmayraichur@gmail.com',
    href: `mailto:${SOCIAL_LINKS.email}`,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/chinmay-raichur',
    href: SOCIAL_LINKS.linkedin,
    external: true,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/chinmayraichur',
    href: SOCIAL_LINKS.github,
    external: true,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'San Francisco, CA · Open to Relocate / Remote / Hybrid',
    href: undefined,
  },
];

const INITIAL_FORM: ContactForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus('success');
        setForm(INITIAL_FORM);
      } else {
        const data = await res.json();
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again or email me directly.');
      setStatus('error');
    }
  };

  return (
    <div className="section-padding bg-[var(--bg-primary)]">
      <div className="section-container">
        <SectionWrapper>
          <SectionHeader
            label="Get In Touch"
            title="Contact Me"
            subtitle="Open to new opportunities, collaborations, or just a good engineering conversation."
          />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">

            {/* ── Left: Contact info ───────────────────────────── */}
            <div className="lg:col-span-2">
              <p className="mb-8 text-sm leading-relaxed text-[var(--text-secondary)]">
                I&apos;m currently open to <strong className="text-[var(--text-primary)]">senior
                engineer roles</strong> — full stack, backend, or cloud-focused. I typically
                respond within <strong className="text-[var(--text-primary)]">24–48 hours</strong>.
              </p>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3"
              >
                {CONTACT_ITEMS.map((item) => (
                  <motion.div key={item.label} variants={fadeUp}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className={cn(
                          'flex items-center gap-3 rounded-xl border p-3.5',
                          'border-[var(--border)] bg-[var(--bg-card)] transition-all',
                          'hover:border-[var(--accent)] hover:shadow-[0_0_0_1px_rgba(99,102,241,0.1)]',
                          'group',
                        )}
                      >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(99,102,241,0.1)]">
                          <item.icon size={15} className="text-[var(--accent)]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-[var(--text-muted)]">{item.label}</p>
                          <p className="truncate text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-3.5">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[rgba(99,102,241,0.1)]">
                          <item.icon size={15} className="text-[var(--accent)]" />
                        </div>
                        <div>
                          <p className="text-xs text-[var(--text-muted)]">{item.label}</p>
                          <p className="text-sm font-medium text-[var(--text-primary)]">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Contact form ──────────────────────────── */}
            <div className="lg:col-span-3">
              <div className={cn(
                'rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-8',
              )}>
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(16,185,129,0.1)]">
                      <CheckCircle size={28} className="text-[var(--success)]" />
                    </div>
                    <div>
                      <p className="font-display text-xl font-bold text-[var(--text-primary)]">
                        Message sent!
                      </p>
                      <p className="mt-1 text-sm text-[var(--text-secondary)]">
                        Thanks for reaching out. I&apos;ll get back to you within 24–48 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 text-sm text-[var(--accent)] hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                          Name <span className="text-[var(--accent)]">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={cn(
                            'w-full rounded-lg border bg-[var(--bg-secondary)] px-3.5 py-2.5',
                            'text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                            'border-[var(--border)] outline-none transition-colors',
                            'focus:border-[var(--accent)]',
                          )}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                          Email <span className="text-[var(--accent)]">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          className={cn(
                            'w-full rounded-lg border bg-[var(--bg-secondary)] px-3.5 py-2.5',
                            'text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                            'border-[var(--border)] outline-none transition-colors',
                            'focus:border-[var(--accent)]',
                          )}
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                        Subject
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="e.g. Engineering role at Acme Corp"
                        className={cn(
                          'w-full rounded-lg border bg-[var(--bg-secondary)] px-3.5 py-2.5',
                          'text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                          'border-[var(--border)] outline-none transition-colors',
                          'focus:border-[var(--accent)]',
                        )}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]">
                        Message <span className="text-[var(--accent)]">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell me about the opportunity, project, or just say hi..."
                        className={cn(
                          'w-full resize-none rounded-lg border bg-[var(--bg-secondary)] px-3.5 py-2.5',
                          'text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]',
                          'border-[var(--border)] outline-none transition-colors',
                          'focus:border-[var(--accent)]',
                        )}
                      />
                    </div>

                    {/* Error message */}
                    {status === 'error' && (
                      <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3.5 py-2.5 text-xs text-red-400">
                        <AlertCircle size={13} className="mt-0.5 flex-shrink-0" />
                        {errorMsg}
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading' || !form.name || !form.email || !form.message}
                      className={cn(
                        'flex w-full items-center justify-center gap-2',
                        'rounded-lg px-5 py-3 text-sm font-semibold text-white',
                        'bg-[var(--accent)] transition-all',
                        'hover:bg-[#4f46e5] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                      )}
                    >
                      {status === 'loading' ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
