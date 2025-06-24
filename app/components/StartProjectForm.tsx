// components/StartProjectForm.tsx
'use client';
import { useState } from 'react';
import {  ChevronLeft, ChevronDown } from 'lucide-react';

type Service = { id: number; name: string };
type Props = { services: Service[]; cities: string[] };

export default function StartProjectForm({ services, cities }: Props) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        serviceId: '',
        spaceType: '',
        finishStyle: '',
        qualityLevel: '',
        city: '',
        notes: '',
        images: [] as File[],
    });

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else console.log(form);
    };
    const handleBack = () => step > 1 && setStep(step - 1);

    const onImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
        setForm((f) => ({ ...f, images: Array.from(e.target.files) }));
        }
    };

    const SelectField = ({
        label,
        value,
        options,
        onChange,
    }: {
        label: string;
        value: string;
        options: string[] | { id: number; name: string }[];
        onChange: (value: string) => void;
    }) => (
        <div className="relative group">
        <button className="w-full border border-gray-300 rounded px-4 py-3 text-sm flex justify-between items-center">
            {value || label} <ChevronDown className="w-4 h-4" />
        </button>
        <ul className="absolute left-0 right-0 bg-white border border-gray-300 mt-1 rounded shadow-md hidden group-hover:block z-20 max-h-60 overflow-y-auto">
            {(options as any[]).map((option, index) => {
            const label = typeof option === 'string' ? option : option.name;
            const val = typeof option === 'string' ? option : option.id.toString();
            return (
                <li
                key={index}
                onClick={() => onChange(val)}
                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                >
                {label}
                </li>
            );
            })}
        </ul>
        </div>
    );

    const spaceTypes = ['Apartment', 'Villa', 'Studio', 'Office', 'Duplex'];
    const finishStyles = ['Modern', 'Classic', 'Minimalist', 'Industrial', 'Bohemian'];
    const qualityLevels = ['High Quality', 'Medium Quality', 'Economy Quality'];

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6 relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
            <button onClick={handleBack} disabled={step === 1}>
                <ChevronLeft className={`w-5 h-5 ${step === 1 ? 'text-gray-300' : 'text-black'}`} />
            </button>
            <h2 className="text-center font-semibold text-sm flex-1">Start a New Project</h2>
            <button onClick={() => window.history.back()}>✕</button>
            </div>

            {/* Progress */}
            <div className="flex justify-between mb-6">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 text-center">
                <div className={`h-1 mb-2 rounded-full ${step >= i ? 'bg-green-500' : 'bg-gray-200'}`} />
                </div>
            ))}
            </div>

            {/* Step Content */}
            {step === 1 && (
            <div className="space-y-4">
                <input type="text" placeholder="Project name"
                    className="w-full border border-gray-300 rounded px-4 py-2 text-sm"/>
                <SelectField
                label="Select Service"
                value={services.find((s) => s.id.toString() === form.serviceId)?.name || ''}
                options={services}
                onChange={(val) => setForm((f) => ({ ...f, serviceId: val }))}
                />
                <SelectField
                label="Select Space Type"
                value={form.spaceType}
                options={spaceTypes}
                onChange={(val) => setForm((f) => ({ ...f, spaceType: val }))}
                />
            </div>
            )}
            {step === 2 && (
            <div className="space-y-4">
                <SelectField
                label="Select Finish Style"
                value={form.finishStyle}
                options={finishStyles}
                onChange={(val) => setForm((f) => ({ ...f, finishStyle: val }))}
                />
                <SelectField
                label="Select Quality"
                value={form.qualityLevel}
                options={qualityLevels}
                onChange={(val) => setForm((f) => ({ ...f, qualityLevel: val }))}
                />
            </div>
            )}
            {step === 3 && (
            <div className="space-y-4">
                <SelectField
                label="Select City"
                value={form.city}
                options={cities}
                onChange={(val) => setForm((f) => ({ ...f, city: val }))}
                />
                <textarea
                placeholder="Additional notes..."
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                className="w-full border border-gray-300 rounded px-4 py-2 text-sm h-24 resize-none"
                />
                <input type="file" multiple accept="image/*" onChange={onImagesChange} />
            </div>
            )}

            {/* Next / Finish Button */}
            <button
            onClick={handleNext}
            className="w-full bg-green-500 text-white py-3 rounded mt-6"
            >
            {step < 3 ? 'Next' : 'Finish'}
            </button>
        </div>
        </div>
    );
}
