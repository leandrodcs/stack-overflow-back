interface NewQuestion {
    question: string;
    student: string;
    className: string;
    tags?: string;
}

interface SearchQuestion {
    id?: number;
    answered?: boolean;
}

export {
    NewQuestion,
    SearchQuestion,
};
