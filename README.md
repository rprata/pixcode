# Pixcode

![Support Node of LTS](https://img.shields.io/badge/node-LTS-brightgreen.svg?style=plastic) ![npm version](https://img.shields.io/badge/npm-6.14.4-brightgreen.svg?style=plastic) ![npm version](https://img.shields.io/badge/yarn-1.22.4-brightgreen.svg?style=plastic) ![dependencies typescript](https://img.shields.io/badge/dependencies-typescript-blue.svg?style=plastic) ![License mit](https://img.shields.io/badge/license-MIT-blue.svg?style=plastic)

# Description
Pixcode module is used to handler PIX qrcode based on [BCB specification](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Regulamento_Pix/II_ManualdePadroesparaIniciacaodoPix-versao1.pdf). It's completely written in typescript for node js.


# How to use

## Importing in your project:

```bash
npm install pixcode
```

## Using in your code:
```ts
import { parse } from 'pixcode'
...
const qrcode = '00020101021226720014br.gov.bcb.pix2550bx.com.br/pix/8b3da2f3-9a41-40d1-a91a-bd93113bd4415204000053039865406123.455802BR5913Fulano de Tal6008BRASILIA62190515RP12345678-2019630445C8'
const result = parse(qrcode)
console.log(result)
```

## Result
Result is a PIXCode structure.

```json
{
   "payloadFormatIndicator":{
      "id":"00",
      "name":"Payload Format Indicator",
      "length":2,
      "value":"01",
      "mandatory":true,
      "description":"versão do payloadQRCPS-MPM, fixo em \"01\""
   },
   "pointOfInitiationMethod":{
      "id":"01",
      "name":"Point of Initiation Method",
      "length":2,
      "value":"12",
      "mandatory":false,
      "description":"\"11\" (QR reutilizável) ou \"12\" (QR utilizável apenas uma vez)"
   },
   "merchantAccountInformation":{
      "id":"26",
      "name":"Merchant Account Information",
      "length":72,
      "value":"0014br.gov.bcb.pix2550bx.com.br/pix/8b3da2f3-9a41-40d1-a91a-bd93113bd441",
      "mandatory":true,
      "description":"indica arranjo específico / \"00\" (GUI) obrigatório / \"01..99\" conform BCB"
   },
   "merchantCategoryCode":{
      "id":"52",
      "name":"Merchant Category Code",
      "length":4,
      "value":"0000",
      "mandatory":true,
      "description":"\"0000\" ou MCC ISO18245"
   },
   "transactionCurrency":{
      "id":"53",
      "name":"Transaction Currency",
      "length":3,
      "value":"986",
      "mandatory":true,
      "description":"ISO4217"
   },
   "transactionAmount":{
      "id":"54",
      "name":"Transaction Amount",
      "length":6,
      "value":"123.45",
      "mandatory":false,
      "description":"valor da transação. Ex.: \"0\", \"1.00\", \"123.99\""
   },
   "countryCode":{
      "id":"58",
      "name":"Country Code",
      "length":2,
      "value":"BR",
      "mandatory":true,
      "description":"código de país ISO3166-1 alpha 2"
   },
   "merchantName":{
      "id":"59",
      "name":"Merchant Name",
      "length":13,
      "value":"Fulano de Tal",
      "mandatory":true,
      "description":"nome do beneficiário/recebedor"
   },
   "merchantCity":{
      "id":"60",
      "name":"Merchant City",
      "length":8,
      "value":"BRASILIA",
      "mandatory":true,
      "description":"cidade onde é efetuada a transação"
   },
   "postalCode":{
      "id":"61",
      "name":"Postal Code",
      "length":0,
      "value":"",
      "mandatory":false,
      "description":"CEP da localidade onde é efetuada a transação"
   },
   "additionalDataField":{
      "id":"62",
      "name":"Additional Data Field",
      "length":19,
      "value":"0515RP12345678-2019",
      "mandatory":false,
      "description":"Campos adicionais"
   },
   "unreservedTemplates":{
      "id":"",
      "name":"Unreserved Templates",
      "length":0,
      "value":"",
      "mandatory":false,
      "description":"Campos não reservados"
   },
   "crc":{
      "id":"63",
      "name":"CRC",
      "length":4,
      "value":"45C8",
      "mandatory":true,
      "description":"CRC"
   }
}
```

## Types and Interfaces:

```ts

interface TLV {
    id: string;
    name: string;
    length: number;
    value: string;
    mandatory: boolean;
    description: string;
}

interface PIXCode {
    payloadFormatIndicator: TLV;
    pointOfInitiationMethod: TLV;
    merchantAccountInformation: TLV;
    merchantCategoryCode: TLV;
    transactionCurrency: TLV;
    transactionAmount: TLV;
    countryCode: TLV;
    merchantName: TLV;
    merchantCity: TLV;
    postalCode: TLV;
    additionalDataField: TLV;
    unreservedTemplates: TLV;
    crc: TLV;
}

```
