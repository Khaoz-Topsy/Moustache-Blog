module.exports = function (context, options) {
    // if (context == null) return 'error';
    if (context.includes('?')) {
        return context + '&ref=assistantNMS';
    }
    return context + '?ref=assistantNMS';
};