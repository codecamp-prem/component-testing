import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
//import { StateForm as Form } from "./StateForm"
import { RefForm as Form } from "./RefForm"

describe("Form Component", () => {
    it("should call onSubmit when the form is valid with the correct data", async () => {
        const onSubmit = vi.fn()
        const user = userEvent.setup()
        
        render(<Form onSubmit={onSubmit} />)

        const email = "test@gmail.com"
        const password = "123456Password"

        await user.type(screen.getByLabelText("Email"), email)
        await user.type(screen.getByLabelText("Password"), password)
        await user.click(screen.getByText("Submit"))
        
        expect(screen.queryByTestId("email-error-msg")).not.toBeInTheDocument()
        expect(screen.queryByTestId("password-error-msg")).not.toBeInTheDocument()

        expect(onSubmit).toHaveBeenCalledOnce()
        expect(onSubmit).toHaveBeenCalledWith({ email, password })
    })

    it("should show the email error when the email is invalid", async () => {
        // Repeated code on test is OK, it makes each test independent of each other
        const onSubmit = vi.fn()
        const user = userEvent.setup()
        
        render(<Form onSubmit={onSubmit} />)

        const email = "test@yahoo.com" // we only allow gmail account in validator
        const password = "123456Password"

        await user.type(screen.getByLabelText("Email"), email)
        await user.type(screen.getByLabelText("Password"), password)
        await user.click(screen.getByText("Submit"))

        expect(screen.queryByTestId("email-error-msg")).toBeInTheDocument()
        expect(screen.queryByTestId("password-error-msg")).not.toBeInTheDocument()

        expect(onSubmit).not.toHaveBeenCalledOnce()        
    })

    it("should show the password error when the email is invalid", async () => {
        // Repeated code on test is OK, it makes each test independent of each other
        const onSubmit = vi.fn()
        const user = userEvent.setup()
        
        render(<Form onSubmit={onSubmit} />)

        const email = "test@gmail.com" 

        // we only allow password 
        // at least 10 characters
        // at least 1 uppercase letter & lowercase letter & 1 numeric number
        const password = "123Pd" 

        await user.type(screen.getByLabelText("Email"), email)
        await user.type(screen.getByLabelText("Password"), password)
        await user.click(screen.getByText("Submit"))

        expect(screen.queryByTestId("email-error-msg")).not.toBeInTheDocument()
        expect(screen.queryByTestId("password-error-msg")).toBeInTheDocument()

        expect(onSubmit).not.toHaveBeenCalledOnce()        
    })

    it("should update the error message while typing: after the 1st submit", async () => {
        const onSubmit = vi.fn()
        const user = userEvent.setup()
        
        render(<Form onSubmit={onSubmit} />)

        const emailInput = screen.getByLabelText("Email")
        const passwordInput = screen.getByLabelText("Password")
        await user.type(emailInput, "test@yahoo.com") // failing email value
        await user.type(passwordInput, "123Pd") // failing password value
        await user.click(screen.getByText("Submit"))

        const emailErrorMsg = screen.queryByTestId("email-error-msg")
        expect(emailErrorMsg).toBeInTheDocument()
        const passwordErrorMsg = screen.queryByTestId("password-error-msg")
        expect(passwordErrorMsg).toBeInTheDocument()

        expect(onSubmit).not.toHaveBeenCalledOnce()

        await user.clear(emailInput)
        await user.type(emailInput, "valid_email@gmail.com")
        expect(emailErrorMsg).not.toBeInTheDocument()
        await user.clear(passwordInput)
        await user.type(passwordInput, "Valid_PassWord_123456Psswd")
        expect(passwordErrorMsg).not.toBeInTheDocument()
    })
})