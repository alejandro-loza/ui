import { CredentialBaseInterface } from '@interfaces/credentials/base/credential-base.interface';
import { User } from '@interfaces/user.interface';

export interface CredentialInterface extends CredentialBaseInterface {
  readonly customerId: number;
  lastUpdated: string;
  user: User;
  username: string;
  password?: string;
}
