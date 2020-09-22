import { CRC } from 'crc-full'
import { PIXCode, EmvTag } from './pixcode'

const pad = (n: number) => {
  const s = n.toString()
  return s.length == 1 ? '0' + s : s
}

const generate = (pixcode: PIXCode): string => {

  let result = ''

  result += '000201'

  if (pixcode.pointOfInitiationMethod) {
    const { id, length, value } = pixcode.pointOfInitiationMethod
    if (EmvTag.PointOfInitiationMethod !== id) {
      throw new Error('Point Of Initiation Method tag is wrong')
    }
    result += EmvTag.PointOfInitiationMethod
    result += pad(length)
    if (length !== value.length) {
      throw new Error('Point Of Initiation Method value is not conformed')
    }
    result += value
  }

  if (pixcode.merchantAccountInformation) {
    const { id, length, value } = pixcode.merchantAccountInformation
    if (EmvTag.MerchantAccountInformation !== id) {
      throw new Error('Merchant Account Information tag is wrong')
    }
    result += EmvTag.MerchantAccountInformation
    result += pad(length)
    if (length !== value.length) {
      throw new Error('Merchant Account Information value is not conformed')
    }
    result += value
  } else {
    throw new Error('Merchant Account Information is mandatory')
  }

  if (pixcode.merchantCategoryCode) {
    const { id, length, value } = pixcode.merchantCategoryCode
    if (EmvTag.MerchantCategoryCode !== id) {
      throw new Error('Merchant Category Code tag is wrong')
    }
    result += EmvTag.MerchantCategoryCode
    result += pad(length)
    if (length !== value.length) {
      throw new Error('Merchant Category Code value is not conformed')
    }
    result += value
  } else {
    throw new Error('Merchant Category Code is mandatory')
  }

  if (pixcode.transactionCurrency) {
    const { id, length, value } = pixcode.transactionCurrency
    if (EmvTag.TransactionCurrency !== id) {
      throw new Error('Transaction Currency tag is wrong')
    }
    result += EmvTag.TransactionCurrency
    result += pad(length)
    if (length !== value.length) {
      throw new Error('Transaction Currency value is not conformed')
    }
    result += value
  } else {
    throw new Error('Transaction Currency is mandatory')
  }

  if (pixcode.transactionAmount) {
    const { id, length, value } = pixcode.transactionAmount
    if (EmvTag.TransactionAmount !== id) {
      throw new Error('Transaction Amount tag is wrong')
    }
    result += EmvTag.TransactionAmount
    result += pad(length)
    if (length !== value.length) {
      throw new Error('Transaction Amount value is not conformed')
    }
    result += value
  }

  if (pixcode.countryCode) {
    const { id, length, value } = pixcode.countryCode
    if (EmvTag.CountryCode !== id) {
      throw new Error('Country Code tag is wrong')
    }
    result += EmvTag.CountryCode
    result += pad(length)
    if (length !== value.length) {
      throw new Error('Country Code value is not conformed')
    }
    result += value
  } else {
    throw new Error('Country Code is mandatory')
  }

  if (pixcode.merchantName) {
    const { id, length, value } = pixcode.merchantName
    if (EmvTag.MerchantName !== id) {
      throw new Error('Merchant Name tag is wrong')
    }
    result += EmvTag.MerchantName
    result += pad(length)
    if (length !== value.length) {
      throw new Error('Merchant Name value is not conformed')
    }
    result += value
  } else {
    throw new Error('Merchant Name is mandatory')
  }

  if (pixcode.merchantCity) {
    const { id, length, value } = pixcode.merchantCity
    if (EmvTag.MerchantCity !== id) {
      throw new Error('Merchant City tag is wrong')
    }
    result += EmvTag.MerchantCity
    result += pad(length)
    if (length !== value.length) {
      throw new Error('Merchant City value is not conformed')
    }
    result += value
  } else {
    throw new Error('Merchant City is mandatory')
  }

  if (pixcode.postalCode) {
    const { id, length, value } = pixcode.postalCode
    if (EmvTag.PostalCode !== id) {
      throw new Error('Postal Code tag is wrong')
    }
    result += EmvTag.PostalCode
    result += pad(length)
    if (length !== value.length) {
      throw new Error('Postal Code value is not conformed')
    }
    result += value
  }

  if (pixcode.additionalDataField) {
    const { id, length, value } = pixcode.additionalDataField
    if (EmvTag.AdditionalDataField !== id) {
      throw new Error('Additional Data Field tag is wrong')
    }
    result += EmvTag.AdditionalDataField
    result += pad(length)
    if (length !== value.length) {
      throw new Error('Additional Data Field is not conformed')
    }
    result += value
  }

  if (pixcode.unreservedTemplates) {
    const { id, length, value } = pixcode.unreservedTemplates
    result += id
    result += pad(length)
    if (length !== value.length) {
      throw new Error('Unreserved Templates is not conformed')
    }
    result += value
  }

  result += EmvTag.CRC
  result += '04'
  const crc = CRC.default('CRC16_CCITT_FALSE')
  if (crc) {
    const computed_crc = crc.compute(Buffer.from(result, 'ascii')).toString(16).toUpperCase()
    result += computed_crc
  } else {
    throw new Error('Error to generate CRC')
  }
  return result
}

export {
  generate
}
