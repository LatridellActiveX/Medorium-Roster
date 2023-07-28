import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import axios from 'axios';
import { vi, expect, it, describe, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom';
import RegForm from '../pages/registration/regForm';

vi.mock('axios');

describe('Regestration form', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        render(
            <BrowserRouter>
                <RegForm />
            </BrowserRouter>
        );
    });

    it('types too long username', async () => {
        const tooLongUsername = 'I'.repeat(50);
        const password = '1231';

        let usernameInput = screen.getByText('Username:');
        let passwordInput = screen.getByText('Password:');
        let submitBtn = screen.getByRole('button', {
            name: 'Submit your regestration credentials'
        });

        await user.type(usernameInput, tooLongUsername);
        await user.type(passwordInput, password);

        expect(submitBtn.getAttribute('disabled')).toBe('');
    });
    it('does not provide any credentials', () => {
        let submitBtn = screen.getByRole('button', {
            name: 'Submit your regestration credentials'
        });

        expect(submitBtn.getAttribute('disabled')).toBe(null);
    });
    it('types too short username and password', async () => {
        const tooShortUsername = 'aa';
        const tooShortPassowrd = '11';

        let usernameInput = screen.getByText('Username:');
        let passwordInput = screen.getByText('Password:');
        let submitBtn = screen.getByRole('button', {
            name: 'Submit your regestration credentials'
        });

        await user.type(usernameInput, tooShortUsername);
        await user.type(passwordInput, tooShortPassowrd);

        expect(submitBtn.getAttribute('disabled')).toBe('');
    });
    it('types the correct credentials and then submits them', async () => {
        const tooShortUsername = 'aaaaaa';
        const tooShortPassowrd = '11231';

        let usernameInput = screen.getByLabelText('Username:');
        let passwordInput = screen.getByLabelText('Password:');
        let submitBtn = screen.getByRole('button', {
            name: 'Submit your regestration credentials'
        });

        await user.type(usernameInput, tooShortUsername);
        await user.type(passwordInput, tooShortPassowrd);
        expect(submitBtn.getAttribute('disabled')).toBe(null);

        await user.click(submitBtn);
        expect(axios.post).toHaveBeenCalledTimes(1);
    });
});