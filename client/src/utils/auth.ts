import { type JwtPayload, jwtDecode } from 'jwt-decode';

interface ExtendedJwt extends JwtPayload {
  data:{
    name:string;
    email:string;
    _id:string;
    role?: string;
  }
};

class AuthService {
  getUser() {
    return jwtDecode<ExtendedJwt>(this.getToken());
  }

  getUserRole(): string | null {
    const decoded = this.getUser();
    return decoded?.data?.role || null;
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);

      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return true;
    }
  }

  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
