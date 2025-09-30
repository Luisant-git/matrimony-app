const crypto = require('crypto')

// Key and IV for encryption
const ENCRYPTION_KEY = crypto.randomBytes(32).toString('hex').slice(0, 32) // 32 bytes key
const IV_LENGTH = 16 // AES block size

/**
 * Encrypts a given token using AES-256-CBC encryption.
 * @param {string} token - The token to encrypt.
 * @returns {string} - The encrypted token.
 */
function encryptToken(token) {
  const iv = crypto.randomBytes(IV_LENGTH)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let encrypted = cipher.update(token)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

/**
 * Decrypts a given encrypted token.
 * @param {string} encryptedToken - The encrypted token.
 * @returns {string} - The decrypted token.
 */
function decryptToken(encryptedToken) {
  const [iv, encrypted] = encryptedToken.split(':')
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    Buffer.from(iv, 'hex')
  )
  let decrypted = decipher.update(Buffer.from(encrypted, 'hex'))
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

module.exports = { encryptToken, decryptToken }
