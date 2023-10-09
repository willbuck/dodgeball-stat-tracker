// Helper function to find matching ID in an array
    // array (required): the array to scan
    // id (required): the value to scan for
    // key (optional): the key to scan for within each array item
    // all (optional): whether to return all matches. default is true. false will return first match.

//! refactor: it doesn't really account for a person who wants one match from an array of non-objects. Need to allow for that (this should be easy since key and all will never have same data type)

export default function findIDMatch(array, id, key, all) {
    const matches = [];

    for (let item of array) {
        
        let test;
        if (key === undefined) {
            test = item;
        } else {
            test = item[key];
        }

        if (test === id) {
            if (all === false) {
                return item;
            }
            matches.push(item);
        }
    }
    return matches;
}
