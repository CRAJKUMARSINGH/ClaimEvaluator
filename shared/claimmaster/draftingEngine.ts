/**
 * ClaimMaster.ai Drafting Engine
 * AI-powered claim drafting with template customization
 */

import { ClaimTemplate, TemplateSection, getTemplate } from './templates';
import { AI_CONFIG } from '../constants';

export interface DraftingContext {
  templateId: string;
  claimData: Record<string, any>;
  contractType: string;
  projectDetails: ProjectDetails;
  customSections?: CustomSection[];
}

export interface ProjectDetails {
  projectName: string;
  contractValue: number;
  currency: string;
  contractor: string;
  employer: string;
  engineer?: string;
  authority?: string;
  startDate: Date;
  completionDate: Date;
}

export interface CustomSection {
  title: string;
  content: string;
  order: number;
}

export interface DraftedClaim {
  title: string;
  sections: DraftedSection[];
  metadata: ClaimMetadata;
  wordCount: number;
  generatedAt: Date;
}

export interface DraftedSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface ClaimMetadata {
  templateId: string;
  templateName: string;
  contractType: string;
  category: string;
  legalBasis: string[];
  requiredEvidence: string[];
}

export class DraftingEngine {
  /**
   * Draft a claim using template and context
   */
  async draftClaim(context: DraftingContext): Promise<DraftedClaim> {
    const template = getTemplate(context.templateId);
    if (!template) {
      throw new Error(`Template not found: ${context.templateId}`);
    }

    // Generate sections
    const sections = await this.generateSections(template, context);

    // Add custom sections if provided
    if (context.customSections) {
      sections.push(...context.customSections.map(cs => ({
        id: `custom-${cs.order}`,
        title: cs.title,
        content: cs.content,
        order: cs.order
      })));
    }

    // Sort by order
    sections.sort((a, b) => a.order - b.order);

    // Calculate word count
    const wordCount = this.calculateWordCount(sections);

    return {
      title: this.generateTitle(template, context),
      sections,
      metadata: {
        templateId: template.id,
        templateName: template.name,
        contractType: context.contractType,
        category: template.category,
        legalBasis: template.legalBasis,
        requiredEvidence: template.requiredEvidence
      },
      wordCount,
      generatedAt: new Date()
    };
  }

  /**
   * Generate sections from template
   */
  private async generateSections(
    template: ClaimTemplate,
    context: DraftingContext
  ): Promise<DraftedSection[]> {
    const sections: DraftedSection[] = [];

    for (const section of template.sections) {
      const content = await this.populateSection(section, context);
      sections.push({
        id: section.id,
        title: section.title,
        content,
        order: section.order
      });
    }

    return sections;
  }

  /**
   * Populate section with variables
   */
  private async populateSection(
    section: TemplateSection,
    context: DraftingContext
  ): Promise<string> {
    let content = section.content;

    // Replace variables with actual values
    for (const variable of section.variables) {
      const value = this.getVariableValue(variable, context);
      const placeholder = `{{${variable}}}`;
      content = content.replace(new RegExp(placeholder, 'g'), value);
    }

    // AI enhancement for complex sections
    if (this.needsAIEnhancement(section)) {
      content = await this.enhanceWithAI(content, section, context);
    }

    return content;
  }

  /**
   * Get variable value from context
   */
  private getVariableValue(variable: string, context: DraftingContext): string {
    // Check claim data first
    if (context.claimData[variable] !== undefined) {
      return String(context.claimData[variable]);
    }

    // Check project details
    const projectValue = this.getProjectDetailValue(variable, context.projectDetails);
    if (projectValue !== null) {
      return projectValue;
    }

    // Return placeholder if not found
    return `[${variable}]`;
  }

  /**
   * Get value from project details
   */
  private getProjectDetailValue(variable: string, details: ProjectDetails): string | null {
    const mapping: Record<string, any> = {
      'project_name': details.projectName,
      'contract_value': details.contractValue.toLocaleString(),
      'currency': details.currency,
      'contractor': details.contractor,
      'employer': details.employer,
      'engineer': details.engineer,
      'authority': details.authority,
      'original_completion': details.completionDate.toLocaleDateString(),
      'current_completion': details.completionDate.toLocaleDateString()
    };

    return mapping[variable] !== undefined ? String(mapping[variable]) : null;
  }

  /**
   * Check if section needs AI enhancement
   */
  private needsAIEnhancement(section: TemplateSection): boolean {
    const aiSections = [
      'causation_analysis',
      'concurrent_delay_analysis',
      'mitigation_measures',
      'legal_entitlement',
      'rate_justification'
    ];

    return section.variables.some(v => aiSections.includes(v));
  }

  /**
   * Enhance content with AI
   */
  private async enhanceWithAI(
    content: string,
    section: TemplateSection,
    context: DraftingContext
  ): Promise<string> {
    // This would call your AI service (Grok, OpenAI, etc.)
    // For now, return enhanced placeholder
    
    const enhancements: Record<string, string> = {
      'causation_analysis': this.generateCausationAnalysis(context),
      'concurrent_delay_analysis': this.generateConcurrentDelayAnalysis(context),
      'mitigation_measures': this.generateMitigationMeasures(context),
      'rate_justification': this.generateRateJustification(context)
    };

    let enhanced = content;
    for (const [key, value] of Object.entries(enhancements)) {
      enhanced = enhanced.replace(`{{${key}}}`, value);
    }

    return enhanced;
  }

  /**
   * Generate causation analysis
   */
  private generateCausationAnalysis(context: DraftingContext): string {
    return `The delay event directly caused the claimed delay through the following causal chain:

1. Primary Cause: ${context.claimData.delay_cause || '[Delay cause]'}
2. Direct Impact: The event prevented the Contractor from executing critical path activities
3. Consequential Effects: 
   - Disruption to planned sequence of work
   - Inability to mobilize resources as programmed
   - Extended site establishment period
4. But-For Test: But for the delay event, the works would have been completed on time
5. Foreseeability: The consequences were reasonably foreseeable at the time of contract

The causation is established through contemporary records, programme analysis, and expert testimony.`;
  }

  /**
   * Generate concurrent delay analysis
   */
  private generateConcurrentDelayAnalysis(context: DraftingContext): string {
    return `Analysis of concurrent delays has been conducted using the "but-for" test and time impact analysis:

1. Employer Risk Events: ${context.claimData.employer_delays || 'None identified'}
2. Contractor Risk Events: ${context.claimData.contractor_delays || 'None identified'}
3. Neutral Events: ${context.claimData.neutral_delays || 'None identified'}

Conclusion: The delay is predominantly caused by Employer risk events. Any concurrent Contractor delays are:
- Of shorter duration
- Not on the critical path
- Do not affect the Contractor's entitlement to EOT and costs

The Society of Construction Law Delay and Disruption Protocol has been applied in this analysis.`;
  }

  /**
   * Generate mitigation measures
   */
  private generateMitigationMeasures(context: DraftingContext): string {
    return `The Contractor has taken the following reasonable mitigation measures:

1. Resource Optimization:
   - Redeployed resources to non-critical activities
   - Maintained minimum site establishment
   - Optimized equipment utilization

2. Programme Adjustments:
   - Revised construction sequence where possible
   - Accelerated non-critical activities
   - Maintained readiness to resume critical work

3. Cost Control:
   - Minimized prolongation costs
   - Negotiated extended plant hire rates
   - Reduced overhead expenditure where feasible

4. Communication:
   - Regular updates to the Engineer/Authority
   - Proactive problem-solving
   - Collaborative approach to resolution

The Contractor has acted reasonably and prudently to minimize the impact and cost of the delay.`;
  }

  /**
   * Generate rate justification
   */
  private generateRateJustification(context: DraftingContext): string {
    return `The proposed rate is justified based on:

1. Market Rates: Current market rates for similar work in the region
2. Cost Build-Up: Detailed analysis of material, labor, and equipment costs
3. Overhead and Profit: Standard industry margins of ${context.claimData.overhead_percentage || '15'}% and ${context.claimData.profit_percentage || '10'}%
4. Risk Premium: Appropriate risk allocation for varied work
5. Comparison: Benchmarked against contract rates and industry standards

The rate is fair, reasonable, and reflects actual costs incurred plus reasonable profit.`;
  }

  /**
   * Generate claim title
   */
  private generateTitle(template: ClaimTemplate, context: DraftingContext): string {
    return `${context.projectDetails.projectName} - ${template.name}`;
  }

  /**
   * Calculate total word count
   */
  private calculateWordCount(sections: DraftedSection[]): number {
    return sections.reduce((total, section) => {
      const words = section.content.split(/\s+/).filter(w => w.length > 0);
      return total + words.length;
    }, 0);
  }

  /**
   * Export to formatted text
   */
  exportToText(claim: DraftedClaim): string {
    let output = `${claim.title}\n`;
    output += `${'='.repeat(claim.title.length)}\n\n`;
    output += `Generated: ${claim.generatedAt.toLocaleString()}\n`;
    output += `Word Count: ${claim.wordCount.toLocaleString()}\n`;
    output += `Template: ${claim.metadata.templateName}\n\n`;

    for (const section of claim.sections) {
      output += `${section.title}\n`;
      output += `${'-'.repeat(section.title.length)}\n\n`;
      output += `${section.content}\n\n`;
    }

    output += `\nLEGAL BASIS\n`;
    output += `${'-'.repeat(11)}\n`;
    claim.metadata.legalBasis.forEach((basis, i) => {
      output += `${i + 1}. ${basis}\n`;
    });

    output += `\nREQUIRED EVIDENCE\n`;
    output += `${'-'.repeat(16)}\n`;
    claim.metadata.requiredEvidence.forEach((evidence, i) => {
      output += `${i + 1}. ${evidence}\n`;
    });

    return output;
  }
}

// Export singleton instance
export const draftingEngine = new DraftingEngine();
