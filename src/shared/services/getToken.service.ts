export class GetTokenService {
    async run(): Promise<string | boolean> {
        const token = localStorage.getItem('token');

        if (token) {
            return token;
        }

        return false;
    }
}