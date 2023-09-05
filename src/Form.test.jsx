import { describe, expect, it, vi } from "vitest"
import { StateForm as Form } from "./StateForm"
import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'

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
})