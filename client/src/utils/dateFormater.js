export function formatDate (input){
    const date = new Date(input);
    const options1 = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateTimeFormat3 = new Intl.DateTimeFormat('en-US', options1)
    return dateTimeFormat3.format(date);

}