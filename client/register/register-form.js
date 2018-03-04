const EMAIL_PATTERN = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

const app = new Vue({
    data: {
        form: {
            email: '',
            password: '',
            confirm: ''
        },
        validation: {
            emailErrorMessage: null,
            passwordErrorMessage: null,
            confirmErrorMessage: null
        },
        formValid: false
    },
    methods: {
        sendForm(e) {
                e.preventDefault()

                this.validateEmail(this.form.email)

                if (!this.formValid) {
                    return
                }

                this.validatePassword(this.form.password)

                if (!this.formValid) {
                    return
                }

                this.validateConfirm(this.form.confirm)

                if (!this.formValid) {
                    return
                }

                // TODO call when backend enpoint ready
            },

            clearForm(e) {
                e.preventDefault()

                this.form.email = ''
                this.form.password = ''
                this.form.confirm = ''

            },

            validateEmail(newVal) {
                this.formValid = true
                this.validation.emailErrorMessage = null

                if (newVal.length === 0) {
                    this.validation.emailErrorMessage = 'Adres email jest wymagane'
                    this.formValid = false
                    return
                }

                if (!EMAIL_PATTERN.test(newVal)) {
                    this.validation.emailErrorMessage = 'Nieprawidłowy adres e-mail'
                    this.formValid = false
                }
            },

            validatePassword(newVal) {
                this.validation.passwordErrorMessage = null
                this.formValid = true

                if (newVal.length === 0) {
                    this.validation.passwordErrorMessage = 'Hasło jest wymagane'
                    this.formValid = false
                    return
                }

                if (newVal.length < 6) {
                    this.validation.passwordErrorMessage = 'Podane hasło jest za krótkie'
                    this.formValid = false
                }
            },

            validateConfirm(newVal) {
                this.formValid = true
                this.validation.confirmErrorMessage = null

                if (newVal.length === 0) {
                    this.validation.confirmErrorMessage = 'Hasło jest wymagane'
                    this.formValid = false
                    return
                }

                if (this.form.confirm !== this.form.password) {
                    this.formValid = false
                    this.validation.confirmErrorMessage = 'Podane hasła nie są takie same'
                }
            }
    },
    watch: {
        'form.email' (newVal) {
            this.validateEmail(newVal)
        },

        'form.password' (newVal) {
            this.validatePassword(newVal)
        },

        'form.confirm' (newVal) {
            this.validateConfirm(newVal)
        }
    }
});

app.$mount('#register-form-page');