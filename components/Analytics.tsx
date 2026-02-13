
import React from 'react';
import { useApp } from '../context/AppContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics: React.FC = () => {
  const { usage } = useApp();
  
  const trendData = [
    { day: 'MON', focus: 120, distraction: 40 },
    { day: 'TUE', focus: 180, distraction: 60 },
    { day: 'WED', focus: 90, distraction: 120 },
    { day: 'THU', focus: 240, distraction: 30 },
    { day: 'FRI', focus: 210, distraction: 45 },
    { day: 'SAT', focus: 60, distraction: 200 },
    { day: 'SUN', focus: 45, distraction: 180 },
  ];

  const categories = [
    { name: 'Productivity', value: usage?.filter(u => u.category === 'Productivity').reduce((a, b) => a + b.durationSeconds, 0) || 0 },
    { name: 'Distraction', value: usage?.filter(u => u.category === 'Entertainment' || u.category === 'Social').reduce((a, b) => a + b.durationSeconds, 0) || 0 },
    { name: 'Utility', value: usage?.filter(u => u.category === 'Utility' || u.category === 'News').reduce((a, b) => a + b.durationSeconds, 0) || 0 },
  ].filter(v => v.value > 0);

  const COLORS = ['#10b981', '#ef4444', '#64748b'];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-black text-on-surface tracking-tighter">Analytics</h1>
        <p className="text-muted mt-2 max-w-xl mx-auto">Review your digital habits and focus trends over time.</p>
      </div>
      
      <div className="bg-surface p-6 lg:p-8 rounded-3xl border border-stroke shadow-lg">
        <h3 className="text-lg font-black text-on-surface mb-6">Weekly Focus vs. Distraction</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 'bold' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10 }} unit="m" />
              <Tooltip 
                contentStyle={{ borderRadius: '1rem', border: '1px solid #e2e8f0', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', fontSize: '12px' }}
              />
              <Area type="monotone" dataKey="focus" stroke="#10b981" fill="url(#colorFocus)" strokeWidth={3} />
              <Area type="monotone" dataKey="distraction" stroke="#ef4444" fill="url(#colorDist)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 bg-surface p-8 rounded-3xl border border-stroke">
          <h3 className="text-lg font-black text-on-surface mb-6">Category Breakdown</h3>
          <div className="h-64 w-full flex flex-col md:flex-row items-center justify-around">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categories.length > 0 ? categories : [{name: 'None', value: 1}]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} dataKey="value">
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  {categories.length === 0 && <Cell fill="#e2e8f0" />}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4 md:mt-0 min-w-[120px]">
              {categories.map((cat, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-muted">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-dark-surface p-8 rounded-3xl text-center text-on-dark-surface flex flex-col justify-center shadow-xl">
          <p className="text-on-dark-surface/50 font-bold text-[10px] uppercase tracking-[0.3em] mb-4">Weekly Focus Volume</p>
          <p className="text-6xl font-black tracking-tighter">32h 15m</p>
          <div className="mt-8 space-y-2">
            <div className="p-4 rounded-2xl bg-on-dark-surface/5 border border-on-dark-surface/5">
              <p className="text-[10px] text-on-dark-surface/30 font-black uppercase tracking-widest mb-1">Efficiency Ratio</p>
              <p className="text-xl font-bold">78%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
