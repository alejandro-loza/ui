import { InfoInterface } from         '@interfaces/info.interface';

export interface User {
  accountExpired?:             boolean;
  accountLocked?:              boolean;
  customerId?:                 number;
  dateCreated?:                Date;
  email?:                      string;
  enabled?:                    boolean;
  id?:                        string;
  lastUpdated?:                Date;
  notificationsEnabled?:       boolean;
  passwordExpired?:            boolean;
  termsAndConditionsAccepted?: boolean;
  type?:                       string;
  birthdate?:                  Date;
  homeIncome?:                 InfoInterface;
  homeSize?:                   InfoInterface;
  homeType?:                   InfoInterface;
  password?:                   string;
  ratingDate?:                 Date;
  maritalStatus?:              InfoInterface;
  profession?:                 InfoInterface;
  professionalDegree?:         InfoInterface;
  zipCode?:                    string;
}
