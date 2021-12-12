import Joi from 'joi';

const validadeAnswer = (data: any) => {
    const schema = Joi.object({
        answer: Joi.string().min(1).required(),
    }).unknown();
    if (schema.validate(data).error) {
        return 'Informe uma resposta para a pergunta que deseja responder.';
    }
    return false;
};

export {
    validadeAnswer,
};
