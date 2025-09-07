export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface Experience {
  id: number;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  experiences: Experience[];
}