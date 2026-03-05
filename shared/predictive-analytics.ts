/**
 * Predictive Analytics Engine
 * ML-powered claim success prediction and settlement forecasting
 */

export interface ClaimPrediction {
  successProbability: number; // 0-1
  confidence: number; // 0-1
  estimatedSettlement: {
    amount: number;
    range: { min: number; max: number };
    currency: string;
  };
  expectedTimeline: {
    days: number;
    range: { min: number; max: number };
  };
  riskFactors: RiskFactor[];
  strengthFactors: StrengthFactor[];
  similarCases: SimilarCase[];
  recommendations: string[];
}

export interface RiskFactor {
  factor: string;
  impact: 'high' | 'medium' | 'low';
  description: string;
  mitigation: string;
}

export interface StrengthFactor {
  factor: string;
  impact: 'high' | 'medium' | 'low';
  description: string;
  leverage: string;
}

export interface SimilarCase {
  id: string;
  title: string;
  contractType: string;
  claimAmount: number;
  settledAmount: number;
  duration: number;
  outcome: 'won' | 'lost' | 'settled';
  similarity: number; // 0-1
  keyLessons: string[];
}

export interface BenchmarkData {
  sector: string;
  contractType: string;
  averageClaimAmount: number;
  averageSettlementRatio: number; // settled/claimed
  averageDuration: number; // days
  successRate: number; // 0-1
  commonIssues: string[];
  trendData: TrendPoint[];
}

export interface TrendPoint {
  period: string;
  averageAmount: number;
  successRate: number;
  count: number;
}

export class PredictiveAnalyticsEngine {
  /**
   * Predict claim success probability using ML model
   */
  async predictSuccessRate(claim: any): Promise<ClaimPrediction> {
    // Feature extraction
    const features = this.extractFeatures(claim);
    
    // Calculate base probability
    const baseProbability = this.calculateBaseProbability(features);
    
    // Adjust for risk factors
    const riskFactors = this.identifyRiskFactors(claim);
    const strengthFactors = this.identifyStrengthFactors(claim);
    
    // Calculate adjusted probability
    const adjustedProbability = this.adjustProbability(
      baseProbability,
      riskFactors,
      strengthFactors
    );
    
    // Find similar cases
    const similarCases = await this.findSimilarCases(claim);
    
    // Estimate settlement amount
    const estimatedSettlement = this.estimateSettlement(
      claim,
      similarCases,
      adjustedProbability
    );
    
    // Estimate timeline
    const expectedTimeline = this.estimateTimeline(claim, similarCases);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(
      claim,
      riskFactors,
      strengthFactors,
      similarCases
    );
    
    return {
      successProbability: adjustedProbability,
      confidence: this.calculateConfidence(features, similarCases),
      estimatedSettlement,
      expectedTimeline,
      riskFactors,
      strengthFactors,
      similarCases,
      recommendations
    };
  }

  private extractFeatures(claim: any): Record<string, any> {
    return {
      claimAmount: claim.amount || 0,
      contractType: claim.contractType || 'unknown',
      sector: claim.sector || 'unknown',
      delayMonths: claim.delayMonths || 0,
      documentationQuality: this.assessDocumentationQuality(claim),
      legalBasisStrength: this.assessLegalBasisStrength(claim),
      evidenceQuality: this.assessEvidenceQuality(claim),
      contractorReputation: claim.contractorReputation || 'unknown',
      projectSize: claim.projectSize || 'medium',
      jurisdiction: claim.jurisdiction || 'unknown',
      hasExpertSupport: claim.hasExpertSupport || false,
      timelinessOfClaim: this.assessTimeliness(claim),
    };
  }

  private calculateBaseProbability(features: Record<string, any>): number {
    // Simplified ML model - in production, use trained model
    let probability = 0.5; // Base 50%
    
    // Documentation quality impact
    if (features.documentationQuality === 'excellent') probability += 0.15;
    else if (features.documentationQuality === 'good') probability += 0.08;
    else if (features.documentationQuality === 'poor') probability -= 0.10;
    
    // Legal basis strength
    if (features.legalBasisStrength === 'strong') probability += 0.12;
    else if (features.legalBasisStrength === 'weak') probability -= 0.15;
    
    // Evidence quality
    if (features.evidenceQuality === 'comprehensive') probability += 0.10;
    else if (features.evidenceQuality === 'limited') probability -= 0.08;
    
    // Timeliness
    if (features.timelinessOfClaim === 'timely') probability += 0.08;
    else if (features.timelinessOfClaim === 'late') probability -= 0.12;
    
    // Expert support
    if (features.hasExpertSupport) probability += 0.07;
    
    return Math.max(0, Math.min(1, probability));
  }

  private identifyRiskFactors(claim: any): RiskFactor[] {
    const risks: RiskFactor[] = [];
    
    // Late notification
    if (claim.notificationDelay && claim.notificationDelay > 28) {
      risks.push({
        factor: 'Late Notification',
        impact: 'high',
        description: `Claim notified ${claim.notificationDelay} days after event, exceeding contractual limit`,
        mitigation: 'Provide justification for delay, demonstrate continuous awareness'
      });
    }
    
    // Weak documentation
    if (!claim.evidence || claim.evidence.length < 3) {
      risks.push({
        factor: 'Insufficient Documentation',
        impact: 'high',
        description: 'Limited supporting evidence provided',
        mitigation: 'Gather additional contemporary records, site diaries, correspondence'
      });
    }
    
    // Unclear causation
    if (!claim.causationAnalysis) {
      risks.push({
        factor: 'Unclear Causation',
        impact: 'medium',
        description: 'Link between event and impact not clearly established',
        mitigation: 'Prepare detailed cause-and-effect analysis with expert support'
      });
    }
    
    // Concurrent delays
    if (claim.concurrentDelays) {
      risks.push({
        factor: 'Concurrent Delays',
        impact: 'medium',
        description: 'Multiple delay events occurring simultaneously',
        mitigation: 'Perform detailed delay analysis to apportion responsibility'
      });
    }
    
    // Lack of mitigation
    if (!claim.mitigationEfforts) {
      risks.push({
        factor: 'No Mitigation Demonstrated',
        impact: 'medium',
        description: 'No evidence of efforts to minimize impact',
        mitigation: 'Document all mitigation measures taken'
      });
    }
    
    return risks;
  }

  private identifyStrengthFactors(claim: any): StrengthFactor[] {
    const strengths: StrengthFactor[] = [];
    
    // Strong contractual basis
    if (claim.contractClause && claim.contractClause.length > 0) {
      strengths.push({
        factor: 'Clear Contractual Entitlement',
        impact: 'high',
        description: 'Claim directly supported by specific contract clauses',
        leverage: 'Emphasize contractual obligations and precedent'
      });
    }
    
    // Contemporary records
    if (claim.hasContemporaryRecords) {
      strengths.push({
        factor: 'Contemporary Documentation',
        impact: 'high',
        description: 'Real-time records supporting claim',
        leverage: 'Use as primary evidence, difficult to dispute'
      });
    }
    
    // Expert support
    if (claim.expertReports && claim.expertReports.length > 0) {
      strengths.push({
        factor: 'Expert Validation',
        impact: 'high',
        description: 'Independent expert reports supporting claim',
        leverage: 'Expert testimony carries significant weight'
      });
    }
    
    // Employer breach
    if (claim.employerBreach) {
      strengths.push({
        factor: 'Employer Breach of Contract',
        impact: 'high',
        description: 'Clear breach by employer triggering claim',
        leverage: 'Strong legal position, potential for full recovery'
      });
    }
    
    // Precedent cases
    if (claim.precedentCases && claim.precedentCases.length > 0) {
      strengths.push({
        factor: 'Supporting Precedents',
        impact: 'medium',
        description: 'Similar cases decided in favor of contractor',
        leverage: 'Cite precedents in submissions and negotiations'
      });
    }
    
    return strengths;
  }

  private adjustProbability(
    base: number,
    risks: RiskFactor[],
    strengths: StrengthFactor[]
  ): number {
    let adjusted = base;
    
    // Reduce for high-impact risks
    const highRisks = risks.filter(r => r.impact === 'high').length;
    adjusted -= highRisks * 0.08;
    
    // Increase for high-impact strengths
    const highStrengths = strengths.filter(s => s.impact === 'high').length;
    adjusted += highStrengths * 0.06;
    
    return Math.max(0.05, Math.min(0.95, adjusted));
  }

  private async findSimilarCases(claim: any): Promise<SimilarCase[]> {
    // Mock similar cases - in production, query database
    return [
      {
        id: 'CASE-2023-001',
        title: 'Highway Extension Delay Claim',
        contractType: 'FIDIC Red Book',
        claimAmount: 45000000,
        settledAmount: 38000000,
        duration: 180,
        outcome: 'settled',
        similarity: 0.87,
        keyLessons: [
          'Strong contemporary records were decisive',
          'Expert delay analysis supported claim',
          'Settlement achieved before arbitration'
        ]
      },
      {
        id: 'CASE-2022-045',
        title: 'Bridge Construction Variation Claim',
        contractType: 'FIDIC Red Book',
        claimAmount: 52000000,
        settledAmount: 48000000,
        duration: 210,
        outcome: 'won',
        similarity: 0.82,
        keyLessons: [
          'Clear contractual entitlement established',
          'Detailed cost breakdown accepted',
          'Arbitration ruled in favor of contractor'
        ]
      },
      {
        id: 'CASE-2023-012',
        title: 'Metro Station Delay and Disruption',
        contractType: 'NHAI HAM',
        claimAmount: 38000000,
        settledAmount: 25000000,
        duration: 240,
        outcome: 'settled',
        similarity: 0.78,
        keyLessons: [
          'Concurrent delay reduced recovery',
          'Mitigation efforts recognized',
          'Negotiated settlement avoided lengthy arbitration'
        ]
      }
    ];
  }

  private estimateSettlement(
    claim: any,
    similarCases: SimilarCase[],
    probability: number
  ): { amount: number; range: { min: number; max: number }; currency: string } {
    const claimAmount = claim.amount || 0;
    
    // Calculate average settlement ratio from similar cases
    const avgRatio = similarCases.reduce((sum, c) => 
      sum + (c.settledAmount / c.claimAmount), 0
    ) / similarCases.length || 0.75;
    
    // Adjust based on success probability
    const adjustedRatio = avgRatio * (0.5 + probability * 0.5);
    
    const estimatedAmount = claimAmount * adjustedRatio;
    
    return {
      amount: estimatedAmount,
      range: {
        min: estimatedAmount * 0.7,
        max: estimatedAmount * 1.2
      },
      currency: claim.currency || 'INR'
    };
  }

  private estimateTimeline(
    claim: any,
    similarCases: SimilarCase[]
  ): { days: number; range: { min: number; max: number } } {
    // Calculate average duration from similar cases
    const avgDuration = similarCases.reduce((sum, c) => 
      sum + c.duration, 0
    ) / similarCases.length || 180;
    
    // Adjust based on complexity
    let complexity = 1.0;
    if (claim.amount > 100000000) complexity = 1.3;
    if (claim.concurrentDelays) complexity *= 1.2;
    if (claim.expertReports && claim.expertReports.length > 0) complexity *= 0.9;
    
    const estimatedDays = Math.round(avgDuration * complexity);
    
    return {
      days: estimatedDays,
      range: {
        min: Math.round(estimatedDays * 0.7),
        max: Math.round(estimatedDays * 1.5)
      }
    };
  }

  private generateRecommendations(
    claim: any,
    risks: RiskFactor[],
    strengths: StrengthFactor[],
    similarCases: SimilarCase[]
  ): string[] {
    const recommendations: string[] = [];
    
    // Address high-impact risks
    risks.filter(r => r.impact === 'high').forEach(risk => {
      recommendations.push(`Priority: ${risk.mitigation}`);
    });
    
    // Leverage strengths
    strengths.filter(s => s.impact === 'high').forEach(strength => {
      recommendations.push(`Leverage: ${strength.leverage}`);
    });
    
    // Learn from similar cases
    if (similarCases.length > 0) {
      const topCase = similarCases[0];
      recommendations.push(
        `Learn from ${topCase.title}: ${topCase.keyLessons[0]}`
      );
    }
    
    // General best practices
    recommendations.push(
      'Maintain detailed contemporary records throughout the process',
      'Consider early settlement discussions to reduce costs and timeline',
      'Engage expert consultants for technical and legal support'
    );
    
    return recommendations;
  }

  private calculateConfidence(
    features: Record<string, any>,
    similarCases: SimilarCase[]
  ): number {
    let confidence = 0.5;
    
    // More similar cases = higher confidence
    if (similarCases.length >= 3) confidence += 0.2;
    else if (similarCases.length >= 1) confidence += 0.1;
    
    // High similarity = higher confidence
    const avgSimilarity = similarCases.reduce((sum, c) => 
      sum + c.similarity, 0
    ) / similarCases.length || 0;
    confidence += avgSimilarity * 0.3;
    
    return Math.min(0.95, confidence);
  }

  private assessDocumentationQuality(claim: any): string {
    const evidenceCount = claim.evidence?.length || 0;
    const hasContemporary = claim.hasContemporaryRecords || false;
    const hasExpert = claim.expertReports?.length > 0 || false;
    
    if (evidenceCount >= 5 && hasContemporary && hasExpert) return 'excellent';
    if (evidenceCount >= 3 && hasContemporary) return 'good';
    if (evidenceCount >= 2) return 'adequate';
    return 'poor';
  }

  private assessLegalBasisStrength(claim: any): string {
    const hasClause = claim.contractClause?.length > 0 || false;
    const hasPrecedent = claim.precedentCases?.length > 0 || false;
    const hasLegalOpinion = claim.legalOpinion || false;
    
    if (hasClause && hasPrecedent && hasLegalOpinion) return 'strong';
    if (hasClause && (hasPrecedent || hasLegalOpinion)) return 'moderate';
    if (hasClause) return 'adequate';
    return 'weak';
  }

  private assessEvidenceQuality(claim: any): string {
    const evidenceTypes = new Set(claim.evidence?.map((e: any) => e.type) || []);
    
    if (evidenceTypes.size >= 4) return 'comprehensive';
    if (evidenceTypes.size >= 2) return 'adequate';
    return 'limited';
  }

  private assessTimeliness(claim: any): string {
    const delay = claim.notificationDelay || 0;
    
    if (delay <= 14) return 'timely';
    if (delay <= 28) return 'acceptable';
    return 'late';
  }

  /**
   * Get industry benchmarks for comparison
   */
  async getBenchmarkData(sector: string, contractType: string): Promise<BenchmarkData> {
    // Mock benchmark data - in production, query analytics database
    return {
      sector,
      contractType,
      averageClaimAmount: 45000000,
      averageSettlementRatio: 0.78,
      averageDuration: 195,
      successRate: 0.72,
      commonIssues: [
        'Delayed payments',
        'Variation disputes',
        'Extension of time claims',
        'Disruption and prolongation'
      ],
      trendData: [
        { period: '2023-Q1', averageAmount: 42000000, successRate: 0.70, count: 45 },
        { period: '2023-Q2', averageAmount: 44000000, successRate: 0.73, count: 52 },
        { period: '2023-Q3', averageAmount: 46000000, successRate: 0.75, count: 48 },
        { period: '2023-Q4', averageAmount: 48000000, successRate: 0.74, count: 51 }
      ]
    };
  }
}

export const predictiveEngine = new PredictiveAnalyticsEngine();
