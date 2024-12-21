import React from 'react';
import { Wand2, FileText, FileSpreadsheet } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

const features = [
  {
    icon: Wand2,
    title: 'Beautify JSON',
    description: 'Transform messy JSON into a clean, properly formatted structure with just one click.',
  },
  {
    icon: FileText,
    title: 'Convert to XML',
    description: 'Seamlessly convert your JSON data into well-structured XML format.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Convert to CSV',
    description: 'Transform your JSON data into CSV format for easy spreadsheet compatibility.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-12">
      <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
}