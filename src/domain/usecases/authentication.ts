export interface Authentication {
  auth (email: string, passworld: string): Promise<string>
}
