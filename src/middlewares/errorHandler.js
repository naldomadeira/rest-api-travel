import {
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    NOT_FOUND,
    FORBIDDEN,
    UNAUTHORIZED,
    CONFLICT,
    NOT_ACCEPTABLE,
    PRECONDITION_FAILED,
} from 'http-status';

import {
    BadRequest,
    NotFound,
    Forbidden,
    Unauthorized,
    Conflict,
    NotAcceptable,
    PreconditionFailed,
} from '../errors';

export default (error, req, res, next) => {
    let code = INTERNAL_SERVER_ERROR;
    let message = error.message || 'Internal Error';

    if (error instanceof BadRequest) {
        code = BAD_REQUEST;
        message = errorMessage(error);
    }

    if (error instanceof NotFound) {
        code = NOT_FOUND;
        message = errorMessage(error);
    }

    if (error instanceof Forbidden) {
        code = FORBIDDEN;
        message = errorMessage(error);
    }

    if (error instanceof Unauthorized) {
        code = UNAUTHORIZED;
        message = errorMessage(error);
    }

    if (error instanceof Conflict) {
        code = CONFLICT;
        message = errorMessage(error);
    }

    if (error instanceof NotAcceptable) {
        code = NOT_ACCEPTABLE;
        message = errorMessage(error);
    }

    if (error instanceof PreconditionFailed) {
        code = PRECONDITION_FAILED;
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
