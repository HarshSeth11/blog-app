class ApiError extends Error {
    constructor(
        statusCode,
        message = "Something went wrong",
        stack = "",
        errors = []
    ) {
        super(message);
        this.status = statusCode;
        this.message = message;
        this.errors = errors;
        this.success = false;
        this.data = null;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            status: this.status,
            message: this.message,
            errors: this.errors,
            success: this.success,
            data: this.data
        };
    }
}

module.exports = { ApiError };
