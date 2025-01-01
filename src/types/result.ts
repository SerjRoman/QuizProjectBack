export interface Success<S> {
    status: 'success';
    data: S;
}

export interface Failure<E> {
    status: 'failure';
    error: E;
}

export type Result<S, E> = Success<S> | Failure<E>;


