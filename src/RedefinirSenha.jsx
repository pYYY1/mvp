import React, { useState } from 'react';
import axios from 'axios';

const StepEmail = ({ email, setEmail, onNext, error, message, handleEnviarCodigo }) => (
    <>
        <h2 className="text-xl font-bold mb-4">Recuperar Senha</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleEnviarCodigo(e); }} className="space-y-4">
            <div className="relative">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail"
                    required
                    className="bg-gray-50 border border-[#8FB339] text-gray-900 text-sm rounded-[8px] focus:ring-0 focus:border-[#4B5842] block w-full p-2.5"
                />
            </div>
            <button type="submit" className="w-full bg-[#8FB339] text-white rounded-[8px] p-2.5 hover:bg-[#7A9E2E]">
                Enviar código
            </button>
            {message && <p className="text-green-500 mt-2">{message}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    </>
);

const StepCode = ({ codigoRecuperacao, setCodigoRecuperacao, onNext, error }) => (
    <>
        <h2 className="text-xl font-bold mb-4">Validar Código</h2>
        <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
            <div className="relative">
                <input
                    type="text"
                    value={codigoRecuperacao}
                    onChange={(e) => setCodigoRecuperacao(e.target.value)}
                    placeholder="Digite o código de recuperação"
                    required
                    className="bg-gray-50 border border-[#8FB339] text-gray-900 text-sm rounded-[8px] focus:ring-0 focus:border-[#4B5842] block w-full p-2.5"
                />
            </div>
            <button type="submit" className="w-full bg-[#8FB339] text-white rounded-[8px] p-2.5 hover:bg-[#7A9E2E]">
                Validar Código
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    </>
);

const StepNewPassword = ({ novaSenha, setNovaSenha, confirmarSenha, setConfirmarSenha, onSubmit, showNovaSenha, setShowNovaSenha, showConfirmarSenha, setShowConfirmarSenha, error }) => (
    <>
        <h2 className="text-xl font-bold mb-4">Redefinir Senha</h2>
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="relative">
                <input
                    type={showNovaSenha ? "text" : "password"}
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    placeholder="Nova senha"
                    required
                    className="bg-gray-50 border border-[#8FB339] text-gray-900 text-sm rounded-[8px] focus:ring-0 focus:border-[#4B5842] block w-full pr-12 p-2.5"
                />
                <button
                    type="button"
                    onClick={() => setShowNovaSenha(!showNovaSenha)}
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                >
                    <img
                        src={showNovaSenha ? "/img/olhofechado.png" : "/img/olho.png"}
                        alt={showNovaSenha ? "Ocultar Senha" : "Mostrar Senha"}
                        className="h-3 w-4"
                    />
                </button>
            </div>
            <div className="relative">
                <input
                    type={showConfirmarSenha ? "text" : "password"}
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    placeholder="Confirmar nova senha"
                    required
                    className="bg-gray-50 border border-[#8FB339] text-gray-900 text-sm rounded-[8px] focus:ring-0 focus:border-[#4B5842] block w-full pr-12 p-2.5"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmarSenha(!showConfirmarSenha)}
                    className="absolute inset-y-0 right-0 flex items-center px-3"
                >
                    <img
                        src={showConfirmarSenha ? "/img/olhofechado.png" : "/img/olho.png"}
                        alt={showConfirmarSenha ? "Ocultar Senha" : "Mostrar Senha"}
                        className="h-3 w-4"
                    />
                </button>
            </div>
            <button type="submit" className="w-full bg-[#8FB339] text-white rounded-[8px] p-2.5 hover:bg-[#7A9E2E]">
                Redefinir senha
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    </>
);

const RedefinirSenha = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [codigoRecuperacao, setCodigoRecuperacao] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showNovaSenha, setShowNovaSenha] = useState(false);
    const [showConfirmarSenha, setShowConfirmarSenha] = useState(false);

    const handleEnviarCodigo = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            await axios.post('http://localhost:3000/organizadores/recuperar-senha', { email });
            setMessage('Código de recuperação enviado com sucesso.');
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.erro || 'Erro ao enviar o código. Tente novamente.');
        }
    };

    const handleRedefinirSenha = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!/^\d{4}$/.test(codigoRecuperacao)) {
            setError('O código deve ser composto apenas por 4 dígitos.');
            return;
        }

        if (novaSenha !== confirmarSenha) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            await axios.post('http://localhost:3000/organizadores/alterar-senha', {
                email,
                codigoRecuperacao,
                novaSenha
            });
            setMessage('Senha alterada com sucesso.');
            onClose();
            resetState();
        } catch (err) {
            setError(err.response?.data?.erro || 'Erro ao alterar a senha. Tente novamente.');
        }
    };

    const resetState = () => {
        setStep(1);
        setEmail('');
        setCodigoRecuperacao('');
        setNovaSenha('');
        setConfirmarSenha('');
        setMessage('');
        setError('');
        setShowNovaSenha(false);
        setShowConfirmarSenha(false);
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-[12px] p-6 shadow-lg w-11/12 md:w-1/3">
                {step === 1 && (
                    <StepEmail
                        email={email}
                        setEmail={setEmail}
                        onNext={() => setStep(2)}
                        error={error}
                        message={message}
                        handleEnviarCodigo={handleEnviarCodigo} // Passando a função correta
                    />
                )}
                {step === 2 && (
                    <StepCode
                        codigoRecuperacao={codigoRecuperacao}
                        setCodigoRecuperacao={setCodigoRecuperacao}
                        onNext={() => setStep(3)}
                        error={error}
                    />
                )}
                {step === 3 && (
                    <StepNewPassword
                        novaSenha={novaSenha}
                        setNovaSenha={setNovaSenha}
                        confirmarSenha={confirmarSenha}
                        setConfirmarSenha={setConfirmarSenha}
                        onSubmit={handleRedefinirSenha}
                        showNovaSenha={showNovaSenha}
                        setShowNovaSenha={setShowNovaSenha}
                        showConfirmarSenha={showConfirmarSenha}
                        setShowConfirmarSenha={setShowConfirmarSenha}
                        error={error}
                    />
                )}
                <button onClick={handleClose} className="mt- 4 w-full text-gray-500 hover:underline">
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default RedefinirSenha;