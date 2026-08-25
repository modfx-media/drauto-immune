import type { Metadata } from "next";
import { Accent, Badge, Button, Card, Container, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Design System · Dr. Autoimmune",
  robots: "noindex, nofollow",
};

function Swatch({ name, varName, hex }: { name: string; varName: string; hex: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="h-20 w-full rounded-card-sm border border-gray"
        style={{ background: `var(${varName})` }}
      />
      <div>
        <p className="text-sm font-medium text-ink">{name}</p>
        <p className="font-mono text-xs text-ink-soft">{varName} · {hex}</p>
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <div>
      <Section bg="sage" className="!py-section-xl">
        <Container>
          <Badge>Internal · Design System</Badge>
          <h1 className="mt-4">
            Calm, clinical, <Accent>quietly confident</Accent>.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            The brand system for Dr. Autoimmune, green/sage/neutral palette,
            Open Sans for body, headings, and UI everywhere.
          </p>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-16">
          <div>
            <h2>Color palette</h2>
            <div className="mt-8 grid grid-cols-2 gap-6 md:grid-cols-4">
              <Swatch name="Primary green" varName="--primary" hex="#3F806A" />
              <Swatch name="Primary hover" varName="--primary-hover" hex="#37715D" />
              <Swatch name="Light sage" varName="--sage" hex="#DFE8DD" />
              <Swatch name="Light gray" varName="--gray" hex="#E9E9E9" />
              <Swatch name="Near-black" varName="--ink" hex="#1A1A1A" />
              <Swatch name="Ink (soft)" varName="--ink-soft" hex="#4D4D4D" />
              <Swatch name="White" varName="--white" hex="#FFFFFF" />
              <Swatch name="Primary tint" varName="--primary-tint" hex="#EAF1EE" />
            </div>
          </div>

          <div>
            <h2>Typography</h2>
            <div className="mt-8 flex flex-col gap-6 border-t border-gray pt-8">
              <h1>
                Understand <Accent>your inflammation</Accent>. Finally.
              </h1>
              <h2>
                A calmer path to <Accent>autoimmune care</Accent>
              </h2>
              <h3>Comprehensive new patient evaluation</h3>
              <p className="max-w-2xl text-lg text-ink-soft">
                Body copy in Open Sans Light, quiet, legible, unhurried. Used
                for paragraphs, descriptions, and long-form migrated content.
              </p>
              <p className="max-w-2xl text-ink-soft">
                Small body text for secondary details, captions, and helper
                copy throughout the interface.
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-soft">
                Label / meta face: DM Mono
              </p>
            </div>
          </div>

          <div>
            <h2>Buttons</h2>
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-gray pt-8">
              <Button variant="primary" className="uppercase tracking-wide">Book your Discovery Call</Button>
              <Button variant="secondary">Learn More</Button>
              <Button variant="ghost">Cancel</Button>
              <Button variant="primary" size="sm">
                Small
              </Button>
              <Button variant="primary" size="lg">
                Large
              </Button>
            </div>
          </div>

          <div>
            <h2>Badges</h2>
            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-gray pt-8">
              <Badge>Autoimmune</Badge>
              <Badge>Thyroid</Badge>
              <Badge tone="neutral">Blog</Badge>
              <Badge tone="neutral">5 min read</Badge>
            </div>
          </div>

          <div>
            <h2>Cards</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 border-t border-gray pt-8 md:grid-cols-3">
              <Card
                badge="Condition"
                title="Hashimoto's &amp; Graves' Disease"
                description="A functional medicine approach to thyroid autoimmunity, root-cause testing and personalized protocols."
                footer={
                  <Button variant="secondary" size="sm">
                    Read more
                  </Button>
                }
              />
              <Card
                badge="Blog"
                title="A Guide to Dysbiosis &amp; Autoimmunity"
                description="How gut microbial imbalance can drive systemic inflammation and autoimmune flares."
                footer={
                  <Button variant="secondary" size="sm">
                    Read more
                  </Button>
                }
              />
              <Card
                badge="Service"
                title="Wellness Services"
                description="Ongoing support programs designed to complement your care plan between visits."
                footer={
                  <Button variant="secondary" size="sm">
                    Read more
                  </Button>
                }
              />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
