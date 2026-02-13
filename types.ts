
export interface Resource {
  id: string;
  title: string;
  type: 'Lecture' | 'Slide' | 'CaseStudy' | 'Exercise' | 'Tool';
  description: string;
  format: 'PDF' | 'PPTX' | 'XLSX' | 'MATLAB' | 'Video';
  category: 'Logistics' | 'Forecasting';
  updateDate: string;
}

export interface Software {
  id: string;
  name: string;
  version: string;
  description: string;
  downloadUrl: string;
  guideVideoUrl: string;
  icon: string;
}

export interface ContactInfo {
  name: string;
  email: string;
  subject: string;
  message: string;
}
