import { Request, Response } from '@presentation/interfaces';

type RequestMockInput = {
    body?: any;
    params?: any;
    query?: any;
}

export class MockExpress {
    static getRequest({ body, params, query }: RequestMockInput) {
        const req = {
            body,
            params,
            query
        } as Request;
        const resp = {
            status: jest.fn(() => jest.fn()),
        } as unknown as Response;

        return { req, resp };
    }
}