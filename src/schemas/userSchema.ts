import Joi from 'joi';

const validadeUser = (data: any) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        className: Joi.string().min(1).required(),
    }).unknown();
    if (schema.validate(data).error) {
        const { message } = schema.validate(data).error;
        if (message.includes('name')) return 'O nome deve ter de 1 a 50 caracteres';
        if (message.includes('className')) return 'Insira uma classe válida';
    }

    return false;
};

export {
    validadeUser,
};
