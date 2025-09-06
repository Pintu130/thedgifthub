// Common cookies utility functions

export const COOKIE_KEYS = {
  AUTH_TOKEN: 'authToken',
  REFRESH_TOKEN: 'refreshToken',
  USER_PREFERENCES: 'userPreferences'
} as const

export interface CookieOptions {
  expires?: number | Date // Days from now or specific date
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'strict' | 'lax' | 'none'
  httpOnly?: boolean
}

/**
 * Set cookie with options
 * @param name - Cookie name
 * @param value - Cookie value
 * @param options - Cookie options
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  try {
    if (typeof window === 'undefined') return

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    // Set expiration
    if (options.expires) {
      let expirationDate: Date
      if (typeof options.expires === 'number') {
        expirationDate = new Date()
        expirationDate.setTime(expirationDate.getTime() + (options.expires * 24 * 60 * 60 * 1000))
      } else {
        expirationDate = options.expires
      }
      cookieString += `; expires=${expirationDate.toUTCString()}`
    }

    // Set path
    if (options.path) {
      cookieString += `; path=${options.path}`
    } else {
      cookieString += `; path=/`
    }

    // Set domain
    if (options.domain) {
      cookieString += `; domain=${options.domain}`
    }

    // Set secure flag
    if (options.secure) {
      cookieString += `; secure`
    }

    // Set sameSite
    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`
    }

    // Set httpOnly (Note: This won't work in client-side JS, only server-side)
    if (options.httpOnly) {
      cookieString += `; httponly`
    }

    document.cookie = cookieString
  } catch (error) {
    console.error('Error setting cookie:', error)
  }
}

/**
 * Get cookie value by name
 * @param name - Cookie name
 * @returns Cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  try {
    if (typeof window === 'undefined') return null

    const nameEQ = encodeURIComponent(name) + '='
    const cookies = document.cookie.split(';')

    for (let cookie of cookies) {
      cookie = cookie.trim()
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length))
      }
    }
    return null
  } catch (error) {
    console.error('Error getting cookie:', error)
    return null
  }
}

/**
 * Remove cookie by name
 * @param name - Cookie name
 * @param path - Cookie path (should match the path used when setting)
 * @param domain - Cookie domain (should match the domain used when setting)
 */
export function removeCookie(name: string, path: string = '/', domain?: string): void {
  try {
    if (typeof window === 'undefined') return

    let cookieString = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`
    
    if (domain) {
      cookieString += `; domain=${domain}`
    }

    document.cookie = cookieString
  } catch (error) {
    console.error('Error removing cookie:', error)
  }
}

/**
 * Check if cookies are enabled
 */
export function areCookiesEnabled(): boolean {
  try {
    if (typeof window === 'undefined') return false

    const testCookie = '__cookie_test__'
    setCookie(testCookie, 'test', { expires: 1 })
    const enabled = getCookie(testCookie) === 'test'
    removeCookie(testCookie)
    return enabled
  } catch {
    return false
  }
}

/**
 * Get all cookies as an object
 */
export function getAllCookies(): Record<string, string> {
  try {
    if (typeof window === 'undefined') return {}

    const cookies: Record<string, string> = {}
    const cookieArray = document.cookie.split(';')

    for (let cookie of cookieArray) {
      cookie = cookie.trim()
      const [name, value] = cookie.split('=')
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value)
      }
    }

    return cookies
  } catch (error) {
    console.error('Error getting all cookies:', error)
    return {}
  }
}

// Auth token specific cookie functions
export function setAuthTokenCookie(token: string): void {
  setCookie(COOKIE_KEYS.AUTH_TOKEN, token, {
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
}

export function getAuthTokenCookie(): string | null {
  return getCookie(COOKIE_KEYS.AUTH_TOKEN)
}

export function removeAuthTokenCookie(): void {
  removeCookie(COOKIE_KEYS.AUTH_TOKEN)
}

export function setRefreshTokenCookie(token: string): void {
  setCookie(COOKIE_KEYS.REFRESH_TOKEN, token, {
    expires: 30, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
}

export function getRefreshTokenCookie(): string | null {
  return getCookie(COOKIE_KEYS.REFRESH_TOKEN)
}

export function removeRefreshTokenCookie(): void {
  removeCookie(COOKIE_KEYS.REFRESH_TOKEN)
}
