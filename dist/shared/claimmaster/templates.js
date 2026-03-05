"use strict";
/**
 * ClaimMaster.ai Templates
 * Professional claim drafting templates with FIDIC/NHAI compliance
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLAIM_TEMPLATES = exports.NHAI_VARIATION_TEMPLATE = exports.FIDIC_DELAY_TEMPLATE = exports.ClaimCategory = void 0;
exports.getTemplate = getTemplate;
exports.getTemplatesByCategory = getTemplatesByCategory;
exports.getTemplatesByContract = getTemplatesByContract;
var ClaimCategory;
(function (ClaimCategory) {
    ClaimCategory["DELAY"] = "delay";
    ClaimCategory["VARIATION"] = "variation";
    ClaimCategory["DISRUPTION"] = "disruption";
    ClaimCategory["ACCELERATION"] = "acceleration";
    ClaimCategory["PROLONGATION"] = "prolongation";
    ClaimCategory["EOT"] = "eot";
    ClaimCategory["LOSS_OF_OPPORTUNITY"] = "loss_of_opportunity";
    ClaimCategory["ADDITIONAL_WORK"] = "additional_work";
})(ClaimCategory || (exports.ClaimCategory = ClaimCategory = {}));
/**
 * FIDIC Red Book - Delay Claim Template
 */
exports.FIDIC_DELAY_TEMPLATE = {
    id: 'fidic-delay-001',
    category: ClaimCategory.DELAY,
    name: 'FIDIC Red Book - Delay and Prolongation Claim',
    description: 'Comprehensive delay claim under FIDIC Red Book Clause 20.1',
    contractType: ['FIDIC_RED', 'FIDIC_TRADITIONAL'],
    sections: [
        {
            id: 'executive-summary',
            title: '1. EXECUTIVE SUMMARY',
            content: `This claim is submitted pursuant to Clause 20.1 of the FIDIC Conditions of Contract for Construction (Red Book) for delays caused by {{delay_cause}} resulting in {{delay_duration}} days of delay to the critical path.

The Contractor claims:
- Extension of Time: {{eot_days}} days
- Prolongation Costs: {{currency}} {{prolongation_amount}}
- Total Claim Amount: {{currency}} {{total_amount}}`,
            variables: ['delay_cause', 'delay_duration', 'eot_days', 'currency', 'prolongation_amount', 'total_amount'],
            mandatory: true,
            order: 1
        },
        {
            id: 'contractual-basis',
            title: '2. CONTRACTUAL BASIS',
            content: `2.1 This claim is submitted under the following provisions:
   - Clause 20.1: Contractor's Claims
   - Clause 8.4: Extension of Time for Completion
   - Clause 8.5: Delays Caused by Authorities
   - Clause {{specific_clause}}: {{specific_clause_description}}

2.2 The claim is submitted within the time limits prescribed under Clause 20.1, with contemporary notice provided on {{notice_date}}.

2.3 The Contractor has complied with all procedural requirements including:
   - Timely notification (within 28 days)
   - Detailed particulars submission
   - Contemporary records maintenance
   - Regular progress updates`,
            variables: ['specific_clause', 'specific_clause_description', 'notice_date'],
            mandatory: true,
            order: 2
        },
        {
            id: 'factual-background',
            title: '3. FACTUAL BACKGROUND',
            content: `3.1 Project Overview
   - Project Name: {{project_name}}
   - Contract Value: {{currency}} {{contract_value}}
   - Original Completion Date: {{original_completion}}
   - Current Completion Date: {{current_completion}}

3.2 Delay Event Description
   {{delay_description}}

3.3 Timeline of Events
   {{timeline_table}}

3.4 Impact on Critical Path
   The delay event directly impacted the critical path activities:
   {{critical_path_activities}}`,
            variables: ['project_name', 'currency', 'contract_value', 'original_completion', 'current_completion', 'delay_description', 'timeline_table', 'critical_path_activities'],
            mandatory: true,
            order: 3
        },
        {
            id: 'quantum-analysis',
            title: '4. QUANTUM ANALYSIS',
            content: `4.1 Prolongation Costs Breakdown

{{quantum_table}}

4.2 Detailed Cost Calculations

4.2.1 Site Establishment and Overheads
   - Duration: {{prolongation_days}} days
   - Daily Rate: {{currency}} {{daily_overhead_rate}}
   - Total: {{currency}} {{overhead_total}}

4.2.2 Plant and Equipment
   {{plant_breakdown}}

4.2.3 Labor Costs
   {{labor_breakdown}}

4.2.4 Additional Costs
   {{additional_costs}}

4.3 Total Quantum: {{currency}} {{total_quantum}}`,
            variables: ['quantum_table', 'prolongation_days', 'currency', 'daily_overhead_rate', 'overhead_total', 'plant_breakdown', 'labor_breakdown', 'additional_costs', 'total_quantum'],
            mandatory: true,
            order: 4
        },
        {
            id: 'legal-entitlement',
            title: '5. LEGAL ENTITLEMENT',
            content: `5.1 Contractual Entitlement
   Under Clause {{entitlement_clause}}, the Contractor is entitled to:
   - Extension of Time under Clause 8.4
   - Cost recovery under Clause 20.1
   - Interest under Clause {{interest_clause}}

5.2 Causation Analysis
   {{causation_analysis}}

5.3 Concurrent Delays
   {{concurrent_delay_analysis}}

5.4 Mitigation Measures
   The Contractor has taken reasonable steps to mitigate the delay:
   {{mitigation_measures}}`,
            variables: ['entitlement_clause', 'interest_clause', 'causation_analysis', 'concurrent_delay_analysis', 'mitigation_measures'],
            mandatory: true,
            order: 5
        },
        {
            id: 'supporting-evidence',
            title: '6. SUPPORTING EVIDENCE',
            content: `6.1 Contemporary Records
   - Daily site diaries
   - Progress photographs
   - Correspondence records
   - Meeting minutes
   - Weather records

6.2 Programme Analysis
   - Baseline programme
   - As-built programme
   - Critical path analysis
   - Delay analysis methodology: {{delay_methodology}}

6.3 Financial Records
   - Cost ledgers
   - Invoices and receipts
   - Payroll records
   - Plant hire records

6.4 Expert Reports
   {{expert_reports}}`,
            variables: ['delay_methodology', 'expert_reports'],
            mandatory: true,
            order: 6
        },
        {
            id: 'conclusion',
            title: '7. CONCLUSION AND RELIEF SOUGHT',
            content: `7.1 Summary
   The Contractor has demonstrated:
   - A compensable delay event under the Contract
   - Proper notification and procedural compliance
   - Causation and impact on critical path
   - Reasonable and substantiated quantum

7.2 Relief Sought
   The Contractor respectfully requests:
   - Extension of Time: {{eot_days}} days
   - Prolongation Costs: {{currency}} {{prolongation_amount}}
   - Interest at {{interest_rate}}% per annum
   - Total Amount: {{currency}} {{total_claim_amount}}

7.3 Next Steps
   The Contractor requests the Engineer's determination within 42 days as per Clause 3.5.`,
            variables: ['eot_days', 'currency', 'prolongation_amount', 'interest_rate', 'total_claim_amount'],
            mandatory: true,
            order: 7
        }
    ],
    legalBasis: [
        'FIDIC Red Book Clause 20.1 - Contractor\'s Claims',
        'FIDIC Red Book Clause 8.4 - Extension of Time',
        'FIDIC Red Book Clause 3.5 - Determinations',
        'FIDIC Red Book Clause 14.8 - Delayed Payment'
    ],
    requiredEvidence: [
        'Contemporary site records',
        'Programme analysis (baseline and as-built)',
        'Cost records and invoices',
        'Correspondence and notices',
        'Expert reports (if applicable)',
        'Photographs and site documentation'
    ]
};
/**
 * NHAI HAM - Variation Claim Template
 */
exports.NHAI_VARIATION_TEMPLATE = {
    id: 'nhai-variation-001',
    category: ClaimCategory.VARIATION,
    name: 'NHAI HAM - Variation and Additional Work Claim',
    description: 'Variation claim under NHAI HAM Model Concession Agreement',
    contractType: ['NHAI_HAM'],
    sections: [
        {
            id: 'executive-summary',
            title: '1. EXECUTIVE SUMMARY',
            content: `This claim is submitted for variation works executed under the NHAI Hybrid Annuity Model (HAM) Concession Agreement.

Variation Details:
- Description: {{variation_description}}
- Quantity: {{variation_quantity}} {{unit}}
- Rate: ₹{{rate_per_unit}} per {{unit}}
- Total Value: ₹{{variation_value}}

The Concessionaire claims payment of ₹{{total_claim}} for the executed variation works.`,
            variables: ['variation_description', 'variation_quantity', 'unit', 'rate_per_unit', 'variation_value', 'total_claim'],
            mandatory: true,
            order: 1
        },
        {
            id: 'contractual-basis',
            title: '2. CONTRACTUAL BASIS',
            content: `2.1 This claim is submitted under:
   - Article {{article_number}}: Variations
   - Schedule {{schedule_number}}: Payment Mechanism
   - Clause {{clause_number}}: {{clause_description}}

2.2 Authority's Instruction
   - Instruction No: {{instruction_number}}
   - Date: {{instruction_date}}
   - Issued by: {{issued_by}}

2.3 Procedural Compliance
   - Quotation submitted: {{quotation_date}}
   - Approval received: {{approval_date}}
   - Work commenced: {{commencement_date}}
   - Work completed: {{completion_date}}`,
            variables: ['article_number', 'schedule_number', 'clause_number', 'clause_description', 'instruction_number', 'instruction_date', 'issued_by', 'quotation_date', 'approval_date', 'commencement_date', 'completion_date'],
            mandatory: true,
            order: 2
        },
        {
            id: 'scope-of-work',
            title: '3. SCOPE OF VARIATION WORK',
            content: `3.1 Original Scope
   {{original_scope}}

3.2 Varied Scope
   {{varied_scope}}

3.3 Justification for Variation
   {{justification}}

3.4 Quantities Executed
   {{quantity_table}}`,
            variables: ['original_scope', 'varied_scope', 'justification', 'quantity_table'],
            mandatory: true,
            order: 3
        },
        {
            id: 'rate-analysis',
            title: '4. RATE ANALYSIS AND QUANTUM',
            content: `4.1 Rate Derivation
   {{rate_analysis_table}}

4.2 Comparison with Contract Rates
   - Contract Rate (if applicable): ₹{{contract_rate}}
   - Proposed Rate: ₹{{proposed_rate}}
   - Variance: {{variance_percentage}}%
   - Justification: {{rate_justification}}

4.3 Total Quantum
   - Quantity: {{total_quantity}} {{unit}}
   - Rate: ₹{{final_rate}} per {{unit}}
   - Subtotal: ₹{{subtotal}}
   - GST @{{gst_rate}}%: ₹{{gst_amount}}
   - Total: ₹{{total_amount}}`,
            variables: ['rate_analysis_table', 'contract_rate', 'proposed_rate', 'variance_percentage', 'rate_justification', 'total_quantity', 'unit', 'final_rate', 'subtotal', 'gst_rate', 'gst_amount', 'total_amount'],
            mandatory: true,
            order: 4
        },
        {
            id: 'supporting-documents',
            title: '5. SUPPORTING DOCUMENTS',
            content: `5.1 Authority's Instructions
   - Variation Order No: {{vo_number}}
   - Drawings: {{drawing_numbers}}
   - Specifications: {{spec_references}}

5.2 Measurement Records
   - Measurement Book entries
   - Joint measurement certificates
   - Photographs of executed work

5.3 Financial Records
   - Material invoices
   - Labor records
   - Plant hire records
   - Overhead allocation

5.4 Quality Certificates
   - Material test certificates
   - Quality assurance reports
   - Independent Engineer's certificates`,
            variables: ['vo_number', 'drawing_numbers', 'spec_references'],
            mandatory: true,
            order: 5
        },
        {
            id: 'conclusion',
            title: '6. CONCLUSION AND PAYMENT REQUEST',
            content: `6.1 Summary
   The Concessionaire has:
   - Executed variation works as instructed
   - Complied with all procedural requirements
   - Provided substantiated rates and quantum
   - Maintained quality standards

6.2 Payment Request
   Total Amount Claimed: ₹{{total_claim_amount}}
   
   Payment Schedule:
   - Annuity Payment Adjustment: ₹{{annuity_adjustment}}
   - Construction Period Payment: ₹{{construction_payment}}

6.3 Request for Approval
   The Concessionaire requests the Authority's approval and payment certification within {{approval_days}} days.`,
            variables: ['total_claim_amount', 'annuity_adjustment', 'construction_payment', 'approval_days'],
            mandatory: true,
            order: 6
        }
    ],
    legalBasis: [
        'NHAI HAM Model Concession Agreement - Article on Variations',
        'NHAI HAM Payment Mechanism Schedule',
        'IRC/MoRTH Specifications',
        'CPWD/PWD Rate Analysis Guidelines'
    ],
    requiredEvidence: [
        'Authority\'s variation instruction',
        'Measurement records and certificates',
        'Rate analysis with supporting invoices',
        'Quality test certificates',
        'Photographs of executed work',
        'Independent Engineer\'s certification'
    ]
};
/**
 * Template Registry
 */
exports.CLAIM_TEMPLATES = {
    'fidic-delay-001': exports.FIDIC_DELAY_TEMPLATE,
    'nhai-variation-001': exports.NHAI_VARIATION_TEMPLATE
};
/**
 * Get template by ID
 */
function getTemplate(templateId) {
    return exports.CLAIM_TEMPLATES[templateId] || null;
}
/**
 * Get templates by category
 */
function getTemplatesByCategory(category) {
    return Object.values(exports.CLAIM_TEMPLATES).filter(t => t.category === category);
}
/**
 * Get templates by contract type
 */
function getTemplatesByContract(contractType) {
    return Object.values(exports.CLAIM_TEMPLATES).filter(t => t.contractType.includes(contractType));
}
