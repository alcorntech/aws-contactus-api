'use strict';

export const Constants = {
    Interfaces: {
        Repository: Symbol('Repository'),
        Logger: Symbol('Logger'),
        EmailService: Symbol('EmailService'),
        SmsService: Symbol('SmsService'),
        DatabaseClient: Symbol('DatabaseClient'),
        UserAuthenticationController: Symbol('AuthenticationController'),
        ContactController: Symbol('ContactController'),
        ContactMapper: Symbol('ContactMapper')
    },
    /* --- KEEP THIS HERE FOR QUICK REFERENCE ---
    HttpStatusCodes: {
        OK: 200,
        Created: 201,
        Accepted: 202,
        NoContent: 204,
        MovedPermenantely: 301,
        Found: 302,
        SeeOther: 303,
        NotModified: 304,
        TemporaryRedirect: 307,
        BadRequest: 400,
        Unauthorized: 401,
        Forbidden: 403,
        NotFound: 404,
        MethodNotAllowed: 405,
        NotAcceptable: 406,
        PreconditionFailed: 412,
        UnsupportedMediaType: 415,
        InternalServerError: 500,
        NotImplemented: 501
    },*/
    ApiErrors: {
        Unexpected: {
            Code: 'UNEXPECTED',
            Message: 'An unexpected error occured.',
            HttpStatusCode: 500
        },
        MethodNotSupported: {
            Code: 'METHOD_NOT_SUPPORTED',
            Message: 'Unsupported HTTP request method encountered.',
            HttpStatusCode: 500
        },
        Forbidden: {
            Code: 'FORBIDDEN',
            Message: 'Access Denied.',
            HttpStatusCode: 403
        },
        NotImplemented: {
            Code: 'NOT_IMPLEMENTED',
            Message: 'Method not implemented.',
            HttpStatusCode: 501
        },
    },
    Networking: {
        Localhost: '127.0.0.1'
    }
};

export default Constants;