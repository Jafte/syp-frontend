import { User } from "../user.model";

export interface UserEvent {
    id: number;
    creator: User
    title: string
    attendees_count: number
    created_at: Date;
    description: string
    started_at: Date
    ended_at: Date
    location: string
}