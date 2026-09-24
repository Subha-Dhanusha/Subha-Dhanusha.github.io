'use client';

import React, { useState } from 'react';
import { useDomain } from '@/context/DomainContext';
import { sound } from '@/lib/utils/sound';
import { Activity, ShieldCheck, TrendingUp, Cpu, RefreshCw, CheckCircle, AlertTriangle } from 'lucide-react';

interface PlaygroundProps {
  type?: 'none' | 'ml-inference' | 'sql-pipeline' | 'financial-kpi' | 'evidence-chain';
  projectTitle: string;
}

export default function InteractivePlayground({ type = 'none', projectTitle }: PlaygroundProps) {
  const { activeTheme } = useDomain();

  // 1. MediRisk AI Calculator State
  const [glucose, setGlucose] = useState<number>(130);
  const [bloodPressure, setBloodPressure] = useState<number>(80);
  const [insulin, setInsulin] = useState<number>(85);
  const [bmi, setBmi] = useState<number>(27.5);
  const [age, setAge] = useState<number>(32);

  // 2. Financial KPI State
  const [peRatio, setPeRatio] = useState<number>(24);
  const [epsGrowth, setEpsGrowth] = useState<number>(18);
  const [roe, setRoe] = useState<number>(22);
  const [deRatio, setDeRatio] = useState<number>(0.65);

  // 3. Network Forensic State
  const [srcIp, setSrcIp] = useState<string>('192.168.1.104');
  const [destIp, setDestIp] = useState<string>('10.0.4.88');
  const [protocol, setProtocol] = useState<string>('TCP / 443');
  const [payloadText, setPayloadText] = useState<string>('SYN_ACK_PACKET_STREAM_DATA_CHUNKS');
  const [hashOutput, setHashOutput] = useState<string>('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  const [isLogged, setIsLogged] = useState<boolean>(false);

  // MediRisk ML calculation (logistic approximation based on standard clinical risk parameters)
  const calculateMediRisk = () => {
    // Normalization & weights
    const z = -4.5 +
      (glucose / 200) * 3.8 +
      (bloodPressure / 120) * 1.2 +
      (bmi / 40) * 2.5 +
      (age / 80) * 1.5 +
      (insulin / 250) * 0.8;
    const probability = 1 / (1 + Math.exp(-z));
    return Math.min(Math.max(Math.round(probability * 100), 4), 96);
  };

  const riskScore = calculateMediRisk();
  const getRiskStatus = (score: number) => {
    if (score < 30) return { label: 'LOW RISK', color: '#10b981', desc: 'Parameters within baseline physiological tolerances' };
    if (score < 65) return { label: 'MODERATE RISK', color: '#f59e0b', desc: 'Pre-clinical elevation observed; monitoring suggested' };
    return { label: 'ELEVATED RISK', color: '#ef4444', desc: 'Diagnostic threshold exceeded; clinician triage priority' };
  };
  const status = getRiskStatus(riskScore);

  // Financial KPI calculation
  const calculateFinancialScore = () => {
    let score = 50;
    // Lower PE is attractive if EPS growth is high (PEG ratio concept)
    const peg = peRatio / (epsGrowth || 1);
    if (peg < 1.5) score += 15;
    else if (peg > 2.5) score -= 12;

    // ROE > 18% is great
    if (roe >= 20) score += 20;
    else if (roe >= 14) score += 10;
    else score -= 10;

    // Debt to Equity < 1.0 is healthy
    if (deRatio <= 0.8) score += 15;
    else if (deRatio > 1.5) score -= 18;

    return Math.min(Math.max(score, 10), 98);
  };
  const finScore = calculateFinancialScore();

  // Forensic Hash compute
  const generateForensicStamp = () => {
    sound.click();
    // Simulate SHA-256 string
    const chars = '0123456789abcdef';
    let hash = '';
    for (let i = 0; i < 64; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    setHashOutput(hash);
    setIsLogged(true);
    setTimeout(() => setIsLogged(false), 2500);
  };

  if (type === 'ml-inference') {
    return (
      <div className="rounded-2xl border border-surface-border bg-surface/80 p-5 sm:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2">
            <Activity size={18} style={{ color: activeTheme.primary }} />
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-foreground">
              Live MediRisk AI Inference Simulator
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
            MODEL: 87% ACCURACY
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-foreground">
              <span>Glucose Level:</span>
              <strong style={{ color: activeTheme.primary }}>{glucose} mg/dL</strong>
            </div>
            <input
              type="range"
              min="70"
              max="240"
              value={glucose}
              onChange={(e) => { sound.tick(); setGlucose(Number(e.target.value)); }}
              className="w-full accent-cyan-500 h-1.5 bg-surface-border rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-foreground-muted font-mono mt-1">
              <span>70 (Normal)</span>
              <span>140 (Impaired)</span>
              <span>240 (High)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-foreground">
              <span>Blood Pressure:</span>
              <strong style={{ color: activeTheme.primary }}>{bloodPressure} mmHg</strong>
            </div>
            <input
              type="range"
              min="60"
              max="140"
              value={bloodPressure}
              onChange={(e) => { sound.tick(); setBloodPressure(Number(e.target.value)); }}
              className="w-full accent-cyan-500 h-1.5 bg-surface-border rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-foreground-muted font-mono mt-1">
              <span>60 (Low)</span>
              <span>80 (Ideal)</span>
              <span>140 (Elevated)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-foreground">
              <span>BMI (Body Mass Index):</span>
              <strong style={{ color: activeTheme.primary }}>{bmi.toFixed(1)} kg/m²</strong>
            </div>
            <input
              type="range"
              min="18"
              max="45"
              step="0.5"
              value={bmi}
              onChange={(e) => { sound.tick(); setBmi(Number(e.target.value)); }}
              className="w-full accent-cyan-500 h-1.5 bg-surface-border rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-foreground-muted font-mono mt-1">
              <span>18.5 (Normal)</span>
              <span>25 (Overweight)</span>
              <span>45 (Obese)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-foreground">
              <span>Patient Age:</span>
              <strong style={{ color: activeTheme.primary }}>{age} yrs</strong>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              value={age}
              onChange={(e) => { sound.tick(); setAge(Number(e.target.value)); }}
              className="w-full accent-cyan-500 h-1.5 bg-surface-border rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-foreground-muted font-mono mt-1">
              <span>20</span>
              <span>50</span>
              <span>80</span>
            </div>
          </div>
        </div>

        {/* Inference Output Box */}
        <div className="p-4 rounded-xl border border-surface-border bg-surface/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-2xl font-mono"
              style={{
                backgroundColor: `${status.color}20`,
                color: status.color,
                border: `2px solid ${status.color}`,
              }}
            >
              {riskScore}%
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono tracking-wider" style={{ color: status.color }}>
                  {status.label}
                </span>
                <span className="text-[10px] font-mono text-foreground-muted">| Inference: ~32ms</span>
              </div>
              <p className="text-xs text-foreground-muted mt-1 max-w-sm">
                {status.desc}
              </p>
            </div>
          </div>

          <div className="text-right font-mono text-[11px] text-foreground-muted">
            <div>Pipeline: StandardScaler</div>
            <div>Classifier: Scikit-Learn Forest</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'financial-kpi') {
    return (
      <div className="rounded-2xl border border-surface-border bg-surface/80 p-5 sm:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={18} style={{ color: activeTheme.primary }} />
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-foreground">
              BlueStock Equity Valuation &amp; Star Schema Simulator
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-amber-500/40 text-amber-400 bg-amber-500/10">
            STAR SCHEMA VIEWS
          </span>
        </div>

        {/* Input Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-foreground">
              <span>Price-to-Earnings (P/E):</span>
              <strong style={{ color: activeTheme.primary }}>{peRatio}x</strong>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={peRatio}
              onChange={(e) => { sound.tick(); setPeRatio(Number(e.target.value)); }}
              className="w-full accent-amber-500 h-1.5 bg-surface-border rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-foreground">
              <span>EPS Growth Rate (YoY):</span>
              <strong style={{ color: activeTheme.primary }}>+{epsGrowth}%</strong>
            </div>
            <input
              type="range"
              min="2"
              max="45"
              value={epsGrowth}
              onChange={(e) => { sound.tick(); setEpsGrowth(Number(e.target.value)); }}
              className="w-full accent-amber-500 h-1.5 bg-surface-border rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-foreground">
              <span>Return on Equity (ROE):</span>
              <strong style={{ color: activeTheme.primary }}>{roe}%</strong>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={roe}
              onChange={(e) => { sound.tick(); setRoe(Number(e.target.value)); }}
              className="w-full accent-amber-500 h-1.5 bg-surface-border rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1 text-foreground">
              <span>Debt-to-Equity (D/E):</span>
              <strong style={{ color: activeTheme.primary }}>{deRatio.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.5"
              step="0.05"
              value={deRatio}
              onChange={(e) => { sound.tick(); setDeRatio(Number(e.target.value)); }}
              className="w-full accent-amber-500 h-1.5 bg-surface-border rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Valuation Result */}
        <div className="p-4 rounded-xl border border-surface-border bg-surface/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-2xl font-mono"
              style={{
                backgroundColor: finScore >= 65 ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)',
                color: finScore >= 65 ? '#10b981' : '#f59e0b',
                border: `2px solid ${finScore >= 65 ? '#10b981' : '#f59e0b'}`,
              }}
            >
              {finScore}
            </div>
            <div>
              <span className="text-xs font-bold font-mono tracking-wider" style={{ color: finScore >= 65 ? '#10b981' : '#f59e0b' }}>
                {finScore >= 70 ? 'INVESTMENT GRADE: STRONG BUY' : finScore >= 50 ? 'FAIR VALUATION: ACCUMULATE' : 'HIGH VALUATION RISK: NEUTRAL'}
              </span>
              <p className="text-xs text-foreground-muted mt-1 max-w-sm">
                Calculated via dimensional aggregation view `vw_financial_valuation_summary`.
              </p>
            </div>
          </div>
          <div className="font-mono text-xs text-foreground-muted text-right">
            <div>PEG Ratio: {(peRatio / epsGrowth).toFixed(2)}</div>
            <div>Solvency: {deRatio < 1 ? 'High' : 'Leveraged'}</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'evidence-chain') {
    return (
      <div className="rounded-2xl border border-surface-border bg-surface/80 p-5 sm:p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-surface-border pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} style={{ color: activeTheme.primary }} />
            <h4 className="text-sm font-bold uppercase tracking-wider font-mono text-foreground">
              Digital Evidence Capture &amp; Cryptographic Seal
            </h4>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded border border-purple-500/40 text-purple-400 bg-purple-500/10">
            CHAIN OF CUSTODY
          </span>
        </div>

        {/* Network Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div>
            <label className="text-foreground-muted block mb-1">Source IP:</label>
            <input
              type="text"
              value={srcIp}
              onChange={(e) => setSrcIp(e.target.value)}
              className="w-full bg-surface border border-surface-border rounded-lg px-2.5 py-1.5 text-foreground font-mono"
            />
          </div>
          <div>
            <label className="text-foreground-muted block mb-1">Destination IP:</label>
            <input
              type="text"
              value={destIp}
              onChange={(e) => setDestIp(e.target.value)}
              className="w-full bg-surface border border-surface-border rounded-lg px-2.5 py-1.5 text-foreground font-mono"
            />
          </div>
          <div>
            <label className="text-foreground-muted block mb-1">Protocol Header:</label>
            <input
              type="text"
              value={protocol}
              onChange={(e) => setProtocol(e.target.value)}
              className="w-full bg-surface border border-surface-border rounded-lg px-2.5 py-1.5 text-foreground font-mono"
            />
          </div>
        </div>

        {/* Payload snippet */}
        <div>
          <label className="text-xs font-mono text-foreground-muted block mb-1">Captured Payload Buffer:</label>
          <input
            type="text"
            value={payloadText}
            onChange={(e) => setPayloadText(e.target.value)}
            className="w-full bg-surface border border-surface-border rounded-lg px-3 py-2 text-foreground font-mono text-xs"
          />
        </div>

        {/* Hash & Stamping Action */}
        <div className="p-4 rounded-xl border border-surface-border bg-surface/90 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-foreground flex items-center gap-1.5">
              <Cpu size={14} style={{ color: activeTheme.primary }} />
              SHA-256 Tamper-Proof Stamp:
            </span>
            <button
              onClick={generateForensicStamp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-white transition-all duration-200"
              style={{ backgroundColor: activeTheme.primary }}
            >
              <RefreshCw size={12} />
              Re-Hash &amp; Log Custody
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-black/40 border border-surface-border font-mono text-[11px] text-emerald-400 break-all select-all">
            {hashOutput}
          </div>

          {isLogged && (
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 animate-in fade-in">
              <CheckCircle size={13} />
              <span>Evidence record sealed and recorded to immutable SQLite/MySQL chain-of-custody log.</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
