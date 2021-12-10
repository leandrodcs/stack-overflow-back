import Joi from 'joi';

const validadeQuestion = (data: any) => {
    const schema = Joi.object({
        question: Joi.string().min(1).required(),
        student: Joi.string().min(1).required(),
        className: Joi.string().min(1).required(),
        tags: Joi.string().min(1).required(),
    }).unknown();
    if (schema.validate(data).error) {
        const { message } = schema.validate(data).error;
        if (message.includes('question')) return 'Insira uma pergunta.';
        if (message.includes('student')) return 'Insira um nome válido.';
        if (message.includes('className')) return 'Insira uma classe válida.';
        if (message.includes('tags')) return 'Insira ao menos uma tag para sua pergunta.';
    } else {
        return false;
    }
};

export {
    // eslint-disable-next-line import/prefer-default-export
    validadeQuestion,
};
