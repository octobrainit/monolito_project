export default interface UseCaseInterface<TRequest, TResponse> {
    execute(data : TRequest) : Promise<TResponse>;
}