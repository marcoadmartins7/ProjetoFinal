//Export the functions
module.exports = {
    mail: {
        mailError: {
            msg: "Error",
            message: {
                eng: "Email not sent",
                pt: "Não foi possível enviar o email"
            },
            status: 204,
            success: false
        },
        mailSent: {
            msg: "Success",
            message: {
                eng: "Email sent",
                pt: "Email enviado"
            },
            success: true,
            status: 200,
        },
        serverError: {
            msg: "Server Error",
            message: {
                eng: "Unexpected error",
                pt: "Erro inesperado"
            },
            success: true,
            status: 503,
        },
        requiredData: {
            msg: "dataMissing",
            message: {
                eng: "Required fields are missing",
                pt: "Falta preencher dados obrigatórios"
            },
            success: false,
            status: 400,
        },
        nonexistentData: {
            msg: "Data not found",
            message: {
                eng: "There is no such email in the database",
                pt: "O email não existe na base de dados"
            },
            success: false,
            status: 404, url2:"/_static/grup1/Front-end/frontoffice/ForgotPassword.html"
        },
    },
};
