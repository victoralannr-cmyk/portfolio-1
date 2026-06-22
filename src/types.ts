export interface Project {
  id: string;
  title: string;
  url: string;
  description: string;
  category: 'Landing Page' | 'Site Institucional' | 'SaaS / App';
  tags: string[];
  stats?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  badge: string;
  features: string[];
}

export interface ContactFormData {
  name: string;
  contact: string; // email or phone
  serviceType: 'Landing Page' | 'Web Site' | 'Aplicativo' | 'Outro';
  message?: string;
}
