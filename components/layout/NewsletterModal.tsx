"use client";

import Script from "next/script";
import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";

interface NewsletterModalProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Newsletter sign-up popup — a branded header treatment wrapping the exact
 * LeadConnector/GoHighLevel "Website Newsletter Sign-up" embed (iframe +
 * `form_embed.js` resizer script), cloned as-is. Only the surrounding
 * chrome is restyled to match the site; the embed itself is untouched.
 */
export default function NewsletterModal({ open, onClose }: NewsletterModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Subscribe to Our Newsletter" className="max-w-lg">
      <div className="relative overflow-hidden bg-gradient-to-br from-ink via-primary to-primary-active px-8 pb-8 pt-10 text-center text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-14 h-40 w-40 rounded-full bg-sage/20 blur-2xl"
        />
        <Badge className="bg-white/15 text-white">Stay Informed</Badge>
        <h2 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">Subscribe to Our Newsletter</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-white/75">
          Root-cause health insights, new articles, and clinic updates, straight to your inbox.
        </p>
      </div>

      <div className="p-4 sm:p-6" style={{ minHeight: 589 }}>
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/lmbirVMEGVc5xVZCkuxv"
          style={{ width: "100%", height: 589, border: "none", borderRadius: 12 }}
          id="inline-lmbirVMEGVc5xVZCkuxv"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Website Newsletter Sign-up"
          data-height="589"
          data-layout-iframe-id="inline-lmbirVMEGVc5xVZCkuxv"
          data-form-id="lmbirVMEGVc5xVZCkuxv"
          title="Website Newsletter Sign-up"
        />
      </div>

      <Script src="https://link.msgsndr.com/js/form_embed.js" strategy="afterInteractive" />
    </Modal>
  );
}
