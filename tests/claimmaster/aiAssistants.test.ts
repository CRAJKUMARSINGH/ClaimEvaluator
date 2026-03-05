/**
 * Tests for ClaimMaster.ai AI Assistants
 */

import { 
  delayExpert, 
  quantumExpert, 
  aiNegotiator,
  AssistantType 
} from '../../shared/claimmaster/aiAssistants';

describe('ClaimMaster AI Assistants', () => {
  describe('Delay Expert', () => {
    const mockDelayContext = {
      delayEvent: 'Late site handover by Employer',
      duration: 120,
      criticalPath: ['Site mobilization', 'Foundation work', 'Structural work'],
      concurrentDelays: [],
      baselineProgram: { completion: '2025-12-31', totalFloat: 30 },
      asBuiltProgram: { completion: '2026-04-30' }
    };

    test('should analyze delay successfully', async () => {
      const analysis = await delayExpert.analyzeDelay(mockDelayContext);
      
      expect(analysis).toBeDefined();
      expect(analysis.assistant).toBe(AssistantType.DELAY_EXPERT);
      expect(analysis.analysis).toBeDefined();
      expect(analysis.recommendations).toBeDefined();
      expect(analysis.confidence).toBeGreaterThan(0);
      expect(analysis.references).toBeDefined();
    });

    test('should provide detailed analysis', async () => {
      const analysis = await delayExpert.analyzeDelay(mockDelayContext);
      
      expect(analysis.analysis).toContain('DELAY ANALYSIS REPORT');
      expect(analysis.analysis).toContain('Late site handover');
      expect(analysis.analysis).toContain('120 days');
    });

    test('should provide recommendations', async () => {
      const analysis = await delayExpert.analyzeDelay(mockDelayContext);
      
      expect(Array.isArray(analysis.recommendations)).toBe(true);
      expect(analysis.recommendations.length).toBeGreaterThan(0);
    });

    test('should have confidence score', async () => {
      const analysis = await delayExpert.analyzeDelay(mockDelayContext);
      
      expect(analysis.confidence).toBeGreaterThanOrEqual(70);
      expect(analysis.confidence).toBeLessThanOrEqual(95);
    });

    test('should provide references', async () => {
      const analysis = await delayExpert.analyzeDelay(mockDelayContext);
      
      expect(Array.isArray(analysis.references)).toBe(true);
      expect(analysis.references.length).toBeGreaterThan(0);
      expect(analysis.references[0]).toContain('Construction Law');
    });
  });

  describe('Quantum Expert', () => {
    const mockQuantumContext = {
      claimType: 'Prolongation',
      duration: 120,
      overheads: 15,
      profit: 10
    };

    test('should analyze quantum successfully', async () => {
      const analysis = await quantumExpert.analyzeQuantum(mockQuantumContext);
      
      expect(analysis).toBeDefined();
      expect(analysis.assistant).toBe(AssistantType.QUANTUM_EXPERT);
      expect(analysis.analysis).toBeDefined();
      expect(analysis.recommendations).toBeDefined();
    });

    test('should provide detailed breakdown', async () => {
      const analysis = await quantumExpert.analyzeQuantum(mockQuantumContext);
      
      expect(analysis.analysis).toContain('QUANTUM ANALYSIS REPORT');
      expect(analysis.analysis).toContain('Prolongation');
      expect(analysis.analysis).toContain('Direct Costs');
      expect(analysis.analysis).toContain('Overheads');
      expect(analysis.analysis).toContain('Profit');
    });

    test('should calculate with overheads and profit', async () => {
      const analysis = await quantumExpert.analyzeQuantum(mockQuantumContext);
      
      expect(analysis.analysis).toContain('15%'); // Overhead
      expect(analysis.analysis).toContain('10%'); // Profit
    });

    test('should provide recommendations', async () => {
      const analysis = await quantumExpert.analyzeQuantum(mockQuantumContext);
      
      expect(Array.isArray(analysis.recommendations)).toBe(true);
      expect(analysis.recommendations.length).toBeGreaterThan(0);
    });
  });

  describe('AI Negotiator', () => {
    const mockNegotiationContext = {
      claimAmount: 15000000,
      employerPosition: 8000000,
      strengths: ['Strong documentation', 'Clear causation'],
      weaknesses: ['Some concurrent delays'],
      timeline: 'Urgent settlement required'
    };

    test('should analyze negotiation successfully', async () => {
      const analysis = await aiNegotiator.analyzeNegotiation(mockNegotiationContext);
      
      expect(analysis).toBeDefined();
      expect(analysis.assistant).toBe(AssistantType.NEGOTIATOR);
      expect(analysis.analysis).toBeDefined();
      expect(analysis.recommendations).toBeDefined();
    });

    test('should provide settlement range', async () => {
      const analysis = await aiNegotiator.analyzeNegotiation(mockNegotiationContext);
      
      expect(analysis.analysis).toContain('NEGOTIATION ANALYSIS');
      expect(analysis.analysis).toContain('Optimistic');
      expect(analysis.analysis).toContain('Realistic');
      expect(analysis.analysis).toContain('Pessimistic');
    });

    test('should analyze strengths and weaknesses', async () => {
      const analysis = await aiNegotiator.analyzeNegotiation(mockNegotiationContext);
      
      expect(analysis.analysis).toContain('Strong documentation');
      expect(analysis.analysis).toContain('Some concurrent delays');
    });

    test('should provide strategy recommendations', async () => {
      const analysis = await aiNegotiator.analyzeNegotiation(mockNegotiationContext);
      
      expect(Array.isArray(analysis.recommendations)).toBe(true);
      expect(analysis.recommendations.length).toBeGreaterThan(0);
    });
  });
});

// Run basic tests
console.log('Running ClaimMaster AI Assistants Tests...\n');

async function runTests() {
  const tests = [
    {
      name: 'Delay Expert analyzes delay',
      fn: async () => {
        const analysis = await delayExpert.analyzeDelay({
          delayEvent: 'Test delay',
          duration: 120,
          criticalPath: ['Activity 1'],
          baselineProgram: {},
          asBuiltProgram: {}
        });
        return analysis.assistant === AssistantType.DELAY_EXPERT;
      }
    },
    {
      name: 'Delay Expert provides analysis',
      fn: async () => {
        const analysis = await delayExpert.analyzeDelay({
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
        const analysis = await delayExpert.analyzeDelay({
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
        const analysis = await quantumExpert.analyzeQuantum({
          claimType: 'Prolongation',
          duration: 120
        });
        return analysis.assistant === AssistantType.QUANTUM_EXPERT;
      }
    },
    {
      name: 'Quantum Expert provides breakdown',
      fn: async () => {
        const analysis = await quantumExpert.analyzeQuantum({
          claimType: 'Prolongation',
          duration: 120
        });
        return analysis.analysis.includes('QUANTUM ANALYSIS REPORT');
      }
    },
    {
      name: 'AI Negotiator analyzes negotiation',
      fn: async () => {
        const analysis = await aiNegotiator.analyzeNegotiation({
          claimAmount: 15000000,
          strengths: ['Test'],
          weaknesses: ['Test'],
          timeline: 'Urgent'
        });
        return analysis.assistant === AssistantType.NEGOTIATOR;
      }
    },
    {
      name: 'AI Negotiator provides settlement range',
      fn: async () => {
        const analysis = await aiNegotiator.analyzeNegotiation({
          claimAmount: 15000000,
          strengths: ['Test'],
          weaknesses: ['Test'],
          timeline: 'Urgent'
        });
        return analysis.analysis.includes('Optimistic') && 
               analysis.analysis.includes('Realistic') &&
               analysis.analysis.includes('Pessimistic');
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
