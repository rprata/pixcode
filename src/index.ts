import { CRC } from 'crc-full'

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

const parse = (value: string): PIXCode => {
  const result = {
    payloadFormatIndicator: {
      id: EmvTag.PayloadFormatIndicator,
      name: 'Payload Format Indicator',
      length: 2,
      value: value.substring(4, 6),
      mandatory: true,
      description: 'versão do payloadQRCPS-MPM, fixo em "01"'
    },
    pointOfInitiationMethod: {
      id: EmvTag.PointOfInitiationMethod,
      name: 'Point of Initiation Method',
      length: 0,
      value: '',
      mandatory: false,
      description: '"11" (QR reutilizável) ou "12" (QR utilizável apenas uma vez)'
    },
    merchantAccountInformation: {
      id: EmvTag.MerchantAccountInformation,
      name: 'Merchant Account Information',
      length: 0,
      value: '',
      mandatory: true,
      description: 'indica arranjo específico / "00" (GUI) obrigatório / "01..99" conform BCB'
    },
    merchantCategoryCode: {
      id: EmvTag.MerchantCategoryCode,
      name: 'Merchant Category Code',
      length: 0,
      value: '',
      mandatory: true,
      description: '"0000" ou MCC ISO18245'
    },
    transactionCurrency: {
      id: EmvTag.TransactionCurrency,
      name: 'Transaction Currency',
      length: 0,
      value: '',
      mandatory: true,
      description: 'ISO4217'
    },
    transactionAmount: {
      id: EmvTag.TransactionAmount,
      name: 'Transaction Amount',
      length: 0,
      value: '',
      mandatory: false,
      description: 'valor da transação. Ex.: "0", "1.00", "123.99"'
    },
    countryCode: {
      id: EmvTag.CountryCode,
      name: 'Country Code',
      length: 0,
      value: '',
      mandatory: true,
      description: 'código de país ISO3166-1 alpha 2'
    },
    merchantName: {
      id: EmvTag.MerchantName,
      name: 'Merchant Name',
      length: 0,
      value: '',
      mandatory: true,
      description: 'nome do beneficiário/recebedor'
    },
    merchantCity: {
      id: EmvTag.MerchantCity,
      name: 'Merchant City',
      length: 0,
      value: '',
      mandatory: true,
      description: 'cidade onde é efetuada a transação'
    },
    postalCode: {
      id: EmvTag.PostalCode,
      name: 'Postal Code',
      length: 0,
      value: '',
      mandatory: false,
      description: 'CEP da localidade onde é efetuada a transação'
    },
    additionalDataField: {
      id: EmvTag.AdditionalDataField,
      name: 'Additional Data Field',
      length: 0,
      value: '',
      mandatory: false,
      description: 'Campos adicionais'
    },
    unreservedTemplates: {
      id: '',
      name: 'Unreserved Templates',
      length: 0,
      value: '',
      mandatory: false,
      description: 'Campos não reservados'
    },
    crc: {
      id: EmvTag.CRC,
      name: 'CRC',
      length: 0,
      value: '',
      mandatory: true,
      description: 'CRC'
    }
  } as PIXCode

  let pos = 6
  let unreservedTemplatesId = ''

  if (value.substring(0, 6) !== '000201') {
    throw new Error('Invalid Payload Format Indicator')
  }

  if (value.substring(pos, pos += 2) === EmvTag.PointOfInitiationMethod) {
    result.pointOfInitiationMethod.length = Number(value.substring(pos, pos += 2))
    result.pointOfInitiationMethod.value = value.substring(pos, pos += result.pointOfInitiationMethod.length)
  } else {
    pos -= 2
  }

  if (value.substring(pos, pos += 2) === EmvTag.MerchantAccountInformation) {
    result.merchantAccountInformation.length = Number(value.substring(pos, pos += 2))
    result.merchantAccountInformation.value = value.substring(pos, pos += result.merchantAccountInformation.length)
  } else {
    pos -= 2
    throw new Error('Merchant Account Information was not found')
  }

  if (value.substring(pos, pos += 2) === EmvTag.MerchantCategoryCode) {
    result.merchantCategoryCode.length = Number(value.substring(pos, pos += 2))
    result.merchantCategoryCode.value = value.substring(pos, pos += result.merchantCategoryCode.length)
  } else {
    pos -= 2
    throw new Error('Merchant Category Code was not found')
  }

  if (value.substring(pos, pos += 2) === EmvTag.TransactionCurrency) {
    result.transactionCurrency.length = Number(value.substring(pos, pos += 2))
    result.transactionCurrency.value = value.substring(pos, pos += result.transactionCurrency.length)
  } else {
    pos -= 2
    throw new Error('Transaction Currency was not found')
  }

  if (value.substring(pos, pos += 2) === EmvTag.TransactionAmount) {
    result.transactionAmount.length = Number(value.substring(pos, pos += 2))
    result.transactionAmount.value = value.substring(pos, pos += result.transactionAmount.length)
  } else {
    pos -= 2
  }

  if (value.substring(pos, pos += 2) === EmvTag.CountryCode) {
    result.countryCode.length = Number(value.substring(pos, pos += 2))
    result.countryCode.value = value.substring(pos, pos += result.countryCode.length)
  } else {
    pos -= 2
    throw new Error('Country Code was not found')
  }

  if (value.substring(pos, pos += 2) === EmvTag.MerchantName) {
    result.merchantName.length = Number(value.substring(pos, pos += 2))
    result.merchantName.value = value.substring(pos, pos += result.merchantName.length)
  } else {
    pos -= 2
    throw new Error('Merchant Name was not found')
  }

  if (value.substring(pos, pos += 2) === EmvTag.MerchantCity) {
    result.merchantCity.length = Number(value.substring(pos, pos += 2))
    result.merchantCity.value = value.substring(pos, pos += result.merchantCity.length)
  } else {
    pos -= 2
    throw new Error('Merchant City was not found')
  }

  if (value.substring(pos, pos += 2) === EmvTag.PostalCode) {
    result.postalCode.length = Number(value.substring(pos, pos += 2))
    result.postalCode.value = value.substring(pos, pos += result.postalCode.length)
  } else {
    pos -= 2
  }

  if (value.substring(pos, pos += 2) === EmvTag.AdditionalDataField) {
    result.additionalDataField.length = Number(value.substring(pos, pos += 2))
    result.additionalDataField.value = value.substring(pos, pos += result.additionalDataField.length)
  } else {
    pos -= 2
  }

  if ((unreservedTemplatesId = value.substring(pos, pos += 2)) !== EmvTag.CRC) {
    result.unreservedTemplates.id = unreservedTemplatesId
    result.unreservedTemplates.length = Number(value.substring(pos, pos += 2))
    result.unreservedTemplates.value = value.substring(pos, pos += result.unreservedTemplates.length)
  } else {
    pos -= 2
  }

  pos += 2

  result.crc.length = Number(value.substring(pos, pos += 2))
  result.crc.value = value.substring(pos, pos += result.crc.length)

  if (result.crc.value === '') {
    throw new Error('CRC was not found')
  }

  const crc = CRC.default('CRC16_CCITT_FALSE')
  if (crc) {
    const buff = value.substr(0, value.length - 4)
    const computed_crc = crc.compute(Buffer.from(buff, 'ascii')).toString(16).toUpperCase()
    if (computed_crc !== result.crc.value) {
      throw new Error('Invalid CRC')
    }
  }
  return result
}

export {
  parse
}
