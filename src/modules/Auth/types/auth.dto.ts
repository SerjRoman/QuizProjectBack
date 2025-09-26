import { UserCreateInput, UserLoginPayload } from '@modules/User';

export type RegisterDto = UserCreateInput;
export type LoginDto = UserLoginPayload;
export type RefreshDto = { refreshToken: string };
export type MeDto = {userId: string}