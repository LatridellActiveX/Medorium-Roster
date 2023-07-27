const formatHash = (hash: string) => {
    
    return hash.slice(1)
    .replaceAll('%20', ' ') //fix spaces
};

export default formatHash;