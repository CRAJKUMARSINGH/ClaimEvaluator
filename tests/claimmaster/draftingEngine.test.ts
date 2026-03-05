/**
 * Tests for ClaimMaster.ai Drafting Engine
 */

import { draftingEngine, DraftingContext } from '../../shared/claimmaster/draftingEngine';

describe('ClaimMaster Drafting Engine', () => {
  const mockContext: DraftingContext = {
    templateId: 'fidic-delay-001',
    claimData: {
      delay_cause: 'Late site handover by Employer',
      delay_duration: 120,
      eot_days: 120,
      currency: '₹',
      prolongation_amount: '15,000,000',
      total_amount: '15,000,000',
      notice_date: '2024-01-15'
    },
    contractType: 'FIDIC_RED',
    projectDetails: {
      projectName: 'Test Highway Project',
      contractValue: 450000000,
      currency: '₹',
      contractor: 'ABC Construction Ltd',
      employer: 'NHAI',
      engineer: 'XYZ Consultants',
      startDate: new Date('2023-01-01'),
      completionDate: new Date('2025-12-31')
    }
  };

  describe('Claim Drafting', () => {
    test('should draft a complete claim', async () => {
      const claim = await draftingEngine.draftClaim(mockContext);
      
      expect(claim).toBeDefined();
      expect(claim.title).toContain('Test Highway Project');
      expect(claim.sections.length).toBeGreaterThan(0);
      expect(claim.wordCount).toBeGreaterThan(0);
      expect(claim.metadata).toBeDefined();
    });

    test('should throw error for invalid template', async () => {
      const invalidContext = { ...mockContext, templateId: 'invalid-template' };
      
      await expect(draftingEngine.draftClaim(invalidContext)).rejects.toThrow();
    });

    test('should include all template sections', async () => {
      const claim = await draftingEngine.draftClaim(mockContext);
      
      expect(claim.sections.length).toBe(7); // FIDIC delay template has 7 sections
    });

    test('should populate variables correctly', async () => {
      const claim = await draftingEngine.draftClaim(mockContext);
      
      const executiveSummary = claim.sections.find(s => s.id === 'executive-summary');
      expect(executiveSummary?.content).toContain('Late site handover');
      expect(executiveSummary?.content).toContain('120');
    });

    test('should include metadata', async () => {
      const claim = await draftingEngine.draftClaim(mockContext);
      
      expect(claim.metadata.templateId).toBe('fidic-delay-001');
      expect(claim.metadata.contractType).toBe('FIDIC_RED');
      expect(claim.metadata.legalBasis.length).toBeGreaterThan(0);
      expect(claim.metadata.requiredEvidence.length).toBeGreaterThan(0);
    });
  });

  describe('Custom Sections', () => {
    test('should add custom sections', async () => {
      const contextWithCustom = {
        ...mockContext,
        customSections: [
          {
            title: 'CUSTOM SECTION',
            content: 'This is custom content',
            order: 8
          }
        ]
      };
      
      const claim = await draftingEngine.draftClaim(contextWithCustom);
      
      expect(claim.sections.length).toBe(8); // 7 template + 1 custom
      const customSection = claim.sections.find(s => s.title === 'CUSTOM SECTION');
      expect(customSection).toBeDefined();
      expect(customSection?.content).toBe('This is custom content');
    });
  });

  describe('Export Functionality', () => {
    test('should export to text format', async () => {
      const claim = await draftingEngine.draftClaim(mockContext);
      const text = draftingEngine.exportToText(claim);
      
      expect(text).toBeDefined();
      expect(text.length).toBeGreaterThan(0);
      expect(text).toContain(claim.title);
      expect(text).toContain('LEGAL BASIS');
      expect(text).toContain('REQUIRED EVIDENCE');
    });

    test('exported text should include all sections', async () => {
      const claim = await draftingEngine.draftClaim(mockContext);
      const text = draftingEngine.exportToText(claim);
      
      claim.sections.forEach(section => {
        expect(text).toContain(section.title);
      });
    });
  });

  describe('Word Count', () => {
    test('should calculate word count correctly', async () => {
      const claim = await draftingEngine.draftClaim(mockContext);
      
      expect(claim.wordCount).toBeGreaterThan(100);
      expect(typeof claim.wordCount).toBe('number');
    });
  });
});

// Run basic tests
console.log('Running ClaimMaster Drafting Engine Tests...\n');

async function runTests() {
  const mockContext: DraftingContext = {
    templateId: 'fidic-delay-001',
    claimData: {
      delay_cause: 'Late site handover',
      delay_duration: 120,
      eot_days: 120,
      currency: '₹',
      prolongation_amount: '15,000,000',
      total_amount: '15,000,000'
    },
    contractType: 'FIDIC_RED',
    projectDetails: {
      projectName: 'Test Project',
      contractValue: 450000000,
      currency: '₹',
      contractor: 'ABC Construction',
      employer: 'NHAI',
      startDate: new Date('2023-01-01'),
      completionDate: new Date('2025-12-31')
    }
  };

  const tests = [
    {
      name: 'Draft claim successfully',
      fn: async () => {
        const claim = await draftingEngine.draftClaim(mockContext);
        return claim !== null && claim.sections.length > 0;
      }
    },
    {
      name: 'Claim has title',
      fn: async () => {
        const claim = await draftingEngine.draftClaim(mockContext);
        return claim.title.includes('Test Project');
      }
    },
    {
      name: 'Claim has 7 sections',
      fn: async () => {
        const claim = await draftingEngine.draftClaim(mockContext);
        return claim.sections.length === 7;
      }
    },
    {
      name: 'Claim has word count',
      fn: async () => {
        const claim = await draftingEngine.draftClaim(mockContext);
        return claim.wordCount > 0;
      }
    },
    {
      name: 'Export to text works',
      fn: async () => {
        const claim = await draftingEngine.draftClaim(mockContext);
        const text = draftingEngine.exportToText(claim);
        return text.length > 0 && text.includes('Test Project');
      }
    },
    {
      name: 'Variables are populated',
      fn: async () => {
        const claim = await draftingEngine.draftClaim(mockContext);
        const summary = claim.sections[0].content;
        return summary.includes('Late site handover') && summary.includes('120');
      }
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        console.log(`✅ ${test.name}`);
        passed++;
      } else {
        console.log(`❌ ${test.name}`);
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} - Error: ${error}`);
      failed++;
    }
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed`);
}

runTests();
