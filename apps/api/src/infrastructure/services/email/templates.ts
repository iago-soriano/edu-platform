const styles = `<style>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
}
h3 {
    color: grey;
}
a {
    color: white;
    font-weight: bold;
    background-color: #c40;
    padding: 15px;
    border-radius: 5px;
}
</style>`;

export const VerifyAccountEmailTemplate = ({ url }: { url: string }) => `
${styles}
<div class="container">
<h1>Bem-vindo(a)!</h1>
<h3>Clique no link abaixo para começar a utilizar a plataforma</h3>
<a target="_blank" href="${url}">Ativar conta</a>
</div>
`;

export const ForgotPasswordEmailTemplate = ({ url }: { url: string }) => `
${styles}
<div class="container">
<h1>Redefina sua senha</h1>
<h3>Clique no link abaixo para redefinir sua senha</h3>
<p>Se você não solicitou uma troca de senha, basta ignorar este e-mail.</p>
<a target="_blank" href="${url}">Trocar senha</a>
</div>
`;
