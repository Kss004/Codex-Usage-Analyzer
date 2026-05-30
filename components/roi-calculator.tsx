'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { computeRoi, formatCurrency } from '@/lib/roi';

export function RoiCalculator({ totalMinutes }: { totalMinutes: number }) {
  const [teamSize, setTeamSize] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(80);

  const roi = computeRoi({ totalMinutes, teamSize, hourlyRate });

  return (
    <div className="space-y-4 rounded-lg border bg-card p-5">
      <div>
        <h3 className="text-sm font-semibold">ROI estimate</h3>
        <p className="text-xs text-muted-foreground">
          Based on ~{totalMinutes} minutes of flagged one-time savings ({roi.hoursSaved} hrs).
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <label className="space-y-1 text-xs">
          <span className="text-muted-foreground">Team size</span>
          <Input
            type="number"
            min={1}
            value={teamSize}
            onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value) || 1))}
          />
        </label>
        <label className="space-y-1 text-xs">
          <span className="text-muted-foreground">Hourly rate ($)</span>
          <Input
            type="number"
            min={1}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Math.max(1, Number(e.target.value) || 1))}
          />
        </label>
      </div>

      <div className="flex items-end justify-between border-t pt-4">
        <div>
          <div className="text-xs text-muted-foreground">One engineer, one-time</div>
          <div className="text-xl font-bold tabular-nums">
            {formatCurrency(roi.oneTimeValue)}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Across team (recurring patterns)</div>
          <div className="text-xl font-bold tabular-nums text-emerald-500">
            {formatCurrency(roi.teamValue)}
          </div>
        </div>
      </div>
    </div>
  );
}
