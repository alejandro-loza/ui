export interface JWT {
	access_token: string;
	expires_in?: number;
	refresh_token?: string;
	roles?: string[];
	token_type?: string;
	username?: string;
	signup?: boolean;
}
