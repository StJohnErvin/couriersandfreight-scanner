import create from 'zustand'
import EncryptedStorage from "react-native-encrypted-storage"

type TokenSet = {
  access_token: string | undefined
  refresh_token: string | undefined
  expires_at: number | null
}

type AuthStore = {
  user: any
  code: string | null
  tokens: TokenSet | null

  setTokens: (userId: string, tokens: TokenSet) => void
  setCode: (userId: string, code: string) => void
  loadUser: (userId: string, code: string) => Promise<AuthStore>
}

export class ErrorUserNotFound extends Error {
  constructor() {
    super()
    this.name = "UserNotFound"
    this.message = "No user with that user id has signed in"
  }
}

export class ErrorIncorrectUserCode extends Error {
  constructor() {
    super()
    this.name = "IncorrectUserCode"
    this.message = "The code you entered was incorrect"
  }
}

const useAuthStore = create<AuthStore>((set, getState) => ({
  user: null,
  code: null,
  tokens: null,

  loadUser: async (userId: string, codeInput: string) => {
    console.log(userId, codeInput)
    let serializedTokens = await EncryptedStorage.getItem(userId)
    if (!serializedTokens) {
      throw new ErrorUserNotFound()
    }

    const { code, ...tokens } = JSON.parse(serializedTokens)
    if (code !== codeInput) {
      throw new ErrorIncorrectUserCode()
    }

    set(state => ({ ...state, code, tokens }))
    return getState()
  },

  setTokens: async (userId: string, newTokens: TokenSet) => {
    let serializedTokens = await EncryptedStorage.getItem(userId)
    if (!serializedTokens) {
      // throw new ErrorUserNotFound()
      set(state => ({ ...state, tokens:newTokens}))
      await EncryptedStorage.setItem(userId, JSON.stringify(newTokens))
      return
    }

    let { code, tokens: oldTokes } = JSON.parse(serializedTokens)
    let tokens = {
      code,
      ...oldTokes,
      ...newTokens
    }
    set(state => ({ ...state, tokens }))
    console.log(`tokens`, JSON.stringify(tokens))
    await EncryptedStorage.setItem(userId, JSON.stringify(tokens))
  },

  setCode: async (userId: string, code: string) => {
    set(state => ({ ...state, code }))
    // get the tokens from the store
    console.log(`setCode`, userId, code)
    let serializedTokens = await EncryptedStorage.getItem(userId) || "{}"
    console.log('serializedTokens', serializedTokens)
    let tokens = JSON.parse(serializedTokens)
    await EncryptedStorage.setItem(userId, JSON.stringify({
      code,
      ...tokens
    }))
  }
}))

export default useAuthStore