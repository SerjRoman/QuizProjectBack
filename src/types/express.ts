import { Request, Response } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
export type AuthRequest<
    P = ParamsDictionary,
    ResBody = object,
    ReqBody = object,
    ReqQuery = Query,
> = Request<P, ResBody, ReqBody, ReqQuery, { userId: string }>;
export type AuthResponse<ResBody = object> = Response<
    ResBody,
    { userId: string }
>;
