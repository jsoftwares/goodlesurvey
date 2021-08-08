module.exports = (req, res, next) => {
    if (req.user.credit < 1) {
        return res.status(401).send({success:false, error: 'Insufficient Credit'});
    }

    next();
}