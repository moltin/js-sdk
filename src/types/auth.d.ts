export interface AuthEndpoint {
  AuthWithPassword(username: string, password: string): Promise<any>
}
