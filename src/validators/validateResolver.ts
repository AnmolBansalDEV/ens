/* eslint-disable @typescript-eslint/naming-convention */
import validateContract, { CONTRACT_INTERFACES, ContractInterface } from './validateContract'

export const KnownResolveAddresses: {
  [key: string]: {
    supportedInterfaces: ContractInterface[]
  }
} = {
  '0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41': {
    supportedInterfaces: [
      'IAddrResolver',
      'IAddressResolver',
      'INameResolver',
      'IABIResolver',
      'IPubkeyResolver',
      'ITextResolver',
      'IContentHashResolver',
      'IDNSRecordResolver',
      'IInterfaceResolver',
    ],
  },
  '0x3A8b6F310d5D9eB510d7e648Fd4E56Eb16d7fB24': {
    supportedInterfaces: [
      'IAddrResolver',
      'IAddressResolver',
      'INameResolver',
      'IABIResolver',
      'IPubkeyResolver',
      'ITextResolver',
      'IContentHashResolver',
      'IDNSRecordResolver',
      'IInterfaceResolver',
    ],
  },
  '0x226159d592e2b063810a10ebf6dcbada94ed68b8': {
    supportedInterfaces: [
      'IAddrResolver',
      'IAddressResolver',
      'INameResolver',
      'IABIResolver',
      'IPubkeyResolver',
      'ITextResolver',
      'IContentHashResolver',
      'IInterfaceResolver',
    ],
  },
  '0x1da022710df5002339274aadee8d58218e9d6ab5': {
    supportedInterfaces: [
      'IAddressResolver',
      'INameResolver',
      'IABIResolver',
      'IPubkeyResolver',
      'IInterfaceResolver',
    ],
  },
}

type ValidateContract = typeof validateContract
type Option =
  | {
      networkId?: number
    }
  | undefined
type NewParameters = [...Parameters<ValidateContract>, Option]
type ValidateResolver = (...args: NewParameters) => ReturnType<ValidateContract>

const validateResolver: ValidateResolver = async (
  interfaces,
  address,
  provider,
  options = { networkId: 1 },
) => {
  if (KnownResolveAddresses[address] && options.networkId === 1) {
    const { supportedInterfaces } = KnownResolveAddresses[address]
    return interfaces
      .map((interfaceName) => {
        if (supportedInterfaces.includes(interfaceName)) return undefined
        if (CONTRACT_INTERFACES[interfaceName]) return CONTRACT_INTERFACES[interfaceName].error
        return 'Unknown interface'
      })
      .filter((x) => x)
  }
  return validateContract(interfaces, address, provider)
}

export default validateResolver
