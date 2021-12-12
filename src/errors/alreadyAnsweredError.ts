class AlreadyAnsweredError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AlreadyAnsweredError';
    }
}

export default AlreadyAnsweredError;
