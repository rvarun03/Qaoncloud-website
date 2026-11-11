export interface OutcomeData {
  label?: string;
  value: string;
  description: string;
  highlights: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  highlightedText?: string;
  context: string;
  whatWeDid: string;
  outcome: OutcomeData;
}

export interface CaseStudiesSectionProps {
  heading?: string;
  highlightedHeading?: string;
  caseStudies: CaseStudy[];
}

export interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export interface OutcomeCardProps {
  outcome: OutcomeData;
}
