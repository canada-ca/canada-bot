function delay (func, ms) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(func())
      }, ms)
    });
} 

/**
 * Retries a Promise-returning function multiple times. If it fails numAttempts,
 * then it throws the most recent error.
 * @param {Function} attempt A function that returns a Promise.
 * @param {Array<any>} args An array of arguments passed directly to the attempted function.
 * @param {Number} numAttempts The number of times to try the provided function.
 * @param {Number} timeout The number of milliseconds to wait between attempts.
 * @return {Promise} The Promise either resolved or rejected.
 */
let retry = (attempt, args, numAttempts, timeout) => {
    let error;
    let response;
    return attempt.apply(this, args).catch((err) => {
        if (numAttempts === 1) {
            throw err
        }
        else {
            return delay(retry.bind(this, attempt, args, numAttempts-1, timeout), timeout)
        }
    });
}

module.exports = retry;