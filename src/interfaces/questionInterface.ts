interface NewQuestion {
    question: string;
    student: string;
    className: string;
    tags?: string;
}

interface QuestionId {
    id?: number;
}

export {
    NewQuestion,
    QuestionId,
};
