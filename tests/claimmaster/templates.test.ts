/**
 * Tests for ClaimMaster.ai Templates
 */

import { 
  getTemplate, 
  getTemplatesByCategory, 
  getTemplatesByContract,
  ClaimCategory,
  FIDIC_DELAY_TEMPLATE,
  NHAI_VARIATION_TEMPLATE
} from '../../shared/claimmaster/templates';

describe('ClaimMaster Templates', () => {
  describe('Template Retrieval', () => {
    test('should retrieve FIDIC delay template by ID', () => {
      const template = getTemplate('fidic-delay-001');
      expect(template).toBeDefined();
      expect(template?.name).toBe('FIDIC Red Book - Delay and Prolongation Claim');
      expect(template?.category).toBe(ClaimCategory.DELAY);
    });

    test('should retrieve NHAI variation template by ID', () => {
      const template = getTemplate('nhai-variation-001');
      expect(template).toBeDefined();
      expect(template?.name).toBe('NHAI HAM - Variation and Additional Work Claim');
      expect(template?.category).toBe(ClaimCategory.VARIATION);
    });

    test('should return null for non-existent template', () => {
      const template = getTemplate('non-existent');
      expect(template).toBeNull();
    });
  });

  describe('Template Filtering', () => {
    test('should get templates by delay category', () => {
      const templates = getTemplatesByCategory(ClaimCategory.DELAY);
      expect(templates.length).toBeGreaterThan(0);
      expect(templates[0].category).toBe(ClaimCategory.DELAY);
    });

    test('should get templates by variation category', () => {
      const templates = getTemplatesByCategory(ClaimCategory.VARIATION);
      expect(templates.length).toBeGreaterThan(0);
      expect(templates[0].category).toBe(ClaimCategory.VARIATION);
    });

    test('should get templates by FIDIC contract type', () => {
      const templates = getTemplatesByContract('FIDIC_RED');
      expect(templates.length).toBeGreaterThan(0);
      expect(templates[0].contractType).toContain('FIDIC_RED');
    });

    test('should get templates by NHAI contract type', () => {
      const templates = getTemplatesByContract('NHAI_HAM');
      expect(templates.length).toBeGreaterThan(0);
      expect(templates[0].contractType).toContain('NHAI_HAM');
    });
  });

  describe('FIDIC Delay Template Structure', () => {
    test('should have all required sections', () => {
      expect(FIDIC_DELAY_TEMPLATE.sections.length).toBe(7);
      
      const sectionTitles = FIDIC_DELAY_TEMPLATE.sections.map(s => s.id);
      expect(sectionTitles).toContain('executive-summary');
      expect(sectionTitles).toContain('contractual-basis');
      expect(sectionTitles).toContain('factual-background');
      expect(sectionTitles).toContain('quantum-analysis');
      expect(sectionTitles).toContain('legal-entitlement');
      expect(sectionTitles).toContain('supporting-evidence');
      expect(sectionTitles).toContain('conclusion');
    });

    test('should have legal basis defined', () => {
      expect(FIDIC_DELAY_TEMPLATE.legalBasis.length).toBeGreaterThan(0);
      expect(FIDIC_DELAY_TEMPLATE.legalBasis[0]).toContain('FIDIC');
    });

    test('should have required evidence defined', () => {
      expect(FIDIC_DELAY_TEMPLATE.requiredEvidence.length).toBeGreaterThan(0);
    });

    test('all sections should have variables defined', () => {
      FIDIC_DELAY_TEMPLATE.sections.forEach(section => {
        expect(section.variables).toBeDefined();
        expect(Array.isArray(section.variables)).toBe(true);
      });
    });
  });

  describe('NHAI Variation Template Structure', () => {
    test('should have all required sections', () => {
      expect(NHAI_VARIATION_TEMPLATE.sections.length).toBe(6);
      
      const sectionTitles = NHAI_VARIATION_TEMPLATE.sections.map(s => s.id);
      expect(sectionTitles).toContain('executive-summary');
      expect(sectionTitles).toContain('contractual-basis');
      expect(sectionTitles).toContain('scope-of-work');
      expect(sectionTitles).toContain('rate-analysis');
      expect(sectionTitles).toContain('supporting-documents');
      expect(sectionTitles).toContain('conclusion');
    });

    test('should have legal basis defined', () => {
      expect(NHAI_VARIATION_TEMPLATE.legalBasis.length).toBeGreaterThan(0);
      expect(NHAI_VARIATION_TEMPLATE.legalBasis[0]).toContain('NHAI');
    });

    test('should have required evidence defined', () => {
      expect(NHAI_VARIATION_TEMPLATE.requiredEvidence.length).toBeGreaterThan(0);
    });
  });
});

// Run tests
console.log('Running ClaimMaster Templates Tests...\n');

const tests = [
  { name: 'Get FIDIC template', fn: () => getTemplate('fidic-delay-001') !== null },
  { name: 'Get NHAI template', fn: () => getTemplate('nhai-variation-001') !== null },
  { name: 'Get delay templates', fn: () => getTemplatesByCategory(ClaimCategory.DELAY).length > 0 },
  { name: 'Get FIDIC templates', fn: () => getTemplatesByContract('FIDIC_RED').length > 0 },
  { name: 'FIDIC has 7 sections', fn: () => FIDIC_DELAY_TEMPLATE.sections.length === 7 },
  { name: 'NHAI has 6 sections', fn: () => NHAI_VARIATION_TEMPLATE.sections.length === 6 },
  { name: 'FIDIC has legal basis', fn: () => FIDIC_DELAY_TEMPLATE.legalBasis.length > 0 },
  { name: 'NHAI has legal basis', fn: () => NHAI_VARIATION_TEMPLATE.legalBasis.length > 0 }
];

let passed = 0;
let failed = 0;

tests.forEach(test => {
  try {
    const result = test.fn();
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
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);
