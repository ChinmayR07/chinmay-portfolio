'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn, generateId } from '@/lib/utils';
import { chatPanelVariants } from '@/lib/animations';
import { BOT_SUGGESTED_PROMPTS } from '@/data';
import type { ChatMessage } from '@/types';

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi! I'm Chinmay's AI portfolio assistant, powered by Claude. Ask me anything about his skills, experience, or projects — I'm happy to help! 👋",
  timestamp: new Date(),
};

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPrompts, setShowPrompts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    const content = text.trim();
    if (!content || isLoading) return;

    setShowPrompts(false);
    setInput('');

    // Add user message
    const userMsg: ChatMessage = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Build history (exclude welcome message, last 10 messages for context window)
      const history = messages
        .filter((m) => m.id !== 'welcome')
        .slice(-10)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content, history }),
      });

      const data = await res.json();
      const responseText =
        data.response ?? data.error ?? 'Sorry, something went wrong. Please try again.';

      const assistantMsg: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: generateId(),
          role: 'assistant',
          content:
            'Connection error. Please try again or reach out to Chinmay directly at chinmayraichur@gmail.com.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const resetChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setShowPrompts(true);
    setInput('');
  };

  return (
    <>
      {/* ── Chat Panel ──────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-panel"
            variants={chatPanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed bottom-24 right-4 z-50 sm:right-6',
              'flex w-[calc(100vw-2rem)] max-w-[380px] flex-col',
              'rounded-2xl border border-[var(--border-strong)]',
              'bg-[var(--bg-card)] shadow-2xl',
              'overflow-hidden'
            )}
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[rgba(99,102,241,0.15)]">
                  <Bot size={15} className="text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    Chinmay&apos;s AI Assistant
                  </p>
                  <p className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
                    Powered by Claude API
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="rounded px-2 py-1 text-xs text-[var(--text-muted)] transition-colors hover:text-[var(--text-secondary)]"
                  title="Reset conversation"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
                  aria-label="Close chat"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex items-start gap-2.5',
                    msg.role === 'user' && 'flex-row-reverse'
                  )}
                >
                  {/* Avatar */}
                  <div
                    className={cn(
                      'mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full',
                      msg.role === 'assistant'
                        ? 'bg-[rgba(99,102,241,0.15)] text-[var(--accent)]'
                        : 'bg-[rgba(16,185,129,0.15)] text-[var(--success)]'
                    )}
                  >
                    {msg.role === 'assistant' ? <Bot size={12} /> : <User size={12} />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={cn(
                      'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                      msg.role === 'assistant'
                        ? 'rounded-tl-sm bg-[var(--bg-secondary)] text-[var(--text-primary)]'
                        : 'rounded-tr-sm bg-[var(--accent)] text-white'
                    )}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[rgba(99,102,241,0.15)] text-[var(--accent)]">
                    <Bot size={12} />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-[var(--bg-secondary)] px-3.5 py-3">
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-[var(--text-muted)]"
                          animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested prompts */}
            <AnimatePresence>
              {showPrompts && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-[var(--border)] px-3 py-2"
                >
                  <p className="mb-1.5 text-xs text-[var(--text-muted)]">Try asking:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {BOT_SUGGESTED_PROMPTS.slice(0, 4).map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className={cn(
                          'rounded-full border px-2.5 py-1 text-xs transition-all',
                          'border-[var(--border)] text-[var(--text-secondary)]',
                          'hover:border-[var(--accent)] hover:text-[var(--accent)]'
                        )}
                      >
                        {prompt.length > 32 ? prompt.slice(0, 32) + '…' : prompt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input */}
            <div className="border-t border-[var(--border)] p-3">
              <div className="flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-secondary)] px-3 py-2 focus-within:border-[var(--accent)]">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Chinmay's experience..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none disabled:opacity-50"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-lg transition-all',
                    input.trim() && !isLoading
                      ? 'bg-[var(--accent)] text-white hover:bg-[#4f46e5]'
                      : 'text-[var(--text-muted)]'
                  )}
                  aria-label="Send message"
                >
                  <Send size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Trigger Button ─────────────────────────────── */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'fixed bottom-6 right-4 z-50 sm:right-6',
          'flex h-14 w-14 items-center justify-center rounded-full',
          'bg-[var(--accent)] text-white shadow-lg',
          'transition-all duration-200',
          isOpen ? 'shadow-none' : 'hover:shadow-[0_0_24px_rgba(99,102,241,0.5)]'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.18 }}
            >
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={20} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring when closed */}
        {!isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full bg-[var(--accent)]"
            animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.button>
    </>
  );
}
