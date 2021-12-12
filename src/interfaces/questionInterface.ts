interface NewQuestion {
    question: string;
    student: string;
    class: string;
    tags?: string;
}

interface SearchQuestion {
    id?: number;
    answered?: boolean;
}

interface ReturnedQuestion {
    id: number;
    question: string;
    posted_by: string;
    class: string;
    answered: boolean;
    submited_at: string;
    answered_at: null | string;
    answered_by: null | string;
    answer: null | string;
    score: number;
    name?: string;
    class_id?: number;
}

export {
    NewQuestion,
    SearchQuestion,
    ReturnedQuestion,
};
