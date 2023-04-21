getData = (req, res) => {
    const data = 'Daniel Troff';

    res.status(200).send(data);
};

module.exports = {
    getData,
};