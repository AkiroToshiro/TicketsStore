import { render, screen } from '@testing-library/react';
import Tickets from "./tickets";


test('loading tickets', () => {
    render(<Tickets />);
    const linkElement = screen.getByText(/Loading .../i);
    expect(linkElement).toBeInTheDocument();
});

test('tickets good', () => {
    localStorage.setItem("token", JSON.stringify("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjIyMDE5NDMzLCJqdGkiOiI2NjRlNDAxNDcxMzU0YjQwYTBlNTQxYjRhYTEzZGY5ZSIsInVzZXJfaWQiOjN9.aBMh91aAIr_v0NmrfQRc0xLTrrSsr2EuxvaEtAI2pew"));
    let token = "JWT " + JSON.parse(localStorage.getItem("token"))
    console.log(token)
    let t = new Tickets
    t.componentDidMount()
    console.log(t.state)
});