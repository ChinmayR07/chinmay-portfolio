'use client';

import { useEffect, useState } from 'react';
import { Download, ExternalLink, FileText, Eye } from 'lucide-react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import SectionHeader from '@/components/ui/SectionHeader';
import { cn } from '@/lib/utils';

export default function Resume() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);
  const RESUME_PATH = '/resume.pdf';

  useEffect(() => {
    const ua = navigator.userAgent || '';
    setIsMobileDevice(/Android|iPhone|iPad|iPod/i.test(ua));
  }, []);

  const shouldShowInlinePreview = !isMobileDevice && !previewFailed;

  return (
    <div className="section-padding border-b border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="section-container">
        <SectionWrapper>
          <div className="mx-auto max-w-3xl">
            <SectionHeader label="Resume" title="My Resume" align="center" />

            {/* Action buttons */}
            <div className="mb-8 flex flex-wrap justify-center gap-3">
              <a
                href={RESUME_PATH}
                download="Chinmay_Raichur_Resume.pdf"
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold',
                  'bg-[var(--accent)] text-white transition-all',
                  'hover:bg-[#4f46e5] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                )}
              >
                <Download size={15} />
                Download PDF
              </a>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium',
                  'border-[var(--border-strong)] text-[var(--text-primary)] transition-all',
                  'hover:border-[var(--accent)] hover:text-[var(--accent)]'
                )}
              >
                <ExternalLink size={15} />
                Open in New Tab
              </a>
            </div>

            {/* PDF Embed */}
            <div
              className={cn(
                'overflow-hidden rounded-xl border border-[var(--border)]',
                'bg-[var(--bg-card)] shadow-lg'
              )}
            >
              {/* Embed header bar */}
              <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-2.5">
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <FileText size={13} />
                  Chinmay_Raichur_Resume.pdf
                </div>
                <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <Eye size={12} />
                  Preview
                </div>
              </div>

              {shouldShowInlinePreview ? (
                <iframe
                  src={`${RESUME_PATH}#view=FitH`}
                  title="Chinmay Raichur Resume"
                  className="h-[65vh] min-h-[420px] w-full sm:h-[700px]"
                  onError={() => setPreviewFailed(true)}
                />
              ) : (
                <div className="flex h-[400px] flex-col items-center justify-center gap-4 p-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[rgba(99,102,241,0.1)]">
                    <FileText size={24} className="text-[var(--accent)]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary)]">
                      Resume preview is not available on this device
                    </p>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      Open the PDF in a new tab for the best mobile viewing experience.
                    </p>
                  </div>
                  <a
                    href={RESUME_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white"
                  >
                    <ExternalLink size={14} />
                    Open Resume
                  </a>
                </div>
              )}
            </div>

            {/* Note */}
            <p className="mt-4 text-center text-xs text-[var(--text-muted)]">
              Having trouble viewing?{' '}
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                Open directly in your browser
              </a>
              .
            </p>
          </div>
        </SectionWrapper>
      </div>
    </div>
  );
}
