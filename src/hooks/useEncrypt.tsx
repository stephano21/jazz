import { useState } from 'react';

export function useEncrypt() {
    const [error, setError] = useState<string | null>(null);

    const key = Uint8Array.from(atob(process.env.REACT_APP_ENCRYPTION_KEY || ''), c => c.charCodeAt(0));

    const encrypt = async (plainText: string): Promise<string | null> => {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(plainText);

            const cryptoKey = await crypto.subtle.importKey(
                'raw',
                key,
                { name: 'AES-GCM', length: 256 },
                false,
                ['encrypt']
            );

            const iv = crypto.getRandomValues(new Uint8Array(12));

            const encryptedData = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv },
                cryptoKey,
                data
            );

            const encryptedBase64 = btoa(String.fromCharCode(...new Uint8Array(encryptedData)));
            const ivBase64 = btoa(String.fromCharCode(...iv));

            return `${ivBase64}:${encryptedBase64}`;
        } catch (err) {
            setError((err as Error).message);
            return null;
        }
    };

    return { encrypt, error };
}
