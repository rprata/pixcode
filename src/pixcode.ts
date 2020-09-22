enum EmvTag {
  PayloadFormatIndicator = '00',
  PointOfInitiationMethod = '01',
  MerchantAccountInformation = '26',
  MerchantCategoryCode = '52',
  TransactionCurrency = '53',
  TransactionAmount = '54',
  CountryCode = '58',
  MerchantName = '59',
  MerchantCity = '60',
  PostalCode = '61',
  AdditionalDataField = '62',
  CRC = '63'
}

interface TLV {
  id: string,
  name: string,
  length: number,
  value: string,
  mandatory: boolean,
  description: string
}

interface PIXCode {
  payloadFormatIndicator: TLV,
  pointOfInitiationMethod: TLV,
  merchantAccountInformation: TLV,
  merchantCategoryCode: TLV,
  transactionCurrency: TLV
  transactionAmount: TLV,
  countryCode: TLV,
  merchantName: TLV,
  merchantCity: TLV,
  postalCode: TLV,
  additionalDataField: TLV,
  unreservedTemplates: TLV,
  crc: TLV
}

export {
  EmvTag,
  TLV,
  PIXCode
}
