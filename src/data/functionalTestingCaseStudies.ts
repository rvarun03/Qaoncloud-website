import type { CaseStudy } from '@/components/FunctionalTesting/CaseStudiesSection/types';

export const functionalTestingCaseStudies: CaseStudy[] = [
  {
    id: 'fintech-platform',
    title: 'FinTech Platform —',
    highlightedText: '38 integration defects caught before payment launch',
    context:
      'Launching a new payment processing pipeline with 6 third-party dependencies — payment gateway, KYC provider, banking API, notification service, ledger system, and fraud detection. Zero integration testing coverage on the pipeline.',
    whatWeDid:
      'AI mapped the full dependency chain and generated 2,200+ test scenarios across service boundaries, data handoffs, and failure states. Contract testing validated schemas between every service pair. Engineers ran exploratory sessions on edge cases — partial payment failures, gateway timeouts, reconciliation mismatches.',
    outcome: {
      label: 'Outcome',
      value: '38',
      description: 'integration defects caught pre-launch',
      highlights: [
        '38 integration defects caught pre-launch — 11 would have caused payment failures in production.',
        '100% contract coverage across all 6 third-party dependencies.',
        'Zero integration-related incidents in the first 90 days post-launch.',
      ],
    },
  },
  {
    id: 'saas-platform',
    title: 'SaaS Platform —',
    highlightedText: 'Third-party API change detected 48 hours before it broke production',
    context:
      'Running 15+ third-party integrations — CRM, email provider, analytics, SSO, billing. No monitoring on any of them. Found out about breaking changes when features stopped working.',
    whatWeDid:
      'AI baselined response patterns across all third-party APIs. Continuous monitoring flagged deviations — schema changes, latency spikes, new error codes. Integration test suite covered the critical data flows between internal services and external dependencies.',
    outcome: {
      label: 'Outcome',
      value: '48 hours',
      description: 'before subscription renewals would break',
      highlights: [
        'Detected a billing API schema change 48 hours before it would have broken subscription renewals.',
        'Third-party integration incidents reduced from ~4/month to under 1/month.',
        'Mean time to detect third-party issues: from post-incident to pre-incident.',
      ],
    },
  },
];
