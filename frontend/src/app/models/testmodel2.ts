export interface testModel2 {
    id: number;
    method: string;
    apiUrl: string;
    headers: { [key: string]: string };
    responseTime?: number;
    input?: string;
    expectedOutput?: string;
    statusCode?: number;
    responseStatus?: boolean;
    expectedHeaders:  { [key: string]: string };


}
