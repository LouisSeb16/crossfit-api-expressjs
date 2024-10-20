export interface Workout {
    id: string;
    name: string;
    mode: string;
    equipment: string[];
    exercises: string[];
    createdAt: string;
    updatedAt: string;
    trainerTips: string[];
}

export interface Member {
    id: string;
    name: string;
    gender: "male" | "female";
    dateOfBirth: string;
    email: string;
    password: string;
}

export interface Record {
    id: string;
    workout: string;
    record: string;
}
