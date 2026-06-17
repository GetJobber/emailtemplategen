export interface PlanFeature {
  id: string;
  label: string;
}

export interface PriceTier {
  seats: number;
  monthlyNoCommitment: string;
  monthlyAnnual: string;
  annualMonthly: string;
  annualTotal: string;
}

export interface PlanDefinition {
  id: string;
  title: string;
  tagline: string;
  tiers: PriceTier[];
  color: string;
  features: PlanFeature[];
}

export interface AddonDefinition {
  id: string;
  name: string;
  description: string;
  price: string;
  features: PlanFeature[];
}

export type BlockKind = 'plan' | 'addon' | 'signature' | 'text';

interface BaseBlock {
  instanceId: string;
  kind: BlockKind;
}

export interface PlanBlock extends BaseBlock {
  kind: 'plan';
  definitionId: string;
  selectedSeats: number;
  visibleFeatureIds: string[];
}

export interface AddonBlock extends BaseBlock {
  kind: 'addon';
  definitionId: string;
  visibleFeatureIds: string[];
}

export interface SignatureBlock extends BaseBlock {
  kind: 'signature';
}

export interface TextBlock extends BaseBlock {
  kind: 'text';
  content: string;
}

export type CanvasBlock = PlanBlock | AddonBlock | SignatureBlock | TextBlock;

export interface EmailHeader {
  to: string;
  subject: string;
}

export interface AppState {
  header: EmailHeader;
  blocks: CanvasBlock[];
}
