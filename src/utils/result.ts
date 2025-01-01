import { Failure, Success } from '../types/result';

export function success<S>(data: S): Success<S> {
    return { status: 'success', data: data };
}

export function failure<E>(error: E): Failure<E> {
    return { status: 'failure', error: error };
}
