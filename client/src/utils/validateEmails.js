
const regex =/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/**Function gets a string of comma separated emails & converts them to an array using .split(','), then maps
 * through each email in array gotten from split to sanitize each eamil by trimming white spaces from if they
 * have. Then we use filter to loop through new array to return emails that didn't match the regex test
 */
const validateEmails = emails => {
    const invalidEmails = emails
        .split(',')
        .map( email => email.trim())
        .filter( email => regex.test(email) === false);

    if (invalidEmails.length) {
        let start, mid;
        if (invalidEmails.length === 1) {
             start = 'This';
             mid = 'is'
            
        }else{
            start = 'These';
            mid = 'are'
        }
        return `${start} emails ${mid} invalid ${invalidEmails}`;
    }

    return;
}

export default validateEmails;