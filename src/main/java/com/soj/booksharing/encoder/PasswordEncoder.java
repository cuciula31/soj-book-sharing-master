package com.soj.booksharing.encoder;

import org.bouncycastle.crypto.generators.Argon2BytesGenerator;
import org.bouncycastle.crypto.params.Argon2Parameters;
import org.bouncycastle.crypto.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.keygen.BytesKeyGenerator;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncoder  {

    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;
    public PasswordEncoder(){
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public org.springframework.security.crypto.password.PasswordEncoder getPasswordEncoder() {
        return passwordEncoder;
    }
}
