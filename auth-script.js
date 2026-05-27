// ============================================
// FACEBOOK LOGIN CONFIGURATION
// ============================================

// Replace 'YOUR_FACEBOOK_APP_ID' with your actual Facebook App ID
const FACEBOOK_APP_ID = 'YOUR_FACEBOOK_APP_ID';

// ============================================
// INITIALIZE FACEBOOK SDK
// ============================================

window.fbAsyncInit = function() {
    FB.init({
        appId      : FACEBOOK_APP_ID,
        cookie     : true,
        xfbml      : true,
        version    : 'v18.0'
    });

    // Check initial login state
    checkLoginState();
};

// ============================================
// FACEBOOK LOGIN FUNCTION
// ============================================

function facebookLogin() {
    const loginBtn = document.querySelector('.btn-facebook');
    loginBtn.disabled = true;
    loginBtn.textContent = 'Logging in...';

    FB.login(function(response) {
        if (response.authResponse) {
            // User logged in successfully
            console.log('User logged in successfully');
            handleLoginSuccess(response);
        } else {
            // User cancelled login
            console.log('User cancelled login');
            showError('Login cancelled. Please try again.');
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<span class="fb-icon">f</span>\n                        Sign in with Facebook';
        }
    }, {scope: 'public_profile,email'});
}

// ============================================
// HANDLE LOGIN SUCCESS
// ============================================

function handleLoginSuccess(response) {
    const accessToken = response.authResponse.accessToken;
    
    // Get user info from Facebook
    FB.api('/me', {fields: 'id,name,email,picture'}, function(user) {
        // Store user info in localStorage
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            picture: user.picture.data.url,
            accessToken: accessToken,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        
        // Display user info
        displayUserInfo(userData);
        
        // Hide login form
        document.querySelector('.auth-box').style.display = 'none';
        
        console.log('User logged in:', userData);
        
        // Optional: Redirect to main app after 2 seconds
        setTimeout(() => {
            // window.location.href = 'index.html';
        }, 2000);
    });
}

// ============================================
// CHECK LOGIN STATE
// ============================================

function checkLoginState() {
    // Check if user has cached login data
    const cachedUser = localStorage.getItem('userData');
    
    if (cachedUser) {
        const userData = JSON.parse(cachedUser);
        displayUserInfo(userData);
        document.querySelector('.auth-box').style.display = 'none';
    }
    
    // Also check with Facebook
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

// ============================================
// STATUS CHANGE CALLBACK
// ============================================

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log('User is logged in with Facebook');
    } else if (response.status === 'not_authorized') {
        console.log('User is logged into Facebook but not your app');
    } else {
        console.log('User is not logged into Facebook');
    }
}

// ============================================
// DISPLAY USER INFO
// ============================================

function displayUserInfo(userData) {
    const userInfoDiv = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const userPhoto = document.getElementById('userPhoto');
    
    userName.textContent = userData.name;
    userPhoto.src = userData.picture;
    
    userInfoDiv.style.display = 'block';
}

// ============================================
// LOGOUT FUNCTION
// ============================================

function logout() {
    FB.logout(function(response) {
        // Clear localStorage
        localStorage.removeItem('userData');
        
        // Hide user info and show login form
        document.getElementById('userInfo').style.display = 'none';
        document.querySelector('.auth-box').style.display = 'block';
        document.getElementById('emailLoginForm').reset();
        
        console.log('User logged out');
    });
}

// ============================================
// EMAIL LOGIN (OPTIONAL - NOT CONNECTED TO BACKEND)
// ============================================

document.getElementById('emailLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // This is a client-side example only
    // In a real app, you would send these credentials to your backend server
    // and never store passwords in localStorage
    
    if (email && password) {
        // Simulate successful login
        const userData = {
            id: 'email_user_' + Date.now(),
            name: email.split('@')[0],
            email: email,
            picture: 'https://via.placeholder.com/100',
            loginMethod: 'email',
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('userData', JSON.stringify(userData));
        displayUserInfo(userData);
        document.querySelector('.auth-box').style.display = 'none';
        
        console.log('Email login successful');
    } else {
        showError('Please enter both email and password');
    }
});

// ============================================
// ERROR MESSAGE DISPLAY
// ============================================

function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.textContent = message;
    errorDiv.classList.add('show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.classList.remove('show');
    }, 5000);
}

// ============================================
// PAGE INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    checkLoginState();
});