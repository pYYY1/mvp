import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!nome || !email || !senha || !confirmarSenha) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!senhaRegex.test(senha)) {
            setError("A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e símbolos.");
            return;
        }

        if (senha !== confirmarSenha) {
            setError("As senhas não coincidem.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/organizadores', { nome, email, senha });
            console.log('Organizador cadastrado:', response.data);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.erro || 'Erro ao cadastrar. Tente novamente.');
        }
    };

    return (
        <section className="bg-[#4B5842] h-screen flex items-center justify-center">
            <div className="w-full max-w-3xl bg-white rounded-[12px] shadow-lg border border-[#8FB339] flex flex-col">
                <div className="flex flex-col md:flex-row items-center p-10">
                    <div className="flex-1 flex items-center justify-center md:justify-start mb-6 md:mb-0">
                        <img 
                            src='/img/Logo PNG (estranho).png'
                            className="max-w-[250px] h-auto md:max-w-[300px]" // Ajuste para responsividade
                            alt="Logo"
                        />
                    </div>
                    <div className="flex-1 w-full">
                        <h2 className="text-xl font-bold font-inter text-[#4B5842] text-center md:text-left mb-4">Cadastre-se</h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="relative">
                                <img src="/img/usercadastro.png" alt="Usuário" className="absolute left-3 top-2.5 h-5 w-5" />
                                <input 
                                    type="text" 
                                    id="fullName" 
                                    className="bg-gray-50 border border-[#8FB339] text-gray-900 text-sm rounded-[8px] focus:ring-0 focus:border-[#4B5842] block w-full pl-10 pr-3 p-2.5 transition-colors duration-200 font-inter" 
                                    placeholder="Primeiro Nome" 
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="relative">
                                <img src="/img/email.png" alt="Email" className="absolute left-3 top-3.5 h-4 w-4.5" />
                                <input 
                                    type="email" 
                                    id="email" 
                                    className="bg-gray-50 border border-[#8FB339] text-gray-900 text-sm rounded-[8px] focus:ring-0 focus:border-[#4B5842] block w-full pl-10 pr-3 p-2.5 transition-colors duration-200 font-inter" 
                                    placeholder="Email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required 
                                />
                            </div>
                            <div className="relative">
                                <img src="/img/cadeado.png" alt="Senha" className="absolute left-3 top-2.5 h-5 w-5" />
                                <input 
                                    type={showPassword ? 'text' : 'password'} 
                                    id="password" 
                                    className="bg-gray-50 border border-[#8FB339] text-gray-900 text-sm rounded-[8px] focus:ring-0 focus:border-[#4B5842] block w-full pl-10 pr-10 p-2.5 transition-colors duration-200 font-inter" 
                                    placeholder="Senha" 
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required 
                                />
                                <button 
                                    type="button" 
                                    onClick={togglePasswordVisibility} 
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                                >
                                    <img 
                                        src={showPassword ? "/img/olhofechado.png" : "/img/olho.png"} 
                                        alt={showPassword ? "Ocultar Senha" : "Mostrar Senha"} 
                                        className="h-3 w-4"
                                    />
                                </button>
                            </div>
                            <div className="relative">
                                <img src="/img/cadeado.png" alt="Confirmar Senha" className="absolute left-3 top-2.5 h-5 w-5" />
                                <input 
                                    type={showConfirmPassword ? 'text' : 'password'} 
                                    id="confirmPassword" 
                                    className="bg-gray-50 border border-[#8FB339] text-gray-900 text-sm rounded-[8px] focus:ring-0 focus:border-[#4B5842] block w-full pl-10 pr-10 p-2.5 transition-colors duration-200 font-inter" 
                                    placeholder="Confirmar Senha" 
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                    required 
                                />
                                <button 
                                    type="button" 
                                    onClick={toggleConfirmPasswordVisibility} 
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                                >
                                    <img 
                                        src={showConfirmPassword ? "/img/olhofechado.png" : "/img/olho.png"} 
                                        alt={showConfirmPassword ? "Ocultar Senha" : "Mostrar Senha"} 
                                        className="h-3 w-4"
                                    />
                                </button>
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <button 
                                type="submit" 
                                className="w-full text-white bg-[#8FB339] hover:bg-[#7A9E2E] focus:ring-4 focus:outline-none focus:ring-[#4B5842] font-bold rounded-[8px] text-sm px-5 py-2.5 text-center transition-colors duration-200 font-inter"
                            >
                                Cadastrar
                            </button>
                            <p className="text-sm text-center mt-6 text-[#8FB339] font-inter font-medium">
                                Já possui uma conta? 
                                <a href="/login" className="font-bold text-[#4B5842] hover:underline ml-1">Faça Login</a>
                            </p>
                        </form>
                    </div>
                </div>
                <button 
                    onClick={handleBack} 
                    className="absolute top-5 left-5 text-white bg-[#8FB339] hover:bg-[#7A9E2E] focus:ring-4 focus:outline-none focus:ring-[#4B5842] font-medium rounded-[8px] text-sm px-5 py-2.5 transition-colors duration-200 font-inter"
                >
                    Voltar
                </button>
            </div>
        </section>
    );
}
