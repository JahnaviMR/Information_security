var passwordAttemptsRemaining = 3;
var privateKeyAttemptsRemaining = 3;
var blockedDuration = 10;
var isPasswordBlocked = false;
var isPrivateKeyBlocked = false;
var passwordBlockTimer;
var privateKeyBlockTimer;

var validPasswords = {
    "Jahnavi": "jahnavimr100@gmail.com",
    "Prithvi": "prithvijaiprakash@gmail.com",
    "Jeevitha": "jeevitha18032003@gmail.com",
    "SowjanyaBhat": "sowjanyab509@gmail.com",
    "Tejashwini": "tejashwini77949@gmail.com",
    "ShreeHarshini": "harshini9939@gmail.com"
};

var validDevicePath = Object.values(validPasswords);

document.getElementById('submitDevicePathBtn').addEventListener('click', function() {
    checkDevicePath();
});

document.getElementById('submitPasswordBtn').addEventListener('click', function() {
    checkPassword();
});

document.getElementById('submitPrivateKeyBtn').addEventListener('click', function() {
    checkPrivateKey();
});


function checkDevicePath() {
    var devicePath = document.getElementById('devicePathInput').value.trim();

    if (validDevicePath.includes(devicePath)) {
        document.querySelector('.container').style.display = 'none';
        document.querySelector('.password-container').style.display = 'block';
    } else {
        alert("This device cannot access the secret image.");
        document.getElementById("device-path-timerContainer").innerHTML = "Invalid device path.";
        handleInvalidDevicePath();
    }
}

function handleInvalidDevicePath() {
    passwordAttemptsRemaining--;
    if (passwordAttemptsRemaining <= 0) {
        isPasswordBlocked = true;
        passwordBlockTimer = setInterval(updatePasswordBlockTimer, 1000);
        displayTimer("Access Blocked. Remaining time: ", blockedDuration, " seconds", "device-path-timerContainer");
    } else {
        document.getElementById("device-path-timerContainer").innerHTML = "Invalid device path. " + passwordAttemptsRemaining + " attempts remaining.";
    }
}

function checkPassword() {
    var alphanumericName = document.getElementById('passwordInput').value.trim();
    var devicePath = document.getElementById('devicePathInput').value.trim();

    if (validPasswords.hasOwnProperty(alphanumericName) && validPasswords[alphanumericName] === devicePath) {
        document.querySelector('.password-container').style.display = 'none';
        document.querySelector('.private-key-container').style.display = 'block';
        displayPrivateKey(); // Display private key in password container
    } else {
        handleInvalidPassword();
    }
}

function displayPrivateKey() {
    var privateKey = generatePrivateKey();
    document.getElementById('privateKeyDisplay').textContent = privateKey; // Display private key in password container
}

function handleInvalidPassword() {
    passwordAttemptsRemaining--;
    if (passwordAttemptsRemaining <= 0) {
        isPasswordBlocked = true;
        displayTimer("Access Blocked. Remaining time: ", blockedDuration, " seconds", "password-timerContainer");
        passwordBlockTimer = setInterval(updatePasswordBlockTimer, 1000);
    } else {
        document.getElementById("password-timerContainer").innerHTML = "Invalid password. " + passwordAttemptsRemaining + " attempts remaining.";
    }
}

function updatePasswordBlockTimer() {
    blockedDuration--;
    if (blockedDuration <= 0) {
        clearInterval(passwordBlockTimer);
        isPasswordBlocked = false;
        passwordAttemptsRemaining = 3;
        alert("Access Unblocked for Password. You can try again.");
        document.getElementById("password-timerContainer").innerHTML = "";
    } else {
        displayTimer("Access Blocked. Remaining time: ", blockedDuration, " seconds", "password-timerContainer");
    }
}

function checkPrivateKey() {
    if (isPrivateKeyBlocked) {
        displayTimer("Access Blocked. Remaining time: ", blockedDuration, " seconds", "private-key-timerContainer");
        return;
    }

    var userInput = document.getElementById('privateKeyInput').value.trim();
    var privateKey = document.getElementById('privateKeyDisplay').textContent; // Corrected ID to get private key from the password container

    if (userInput === privateKey) {
        var secretImagePath = "Secret_image.png";
        var imageWindow = window.open(secretImagePath);
        if (!imageWindow || imageWindow.closed || typeof imageWindow.closed == 'undefined') {
            alert("Please allow pop-ups to view the secret image.");
        }
    } else {
        handleInvalidPrivateKey();
    }
}

function handleInvalidPrivateKey() {
    privateKeyAttemptsRemaining--;
    if (privateKeyAttemptsRemaining <= 0) {
        isPrivateKeyBlocked = true;
        privateKeyBlockTimer = setInterval(updatePrivateKeyBlockTimer, 1000);
        displayTimer("Access Blocked. Remaining time: ", blockedDuration, " seconds", "private-key-timerContainer");
    } else {
        document.getElementById("private-key-timerContainer").innerHTML = "Invalid private key. " + privateKeyAttemptsRemaining + " attempts remaining.";
    }
}

function updatePrivateKeyBlockTimer() {
    blockedDuration--;
    if (blockedDuration <= 0) {
        clearInterval(privateKeyBlockTimer);
        isPrivateKeyBlocked = false;
        privateKeyAttemptsRemaining = 3;
        alert("Access Unblocked for Private Key. You can try again.");
        document.getElementById("private-key-timerContainer").innerHTML = "";
    } else {
        displayTimer("Access Blocked. Remaining time: ", blockedDuration, " seconds", "private-key-timerContainer");
    }
}


function displayTimer(prefix, time, suffix, containerId) {
    var timerContainer = document.getElementById(containerId);
    timerContainer.innerHTML = prefix + time + suffix;
}

function generatePrivateKey() {
    var keyLength = 20;
    var characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-_+=:;'~`|(}[){[?/><";
    var privateKey = "";

    for (var i = 0; i < keyLength; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        privateKey += characters.charAt(randomIndex);
    }

    return privateKey;
}

