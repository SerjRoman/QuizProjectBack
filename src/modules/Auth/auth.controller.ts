import { AuthControllerContract } from './types';
import { AuthService } from './auth.service';

export const AuthController: AuthControllerContract = {
    async me(req, res) {
        const user = await AuthService.me({ userId: res.locals.userId });
        res.status(200).json(user);
    },
    async refresh(req, res) {
        const { refreshToken } = req.body;
        const { token } = await AuthService.refresh({ refreshToken });
        res.status(200).json({ token });
    },
    logout(req, res) {
        res.status(200).json();
    },
    async register(req, res) {
        res.status(201).json(await AuthService.register(req.body));
    },
    async login(req, res) {
        res.status(201).json(await AuthService.login(req.body));
    },
};
