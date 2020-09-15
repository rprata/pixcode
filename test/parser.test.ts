import { parse } from '../lib'

describe('PIX Code - Parser', () => {
  it('should parse complete qrcode and returns a valid object', () => {
    const qrcode = '00020101021226720014br.gov.bcb.pix2550bx.com.br/pix/8b3da2f3-9a41-40d1-a91a-bd93113bd4415204000053039865406123.455802BR5913Fulano de Tal6008BRASILIA62190515RP12345678-2019630445C8'
    const result = parse(qrcode)

    expect(result.payloadFormatIndicator.id).toBe('00')
    expect(result.payloadFormatIndicator.length).toBe(2)
    expect(result.payloadFormatIndicator.value).toBe('01')

    expect(result.pointOfInitiationMethod.id).toBe('01')
    expect(result.pointOfInitiationMethod.length).toBe(2)
    expect(result.pointOfInitiationMethod.value).toBe('12')

    expect(result.merchantAccountInformation.id).toBe('26')
    expect(result.merchantAccountInformation.length).toBe(72)
    expect(result.merchantAccountInformation.value).toBe('0014br.gov.bcb.pix2550bx.com.br/pix/8b3da2f3-9a41-40d1-a91a-bd93113bd441')

    expect(result.merchantCategoryCode.id).toBe('52')
    expect(result.merchantCategoryCode.length).toBe(4)
    expect(result.merchantCategoryCode.value).toBe('0000')

    expect(result.transactionCurrency.id).toBe('53')
    expect(result.transactionCurrency.length).toBe(3)
    expect(result.transactionCurrency.value).toBe('986')

    expect(result.transactionAmount.id).toBe('54')
    expect(result.transactionAmount.length).toBe(6)
    expect(result.transactionAmount.value).toBe('123.45')

    expect(result.countryCode.id).toBe('58')
    expect(result.countryCode.length).toBe(2)
    expect(result.countryCode.value).toBe('BR')

    expect(result.merchantName.id).toBe('59')
    expect(result.merchantName.length).toBe(13)
    expect(result.merchantName.value).toBe('Fulano de Tal')

    expect(result.merchantCity.id).toBe('60')
    expect(result.merchantCity.length).toBe(8)
    expect(result.merchantCity.value).toBe('BRASILIA')

    expect(result.additionalDataField.id).toBe('62')
    expect(result.additionalDataField.length).toBe(19)
    expect(result.additionalDataField.value).toBe('0515RP12345678-2019')

    expect(result.crc.id).toBe('63')
    expect(result.crc.length).toBe(4)
    expect(result.crc.value).toBe('45C8')
  })

  it('should throw to an exception - Invalid Payload Format Indicator', () => {
    const qrcode = '01021126440014br.gov.bcb.pix0122fulano2019@example.com5204000053039865802BR5913FULANO DE TAL6008BRASILIA6304DFE3'
    expect(() => parse(qrcode)).toThrowError('Invalid Payload Format Indicator')
  })

  it('should throw to an exception - Merchant Account was not found', () => {
    const qrcode = '0002010102115204000053039865802BR5913FULANO DE TAL6008BRASILIA6304DFE3'
    expect(() => parse(qrcode)).toThrowError('Merchant Account was not found')
  })

  it('should throw to an exception - Merchant Account was not found', () => {
    const qrcode = '00020101021126440014br.gov.bcb.pix0122fulano2019@example.com53039865802BR5913FULANO DE TAL6008BRASILIA6304DFE3'
    expect(() => parse(qrcode)).toThrowError('Merchant Category Code was not found')
  })

  it('should throw to an exception - Transaction Currency was not found', () => {
    const qrcode = '00020101021126440014br.gov.bcb.pix0122fulano2019@example.com520400005802BR5913FULANO DE TAL6008BRASILIA6304DFE3'
    expect(() => parse(qrcode)).toThrowError('Transaction Currency was not found')
  })

  it('should throw to an exception - Country Code was not found', () => {
    const qrcode = '00020101021126440014br.gov.bcb.pix0122fulano2019@example.com520400005303986'
    expect(() => parse(qrcode)).toThrowError('Country Code was not found')
  })

  it('should throw to an exception - Merchant Name was not found', () => {
    const qrcode = '00020101021126440014br.gov.bcb.pix0122fulano2019@example.com5204000053039865802BR'
    expect(() => parse(qrcode)).toThrowError('Merchant Name was not found')
  })

  it('should throw to an exception - Merchant Name was not found', () => {
    const qrcode = '00020101021126440014br.gov.bcb.pix0122fulano2019@example.com5204000053039865802BR'
    expect(() => parse(qrcode)).toThrowError('Merchant Name was not found')
  })

  it('should throw to an exception - Merchant City was not found', () => {
    const qrcode = '00020101021126440014br.gov.bcb.pix0122fulano2019@example.com5204000053039865802BR5913FULANO DE TAL'
    expect(() => parse(qrcode)).toThrowError('Merchant City was not found')
  })

  it('should throw to an exception - CRC was not found', () => {
    const qrcode = '00020101021226720014br.gov.bcb.pix2550bx.com.br/pix/8b3da2f3-9a41-40d1-a91a-bd93113bd4415204000053039865406123.455802BR5913Fulano de Tal6008BRASILIA62190515RP12345678-2019'
    expect(() => parse(qrcode)).toThrowError('CRC was not found')
  })

  it('should throw to an exception - Invalid CRC', () => {
    const qrcode = '00020101021226720014br.gov.bcb.pix2550bx.com.br/pix/8b3da2f3-9a41-40d1-a91a-bd93113bd4415204000053039865406123.455802BR5913Fulano de Tal6008BRASILIA62190515RP12345678-20196304FFAA'
    expect(() => parse(qrcode)).toThrowError('Invalid CRC')
  })
})


