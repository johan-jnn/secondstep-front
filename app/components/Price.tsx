import type {MoneyV2} from '@shopify/hydrogen/customer-account-api-types';

export interface PriceProps {
  value: MoneyV2;
  decimals?: number;
}
export default function Price({value, decimals}: PriceProps) {
  return Intl.NumberFormat('fr-FR', {
    currency: value.currencyCode,
    style: 'currency',
    maximumFractionDigits: decimals ?? 2,
  }).format(parseFloat(value.amount));
}
