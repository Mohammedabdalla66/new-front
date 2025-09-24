import React, { useState } from 'react';

const steps = ['Service Type', 'Details', 'Documents', 'Review'];

export const RequestNew = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    serviceType: '',
    title: '',
    description: '',
    duration: '',
    files: [],
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleFiles = (e) => setForm({ ...form, files: Array.from(e.target.files || []) });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Create New Request</h1>
      <div className="flex items-center mb-6">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${i <= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>{i + 1}</div>
            <span className="mx-2 text-sm text-gray-700">{label}</span>
            {i < steps.length - 1 && <div className={`w-10 h-0.5 ${i < step ? 'bg-blue-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-4">
          <label className="block text-sm font-medium text-gray-700">Select Service Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={form.serviceType} onChange={(e) => setForm({ ...form, serviceType: e.target.value })}>
            <option value="">Choose...</option>
            <option value="tax-filing">Tax Filing</option>
            <option value="bookkeeping">Bookkeeping</option>
            <option value="auditing">Auditing</option>
            <option value="payroll">Payroll</option>
            <option value="consultation">Consultation</option>
          </select>
        </div>
      )}

      {step === 1 && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Title</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg" rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Requested Duration</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" placeholder="e.g. 2 weeks" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-4">
          <label className="block text-sm font-medium text-gray-700">Upload Documents (PDF/Images)</label>
          <input type="file" multiple accept=".pdf,image/*" onChange={handleFiles} />
          {form.files.length > 0 && (
            <ul className="mt-3 list-disc list-inside text-sm text-gray-600">
              {form.files.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 space-y-3">
          <div className="text-gray-900 font-medium">Review</div>
          <div className="text-sm text-gray-700">Service Type: {form.serviceType || '-'}</div>
          <div className="text-sm text-gray-700">Title: {form.title || '-'}</div>
          <div className="text-sm text-gray-700">Duration: {form.duration || '-'}</div>
          <div className="text-sm text-gray-700">Description: {form.description || '-'}</div>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Submit</button>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between">
        <button disabled={step === 0} onClick={back} className={`px-4 py-2 rounded-lg border ${step === 0 ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}>Back</button>
        <button disabled={step === steps.length - 1} onClick={next} className={`px-4 py-2 rounded-lg ${step === steps.length - 1 ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>Next</button>
      </div>
    </div>
  );
};


