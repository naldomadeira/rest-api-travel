import { NOT_FOUND, INTERNAL_SERVER_ERROR } from 'http-status';

import { NotFound } from './errors';

function errorMessage(error) {
    if (error.errors) {
        const messages = [];
        for (const message of error.errors) {
            messages.push({ message });
        }
        return messages.length > 0
            ? {
                  message: error.message,
                  errors: messages,
              }
            : error.message;
    }
    return error.message;
}

export default (error, req, res, next) => {
    let code = INTERNAL_SERVER_ERROR;
    let message = error.message || 'Internal Error';

    if (error instanceof NotFound) {
        code = NOT_FOUND;
        message = errorMessage(error);
    }

    if (error.isAxiosError) {
        code = error.response.status;
        message =
            error.response.data && error.response.data.developerMessage
                ? error.response.data.developerMessage
                : error.response.statusText;
    }

    res.status(code).json({ code, message });
};
