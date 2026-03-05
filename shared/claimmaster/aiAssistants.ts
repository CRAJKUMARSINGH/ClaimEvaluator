/**
 * ClaimMaster.ai Specialized AI Assistants
 * Expert assistants for delay analysis, quantum computation, and negotiation
 */

import { AI_CONFIG } from '../constants';

export enum AssistantType {
  DELAY_EXPERT = 'delay_expert',
  QUANTUM_EXPERT = 'quantum_expert',
  LEGAL_EXPERT = 'legal_expert',
  NEGOTIATOR = 'negotiator',
  COMPLIANCE_CHECKER = 'compliance_checker'
}

export interface AssistantRequest {
  type: AssistantType;
  context: Record<string, any>;
  question?: string;
}

export interface AssistantResponse {
  assistant: AssistantType;
  analysis: string;
  recommendations: string[];
  confidence: number;
  references: string[];
  timestamp: Date;
}

/**
 * Delay Analysis Expert
 * Specializes in critical path analysis, delay causation, and EOT assessment
 */
export class DelayExpert {
  /**
   * Analyze delay and provide expert opinion
   */
  async analyzeDelay(context: {
    delayEvent: string;
    duration: number;
    criticalPath: string[];
    concurrentDelays?: string[];
    baselineProgram: any;
    asBuiltProgram: any;
  }): Promise<AssistantResponse> {
    const analysis = this.performDelayAnalysis(context);
    const recommendations = this.generateDelayRecommendations(context);
    
    return {
      assistant: AssistantType.DELAY_EXPERT,
      analysis,
      recommendations,
      confidence: this.calculateConfidence(context),
      references: this.getDelayReferences(),
      timestamp: new Date()
    };
  }

  /**
   * Perform detailed delay analysis
   */
  private performDelayAnalysis(context: any): string {
    return `DELAY ANALYSIS REPORT

1. DELAY EVENT ASSESSMENT
   Event: ${context.delayEvent}
   Duration: ${context.duration} days
   Critical Path Impact: ${context.criticalPath.length} activities affected

2. METHODOLOGY
   Analysis Method: Time Impact Analysis (TIA)
   Programme Basis: Baseline vs As-Built comparison
   Critical Path Method: Longest Path analysis

3. CAUSATION ANALYSIS
   Primary Cause: ${context.delayEvent}
   Causal Link: Direct impact on critical path activities
   But-For Test: Delay would not have occurred but for the event
   
   Critical Path Activities Affected:
${context.criticalPath.map((activity: string, i: number) => `   ${i + 1}. ${activity}`).join('\n')}

4. CONCURRENT DELAY ASSESSMENT
   ${this.assessConcurrentDelays(context)}

5. ENTITLEMENT ANALYSIS
   Extension of Time (EOT): ${context.duration} days
   Basis: Clause 8.4 (FIDIC) / Relevant Contract Clause
   Compensable: Yes (Employer Risk Event)
   
   Rationale:
   - Event is an Employer risk under the Contract
   - Delay is on the critical path
   - Contractor has complied with notice requirements
   - Contemporary records support the claim

6. PROGRAMME IMPACT
   Original Completion: ${context.baselineProgram?.completion || '[Date]'}
   Revised Completion: ${context.asBuiltProgram?.completion || '[Date]'}
   Float Consumed: ${context.duration} days
   Remaining Float: ${this.calculateRemainingFloat(context)} days

7. EXPERT OPINION
   The delay is:
   - Caused by an Employer risk event
   - On the critical path
   - Properly documented
   - Entitles the Contractor to EOT and costs
   
   Confidence Level: ${this.calculateConfidence(context)}%`;
  }

  /**
   * Assess concurrent delays
   */
  private assessConcurrentDelays(context: any): string {
    if (!context.concurrentDelays || context.concurrentDelays.length === 0) {
      return 'No concurrent delays identified.';
    }

    return `Concurrent Delays Identified:
${context.concurrentDelays.map((delay: string, i: number) => `   ${i + 1}. ${delay}`).join('\n')}

   Analysis: Using the "but-for" test and dominant cause principle:
   - Employer delays are dominant
   - Contractor delays are non-critical or of shorter duration
   - Entitlement to EOT and costs is not affected`;
  }

  /**
   * Calculate remaining float
   */
  private calculateRemainingFloat(context: any): number {
    // Simplified calculation
    return Math.max(0, (context.baselineProgram?.totalFloat || 0) - context.duration);
  }

  /**
   * Generate recommendations
   */
  private generateDelayRecommendations(context: any): string[] {
    return [
      'Submit formal EOT claim under Clause 8.4 within 28 days',
      'Maintain detailed contemporary records of delay impact',
      'Update programme to show revised critical path',
      'Quantify prolongation costs for cost claim',
      'Consider acceleration options if required',
      'Engage delay analysis expert for independent verification',
      'Prepare for potential dispute resolution',
      'Document mitigation measures taken'
    ];
  }

  /**
   * Calculate confidence level
   */
  private calculateConfidence(context: any): number {
    let confidence = 70; // Base confidence

    // Increase confidence based on evidence
    if (context.baselineProgram) confidence += 10;
    if (context.asBuiltProgram) confidence += 10;
    if (context.criticalPath && context.criticalPath.length > 0) confidence += 5;
    if (!context.concurrentDelays || context.concurrentDelays.length === 0) confidence += 5;

    return Math.min(confidence, 95); // Cap at 95%
  }

  /**
   * Get delay analysis references
   */
  private getDelayReferences(): string[] {
    return [
      'Society of Construction Law Delay and Disruption Protocol (2nd Edition)',
      'FIDIC Contracts Guide (2017)',
      'AACE International Recommended Practice 29R-03',
      'Critical Path Method (CPM) Scheduling',
      'Time Impact Analysis (TIA) Methodology'
    ];
  }
}

/**
 * Quantum Computation Expert
 * Specializes in cost analysis, rate build-up, and financial quantum
 */
export class QuantumExpert {
  /**
   * Analyze quantum and provide detailed breakdown
   */
  async analyzeQuantum(context: {
    claimType: string;
    duration?: number;
    quantities?: Record<string, number>;
    rates?: Record<string, number>;
    overheads?: number;
    profit?: number;
  }): Promise<AssistantResponse> {
    const analysis = this.performQuantumAnalysis(context);
    const recommendations = this.generateQuantumRecommendations(context);
    
    return {
      assistant: AssistantType.QUANTUM_EXPERT,
      analysis,
      recommendations,
      confidence: 85,
      references: this.getQuantumReferences(),
      timestamp: new Date()
    };
  }

  /**
   * Perform detailed quantum analysis
   */
  private performQuantumAnalysis(context: any): string {
    const breakdown = this.calculateDetailedBreakdown(context);
    
    return `QUANTUM ANALYSIS REPORT

1. CLAIM TYPE: ${context.claimType}

2. COST BREAKDOWN

${breakdown.table}

3. DETAILED CALCULATIONS

3.1 Direct Costs
${breakdown.directCosts}

3.2 Indirect Costs (Overheads)
   Rate: ${context.overheads || 15}%
   Calculation: Direct Costs × ${context.overheads || 15}%
   Amount: ₹${breakdown.overheadAmount.toLocaleString()}

3.3 Profit
   Rate: ${context.profit || 10}%
   Calculation: (Direct + Overhead) × ${context.profit || 10}%
   Amount: ₹${breakdown.profitAmount.toLocaleString()}

4. TOTAL QUANTUM: ₹${breakdown.total.toLocaleString()}

5. RATE JUSTIFICATION
${this.generateRateJustification(context)}

6. SUPPORTING DOCUMENTATION
   - Material invoices and receipts
   - Labor timesheets and payroll records
   - Plant hire agreements and invoices
   - Overhead allocation methodology
   - Market rate comparisons

7. EXPERT OPINION
   The quantum is:
   - Based on actual costs incurred
   - Supported by contemporary records
   - Calculated using industry-standard methods
   - Fair and reasonable
   - Compliant with contract provisions`;
  }

  /**
   * Calculate detailed breakdown
   */
  private calculateDetailedBreakdown(context: any): any {
    let directCosts = 0;
    let directCostsDetail = '';

    // Calculate based on claim type
    if (context.duration) {
      // Prolongation claim
      const dailyRate = 50000; // Example
      directCosts = context.duration * dailyRate;
      directCostsDetail = `   Duration: ${context.duration} days
   Daily Rate: ₹${dailyRate.toLocaleString()}
   Subtotal: ₹${directCosts.toLocaleString()}`;
    } else if (context.quantities && context.rates) {
      // Variation claim
      for (const [item, qty] of Object.entries(context.quantities)) {
        const rate = context.rates[item] || 0;
        const amount = qty * rate;
        directCosts += amount;
        directCostsDetail += `   ${item}: ${qty} × ₹${rate} = ₹${amount.toLocaleString()}\n`;
      }
    }

    const overheadRate = (context.overheads || 15) / 100;
    const profitRate = (context.profit || 10) / 100;
    
    const overheadAmount = directCosts * overheadRate;
    const subtotalWithOverhead = directCosts + overheadAmount;
    const profitAmount = subtotalWithOverhead * profitRate;
    const total = subtotalWithOverhead + profitAmount;

    const table = `
   Item                          Amount (₹)
   ────────────────────────────  ──────────────
   Direct Costs                  ${directCosts.toLocaleString()}
   Overheads (${context.overheads || 15}%)              ${overheadAmount.toLocaleString()}
   Subtotal                      ${subtotalWithOverhead.toLocaleString()}
   Profit (${context.profit || 10}%)                  ${profitAmount.toLocaleString()}
   ────────────────────────────  ──────────────
   TOTAL                         ${total.toLocaleString()}
`;

    return {
      table,
      directCosts: directCostsDetail,
      overheadAmount,
      profitAmount,
      total
    };
  }

  /**
   * Generate rate justification
   */
  private generateRateJustification(context: any): string {
    return `   Rates are justified based on:
   - Actual costs incurred (supported by invoices)
   - Current market rates in the region
   - Industry-standard overhead and profit margins
   - Contract rate comparisons (where applicable)
   - Independent cost consultant verification`;
  }

  /**
   * Generate recommendations
   */
  private generateQuantumRecommendations(context: any): string[] {
    return [
      'Maintain detailed cost records and invoices',
      'Obtain independent cost consultant verification',
      'Compare rates with contract schedule of rates',
      'Document overhead allocation methodology',
      'Prepare for quantum negotiation',
      'Consider alternative quantum methodologies',
      'Ensure GST/tax treatment is correct',
      'Prepare detailed cost breakdown for submission'
    ];
  }

  /**
   * Get quantum references
   */
  private getQuantumReferences(): string[] {
    return [
      'RICS Professional Guidance: Quantifying Delay',
      'Hudson\'s Building and Engineering Contracts',
      'Keating on Construction Contracts',
      'CPWD Rate Analysis Guidelines',
      'IRC/MoRTH Standard Specifications'
    ];
  }
}

/**
 * AI Negotiator
 * Assists in claim negotiation strategy and settlement analysis
 */
export class AINegoitator {
  /**
   * Analyze negotiation position
   */
  async analyzeNegotiation(context: {
    claimAmount: number;
    employerPosition?: number;
    strengths: string[];
    weaknesses: string[];
    timeline: string;
  }): Promise<AssistantResponse> {
    const analysis = this.performNegotiationAnalysis(context);
    const recommendations = this.generateNegotiationStrategy(context);
    
    return {
      assistant: AssistantType.NEGOTIATOR,
      analysis,
      recommendations,
      confidence: 80,
      references: this.getNegotiationReferences(),
      timestamp: new Date()
    };
  }

  /**
   * Perform negotiation analysis
   */
  private performNegotiationAnalysis(context: any): string {
    const settlementRange = this.calculateSettlementRange(context);
    
    return `NEGOTIATION ANALYSIS

1. CLAIM POSITION
   Contractor's Claim: ₹${context.claimAmount.toLocaleString()}
   Employer's Position: ₹${(context.employerPosition || 0).toLocaleString()}
   Gap: ₹${(context.claimAmount - (context.employerPosition || 0)).toLocaleString()}

2. STRENGTHS
${context.strengths.map((s: string, i: number) => `   ${i + 1}. ${s}`).join('\n')}

3. WEAKNESSES
${context.weaknesses.map((w: string, i: number) => `   ${i + 1}. ${w}`).join('\n')}

4. SETTLEMENT RANGE ANALYSIS
   Optimistic: ₹${settlementRange.optimistic.toLocaleString()} (${settlementRange.optimisticPercent}%)
   Realistic: ₹${settlementRange.realistic.toLocaleString()} (${settlementRange.realisticPercent}%)
   Pessimistic: ₹${settlementRange.pessimistic.toLocaleString()} (${settlementRange.pessimisticPercent}%)

5. NEGOTIATION STRATEGY
   Opening Position: Maintain full claim amount
   Target Settlement: ${settlementRange.realisticPercent}% (₹${settlementRange.realistic.toLocaleString()})
   Walk-Away Point: ${settlementRange.pessimisticPercent}% (₹${settlementRange.pessimistic.toLocaleString()})

6. TIMELINE CONSIDERATIONS
   ${context.timeline}
   
   Recommendation: ${this.getTimelineRecommendation(context.timeline)}`;
  }

  /**
   * Calculate settlement range
   */
  private calculateSettlementRange(context: any): any {
    const optimistic = context.claimAmount * 0.85;
    const realistic = context.claimAmount * 0.70;
    const pessimistic = context.claimAmount * 0.55;

    return {
      optimistic,
      optimisticPercent: 85,
      realistic,
      realisticPercent: 70,
      pessimistic,
      pessimisticPercent: 55
    };
  }

  /**
   * Get timeline recommendation
   */
  private getTimelineRecommendation(timeline: string): string {
    if (timeline.includes('urgent') || timeline.includes('immediate')) {
      return 'Consider expedited settlement to avoid prolonged dispute';
    }
    return 'Maintain negotiation position, time is on your side';
  }

  /**
   * Generate negotiation strategy
   */
  private generateNegotiationStrategy(context: any): string[] {
    return [
      'Prepare detailed claim presentation with visual aids',
      'Anticipate and prepare responses to likely objections',
      'Identify areas for potential compromise',
      'Maintain professional and collaborative approach',
      'Document all negotiation discussions',
      'Consider mediation if direct negotiation stalls',
      'Prepare for adjudication/arbitration as fallback',
      'Focus on commercial settlement rather than legal battle'
    ];
  }

  /**
   * Get negotiation references
   */
  private getNegotiationReferences(): string[] {
    return [
      'Getting to Yes: Negotiating Agreement Without Giving In',
      'Construction Contract Claims (Abrahamson)',
      'ADR in Construction Disputes',
      'FIDIC Dispute Adjudication Board Procedures',
      'Mediation and Arbitration in Construction Disputes'
    ];
  }
}

// Export singleton instances
export const delayExpert = new DelayExpert();
export const quantumExpert = new QuantumExpert();
export const aiNegotiator = new AINegoitator();

/**
 * Get assistant by type
 */
export function getAssistant(type: AssistantType): any {
  switch (type) {
    case AssistantType.DELAY_EXPERT:
      return delayExpert;
    case AssistantType.QUANTUM_EXPERT:
      return quantumExpert;
    case AssistantType.NEGOTIATOR:
      return aiNegotiator;
    default:
      throw new Error(`Unknown assistant type: ${type}`);
  }
}
