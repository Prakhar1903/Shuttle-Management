import React from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Bus, 
  Download, 
  Activity, 
  FileCheck2
} from 'lucide-react';
import toast from 'react-hot-toast';

export const SafetyCompliance: React.FC = () => {
  const handleExport = () => {
    toast.success('Safety & duty audit report exported successfully');
  };

  const handleRunAudit = () => {
    toast.success('Safety diagnostics complete: All vehicle sensors responding within parameters.');
  };

  return (
    <div className="space-y-7 animate-fade-in select-none max-w-[1400px] mx-auto pb-12">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#102d69]" />
            <span>Safety Compliance & Driver Duty Audits</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time driver fatigue monitoring, maximum driving hours compliance, vehicle fitness certifications, and safety telemetry.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRunAudit}
            className="h-9 inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-3.5 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5 text-blue-600" />
            <span>Run Safety Diagnostic</span>
          </button>

          <button
            type="button"
            onClick={handleExport}
            className="h-9 inline-flex items-center gap-1.5 bg-[#102d69] hover:bg-[#0c2352] text-white px-4 rounded-xl text-xs font-bold shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Safety Audit</span>
          </button>
        </div>
      </div>

      {/* 2. Safety Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">99.8%</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Safety Index Score</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">0</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Fatigue Violations</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">1 Driver</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Nearing Duty Limit</div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 leading-none">3 / 3</div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">Fitness Certified</div>
          </div>
        </div>
      </div>

      {/* 3. Driver Duty Hours & Fatigue Monitoring */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Clock className="w-4.5 h-4.5 text-blue-600" />
              <span>Driver Maximum Driving Hours & Shift Thresholds</span>
            </h2>
            <p className="text-xs text-slate-500">Live statutory compliance tracking against 8-hour maximum shift duration</p>
          </div>
          <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            Mandatory 30m break enforced
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Driver 1: Samuel Jones */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  S
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Samuel Jones</div>
                  <div className="text-[11px] text-slate-500 font-mono">UA3282 • White Bus</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                Duty Nearing End
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-600">Continuous Duty:</span>
                <span className="font-mono font-bold text-slate-900">6h 30m / 8h 00m</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '81%' }}></div>
              </div>
              <span className="text-[10px] text-amber-700 font-semibold mt-1 block">
                ⚠️ Nearing 8h shift cap. Reallocation recommended in 90 mins.
              </span>
            </div>
          </div>

          {/* Driver 2: Bob Jones */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  B
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Bob Jones</div>
                  <div className="text-[11px] text-slate-500 font-mono">UA9104 • Blue Shuttle</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Optimal
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-600">Continuous Duty:</span>
                <span className="font-mono font-bold text-slate-900">4h 00m / 8h 00m</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '50%' }}></div>
              </div>
              <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">
                ✅ Rest break completed at 13:00. Driver fresh and compliant.
              </span>
            </div>
          </div>

          {/* Driver 3: Jonathan Spikes */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                  J
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Jonathan Spikes</div>
                  <div className="text-[11px] text-slate-500 font-mono">UA1108 • Red Cruiser</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-700">
                Depot Standby
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-semibold text-slate-600">Continuous Duty:</span>
                <span className="font-mono font-bold text-slate-900">1h 15m / 8h 00m</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '15%' }}></div>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold mt-1 block">
                Ready for peak-hour allocation or relief dispatch.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Vehicle Safety & Maintenance Inspections */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Bus className="w-4.5 h-4.5 text-blue-600" />
              <span>Campus Shuttle Fleet Safety Inspections</span>
            </h2>
            <p className="text-xs text-slate-500">Scheduled mechanical audits, brake inspections, and emergency gear checks</p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            All Fleet Inspections Valid
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] uppercase font-bold text-slate-400">
                <th className="py-2.5 px-3">Vehicle ID</th>
                <th className="py-2.5 px-3">Model & Plate</th>
                <th className="py-2.5 px-3">Fitness Certificate</th>
                <th className="py-2.5 px-3">Brake & Tire Check</th>
                <th className="py-2.5 px-3">Emergency Kit</th>
                <th className="py-2.5 px-3 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/70">
                <td className="py-3 px-3 font-mono font-bold text-slate-900">NB-002-RF</td>
                <td className="py-3 px-3 text-slate-700">White Bus (UA3282)</td>
                <td className="py-3 px-3 text-emerald-700 font-medium">Valid until Mar 2025</td>
                <td className="py-3 px-3 text-slate-700">Pass (4.2mm tread, 36 PSI)</td>
                <td className="py-3 px-3 text-emerald-700">First Aid & Extinguisher OK</td>
                <td className="py-3 px-3 text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Compliant
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="py-3 px-3 font-mono font-bold text-slate-900">NB-005-BL</td>
                <td className="py-3 px-3 text-slate-700">Blue Minibus (UA9104)</td>
                <td className="py-3 px-3 text-emerald-700 font-medium">Valid until Feb 2025</td>
                <td className="py-3 px-3 text-slate-700">Pass (4.0mm tread, 35 PSI)</td>
                <td className="py-3 px-3 text-emerald-700">First Aid & Extinguisher OK</td>
                <td className="py-3 px-3 text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Compliant
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/70">
                <td className="py-3 px-3 font-mono font-bold text-slate-900">NB-001-RD</td>
                <td className="py-3 px-3 text-slate-700">Red Cruiser (UA1108)</td>
                <td className="py-3 px-3 text-emerald-700 font-medium">Valid until May 2025</td>
                <td className="py-3 px-3 text-slate-700">Pass (4.5mm tread, 36 PSI)</td>
                <td className="py-3 px-3 text-emerald-700">First Aid & Extinguisher OK</td>
                <td className="py-3 px-3 text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Compliant
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SafetyCompliance;
