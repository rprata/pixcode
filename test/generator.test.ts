import { generate } from '../lib'
import { PIXCode, EmvTag, QRCode } from '../lib/pixcode'

describe('PIX Code - Generator', () => {
  it('should generate complete qrcode from a valid object', async () => {

    const qrcode: QRCode = {
      payload: () => '00020101021226720014br.gov.bcb.pix2550bx.com.br/pix/8b3da2f3-9a41-40d1-a91a-bd93113bd441520400005303986540599.995802BR5914Ciclano de Tal6014RIO DE JANEIRO62190515RP12345678-201963047A12',
      base64: () => 'data:image/png;base64,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'
    }

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

    const result = await generate(pixcode as PIXCode)
    expect(result.payload()).toBe(qrcode.payload())
    expect(result.base64()).toBe(qrcode.base64())

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
    expect(() => generate(pixcode as PIXCode)).rejects.toThrow()
  })
})
