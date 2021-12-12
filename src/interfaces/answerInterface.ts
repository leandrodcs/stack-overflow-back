interface NewAnswerInfo {
    answer: string;
    token: string;
    id: number;
}

interface NewAnswerInfoDB {
    answeredById: string;
    answer: string;
    id: number;
}

export {
    NewAnswerInfo,
    NewAnswerInfoDB,
};
