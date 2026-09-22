import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bot,
  Sparkles,
  Sliders,
  Check,
  KeyRound,
} from 'lucide-react';

interface SettingsViewProps {
  isDark: boolean;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ isDark }) => {
  const [autonomyLevel, setAutonomyLevel] = useState<'semi' | 'autonomous'>('autonomous');
  const [selectedModel, setSelectedModel] = useState('gemini-3.8-flash');
  const [maxAttempts, setMaxAttempts] = useState(3);
  const [reasoningEnabled, setReasoningEnabled] = useState(true);
  const [requireDeployApproval, setRequireDeployApproval] = useState(true);
  const [requireGitApproval, setRequireGitApproval] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div id="settings-view" className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <Settings className="w-5 h-5 text-indigo-500" />
          <span>Workspace Settings & Autonomous Agent Controls</span>
        </h2>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
          Configure Gen's autonomous agent reasoning parameters, safety gates, and model engine.
        </p>
      </div>

      <div className={`p-6 rounded-2xl border space-y-6 transition-colors ${
        isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
      }`}>
        {/* Model Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Active LLM Engine
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl border border-indigo-500 bg-indigo-500/5 text-xs">
              <div className="flex items-center justify-between font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                <span>Gemini 3.8 Flash (Active)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Google's cutting-edge low-latency model for autonomous software engineering, AST verification, and RAG retrieval.
              </p>
            </div>

            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs opacity-60">
              <div className="font-bold text-zinc-700 dark:text-zinc-300 mb-1">
                Gemini 3.1 Pro (Optional Tier)
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Extended thinking model for complex multi-hour architectural proofs.
              </p>
            </div>
          </div>
        </div>

        {/* Autonomy Level */}
        <div className="space-y-2 pt-4 border-t border-inherit">
          <label className="block text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Autonomous Execution Level
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setAutonomyLevel('autonomous')}
              className={`p-3 rounded-xl border text-left text-xs flex-1 transition-all ${
                autonomyLevel === 'autonomous'
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-500/5 font-semibold text-indigo-600 dark:text-indigo-400'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <div>Autonomous Mode (Recommended)</div>
              <div className="text-[10px] text-zinc-400 font-normal mt-0.5">
                Agent runs multi-tool loops, performs research, verifies code AST, and requests approval only for sensitive ops.
              </div>
            </button>

            <button
              onClick={() => setAutonomyLevel('semi')}
              className={`p-3 rounded-xl border text-left text-xs flex-1 transition-all ${
                autonomyLevel === 'semi'
                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-500/5 font-semibold text-indigo-600 dark:text-indigo-400'
                  : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              <div>Semi-Autonomous Mode</div>
              <div className="text-[10px] text-zinc-400 font-normal mt-0.5">
                Every tool execution prompts for confirmation before running.
              </div>
            </button>
          </div>
        </div>

        {/* Safety & Approval Gates */}
        <div className="space-y-3 pt-4 border-t border-inherit text-xs">
          <div className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Sensitive Operation Approval Gates</span>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={requireDeployApproval}
                onChange={(e) => setRequireDeployApproval(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-zinc-700 dark:text-zinc-300">
                Require user approval before triggering production container deployment
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={requireGitApproval}
                onChange={(e) => setRequireGitApproval(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-zinc-700 dark:text-zinc-300">
                Require user approval before merging pull requests into main branch
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={reasoningEnabled}
                onChange={(e) => setReasoningEnabled(e.target.checked)}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-zinc-700 dark:text-zinc-300">
                Enable self-healing retry loop (Max 3 attempts on test failure)
              </span>
            </label>
          </div>
        </div>

        {/* Save button */}
        <div className="pt-4 border-t border-inherit flex items-center justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            {isSaved ? <Check className="w-4 h-4" /> : null}
            <span>{isSaved ? 'Settings Saved' : 'Save Configuration'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
