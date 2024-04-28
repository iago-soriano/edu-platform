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
<h1>Welcome!</h1>
<h3>Click the link bellow to have your first access!</h3>
<a target="_blank" href="${url}">Activate account</a>
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

export const NewStudentOutputEmailTemplate = ({ url }: { url: string }) => `
${styles}
<div class="container">
<h1>New Student Output</h1>
<h3>Clique no link abaixo para ver o output</h3>
<a target="_blank" href="${url}">Student Output</a>
</div>
`;
