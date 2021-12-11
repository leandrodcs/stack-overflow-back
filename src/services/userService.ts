import { v4 as uuid } from 'uuid';
import { NewUser } from '../interfaces/userInterface';
import * as classRepository from '../repositories/classRepository';
import * as userRepository from '../repositories/userRepository';
import * as sessionRepository from '../repositories/sessionRepository';

async function createUser(newUser: NewUser) {
    const {
        name,
        className,
    } = newUser;

    let classExists = await classRepository.getClass(className);

    if (!classExists) {
        classExists = await classRepository.createClass(className);
    }

    const createdUser = await userRepository.createUser(name, classExists.id);

    const token = uuid();

    const newToken = await sessionRepository.createSession(createdUser.id, token);

    return newToken;
}

export {
    createUser,
};
