interface NewQuestion {
    question: string;
    student: string;
    className: string;
    tags?: string;
}

interface ReturnedQuestion {
    id: number;
}

export {
    NewQuestion,
    ReturnedQuestion,
};
