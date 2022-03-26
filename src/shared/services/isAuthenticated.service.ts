export class IsAuthenticatedService {
    run() {
        const token = localStorage.getItem('token');

        return !!token;
    }
}