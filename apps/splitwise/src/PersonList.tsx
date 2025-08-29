// Presentational/Stateless/Dumb Component
import type { Person } from './BillSplitter';

type PersonListProps = {
    persons: Person[]
}

const PersonList: React.FC<PersonListProps> = ({ persons }) => {
    return (
        <ul>
            {persons.map((person) => (<li key={person.id}>{person.name}</li>))}
        </ul>
    )
}

export default PersonList
