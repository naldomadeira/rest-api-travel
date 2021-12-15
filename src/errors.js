class NotFound extends Error {
    constructor(message) {
        super(message);
    }
}

class Forbidden extends Error {
    constructor(message) {
        super(message);
    }
}

class BadRequest extends Error {
    constructor(message) {
        super(message);
    }
}

class Unauthorized extends Error {
    constructor(message) {
        super(message);
    }
}

class Conflict extends Error {
    constructor(message) {
        super(message);
    }
}

class NotAcceptable extends Error {
    constructor(message) {
        super(message);
    }
}

class PreconditionFailed extends Error {
    constructor(message) {
        super(message);
    }
}

export {
    Forbidden,
    NotFound,
    BadRequest,
    Unauthorized,
    Conflict,
    NotAcceptable,
    PreconditionFailed,
};
