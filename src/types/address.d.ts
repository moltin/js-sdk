import { AccountAddress, AccountAddressBase } from './account-address';
import { CustomerAddress, CustomerAddressBase } from './customer-address';

export type Address = AccountAddress | CustomerAddress;
export type AddressBase = AccountAddressBase | CustomerAddressBase;
