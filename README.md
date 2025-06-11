# Encryption Example
[![Encryption-Decryption Status](https://github.com/Marc-Cilliers/encryption_example/actions/workflows/encryption.yml/badge.svg)](https://github.com/Marc-Cilliers/encryption_example/actions/workflows/encryption.yml)


## 1. Setup

### Install Dependencies
```bash
yarn install
```

### Create keys
```bash
openssl genpkey -algorithm RSA -out privateKey.pem -pkeyopt rsa_keygen_bits:2048
```

```bash
openssl rsa -pubout -in privateKey.pem -out publicKey.pem
```

## 2. Encrypt
```bash
yarn encrypt
```

This will encrypt whatever is in `payload.json` and write the result to `encrypted.json`

## 2. Decrypt
```bash
yarn decrypt
```

This will decrypt whatever is in `encrypted.json` and write the result to `decrypted.json`

