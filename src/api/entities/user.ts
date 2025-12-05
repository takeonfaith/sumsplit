import { $api, END_POINTS } from '../helper';

export class UserApi {
    static login = async (email: string, password: string) => {
        const response = await $api.post(END_POINTS.auth.login, {
            email,
            password,
        });

        console.log(response);

        return response.data;
    };

    static signUp = async (name: string, email: string, password: string) => {
        const response = await $api.post(END_POINTS.auth.signUp, {
            name,
            email,
            password,
        });

        return response.data;
    };

    static logout = async () => {
        const response = await $api.post(END_POINTS.auth.logout);

        return response.data;
    };

    static getUserData = async () => {
        const response = await $api.get(END_POINTS.auth.currentUser);

        return response.data;
    };
}
