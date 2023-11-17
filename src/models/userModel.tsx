export interface UserModel {
    email:string;
    reset_password_token: string;
    reset_password_sent_at: Date;
    remember_created_at: Date;
    sign_in_count: Number;
    current_sign_in_at: Date;
    last_sign_in_at: Date
    current_sign_in_ip: string
    last_sign_in_ip: string;
    confirmation_token:string
    confirmed_at: Date;
    confirmation_sent_at:Date;
    unconfirmed_email: string;
    failed_attempts:Number;
    unlock_token:string;
    locked_at:Date;
    created_at: Date;
    updated_at: Date;
    jti:string;
    username:string;
    avatar:{};
}