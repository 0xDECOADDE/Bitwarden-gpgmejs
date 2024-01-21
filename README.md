# Bitwarden browser extension with gpgmejs support

This repository is a fork from Bitwarden-clients and gpgmejs.
- [bitwarden/clients](https://github.com/bitwarden/clients);
- [mailvelope/gpgmejs](https://github.com/mailvelope/gpgmejs);

## Project Status

This personal project is just a proof of concept, the author has little knowledge of node/angular and likely did not follow related best-practices. Technical knowledge of opengpg, gpgmejs and yubikey is advised.

## Motivations: password manager for paranoid nerds

Password-managers keep all our credentials safe and yet accesible on any device. But we do not use all our passwords everywhere, do we? Maybe only 10% of all our passwords are used regularly, yet each time we unlock the vault, all the passwords are made available (decrypted).

With Bitwarden-gpgmejs, each password is encrypted individually and only decrypted when needed. That way, the passwords you rarely use (or only use on trusted devices), are kept safe.

Bitwarden-gpgmejs relies on openpgp smartcards. It is recommended to store your private key in an hardware component which requires a physical action upon decryption (like a Yubikey configured with a proper touch policy):
```
ykman openpgp keys set-touch aut fixed
```
[Configure YubiKey Touch Policy](https://docs.yubico.com/software/yubikey/tools/ykman/OpenPGP_Commands.html#ykman-openpgp-keys-set-touch-options-key-policy).

## How to create a protected password?

- Encrypt the actual password with your default gpg public key (without signing);
- Remove header and footer "-----BEING PGP MESSAGE-----";
- Store the base64 encoded data in a custom-field named "gpg";
- Set the password field to "gpg";

![Screenshot of a protected password.](/README_screenshot_01.png)

## How to use Bitwarden-gpgmejs?

- (if you are not familiar with smartcards, Bitwarden-gpgmejs may not be suitable for you);
- Make sure gpg and gpgme are installed;
- Make sure Bitwarden-gpgmejs extension GUID is allowed in gpgmejs [mailvelope/gpgmejs README](https://github.com/mailvelope/gpgmejs);
- BitWarden-gpgmejs GUID: {5e8813f5-4372-4389-a00f-d21012efa24f}
- Enable optional permission for native messaging;
- Unlock your Bitwarden vault (web-browser extension);
- Either copy-to-clipboard or autofill a protected-password;
- Push the button of your Yubikey;

![Screenshot of a optional permissions.](/README_screenshot_02.png)