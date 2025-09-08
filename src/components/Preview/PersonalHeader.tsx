
const PersonalHeader: React.FC<{ name: string; contact: string }> = ({ name, contact }) => {
    return (
        <header>
            <h1>{name}</h1>
            <p>{contact}</p>
        </header>
    );
};

export default PersonalHeader;