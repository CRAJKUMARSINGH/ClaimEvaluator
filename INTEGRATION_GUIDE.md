# 🔧 Integration Guide
## How to Integrate New Features into Your App

---

## 📦 Step 1: Install Dependencies

```bash
npm install exceljs pdfkit docx axios
npm install --save-dev @types/pdfkit
```

---

## 🗄️ Step 2: Database Schema Updates

Add these tables to your database:

```sql
-- Organizations
CREATE TABLE organizations (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  country VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  settings JSONB
);

-- Workspaces
CREATE TABLE workspaces (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  organization_id VARCHAR(255) REFERENCES organizations(id),
  created_by VARCHAR(255) REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  settings JSONB
);

-- Workspace Members
CREATE TABLE workspace_members (
  id VARCHAR(255) PRIMARY KEY,
  workspace_id VARCHAR(255) REFERENCES workspaces(id),
  user_id VARCHAR(255) REFERENCES users(id),
  role VARCHAR(50) NOT NULL,
  permissions JSONB,
  invited_by VARCHAR(255) REFERENCES users(id),
  invited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  joined_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending',
  UNIQUE(workspace_id, user_id)
);

-- Comments
CREATE TABLE comments (
  id VARCHAR(255) PRIMARY KEY,
  claim_id VARCHAR(255) NOT NULL,
  user_id VARCHAR(255) REFERENCES users(id),
  content TEXT NOT NULL,
  parent_id VARCHAR(255) REFERENCES comments(id),
  mentions JSONB,
  attachments JSONB,
  reactions JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

-- Tasks
CREATE TABLE tasks (
  id VARCHAR(255) PRIMARY KEY,
  workspace_id VARCHAR(255) REFERENCES workspaces(id),
  claim_id VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assigned_to JSONB,
  created_by VARCHAR(255) REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  due_date TIMESTAMP,
  priority VARCHAR(50),
  status VARCHAR(50),
  tags JSONB,
  checklist JSONB,
  attachments JSONB
);

-- Activities
CREATE TABLE activities (
  id VARCHAR(255) PRIMARY KEY,
  workspace_id VARCHAR(255) REFERENCES workspaces(id),
  user_id VARCHAR(255) REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(255) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Exchange Rates Cache
CREATE TABLE exchange_rates (
  id VARCHAR(255) PRIMARY KEY,
  from_currency VARCHAR(10) NOT NULL,
  to_currency VARCHAR(10) NOT NULL,
  rate DECIMAL(20, 10) NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  source VARCHAR(100),
  UNIQUE(from_currency, to_currency)
);

-- Create indexes
CREATE INDEX idx_workspace_members_workspace ON workspace_members(workspace_id);
CREATE INDEX idx_workspace_members_user ON workspace_members(user_id);
CREATE INDEX idx_comments_claim ON comments(claim_id);
CREATE INDEX idx_tasks_workspace ON tasks(workspace_id);
CREATE INDEX idx_tasks_assigned ON tasks USING GIN (assigned_to);
CREATE INDEX idx_activities_workspace ON activities(workspace_id);
CREATE INDEX idx_exchange_rates_pair ON exchange_rates(from_currency, to_currency);
```

---

## 🔌 Step 3: Add API Endpoints

Create new route files:

### `server/routes/contracts.ts`
```typescript
import { Router } from 'express';
import { getContractStandard, getContractsByJurisdiction, getContractsBySector, CONTRACT_STANDARDS } from '../shared/contract-standards';

const router = Router();

// Get all contract standards
router.get('/api/contracts', (req, res) => {
  res.json(Object.values(CONTRACT_STANDARDS));
});

// Get contract by code
router.get('/api/contracts/:code', (req, res) => {
  const contract = getContractStandard(req.params.code as any);
  if (!contract) {
    return res.status(404).json({ error: 'Contract not found' });
  }
  res.json(contract);
});

// Get contracts by jurisdiction
router.get('/api/contracts/jurisdiction/:jurisdiction', (req, res) => {
  const contracts = getContractsByJurisdiction(req.params.jurisdiction);
  res.json(contracts);
});

// Get contracts by sector
router.get('/api/contracts/sector/:sector', (req, res) => {
  const contracts = getContractsBySector(req.params.sector);
  res.json(contracts);
});

export default router;
```

### `server/routes/currency.ts`
```typescript
import { Router } from 'express';
import { currencyConverter, CURRENCY_INFO, Currency } from '../shared/currency';

const router = Router();

// Get all currencies
router.get('/api/currencies', (req, res) => {
  res.json(Object.values(CURRENCY_INFO));
});

// Convert currency
router.post('/api/currency/convert', async (req, res) => {
  const { amount, from, to } = req.body;
  
  try {
    const result = await currencyConverter.convert(
      { amount, currency: from },
      to
    );
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: 'Conversion failed' });
  }
});

// Get exchange rate
router.get('/api/currency/rate/:from/:to', async (req, res) => {
  try {
    const rate = await currencyConverter.getExchangeRate(
      req.params.from as Currency,
      req.params.to as Currency
    );
    res.json({ rate });
  } catch (error) {
    res.status(400).json({ error: 'Failed to get exchange rate' });
  }
});

export default router;
```

### `server/routes/predictions.ts`
```typescript
import { Router } from 'express';
import { predictiveEngine } from '../shared/predictive-analytics';

const router = Router();

// Predict claim success
router.post('/api/predictions/success', async (req, res) => {
  try {
    const prediction = await predictiveEngine.predictSuccessRate(req.body);
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: 'Prediction failed' });
  }
});

// Get benchmarks
router.get('/api/predictions/benchmarks/:sector/:contractType', async (req, res) => {
  try {
    const benchmarks = await predictiveEngine.getBenchmarkData(
      req.params.sector,
      req.params.contractType
    );
    res.json(benchmarks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get benchmarks' });
  }
});

export default router;
```

### `server/routes/workspaces.ts`
```typescript
import { Router } from 'express';
import { collaborationService, UserRole } from '../shared/collaboration';

const router = Router();

// Create workspace
router.post('/api/workspaces', async (req, res) => {
  const { name, organizationId } = req.body;
  const userId = req.user?.id; // From auth middleware
  
  try {
    const workspace = await collaborationService.createWorkspace(
      name,
      organizationId,
      userId
    );
    res.json(workspace);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workspace' });
  }
});

// Invite member
router.post('/api/workspaces/:id/members', async (req, res) => {
  const { userId, role } = req.body;
  const invitedBy = req.user?.id;
  
  try {
    const member = await collaborationService.inviteMember(
      req.params.id,
      userId,
      role as UserRole,
      invitedBy
    );
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: 'Failed to invite member' });
  }
});

// Add comment
router.post('/api/claims/:id/comments', async (req, res) => {
  const { content, parentId } = req.body;
  const userId = req.user?.id;
  
  try {
    const comment = await collaborationService.addComment(
      req.params.id,
      userId,
      content,
      parentId
    );
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

// Create task
router.post('/api/workspaces/:id/tasks', async (req, res) => {
  const { title, ...options } = req.body;
  const userId = req.user?.id;
  
  try {
    const task = await collaborationService.createTask(
      req.params.id,
      title,
      userId,
      options
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

export default router;
```

### `server/routes/export.ts`
```typescript
import { Router } from 'express';
import { exportService, ExportFormat } from '../shared/export';

const router = Router();

// Export claim
router.post('/api/export/:claimId', async (req, res) => {
  const { format, options } = req.body;
  
  try {
    // Fetch claim and analysis data
    const claimData = {}; // TODO: Fetch from database
    const analysisData = {}; // TODO: Fetch from database
    
    const result = await exportService.exportClaim(
      claimData,
      analysisData,
      { format: format as ExportFormat, ...options }
    );
    
    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }
    
    // Send file
    res.setHeader('Content-Type', this.getContentType(format));
    res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
    res.send(result.buffer);
  } catch (error) {
    res.status(500).json({ error: 'Export failed' });
  }
});

function getContentType(format: ExportFormat): string {
  switch (format) {
    case ExportFormat.PDF: return 'application/pdf';
    case ExportFormat.EXCEL: return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case ExportFormat.WORD: return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case ExportFormat.JSON: return 'application/json';
    case ExportFormat.CSV: return 'text/csv';
    default: return 'application/octet-stream';
  }
}

export default router;
```

---

## 🎨 Step 4: Update Frontend

### Add Contract Selector Component
```typescript
// client/src/components/ContractSelector.tsx
import { useState, useEffect } from 'react';
import { ContractStandard, ContractMetadata } from '@/shared/contract-standards';

export function ContractSelector({ value, onChange }: Props) {
  const [contracts, setContracts] = useState<ContractMetadata[]>([]);
  
  useEffect(() => {
    fetch('/api/contracts')
      .then(res => res.json())
      .then(setContracts);
  }, []);
  
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select Contract Type</option>
      {contracts.map(contract => (
        <option key={contract.code} value={contract.code}>
          {contract.name} - {contract.fullName}
        </option>
      ))}
    </select>
  );
}
```

### Add Currency Selector Component
```typescript
// client/src/components/CurrencySelector.tsx
import { useState, useEffect } from 'react';
import { Currency, CurrencyInfo } from '@/shared/currency';

export function CurrencySelector({ value, onChange }: Props) {
  const [currencies, setCurrencies] = useState<CurrencyInfo[]>([]);
  
  useEffect(() => {
    fetch('/api/currencies')
      .then(res => res.json())
      .then(setCurrencies);
  }, []);
  
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      {currencies.map(currency => (
        <option key={currency.code} value={currency.code}>
          {currency.symbol} {currency.name} ({currency.code})
        </option>
      ))}
    </select>
  );
}
```

### Add Prediction Display Component
```typescript
// client/src/components/PredictionCard.tsx
import { ClaimPrediction } from '@/shared/predictive-analytics';

export function PredictionCard({ prediction }: { prediction: ClaimPrediction }) {
  return (
    <div className="prediction-card">
      <h3>Claim Prediction</h3>
      
      <div className="metric">
        <label>Success Probability</label>
        <div className="value">{(prediction.successProbability * 100).toFixed(1)}%</div>
        <div className="confidence">Confidence: {(prediction.confidence * 100).toFixed(0)}%</div>
      </div>
      
      <div className="metric">
        <label>Estimated Settlement</label>
        <div className="value">
          {prediction.estimatedSettlement.currency} {prediction.estimatedSettlement.amount.toLocaleString()}
        </div>
        <div className="range">
          Range: {prediction.estimatedSettlement.range.min.toLocaleString()} - 
          {prediction.estimatedSettlement.range.max.toLocaleString()}
        </div>
      </div>
      
      <div className="metric">
        <label>Expected Timeline</label>
        <div className="value">{prediction.expectedTimeline.days} days</div>
        <div className="range">
          Range: {prediction.expectedTimeline.range.min} - {prediction.expectedTimeline.range.max} days
        </div>
      </div>
      
      <div className="risks">
        <h4>Risk Factors ({prediction.riskFactors.length})</h4>
        {prediction.riskFactors.map((risk, i) => (
          <div key={i} className={`risk risk-${risk.impact}`}>
            <strong>{risk.factor}</strong>
            <p>{risk.description}</p>
            <p className="mitigation">Mitigation: {risk.mitigation}</p>
          </div>
        ))}
      </div>
      
      <div className="strengths">
        <h4>Strength Factors ({prediction.strengthFactors.length})</h4>
        {prediction.strengthFactors.map((strength, i) => (
          <div key={i} className={`strength strength-${strength.impact}`}>
            <strong>{strength.factor}</strong>
            <p>{strength.description}</p>
            <p className="leverage">Leverage: {strength.leverage}</p>
          </div>
        ))}
      </div>
      
      <div className="recommendations">
        <h4>Recommendations</h4>
        <ul>
          {prediction.recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

---

## 🚀 Step 5: Update Main Server File

```typescript
// server/index.ts
import contractRoutes from './routes/contracts';
import currencyRoutes from './routes/currency';
import predictionRoutes from './routes/predictions';
import workspaceRoutes from './routes/workspaces';
import exportRoutes from './routes/export';

// Register routes
app.use(contractRoutes);
app.use(currencyRoutes);
app.use(predictionRoutes);
app.use(workspaceRoutes);
app.use(exportRoutes);
```

---

## ✅ Step 6: Test the Integration

```bash
# Start the server
npm start

# Test contract endpoints
curl http://localhost:5003/api/contracts
curl http://localhost:5003/api/contracts/fidic_red

# Test currency endpoints
curl http://localhost:5003/api/currencies
curl http://localhost:5003/api/currency/rate/USD/INR

# Test prediction endpoint
curl -X POST http://localhost:5003/api/predictions/success \
  -H "Content-Type: application/json" \
  -d '{"amount": 50000000, "contractType": "fidic_red", "sector": "Highway"}'
```

---

## 📚 Documentation

Update your README.md with the new features and API endpoints.

---

## 🎉 You're Done!

Your ClaimEvaluator now has:
- ✅ 26 international contract types
- ✅ 50+ currencies
- ✅ AI-powered predictions
- ✅ Team collaboration
- ✅ Professional exports

**Welcome to the ocean!** 🌊

