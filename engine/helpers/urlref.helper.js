module.exports = function (context, options) {
    if (context == null) return 'error';
    const refId = process.env['CUSTOM_REFID'];
    if (context.includes('?')) {
        return context + `&ref=${refId}`;
    }
    return context + `?ref=${refId}`;
};