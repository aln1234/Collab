# Mobile iOS Internal Build

Use Expo Go for quick UI testing during development. Use the EAS `preview` profile when an iPhone tester needs an installable internal build.

## Initial setup

From the project root:

```bash
cd mobile
npm install
npm install -g eas-cli
eas login
```

This repository already includes `mobile/eas.json`. If that file is ever missing, generate the initial EAS configuration before continuing:

```bash
eas build:configure
```

## Register an iPhone

Run:

```bash
eas device:create
```

Send the generated device-registration link to the iPhone tester. The tester must open the link on the target iPhone and complete registration.

## Build and distribute

After the tester registers the device, run:

```bash
eas build -p ios --profile preview
```

When the build finishes, send the final EAS install link to the tester.

iOS internal distribution requires Apple Developer signing and device registration. If a new device is registered after a build was created, run a new build before that device can install the app.

For an Android APK preview build, run:

```bash
eas build -p android --profile preview
```
