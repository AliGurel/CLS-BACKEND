//* ERROR HANDLER
('use stricts')

module.exports = (err, req,res,nex) => {
    console.log('ErrorHandler runned');

    const errorStatusCode = res?.errorStatusCode || 500

    res.status(errorStatusCode).send({
        error : true,
        message : err.message
    })
}
