/**
 * Test Suite for New Helpers and Constants
 * Validates Phase 1 refactoring
 */

// Import the new modules (simulated for testing)
const { delay, detectProjectType, extractAmounts, formatIndianAmount } = require('./shared/helpers.ts');
const { DEFAULT_AMOUNTS, PROJECT_TYPES, METHODOLOGIES, AI_CONFIG } = require('./shared/constants.ts');

class HelperConstantsTestRunner {
  constructor() {
    this.results = [];
    this.passed = 0;
    this.failed = 0;
  }

  async runAllTests() {
    console.log('🧪 Testing Phase 1: Helpers & Constants\n');
    console.log('=' .repeat(60));

    await this.testHelpers();
    await this.testConstants();
    
    this.printSummary();
    return this.results;
  }

  async testHelpers() {
    console.log('\n📦 Testing Helper Functions...\n');

    // Test 1: delay function
    await this.test('delay()', async () => {
      const start = Date.now();
      await delay(100);
      const elapsed = Date.now() - start;
      if (elapsed < 90 || elapsed > 150) {
        throw new Error(`Expected ~100ms, got ${elapsed}ms`);
      }
      return `Delayed ${elapsed}ms`;
    });

    // Test 2: detectProjectType - Highway
    await this.test('detectProjectType() - Highway', async () => {
      const result = detectProjectType('This is a highway construction project');
      if (result !== 'Highway') {
        throw new Error(`Expected 'Highway', got '${result}'`);
      }
      return result;
    });

    // Test 3: detectProjectType - Bridge
    await this.test('detectProjectType() - Bridge', async () => {
      const result = detectProjectType('Bridge construction over river');
      if (result !== 'Bridge') {
        throw new Error(`Expected 'Bridge', got '${result}'`);
      }
      return result;
    });

    // Test 4: detectProjectType - Power Plant
    await this.test('detectProjectType() - Power Plant', async () => {
      const result = detectProjectType('Solar power plant installation');
      if (result !== 'Power Plant') {
        throw new Error(`Expected 'Power Plant', got '${result}'`);
      }
      return result;
    });

    // Test 5: extractAmounts - Crores
    await this.test('extractAmounts() - Crores', async () => {
      const amounts = extractAmounts('Total claim: ₹451.47 Cr');
      if (amounts.length === 0 || amounts[0] !== 4514700000) {
        throw new Error(`Expected 4514700000, got ${amounts[0]}`);
      }
      return `Extracted: ${amounts[0]}`;
    });

    // Test 6: extractAmounts - Lakhs
    await this.test('extractAmounts() - Lakhs', async () => {
      const amounts = extractAmounts('Amount: ₹50 Lakh');
      if (amounts.length === 0 || amounts[0] !== 5000000) {
        throw new Error(`Expected 5000000, got ${amounts[0]}`);
      }
      return `Extracted: ${amounts[0]}`;
    });

    // Test 7: extractAmounts - Multiple
    await this.test('extractAmounts() - Multiple', async () => {
      const amounts = extractAmounts('Claims: ₹100 Cr and ₹50 Lakh');
      if (amounts.length < 2) {
        throw new Error(`Expected 2 amounts, got ${amounts.length}`);
      }
      return `Extracted ${amounts.length} amounts`;
    });

    // Test 8: formatIndianAmount
    await this.test('formatIndianAmount()', async () => {
      const result = formatIndianAmount(50000000);
      if (!result.crores.includes('5.00')) {
        throw new Error(`Expected '5.00 Cr', got '${result.crores}'`);
      }
      return `${result.crores} / ${result.lakhs}`;
    });
  }

  async testConstants() {
    console.log('\n📋 Testing Constants...\n');

    // Test 9: DEFAULT_AMOUNTS
    await this.test('DEFAULT_AMOUNTS.FIDIC_TRADITIONAL', async () => {
      if (DEFAULT_AMOUNTS.FIDIC_TRADITIONAL !== 45147000000) {
        throw new Error(`Expected 45147000000, got ${DEFAULT_AMOUNTS.FIDIC_TRADITIONAL}`);
      }
      return `₹${DEFAULT_AMOUNTS.FIDIC_TRADITIONAL / 10000000} Cr`;
    });

    // Test 10: PROJECT_TYPES
    await this.test('PROJECT_TYPES array', async () => {
      if (!Array.isArray(PROJECT_TYPES) || PROJECT_TYPES.length < 5) {
        throw new Error(`Expected array with 5+ types, got ${PROJECT_TYPES.length}`);
      }
      return `${PROJECT_TYPES.length} project types`;
    });

    // Test 11: METHODOLOGIES
    await this.test('METHODOLOGIES array', async () => {
      if (!Array.isArray(METHODOLOGIES) || METHODOLOGIES.length < 5) {
        throw new Error(`Expected array with 5+ methodologies, got ${METHODOLOGIES.length}`);
      }
      return `${METHODOLOGIES.length} methodologies`;
    });

    // Test 12: AI_CONFIG
    await this.test('AI_CONFIG.TIMEOUT', async () => {
      if (AI_CONFIG.TIMEOUT !== 30000) {
        throw new Error(`Expected 30000, got ${AI_CONFIG.TIMEOUT}`);
      }
      return `${AI_CONFIG.TIMEOUT}ms`;
    });

    // Test 13: AI_CONFIG.FALLBACK_CHAIN
    await this.test('AI_CONFIG.FALLBACK_CHAIN', async () => {
      if (!Array.isArray(AI_CONFIG.FALLBACK_CHAIN) || AI_CONFIG.FALLBACK_CHAIN.length < 3) {
        throw new Error(`Expected array with 3+ providers`);
      }
      return `${AI_CONFIG.FALLBACK_CHAIN.length} providers: ${AI_CONFIG.FALLBACK_CHAIN.join(', ')}`;
    });

    // Test 14: DEFAULT_AMOUNTS.NHAI_HAM
    await this.test('DEFAULT_AMOUNTS.NHAI_HAM', async () => {
      if (DEFAULT_AMOUNTS.NHAI_HAM !== 35000000000) {
        throw new Error(`Expected 35000000000, got ${DEFAULT_AMOUNTS.NHAI_HAM}`);
      }
      return `₹${DEFAULT_AMOUNTS.NHAI_HAM / 10000000} Cr`;
    });

    // Test 15: DEFAULT_AMOUNTS.FIDIC_GREEN
    await this.test('DEFAULT_AMOUNTS.FIDIC_GREEN', async () => {
      if (DEFAULT_AMOUNTS.FIDIC_GREEN !== 25000000000) {
        throw new Error(`Expected 25000000000, got ${DEFAULT_AMOUNTS.FIDIC_GREEN}`);
      }
      return `₹${DEFAULT_AMOUNTS.FIDIC_GREEN / 10000000} Cr`;
    });
  }

  async test(name, fn) {
    const start = Date.now();
    try {
      const result = await fn();
      const duration = Date.now() - start;
      
      this.results.push({
        name,
        status: 'PASS',
        duration,
        result
      });
      
      this.passed++;
      console.log(`  ✅ ${name} - ${result} (${duration}ms)`);
    } catch (error) {
      const duration = Date.now() - start;
      
      this.results.push({
        name,
        status: 'FAIL',
        duration,
        error: error.message
      });
      
      this.failed++;
      console.log(`  ❌ ${name} - ${error.message} (${duration}ms)`);
    }
  }

  printSummary() {
    const total = this.passed + this.failed;
    const passRate = ((this.passed / total) * 100).toFixed(1);
    
    console.log('\n' + '='.repeat(60));
    console.log('📊 Test Summary');
    console.log('='.repeat(60));
    console.log(`Total Tests:  ${total}`);
    console.log(`Passed:       ${this.passed} ✅`);
    console.log(`Failed:       ${this.failed} ❌`);
    console.log(`Pass Rate:    ${passRate}%`);
    console.log('='.repeat(60));

    if (this.failed === 0) {
      console.log('\n🎉 All tests passed! Phase 1 refactoring successful!\n');
    } else {
      console.log('\n⚠️  Some tests failed. Please review and fix.\n');
    }
  }
}

// Run tests if executed directly
if (require.main === module) {
  const runner = new HelperConstantsTestRunner();
  runner.runAllTests().then(() => {
    process.exit(runner.failed > 0 ? 1 : 0);
  });
}

module.exports = { HelperConstantsTestRunner };
