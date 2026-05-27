# Facebook Login Setup Guide

## Overview

This application uses **official Facebook SDK** for secure authentication. This is the recommended and approved way to implement Facebook login.

## Step-by-Step Setup

### 1. Create a Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Click **Create App** or **My Apps** → **Create App**
3. Choose **Consumer** as the app type
4. Fill in the app details:
   - App Name: Your app name
   - App Contact Email: Your email
   - App Purpose: Select appropriate category

### 2. Get Your App ID

1. After creating the app, go to **Settings** → **Basic**
2. Copy your **App ID**
3. Open `facebook-login.html` and replace:
   ```html
   appId=YOUR_FACEBOOK_APP_ID
   ```
   with your actual App ID

### 3. Configure App Domains

1. In Facebook App Dashboard, go to **Settings** → **Basic**
2. Add your **App Domains**:
   - For local development: `localhost`
   - For production: `yourdomain.com`

### 4. Configure Valid OAuth Redirect URIs

1. Go to **Settings** → **Basic** → **Facebook Login** → **Settings**
2. Add Valid OAuth Redirect URIs:
   - For local: `http://localhost:8000/facebook-login.html`
   - For production: `https://yourdomain.com/facebook-login.html`

### 5. Add Facebook Login Product

1. Click **Products** → **Add Products**
2. Find **Facebook Login** and click **Set Up**
3. Choose **Web**
4. Follow the setup wizard

### 6. Configure Permissions

By default, the app requests:
- `public_profile` - Basic profile information
- `email` - User's email address

To request additional permissions, modify in `auth-script.js`:
```javascript
FB.login(function(response) {
    // ...
}, {scope: 'public_profile,email,user_friends'});
```

## File Descriptions

### facebook-login.html
- Main login page
- Contains Facebook login button
- Optional email login form
- Displays user profile after login

### auth-script.js
- Facebook SDK initialization
- Login/logout functionality
- User data handling
- Local storage management

### auth-style.css
- Modern, responsive styling
- Beautiful UI components
- Mobile-friendly design

## Testing Locally

1. Replace `YOUR_FACEBOOK_APP_ID` with your actual App ID
2. Add `localhost` to App Domains in Facebook settings
3. Run a local server:
   ```bash
   python -m http.server 8000
   ```
4. Visit `http://localhost:8000/facebook-login.html`
5. Click **Sign in with Facebook**

## Important Security Notes

⚠️ **Never store passwords in localStorage**
- The email/password form is for demonstration only
- For real implementation, use a backend server with HTTPS
- Always validate tokens on the backend

✅ **Best Practices**
- Use HTTPS in production
- Store `accessToken` securely (httpOnly cookies recommended)
- Validate user tokens on backend
- Use secure, random nonces
- Implement CSRF protection

## Troubleshooting

### "Invalid OAuth Redirect URI"
- Make sure your domain is added to **Valid OAuth Redirect URIs**
- Include the full path to your login page

### "Invalid App ID"
- Check that you've replaced `YOUR_FACEBOOK_APP_ID` correctly
- Verify App ID is from the correct Facebook App

### User not authenticated
- Check browser console for errors
- Verify Facebook SDK is loading correctly
- Make sure App is approved for login

## API Reference

### FB.login(callback, options)
- Opens Facebook login dialog
- Returns user authentication response
- Options: `scope`, `auth_type`, `display`

### FB.api(path, callback)
- Fetches user data from Facebook Graph API
- Fields: `id`, `name`, `email`, `picture`
- Requires valid access token

### FB.logout(callback)
- Logs user out of Facebook
- Clears session

## Additional Resources

- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [Facebook Graph API](https://developers.facebook.com/docs/graph-api)
- [Facebook SDK Reference](https://developers.facebook.com/docs/javascript/reference/v18.0)
- [App Development](https://developers.facebook.com/docs/development)

## License

This implementation follows Facebook's official guidelines and best practices.
