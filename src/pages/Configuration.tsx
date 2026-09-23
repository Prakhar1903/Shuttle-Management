import React, { useState } from 'react';
import { 
  Settings, 
  Sliders, 
  Clock, 
  Bell, 
  CheckCircle2, 
  Save, 
  RefreshCw,
  Gauge
} from 'lucide-react';
import toast from 'react-hot-toast';

export const Configuration: React.FC = () => {
  // Dispatch automation state
  const [autoAssign, setAutoAssign] = useState(true);
  const [autoNoShowMins, setAutoNoShowMins] = useState(10);
  const [maxWaitMins, setMaxWaitMins] = useState(15);

  // Driver shift rules
  const [maxContinuousDriving, setMaxContinuousDriving] = useState(4);
  const [minBreakDuration, setMinBreakDuration] = useState(30);
  const [serviceStart, setServiceStart] = useState('06:00');
  const [serviceEnd, setServiceEnd] = useState('22:00');

  // Campus Geofence & Speed
  const [speedLimit, setSpeedLimit] = useState(30);
  const [speedAlertEnabled, setSpeedAlertEnabled] = useState(true);
  const [geofenceRadius, setGeofenceRadius] = useState(4.5);

  // Notifications
  const [notifyStudentPriorMins, setNotifyStudentPriorMins] = useState(5);
  const [smsAlerts, setSmsAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('System and fleet configuration updated successfully');
  };

  const handleReset = () => {
    setAutoAssign(true);
    setAutoNoShowMins(10);
    setMaxWaitMins(15);
    setMaxContinuousDriving(4);
    setMinBreakDuration(30);
    setSpeedLimit(30);
    toast.success('Configuration reset to university defaults');
  };

  return (
    <div className="space-y-7 animate-fade-in select-none max-w-[1400px] mx-auto pb-12">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-[#102d69]" />
            <span>System & Fleet Configuration</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure automated dispatch policies, driver shift hour regulations, campus geofencing, and rider notification rules.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="h-9 inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 px-3.5 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Reset Defaults</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="h-9 inline-flex items-center gap-1.5 bg-[#102d69] hover:bg-[#0c2352] text-white px-4 rounded-xl text-xs font-bold shadow-2xs transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Dispatch Automation */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
              <Sliders size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Dispatch & Booking Automation</h2>
              <p className="text-[11px] text-slate-500">Autonomous allocation rules for incoming student ride requests</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="font-bold text-slate-900 block">Auto-Assign Nearest Driver</span>
                <span className="text-[11px] text-slate-500">Automatically match requested rides to on-duty drivers</span>
              </div>
              <input
                type="checkbox"
                checked={autoAssign}
                onChange={(e) => setAutoAssign(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Auto-Cancel No-Show Threshold (Minutes)
              </label>
              <input
                type="number"
                min={5}
                max={30}
                value={autoNoShowMins}
                onChange={(e) => setAutoNoShowMins(Number(e.target.value))}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">Time driver waits at station before marking rider as no-show</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Max Passenger Wait Time Warning (Minutes)
              </label>
              <input
                type="number"
                min={5}
                max={45}
                value={maxWaitMins}
                onChange={(e) => setMaxWaitMins(Number(e.target.value))}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Driver Shift Regulations */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
              <Clock size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Driver Shift & Fatigue Regulations</h2>
              <p className="text-[11px] text-slate-500">Campus transit safety standards and driving hour constraints</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Max Continuous Driving Limit (Hours)
              </label>
              <input
                type="number"
                min={2}
                max={6}
                value={maxContinuousDriving}
                onChange={(e) => setMaxContinuousDriving(Number(e.target.value))}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">Trigger alert on Gantt scheduler when driver nears this limit</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Mandatory Rest Break Duration (Minutes)
              </label>
              <input
                type="number"
                min={15}
                max={60}
                value={minBreakDuration}
                onChange={(e) => setMinBreakDuration(Number(e.target.value))}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Service Start</label>
                <input
                  type="time"
                  value={serviceStart}
                  onChange={(e) => setServiceStart(e.target.value)}
                  className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Service End</label>
                <input
                  type="time"
                  value={serviceEnd}
                  onChange={(e) => setServiceEnd(e.target.value)}
                  className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Geofence & Speed Policy */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700">
              <Gauge size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Campus Geofence & Speed Regulations</h2>
              <p className="text-[11px] text-slate-500">Speed limits and perimeter boundaries for student transit</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Campus Maximum Speed Threshold (km/h)
              </label>
              <input
                type="number"
                min={20}
                max={50}
                value={speedLimit}
                onChange={(e) => setSpeedLimit(Number(e.target.value))}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="font-bold text-slate-900 block">Audible In-Cab Speed Buzzer</span>
                <span className="text-[11px] text-slate-500">Sound in-vehicle alert when speed exceeds {speedLimit} km/h</span>
              </div>
              <input
                type="checkbox"
                checked={speedAlertEnabled}
                onChange={(e) => setSpeedAlertEnabled(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                University Perimeter Radius (km)
              </label>
              <input
                type="number"
                step="0.1"
                value={geofenceRadius}
                onChange={(e) => setGeofenceRadius(Number(e.target.value))}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Card 4: Rider Notifications */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700">
              <Bell size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Student Notification & Alerts</h2>
              <p className="text-[11px] text-slate-500">Broadcast and push notification parameters for passengers</p>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Arrival Alert Lead Time (Minutes prior to arrival)
              </label>
              <input
                type="number"
                min={2}
                max={15}
                value={notifyStudentPriorMins}
                onChange={(e) => setNotifyStudentPriorMins(Number(e.target.value))}
                className="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-semibold"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div>
                <span className="font-bold text-slate-900 block">SMS Fallback Alerts</span>
                <span className="text-[11px] text-slate-500">Send text message if app push notification fails</span>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-emerald-800">
                <span className="font-bold block">Live Policy Synchronized</span>
                <span>Active changes take effect immediately across all student boarding passes and driver terminals.</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Configuration;
