/**
 * Master Test Runner for ClaimMaster.ai Components
 * Tests all components and generates comprehensive report
 */

const path = require('path');

console.log('🧪 ClaimMaster.ai Component Testing Suite\n');
console.log('='.repeat(60));
console.log('\n');

// Test results storage
const results = {
  templates: { passed: 0, failed: 0, tests: [] },
  draftingEngine: { passed: 0, failed: 0, tests: [] },
  aiAssistants: { passed: 0, failed: 0, tests: [] }
};

// Import modules
let templates, draftingEngine, aiAssistants;

try {
  templates = require('../../shared/claimmaster/templates.ts');
  draftingEngine = require('../../shared/claimmaster/draftingEngine.ts');
  aiAssistants = require('../../shared/claimmaster/aiAssistants.ts');
  console.log('✅ All modules loaded successfully\n');
} catch (error) {
  console.log('❌ Failed to load modules:', error.message);
  console.log('\nNote: TypeScript files need to be compiled first.');
  console.log('Run: npm run build or tsc\n');
  process.exit(1);
}

// ============================================================================
// TEST 1: Templates
// ============================================================================

console.log('📋 Testing Templates Module...\n');

const templateTests = [
  {
    name: 'Get FIDIC delay template',
    fn: () => {
      const template = templates.getTemplate('fidic-delay-001');
      return template !== null && template.name.includes('FIDIC');
    }
  },
  {
    name: 'Get NHAI variation template',
    fn: () => {
      const template = templates.getTemplate('nhai-variation-001');
      return template !== null && template.name.includes('NHAI');
    }
  },
  {
    name: 'Get templates by delay category',
    fn: () => {
      const temps = templates.getTemplatesByCategory(templates.ClaimCategory.DELAY);
      return temps.length > 0;
    }
  },
  {
    name: 'Get templates by FIDIC contract',
    fn: () => {
      const temps = templates.getTemplatesByContract('FIDIC_RED');
      return temps.length > 0;
    }
  },
  {
    name: 'FIDIC template has 7 sections',
    fn: () => {
      return templates.FIDIC_DELAY_TEMPLATE.sections.length === 7;
    }
  },
  {
    name: 'NHAI template has 6 sections',
    fn: () => {
      return templates.NHAI_VARIATION_TEMPLATE.sections.length === 6;
    }
  },
  {
    name: 'FIDIC template has legal basis',
    fn: () => {
      return templates.FIDIC_DELAY_TEMPLATE.legalBasis.length > 0;
    }
  },
  {
    name: 'FIDIC template has required evidence',
    fn: () => {
      return templates.FIDIC_DELAY_TEMPLATE.requiredEvidence.length > 0;
    }
  }
];

templateTests.forEach(test => {
  try {
    const result = test.fn();
    if (result) {
      console.log(`  ✅ ${test.name}`);
      results.templates.passed++;
    } else {
      console.log(`  ❌ ${test.name}`);
      results.templates.failed++;
    }
    results.templates.tests.push({ name: test.name, passed: result });
  } catch (error) {
    console.log(`  ❌ ${test.name} - Error: ${error.message}`);
    results.templates.failed++;
    results.templates.tests.push({ name: test.name, passed: false, error: error.message });
  }
});

console.log(`\n  Summary: ${results.templates.passed} passed, ${results.templates.failed} failed\n`);

// ============================================================================
// TEST 2: Drafting Engine
// ============================================================================

console.log('✍️  Testing Drafting Engine Module...\n');

const mockContext = {
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

async function testDraftingEngine() {
  const draftingTests = [
    {
      name: 'Draft claim successfully',
      fn: async () => {
        const claim = await draftingEngine.draftingEngine.draftClaim(mockContext);
        return claim !== null && claim.sections.length > 0;
      }
    },
    {
      name: 'Claim has correct title',
      fn: async () => {
        const claim = await draftingEngine.draftingEngine.draftClaim(mockContext);
        return claim.title.includes('Test Project');
      }
    },
    {
      name: 'Claim has 7 sections',
      fn: async () => {
        const claim = await draftingEngine.draftingEngine.draftClaim(mockContext);
        return claim.sections.length === 7;
      }
    },
    {
      name: 'Claim has word count',
      fn: async () => {
        const claim = await draftingEngine.draftingEngine.draftClaim(mockContext);
        return claim.wordCount > 0;
      }
    },
    {
      name: 'Variables are populated',
      fn: async () => {
        const claim = await draftingEngine.draftingEngine.draftClaim(mockContext);
        const summary = claim.sections[0].content;
        return summary.includes('Late site handover') && summary.includes('120');
      }
    },
    {
      name: 'Export to text works',
      fn: async () => {
        const claim = await draftingEngine.draftingEngine.draftClaim(mockContext);
        const text = draftingEngine.draftingEngine.exportToText(claim);
        return text.length > 0 && text.includes('Test Project');
      }
    },
    {
      name: 'Metadata is included',
      fn: async () => {
        const claim = await draftingEngine.draftingEngine.draftClaim(mockContext);
        return claim.metadata.templateId === 'fidic-delay-001' &&
               claim.metadata.legalBasis.length > 0;
      }
    }
  ];

  for (const test of draftingTests) {
    try {
      const result = await test.fn();
      if (result) {
        console.log(`  ✅ ${test.name}`);
        results.draftingEngine.passed++;
      } else {
        console.log(`  ❌ ${test.name}`);
        results.draftingEngine.failed++;
      }
      results.draftingEngine.tests.push({ name: test.name, passed: result });
    } catch (error) {
      console.log(`  ❌ ${test.name} - Error: ${error.message}`);
      results.draftingEngine.failed++;
      results.draftingEngine.tests.push({ name: test.name, passed: false, error: error.message });
    }
  }

  console.log(`\n  Summary: ${results.draftingEngine.passed} passed, ${results.draftingEngine.failed} failed\n`);
}

// ============================================================================
// TEST 3: AI Assistants
// ============================================================================

console.log('🤖 Testing AI Assistants Module...\n');

async function testAIAssistants() {
  const assistantTests = [
    {
      name: 'Delay Expert analyzes delay',
      fn: async () => {
        const analysis = await aiAssistants.delayExpert.analyzeDelay({
          delayEvent: 'Test delay',
          duration: 120,
          criticalPath: ['Activity 1'],
          baselineProgram: {},
          asBuiltProgram: {}
        });
        return analysis.assistant === aiAssistants.AssistantType.DELAY_EXPERT;
      }
    },
    {
      name: 'Delay Expert provides detailed analysis',
      fn: async () => {
        const analysis = await aiAssistants.delayExpert.analyzeDelay({
          delayEvent: 'Test delay',
          duration: 120,
          criticalPath: ['Activity 1'],
          baselineProgram: {},
          asBuiltProgram: {}
        });
        return analysis.analysis.includes('DELAY ANALYSIS REPORT');
      }
    },
    {
      name: 'Delay Expert has confidence score',
      fn: async () => {
        const analysis = await aiAssistants.delayExpert.analyzeDelay({
          delayEvent: 'Test delay',
          duration: 120,
          criticalPath: ['Activity 1'],
          baselineProgram: {},
          asBuiltProgram: {}
        });
        return analysis.confidence > 0 && analysis.confidence <= 95;
      }
    },
    {
      name: 'Quantum Expert analyzes quantum',
      fn: async () => {
        const analysis = await aiAssistants.quantumExpert.analyzeQuantum({
          claimType: 'Prolongation',
          duration: 120
        });
        return analysis.assistant === aiAssistants.AssistantType.QUANTUM_EXPERT;
      }
    },
    {
      name: 'Quantum Expert provides breakdown',
      fn: async () => {
        const analysis = await aiAssistants.quantumExpert.analyzeQuantum({
          claimType: 'Prolongation',
          duration: 120
        });
        return analysis.analysis.includes('QUANTUM ANALYSIS REPORT');
      }
    },
    {
      name: 'AI Negotiator analyzes negotiation',
      fn: async () => {
        const analysis = await aiAssistants.aiNegotiator.analyzeNegotiation({
          claimAmount: 15000000,
          strengths: ['Test'],
          weaknesses: ['Test'],
          timeline: 'Urgent'
        });
        return analysis.assistant === aiAssistants.AssistantType.NEGOTIATOR;
      }
    },
    {
      name: 'AI Negotiator provides settlement range',
      fn: async () => {
        const analysis = await aiAssistants.aiNegotiator.analyzeNegotiation({
          claimAmount: 15000000,
          strengths: ['Test'],
          weaknesses: ['Test'],
          timeline: 'Urgent'
        });
        return analysis.analysis.includes('Optimistic') && 
               analysis.analysis.includes('Realistic');
      }
    }
  ];

  for (const test of assistantTests) {
    try {
      const result = await test.fn();
      if (result) {
        console.log(`  ✅ ${test.name}`);
        results.aiAssistants.passed++;
      } else {
        console.log(`  ❌ ${test.name}`);
        results.aiAssistants.failed++;
      }
      results.aiAssistants.tests.push({ name: test.name, passed: result });
    } catch (error) {
      console.log(`  ❌ ${test.name} - Error: ${error.message}`);
      results.aiAssistants.failed++;
      results.aiAssistants.tests.push({ name: test.name, passed: false, error: error.message });
    }
  }

  console.log(`\n  Summary: ${results.aiAssistants.passed} passed, ${results.aiAssistants.failed} failed\n`);
}

// ============================================================================
// RUN ALL TESTS
// ============================================================================

async function runAllTests() {
  await testDraftingEngine();
  await testAIAssistants();

  // Final Summary
  console.log('='.repeat(60));
  console.log('\n📊 FINAL TEST RESULTS\n');
  console.log('='.repeat(60));
  
  const totalPassed = results.templates.passed + results.draftingEngine.passed + results.aiAssistants.passed;
  const totalFailed = results.templates.failed + results.draftingEngine.failed + results.aiAssistants.failed;
  const totalTests = totalPassed + totalFailed;
  const passRate = ((totalPassed / totalTests) * 100).toFixed(1);

  console.log(`\nTemplates:        ${results.templates.passed}/${results.templates.passed + results.templates.failed} passed`);
  console.log(`Drafting Engine:  ${results.draftingEngine.passed}/${results.draftingEngine.passed + results.draftingEngine.failed} passed`);
  console.log(`AI Assistants:    ${results.aiAssistants.passed}/${results.aiAssistants.passed + results.aiAssistants.failed} passed`);
  console.log('\n' + '-'.repeat(60));
  console.log(`TOTAL:            ${totalPassed}/${totalTests} passed (${passRate}%)`);
  console.log('='.repeat(60));

  if (totalFailed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! ClaimMaster.ai components are working correctly.\n');
    process.exit(0);
  } else {
    console.log(`\n⚠️  ${totalFailed} test(s) failed. Please review the errors above.\n`);
    process.exit(1);
  }
}

runAllTests();
