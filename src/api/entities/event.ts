import { $api, END_POINTS } from '../helper';

export class EventsApi {
    static async createEvent(
        name: string,
        description: string,
        currency: string,
        participants: string[]
    ) {
        const response = await $api.post(END_POINTS.events.create, {
            name,
            description,
            currency,
            participants,
        });
    }

    static async getUserEvents() {}

    static async updateEvent() {}

    static async getEventById() {}
}
