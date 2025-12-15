# iOS Real Device Setup - Troubleshooting Guide

## WebDriverAgent Code Signing Issues

### Step 1: Verify Your Team ID

Run this command on your Mac to see all your available Team IDs:

```bash
security find-identity -v -p codesigning
```

Look for entries like:
```
1) ABC123XYZ "Apple Development: Your Name (Team ID)"
```

Your Team ID should be a 10-character alphanumeric string (e.g., A6RBXW88QR).

### Step 2: Find WebDriverAgent Project Location

WebDriverAgent is installed with the xcuitest driver. Find it with:

```bash
# List Appium drivers
appium driver list

# Find WebDriverAgent location (usually in one of these paths)
ls -la ~/.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent/
# OR
ls -la /usr/local/lib/node_modules/appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent/
```

### Step 3: Configure WebDriverAgent in Xcode

1. **Open the WebDriverAgent project in Xcode**:
```bash
cd ~/.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent/
open WebDriverAgent.xcodeproj
```

2. **In Xcode, select the WebDriverAgentRunner target**:
   - Click on "WebDriverAgent" project in the left panel
   - Select "WebDriverAgentRunner" under TARGETS
   - Go to "Signing & Capabilities" tab

3. **Configure Team and Bundle ID**:
   - Uncheck "Automatically manage signing" (temporarily)
   - Select your Team from the dropdown (should match your Team ID)
   - Update Bundle Identifier to match what's in your config: `com.facebook.WebDriverAgentRunner`
   - Or use a unique one: `com.yourteamid.WebDriverAgentRunner`
   - Re-check "Automatically manage signing"

4. **Repeat for WebDriverAgentLib target** (if it shows signing errors)

### Step 4: Alternative Configuration Approaches

#### Option A: Let Appium Handle Signing Automatically
Remove explicit signing capabilities and let Appium auto-detect:

```javascript
// In wdio.ios.conf.js, try removing these lines:
// 'appium:xcodeOrgId': 'A6RBXW88QR',
// 'appium:xcodeSigningId': 'iPhone Developer',
// 'appium:updatedWDABundleId': 'com.facebook.WebDriverAgentRunner',
```

#### Option B: Use Derived Data WebDriverAgent
After building once in Xcode, use the prebuilt version:

```javascript
'appium:usePrebuiltWDA': true,
'appium:derivedDataPath': '/path/to/DerivedData'
```

#### Option C: Use Simple Automatic Signing
```javascript
'appium:xcodeOrgId': 'YOUR_TEAM_ID',  // 10-character team ID
'appium:xcodeSigningId': 'iPhone Developer',
'appium:updatedWDABundleId': 'com.YOUR_TEAM_ID.WebDriverAgentRunner',
```

### Step 5: Verify Device Provisioning

Check if your device trusts your development certificate:

1. On your iPhone: **Settings > General > VPN & Device Management**
2. Look for your developer certificate
3. If present, tap it and verify it's trusted
4. If not present, you may need to build and install WebDriverAgent manually first

### Step 6: Manual WebDriverAgent Build (if needed)

If automatic signing keeps failing, try building manually:

```bash
cd ~/.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent/

# Build and install on device
xcodebuild -project WebDriverAgent.xcodeproj \
  -scheme WebDriverAgentRunner \
  -destination 'id=00008101-001119603638001E' \
  test

# If successful, you'll see WebDriverAgentRunner installed on your device
```

### Common Error Messages and Fixes

**Error: "No profiles for 'com.facebook.WebDriverAgentRunner' were found"**
- Fix: Change the bundle ID in Xcode to use your team ID prefix

**Error: "Signing for 'WebDriverAgentRunner' requires a development team"**
- Fix: Select your team in Xcode project settings

**Error: "The executable was signed with invalid entitlements"**
- Fix: Rebuild WebDriverAgent with correct provisioning profile

**Error: "Failed to establish communication with the test runner"**
- Fix: Check device trust settings and rebuild

### Debugging Commands

```bash
# Check if device is properly connected
idevice_id -l

# Check device info
ideviceinfo -u 00008101-001119603638001E

# List installed apps on device
ideviceinstaller -u 00008101-001119603638001E -l

# View device syslog in real-time
idevicesyslog -u 00008101-001119603638001E
```

### Quick Fix: Simplified Config

Try this minimal configuration in `wdio.ios.conf.js`:

```javascript
config.capabilities = [
    {
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': 'iPhone',
        'appium:platformVersion': '18.5',
        'appium:bundleId': 'com.3shape.dentalhealth.beta',
        'appium:udid': '00008101-001119603638001E',
        'appium:noReset': true,
        'appium:showXcodeLog': true
        // Let Appium auto-detect signing settings
    }
];
```

## References

- [Appium XCUITest Real Device Setup](https://appium.github.io/appium-xcuitest-driver/latest/preparation/real-device-config/)
- [Apple Code Signing Guide](https://developer.apple.com/support/code-signing/)
