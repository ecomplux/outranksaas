import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // For AES, this is always 16
const AUTH_TAG_LENGTH = 16; // For GCM

const encryptionKeyString = process.env.ENCRYPTION_KEY;

if (!encryptionKeyString || encryptionKeyString.length !== 64) { // 32 bytes = 64 hex characters
  throw new Error('ENCRYPTION_KEY is not defined or not a valid 32-byte hex string in environment variables.');
}

const key = Buffer.from(encryptionKeyString, 'hex');

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  // Prepend IV and authTag to the encrypted text, all hex encoded
  return iv.toString('hex') + authTag.toString('hex') + encrypted;
}

export function decrypt(encryptedText: string): string {
  try {
    const ivHex = encryptedText.substring(0, IV_LENGTH * 2); // IV is 16 bytes, so 32 hex chars
    const authTagHex = encryptedText.substring(IV_LENGTH * 2, (IV_LENGTH + AUTH_TAG_LENGTH) * 2);
    const ciphertextHex = encryptedText.substring((IV_LENGTH + AUTH_TAG_LENGTH) * 2);

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(ciphertextHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error);
    // It's important to handle decryption errors carefully.
    // Throwing an error or returning a specific value might be appropriate.
    // For now, re-throwing to indicate failure.
    throw new Error("Decryption failed. The encrypted data may be tampered or the key is incorrect.");
  }
}