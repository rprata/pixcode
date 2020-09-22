import { generate } from '../lib'
import { PIXCode, EmvTag } from '../lib/pixcode'

describe('PIX Code - Generator', () => {
  it('should generate complete qrcode from a valid object', () => {

    const qrcode = '00020101021226720014br.gov.bcb.pix2550bx.com.br/pix/8b3da2f3-9a41-40d1-a91a-bd93113bd441520400005303986540599.995802BR5914Ciclano de Tal6014RIO DE JANEIRO62190515RP12345678-201963047A12'
    const pixcode = {
      payloadFormatIndicator: {
        id: EmvTag.PayloadFormatIndicator,
        length: 2,
        value: '01'
      },
      pointOfInitiationMethod: {
        id: EmvTag.PointOfInitiationMethod,
        length: 2,
        value: '12'
      },
      merchantAccountInformation: {
        id: EmvTag.MerchantAccountInformation,
        length: 72,
        value: '0014br.gov.bcb.pix2550bx.com.br/pix/8b3da2f3-9a41-40d1-a91a-bd93113bd441'
      },
      merchantCategoryCode: {
        id: EmvTag.MerchantCategoryCode,
        length: 4,
        value: '0000'
      },
      transactionCurrency: {
        id: EmvTag.TransactionCurrency,
        length: 3,
        value: '986'
      },
      transactionAmount: {
        id: EmvTag.TransactionAmount,
        length: 5,
        value: '99.99'
      },
      countryCode: {
        id: EmvTag.CountryCode,
        name: 'Country Code',
        length: 2,
        value: 'BR'
      },
      merchantName: {
        id: EmvTag.MerchantName,
        length: 14,
        value: 'Ciclano de Tal'
      },
      merchantCity: {
        id: EmvTag.MerchantCity,
        name: 'Merchant City',
        length: 14,
        value: 'RIO DE JANEIRO'
      },
      additionalDataField: {
        id: EmvTag.AdditionalDataField,
        name: 'Additional Data Field',
        length: 19,
        value: '0515RP12345678-2019'
      }
    }
    const result = generate(pixcode as PIXCode)
    expect(result).toBe(qrcode)
  })

  it('should throw to an exception', () => {
    const pixcode = {
      payloadFormatIndicator: {
        id: EmvTag.PayloadFormatIndicator,
        length: 2,
        value: '01'
      },
      pointOfInitiationMethod: {
        id: EmvTag.PointOfInitiationMethod,
        length: 2,
        value: '12'
      },
      merchantAccountInformation: {
        id: EmvTag.MerchantAccountInformation,
        length: 72,
        value: '0014br.gov.bcb.pix2550bx.com.br/pix/8b3da2f3-9a41-40d1-a91a-bd93113bd441'
      },
      merchantCategoryCode: {
        id: EmvTag.MerchantCategoryCode,
        length: 4,
        value: '0000'
      },
      transactionCurrency: {
        id: EmvTag.TransactionCurrency,
        length: 3,
        value: '986'
      },
      transactionAmount: {
        id: EmvTag.TransactionAmount,
        length: 6,
        value: '99.99'
      },
      countryCode: {
        id: EmvTag.CountryCode,
        name: 'Country Code',
        length: 2,
        value: 'BR'
      },
      merchantName: {
        id: EmvTag.MerchantName,
        length: 14,
        value: 'Ciclano de'
      },
      merchantCity: {
        id: EmvTag.MerchantCity,
        name: 'Merchant City',
        length: 14,
        value: 'RIO'
      },
      additionalDataField: {
        id: EmvTag.AdditionalDataField,
        name: 'Additional Data Field',
        length: 19,
        value: '0515RP12345678-2019'
      }
    }
    expect(() => generate(pixcode as PIXCode)).toThrow()
  })
})
