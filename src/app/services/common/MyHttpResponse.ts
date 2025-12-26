
export interface MyHttpResponse<T>{
    code:number;
    data:T;
    message:string;
    timestamp:number;
}