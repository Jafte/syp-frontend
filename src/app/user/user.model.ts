
export interface User {
    uuid: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    friends_count: number;
}

export interface UserDetail {
    uuid: string;
    email: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    can_be_added_as_a_friend: boolean;
    friendship_request_from: FriendshipRequest | null;
    friendship_request_to: FriendshipRequest | null;
    friendship: Friendship | null;
    friends_count: number;
}

export interface Friendship {
    user: User;
    friend: User;
    created_at: Date;
}


export interface FriendshipRequest {
    sender: User;
    receiver: User;
    created_at: Date;
    comment: string;
    accepted_at: Date | null;
    rejected_at: Date | null;
}