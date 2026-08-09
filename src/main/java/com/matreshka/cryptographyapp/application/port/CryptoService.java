package com.matreshka.cryptographyapp.application.port;

import org.springframework.stereotype.Service;

import javax.crypto.*;
import javax.crypto.spec.GCMParameterSpec;
import java.nio.charset.StandardCharsets;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class CryptoService implements ICryptoService{

    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int TAG_LENGTH_BIT = 128;
    private static final int IV_LENGTH_BYTE = 12;

    public static String encrypt(String plainText, SecretKey secretKey) throws NoSuchPaddingException,
            NoSuchAlgorithmException, IllegalBlockSizeException, BadPaddingException, InvalidAlgorithmParameterException,
            InvalidKeyException {
        Cipher cipher = Cipher.getInstance(ALGORITHM);

        byte[] iv = new byte[IV_LENGTH_BYTE];
        new SecureRandom().nextBytes(iv);

        GCMParameterSpec parameterSpec = new GCMParameterSpec(TAG_LENGTH_BIT, iv);
        cipher.init(Cipher.ENCRYPT_MODE, secretKey, parameterSpec);
        byte[] cipherText = cipher.doFinal(plainText.getBytes());

        byte[] combined = new byte[iv.length + cipherText.length];
        System.arraycopy(iv, 0, combined, 0, iv.length);
        System.arraycopy(cipherText, 0, combined, iv.length, cipherText.length);

        return Base64.getEncoder().encodeToString(combined);
    }

    public static String decrypt(String encryptStr, SecretKey secretKey) throws Exception{
        byte[] decoded = Base64.getDecoder().decode(encryptStr);
        byte[] iv = new byte[IV_LENGTH_BYTE];
        System.arraycopy(decoded, 0, iv, 0, IV_LENGTH_BYTE);
        int cipherTextSize = decoded.length - IV_LENGTH_BYTE;
        byte[] cipherText = new byte[cipherTextSize];
        System.arraycopy(decoded, IV_LENGTH_BYTE, cipherText, 0, cipherTextSize);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        GCMParameterSpec parameterSpec = new GCMParameterSpec(TAG_LENGTH_BIT, iv);
        cipher.init(Cipher.DECRYPT_MODE, secretKey, parameterSpec);

        byte[] plainText = cipher.doFinal(cipherText);
        return new String(plainText, StandardCharsets.UTF_8);
    }

}
