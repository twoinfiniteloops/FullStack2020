export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other" 
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}
  
export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
  
  export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
  }
  
  export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
  }
  
  export interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
  }
  
  export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: {
      date: string;
      criteria: string;
    };
  }

  export type TypeInHealth = 
    | 'HealthCheck' 
    | 'OccupationalHealthcare'
    | 'Hospital';
  
  export type Entry = 
    | HealthCheckEntry
    | OccupationalHealthCareEntry 
    | HospitalEntry;

export interface NewPatient {
    name: string,
    dateOfBirth: string,
    gender: Gender,
    ssn: string
    occupation: string
    entries: Entry[]
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    gender: Gender,
    ssn: string,
    occupation: string,
    entries: Entry[]
}

export type PublicPatient = Omit< Patient, "ssn" | "entries" >;

