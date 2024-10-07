import { PaginationParams } from "./pagination";

export interface ExitProfile {
    id?: number;
    student_id: number;
    exit_date: string;
    reason: string;
    exit_category: string;
    academic_term_id: number;
    class_group_id: number;
}

export interface ExitProfileState {
    exitProfiles: ExitProfileViewModel[];
    exitProfile: ExitProfile;
    status: string;
    message: string;
    isLoading: boolean;
    pagination: PaginationParams
}

export interface ExitProfileViewModel {
    id: number;
    student_id: number;
    id_number: string;
    exit_date: string;
    reason: string;
    exit_category: string;
    academic_term_id: number;
    class_group_id: number;
    student_name: string;
    academic_term_name: string;
    class_group_name: string;
}