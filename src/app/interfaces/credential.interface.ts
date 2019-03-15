import { InstitutionInterface } from '@interfaces/institution.interface';
import { ProviderInterface } from '@interfaces/provider.interface';
import { UserInterface } from '@interfaces/user.interface';

export interface CredentialInterface {
	customerId: number;
	id: string;
	institution: InstitutionInterface;
	lastUpdated: string;
	provider: ProviderInterface;
	status: string;
	user: UserInterface;
	username: string;
	password?: string;
}
