import { useState } from 'react';

// Hook para descifrar datos
export function useDecrypt() {
    const [error, setError] = useState<string | null>(null);

    const key = Uint8Array.from(atob(process.env.REACT_APP_ENCRYPTION_KEY || ''), c => c.charCodeAt(0));

    const decrypt = async (cipherText: string): Promise<string | null> => {
        try {
            const [ivBase64, encryptedBase64] = cipherText.split(':');
            const iv = new Uint8Array(atob(ivBase64).split('').map(c => c.charCodeAt(0)));
            const encryptedData = new Uint8Array(atob(encryptedBase64).split('').map(c => c.charCodeAt(0)));

            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                key,
                { name: 'AES-GCM', length: 256 },
                false,
                ['decrypt']
            );

            const decryptedData = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv },
                cryptoKey,
                encryptedData
            );

            const decoder = new TextDecoder();
            return decoder.decode(decryptedData);
        } catch (err) {
            setError((err as Error).message);
            return null;
        }
    };

    return { decrypt, error };
}
