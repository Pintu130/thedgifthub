// Common localStorage utility functions

export const STORAGE_KEYS = {
  USER: 'user',
  CART: 'cart',
  WISHLIST: 'wishlist',
  PENDING_CART_ITEM: 'pendingCartItem'
} as const

/**
 * Set item in localStorage
 * @param key - Storage key
 * @param value - Value to store (will be JSON stringified)
 */
export function setLocalStorage<T>(key: string, value: T): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value))
    }
  } catch (error) {
    console.error('Error setting localStorage:', error)
  }
}

/**
 * Get item from localStorage
 * @param key - Storage key
 * @returns Parsed value or null if not found
 */
export function getLocalStorage<T>(key: string): T | null {
  try {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    }
    return null
  } catch (error) {
    console.error('Error getting localStorage:', error)
    return null
  }
}

/**
 * Remove item from localStorage
 * @param key - Storage key
 */
export function removeLocalStorage(key: string): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  } catch (error) {
    console.error('Error removing localStorage:', error)
  }
}

/**
 * Clear all localStorage
 */
export function clearLocalStorage(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }
  } catch (error) {
    console.error('Error clearing localStorage:', error)
  }
}

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined') return false
    
    const test = '__localStorage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

// User specific localStorage functions
export function setUserData(userData: any): void {
  setLocalStorage(STORAGE_KEYS.USER, userData)
}

export function getUserData(): any | null {
  return getLocalStorage(STORAGE_KEYS.USER)
}

export function removeUserData(): void {
  removeLocalStorage(STORAGE_KEYS.USER)
}

// Pending cart item functions
export function setPendingCartItem(item: any): void {
  setLocalStorage(STORAGE_KEYS.PENDING_CART_ITEM, item)
}

export function getPendingCartItem(): any | null {
  return getLocalStorage(STORAGE_KEYS.PENDING_CART_ITEM)
}

export function removePendingCartItem(): void {
  removeLocalStorage(STORAGE_KEYS.PENDING_CART_ITEM)
}

