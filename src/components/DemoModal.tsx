import React, { useEffect, useRef, useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Lock,
  Building2,
  ArrowRight,
} from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
  initialTier?: string;
}

const COMPLIANCE_FRAMEWORKS = [
  'SOC 2 Type II',
  'ISO/IEC 27001',
  'FedRAMP High',
  'HIPAA / PCI-DSS',
];

export const DemoModal: React.FC<DemoModalProps> = ({
  isOpen,
  onClose,
  initialEmail = '',
  initialTier = 'Cloud-Native Enterprise',
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [email, setEmail] = useState(initialEmail);
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [tier, setTier] = useState(initialTier);
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>([
    'SOC 2 Type II',
  ]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialEmail) setEmail(initialEmail);
  }, [initialEmail]);

  useEffect(() => {
    if (initialTier) setTier(initialTier);
  }, [initialTier]);

  // Open/close native <dialog> via showModal() + modern-web-guidance light-dismiss fallback
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      setSubmitted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleNativeClose = () => {
      onClose();
    };

    // Fallback for browsers without closedby="any" support per modern-web-guidance
    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;
      if (!isDialogContent) {
        dialog.close();
      }
    };

    dialog.addEventListener('close', handleNativeClose);
    if (!('closedBy' in HTMLDialogElement.prototype)) {
      dialog.addEventListener('click', handleBackdropClick);
    }

    return () => {
      dialog.removeEventListener('close', handleNativeClose);
      dialog.removeEventListener('click', handleBackdropClick);
    };
  }, [onClose]);

  const toggleFramework = (fw: string) => {
    setSelectedFrameworks((prev) =>
      prev.includes(fw) ? prev.filter((item) => item !== fw) : [...prev, fw]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <dialog
      ref={dialogRef}
      closedby="any"
      aria-labelledby="demo-dialog-title"
      className="m-auto w-[94%] max-w-2xl rounded-3xl bg-gray-950 text-white border border-white/20 p-0 shadow-2xl overflow-hidden"
    >
      <div className="p-6 sm:p-8 md:p-10">
        {/* Top Bar */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#5fb9ff] mb-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>ENTERPRISE ARCHITECTURE WALKTHROUGH</span>
            </div>
            <h2
              id="demo-dialog-title"
              className="text-2xl sm:text-3xl font-black tracking-tight text-white"
            >
              {submitted
                ? 'Your Live Sandbox & Briefing Are Confirmed'
                : 'Schedule a Custom Security & UX Demo'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-6">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <div className="space-y-2 max-w-md mx-auto">
              <p className="text-lg font-bold text-white">
                Dedicated Principal Architect Assigned
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">
                We have dispatched an encrypted calendar invite and instant
                sandbox token to{' '}
                <span className="text-[#5fb9ff] font-semibold">
                  {email || 'your work email'}
                </span>{' '}
                configured for <span className="text-white font-semibold">{tier}</span>.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 max-w-md mx-auto text-left font-mono text-xs space-y-1.5">
              <div className="text-emerald-400">
                ✓ SANDBOX TENANT: EVVY-SEC-{Math.floor(1000 + Math.random() * 9000)}
              </div>
              <div className="text-gray-300">
                ✓ COMPLIANCE PROFILE: {selectedFrameworks.join(', ') || 'SOC 2 Type II'}
              </div>
              <div className="text-[#5fb9ff]">
                ✓ SLA GUARANTEE: &lt;14ms Telemetry Isolation Ready
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-[#1676d1] hover:bg-[#0b4ea8] text-white font-black px-8 py-3.5 text-sm transition-colors cursor-pointer"
            >
              Return to Experience
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="demo-name"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="demo-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#5fb9ff]"
                />
              </div>

              <div>
                <label
                  htmlFor="demo-email"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                >
                  Work Email *
                </label>
                <input
                  id="demo-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@enterprise.com"
                  className="w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#5fb9ff]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="demo-company"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                >
                  Organization / Domain *
                </label>
                <div className="relative">
                  <Building2 className="h-4 w-4 text-gray-400 absolute left-3.5 top-3.5" />
                  <input
                    id="demo-company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Financial Corp"
                    className="w-full rounded-xl bg-white/10 border border-white/20 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#5fb9ff]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="demo-tier"
                  className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2"
                >
                  Primary Architecture Focus
                </label>
                <select
                  id="demo-tier"
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full rounded-xl bg-gray-900 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5fb9ff]"
                >
                  <option value="Cloud-Native Enterprise">
                    Cloud-Native Enterprise (AWS/GCP/Azure)
                  </option>
                  <option value="Hybrid Zero-Trust">
                    Hybrid Zero-Trust Mesh
                  </option>
                  <option value="FinTech / Regulated">
                    FinTech / Regulated Compliance
                  </option>
                  <option value="Digital Strategy">
                    Digital &amp; Threat Strategy
                  </option>
                  <option value="UI/UX Design">
                    SecOps UI/UX Command Systems
                  </option>
                  <option value="Web Development">
                    Hardened Web Platform Engineering
                  </option>
                </select>
              </div>
            </div>

            {/* Compliance Checkboxes */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2.5">
                Target Compliance &amp; Governance Frameworks
              </span>
              <div className="flex flex-wrap gap-2.5">
                {COMPLIANCE_FRAMEWORKS.map((fw) => {
                  const active = selectedFrameworks.includes(fw);
                  return (
                    <button
                      key={fw}
                      type="button"
                      onClick={() => toggleFramework(fw)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#1676d1] border-[#5fb9ff] text-white'
                          : 'bg-white/5 border-white/15 text-gray-400 hover:text-white'
                      }`}
                    >
                      {fw}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Zero SDR gatekeeping — direct Principal Engineer session.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#1676d1] hover:bg-[#5fb9ff] hover:text-black text-white font-black px-7 py-3.5 text-sm transition-all cursor-pointer shadow-lg"
              >
                <Calendar className="h-4 w-4" />
                <span>Confirm Live Demo</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
};
