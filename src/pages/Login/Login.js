import React, { useState } from 'react'
import styles from '../LoginRegister.module.css'

// MUI
import { TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { useSnackbar } from 'notistack';

// Hooks
import useAuth from '../../hooks/useAuth'
import { Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';

function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const { setUser } = useUserContext()
    const { loading, logIn } = useAuth()
    const { enqueueSnackbar } = useSnackbar();

    async function handleSubmit() {
        let variant = 'error'

        const u = await logIn(email, senha)

        if (email.trim().length === 0 || senha.trim().length === 0) {
            enqueueSnackbar('Preêncha todos os campos', { variant });
            return
        } else if (senha.trim().length < 6) {
            enqueueSnackbar('Senha deve conter mais de 6 caracteres', { variant });
            return
        }
        if (!u) {
            enqueueSnackbar('Email ou senha inválidos', { variant });
            return
        }
        setUser(u)

        variant = 'success'
        enqueueSnackbar('Bem Vindo!', { variant });
    }

    return (
        <div className={styles.container}>
            <form>
                <h1>Login</h1>
                <TextField className={styles.in} value={email} label="Email" variant="outlined" placeholder='email@email.com' onChange={(e) => setEmail(e.target.value)} />
                <TextField className={styles.in} value={senha} label="Senha" variant="outlined" type='password' onChange={(e) => setSenha(e.target.value)} />
                <LoadingButton
                    className={styles.in}
                    size="large"
                    endIcon={<LoginIcon />}
                    loading={loading}
                    onClick={(e) => handleSubmit(e)}
                    loadingPosition="end"
                    variant="contained"
                >Entrar</LoadingButton>
            </form>
            <Link className={styles.btCadastro} to='/register'>
                <h3>Não Possui conta?</h3>
            </Link>
        </div>
    )
}

export default Login