export interface IDonaEvaluation {
    student: Student;
    result:  Result;
}

export interface Result {
    adecuadas:   number;
    inadecuadas: number;
    omitidas:    number;
    total:       number;
}

export interface Student {
    femenino:  number;
    masculino: number;
}

export interface IDonaFilter {
    course_assignment_id?: number
}