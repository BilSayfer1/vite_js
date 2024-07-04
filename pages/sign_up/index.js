import { base_url } from '/lib/http.js';

async function validateForm(event) {
    event.preventDefault(); 

    const emailInput = document.querySelector('.email');
    const nameInput = document.querySelector('.name');
    const surnameInput = document.querySelector('.surname');
    const passwordInput = document.querySelector('.password');

    const email = emailInput.value.trim();
    const name = nameInput.value.trim();
    const surname = surnameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !name || !surname || !password) {
        alert('Все поля должны быть заполнены');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-ZА-ЯЁ][a-zа-яё'-]*$/i;
    const surnameRegex = /^[A-ZА-ЯЁ][a-zа-яё'-]*$/i;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
        alert('Введите корректный адрес электронной почты');
        return false;
    }

    if (!nameRegex.test(name)) {
        alert('Введите правильное имя');
        return false;
    }

    if (!surnameRegex.test(surname)) {
        alert('Введите правильную фамилию');
        return false;
    }

    if (!passwordRegex.test(password)) {
        alert('Пароль должен содержать минимум 8 символов, одну заглавную букву, одну строчную букву, одну цифру и один символ');
        return false;
    }

    const userData = {
        email: email,
        name: name,
        surname: surname,
        password: password
    };

    try {
        const response = await fetch(`${base_url}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            alert('Вы прошли регистрацию');
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            localStorage.setItem('name', name);
            localStorage.setItem('surname', surname);
            location.assign('/pages/sign_in/');
        } else {
            alert('Ошибка регистрации');
        }
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

const signUpForm = document.forms.namedItem('registration');
if (signUpForm) {
    signUpForm.onsubmit = (event) => validateForm(event);
}

const enterInAccountButton = document.querySelector('.enter_in_account');
if (enterInAccountButton) {
    enterInAccountButton.onclick = () => {
        location.assign('/pages/sign_in/');
    };
}