import { Info } from         '@interfaces/info.interface';

export interface InfoUser {
  accountExpired:             boolean;
  accountLocked:              boolean;
  customerId:                 number;
  dateCreated:                Date;
  email:                      string;
  enabled:                    boolean;
  id:                         string;
  lastUpdated:                Date;
  notificationsEnabled:       boolean;
  passwordExpired:            boolean;
  termsAndConditionsAccepted: boolean;
  type:                       string;
  birthdate?:                 Date;
  homeIncome?:                Info;
  homeSize?:                  Info;
  homeType?:                  Info;
  ratingDate?:                Date;
  maritalStatus?:             Info;
  profession?:                Info;
  professionalDegree?:        Info;
  zipCode?:                   string;
}
